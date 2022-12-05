import { Tab as TabMui, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { ReactElement, useId } from "react";
import { Tab } from "../models";

interface ScrollableTabsProps {
  tabs: Tab[] | null;
  loaded: boolean;
  selectedTab: number | null;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
}

function ScrollableTabs({
  tabs,
  loaded,
  selectedTab,
  handleChangeTab,
}: ScrollableTabsProps): ReactElement {
  const id = useId();

  return (
    <Box sx={{ width: "100%", bgcolor: "common.white" }}>
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        {!loaded
          ? "Loading ..."
          : Array.isArray(tabs) &&
            selectedTab !== null &&
            tabs?.map((tab) => (
              <TabMui
                key={id}
                value={tab.id}
                label={<Typography>{tab.attributes.title}</Typography>}
                wrapped
              />
            ))}
      </Tabs>
    </Box>
  );
}

export default ScrollableTabs;
