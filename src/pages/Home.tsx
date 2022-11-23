import { Paper, Box } from "@mui/material";
import { ReactElement } from "react";
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
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <ScrollableTabs />
      </Box>
    </Paper>
  );
}

export default Home;
