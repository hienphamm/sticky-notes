import { Box, Paper } from "@mui/material";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import DraftEditor from "../components/DraftEditor";
import ScrollableTabs from "../components/ScrollableTabs";
import useAxios from "../hooks/useAxios";
import { Tab } from "../models";
import { getTab, getTabs } from "../services";

function Home(): ReactElement {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<number | null>(null);

  const category = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const tabs = useAxios<string, Tab[]>(
    getTabs({
      category,
    }),
  );

  const tabId = useMemo(() => {
    return tabs.data?.find((x) => x.id === selectedTab)?.id;
  }, [selectedTab, tabs]);

  const tab = useAxios<string, Tab[]>(
    getTab({
      id: tabId!,
    }),
    Boolean(tabId),
  );

  useEffect(() => {
    setSelectedTab(null);
  }, [location.pathname]);

  useEffect(() => {
    if (Array.isArray(tabs.data) && tabs.data?.length !== 0) {
      setSelectedTab(tabs?.data[0].id);
    }
  }, [setSelectedTab, tabs?.data]);

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "calc(100vh - 120px)",
        position: "relative",
      }}
    >
      <DraftEditor
        loaded={tab.loaded}
        initContent={
          tab.data?.[0]?.attributes.content != null
            ? tab.data?.[0]?.attributes.content
            : null
        }
        tabId={tabId!}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 9,
        }}
      >
        <ScrollableTabs
          selectedTab={selectedTab}
          loaded={tabs.loaded}
          tabs={tabs.data}
          handleChangeTab={handleChangeTab}
        />
      </Box>
    </Paper>
  );
}

export default Home;
