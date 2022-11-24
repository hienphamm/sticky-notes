import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { ReactElement, useState } from "react";

const initTabs = [
  {
    value: 1,
    label: "Async Await",
  },
  {
    value: 2,
    label: "Hosting",
  },
  {
    value: 3,
    label: "Scope",
  },
];

function ScrollableTabs(): ReactElement {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        {initTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} wrapped />
        ))}
      </Tabs>
    </Box>
  );
}

export default ScrollableTabs;
