import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import { setToken } from "../helpers/auth-helper";
import { AuthenticationType } from "../models";
import { login, register } from "../services";

export const Login = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  const [actionType, setActionType] = useState<AuthenticationType>("login");
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

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
            window.location.href = "/app";
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.error.message !== null) {
            enqueueSnackbar(err.response.data.error.message, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Failed to login !", {
              variant: "error",
            });
          }
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
            enqueueSnackbar("Failed to regiser !", {
              variant: "error",
            });
          }
        });
    }
  };

  return (
    <Container maxWidth={"xs"}>
      <form onSubmit={onSubmit}>
        <h1>{actionType === "login" ? "Login" : "Register"}</h1>
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
            <Button variant="contained" type="submit">
              {actionType === "login" ? "Login" : "Register"}
            </Button>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};
