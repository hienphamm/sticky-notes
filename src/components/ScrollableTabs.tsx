import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { ReactElement, useState } from "react";

function ScrollableTabs(): ReactElement {
  const [value, setValue] = useState("one");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string,
  ): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          value="one"
          label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
          wrapped
        />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
        <Tab value="three" label="Item Three" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
}

export default ScrollableTabs;
