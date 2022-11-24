import { Box, Paper } from "@mui/material";
import { ReactElement } from "react";
import DraftEditor from "../components/DraftEditor";
import ScrollableTabs from "../components/ScrollableTabs";

function Home(): ReactElement {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: "calc(100vh - 120px)",
        position: "relative",
      }}
    >
      <DraftEditor />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          zIndex: 9,
        }}
      >
        <ScrollableTabs />
      </Box>
    </Paper>
  );
}

export default Home;
