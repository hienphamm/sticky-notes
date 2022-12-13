import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography>404 | Page Not Found</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Typography
            sx={{
              color: "primary.main",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            <Link to={"/app"}>Go home</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
