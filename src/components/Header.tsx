import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useSnackbar } from "notistack";
import React, { FormEvent, ReactElement, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { setToken } from "../helpers/auth-helper";
import { AuthenticationType } from "../models";
import { login, register } from "../services";
import CommonModal from "./Modal";

export const Header = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const { isAuthenticated, profile, onLogout } = useAuthContext();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [actionType, setActionType] = useState<AuthenticationType>("login");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onCloseModal = (): void => {
    setIsVisibleModal(false);
  };

  const onOpenModal = (): void => {
    setIsVisibleModal(true);
  };

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const resetFormValues = (): void => {
    setFormValues({
      username: "",
      email: "",
      password: "",
    });
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (actionType === "login") {
      const payload = {
        identifier: formValues.email,
        password: formValues.password,
      };
      login(payload)
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            const { jwt } = result.data;
            setToken(jwt);
            resetFormValues();
            enqueueSnackbar("Login successfully !", {
              variant: "success",
            });
            onCloseModal();
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Failed to login !", {
            variant: "error",
          });
        });
    } else {
      const payload = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };
      register(payload)
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            enqueueSnackbar("Register successfully !", {
              variant: "success",
            });
            setActionType("login");
            resetFormValues();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.message !== null) {
            enqueueSnackbar(err.response.data.error.message, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Failed to register !", {
              variant: "error",
            });
          }
        });
    }
  };

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
        {isAuthenticated ? (
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
        ) : (
          <Button variant="outlined" onClick={onOpenModal}>
            Login
          </Button>
        )}
      </Stack>

      <CommonModal
        title={actionType === "login" ? "Login" : "Register"}
        open={isVisibleModal}
        handleClose={onCloseModal}
        footer={null}
      >
        <form onSubmit={onSubmit}>
          <Box mt={1}>
            {actionType === "register" && (
              <TextField
                sx={{
                  mb: 2,
                }}
                name="username"
                autoFocus
                size="small"
                fullWidth
                value={formValues.username}
                onChange={handleChangeValue}
                label="Username"
                required
              />
            )}
            <TextField
              name="email"
              type="email"
              autoFocus
              size="small"
              fullWidth
              value={formValues.email}
              onChange={handleChangeValue}
              label="Email"
              required
            />
            <TextField
              sx={{
                mt: 2,
              }}
              name="password"
              type="password"
              size="small"
              fullWidth
              value={formValues.password}
              onChange={handleChangeValue}
              label="Password"
              required
            />
            <Stack
              justifyContent={"center"}
              flexDirection={"row"}
              mt={2}
              sx={{
                "& p": {
                  fontSize: "14px",
                },
              }}
            >
              {actionType === "login" ? (
                <>
                  <Typography>If you don&apos;t have account. </Typography>
                  <Typography
                    onClick={() => {
                      setActionType("register");
                    }}
                    color="primary.main"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Register here
                  </Typography>
                </>
              ) : (
                <>
                  <Typography>if you already have account. </Typography>
                  <Typography
                    onClick={() => {
                      setActionType("login");
                    }}
                    color="primary.main"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Login now
                  </Typography>
                </>
              )}
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"end"} mt={3}>
              <Button
                variant="outlined"
                style={{
                  marginRight: "9px",
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                {actionType === "login" ? "Login" : "Register"}
              </Button>
            </Stack>
          </Box>
        </form>
      </CommonModal>
    </>
  );
};
