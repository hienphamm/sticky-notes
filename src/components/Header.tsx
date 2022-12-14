import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box, Stack, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ReactElement } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const Header = (): ReactElement => {
  const { isAuthenticated, profile, onLogout } = useAuthContext();

  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"} my={3}>
        <Box flex={1} textAlign={"center"}>
          <TextField
            size="medium"
            id="elastic-search"
            label="Search ..."
            variant="standard"
            sx={{
              width: {
                xs: "100%",
                md: "400px",
              },
            }}
          />
        </Box>
        {isAuthenticated && (
          <div>
            Welcome <b>{profile.username}</b>
            <Tooltip title="Sign out">
              <IconButton
                onClick={onLogout}
                sx={{
                  ml: 1,
                }}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Stack>
    </>
  );
};
