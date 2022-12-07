import { Box, Paper } from "@mui/material";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import DraftEditor from "../components/DraftEditor";
import ScrollableTabs from "../components/ScrollableTabs";
import useAxios from "../hooks/useAxios";
import { Category, Tab } from "../models";
import { getCategories, getTabs } from "../services";

function Home(): ReactElement {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<number | null>(null);

  const category = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const categories = useAxios<any, Category[]>(getCategories());

  const tabs = useAxios<string, Tab[]>(
    getTabs({
      category,
    }),
  );

  const categoryId = useMemo(() => {
    return (
      Array.isArray(categories.data) &&
      categories.data.find((x) => x.attributes.link === category)?.id
    );
  }, [categories.data, category]);

  const tab = useMemo(() => {
    return tabs.data?.find((x) => x.id === activeTab);
  }, [activeTab, tabs]);

  useEffect(() => {
    return () => {
      setActiveTab(null);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (Array.isArray(tabs.data) && tabs.data?.length !== 0) {
      setActiveTab(tabs?.data[0]?.id);
    }
  }, [tabs?.data]);

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          height: "calc(100vh - 120px)",
          position: "relative",
        }}
      >
        {Number.isInteger(tab?.id) && tab !== undefined && (
          <DraftEditor tab={tab} />
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            zIndex: 9,
          }}
        >
          <ScrollableTabs
            categoryId={Number(categoryId)}
            activeTab={activeTab}
            loaded={tabs.loaded}
            tabs={tabs.data}
            handleChangeTab={handleChangeTab}
            onRefetchData={tabs.onRefetch}
          />
        </Box>
      </Paper>
    </>
  );
}

export default Home;
