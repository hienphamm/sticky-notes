import { Avatar, Box, Button, Stack, TextField } from "@mui/material";
import React, { FormEvent, ReactElement, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import CommonModal from "./Modal";

export const Header = (): ReactElement => {
  const { isAuthenticated } = useAuthContext();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [formValues, setFormValues] = useState({
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

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
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
          <Avatar>H</Avatar>
        ) : (
          <Button variant="outlined" onClick={onOpenModal}>
            Login
          </Button>
        )}
      </Stack>

      <CommonModal
        title="Login"
        open={isVisibleModal}
        handleClose={onCloseModal}
        footer={null}
      >
        <form onSubmit={onSubmit}>
          <Box mt={1}>
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
                mt: 3,
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
            <Stack flexDirection={"row"} justifyContent={"end"} mt={3}>
              <Button mr={2}>Cancel</Button>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Stack>
          </Box>
        </form>
      </CommonModal>
    </>
  );
};
