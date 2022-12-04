import CodeIcon from "@mui/icons-material/Code";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import React, { ReactElement, useMemo, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { ActionType } from "../constants";
import useFetch from "../hooks/useFetch";
import { Category } from "../models";
import { addNewCategory, deleteCategory, getCategory } from "../services";
import CommonModal from "./Modal";

interface Props {
  children: ReactElement;
}

const Header = (): ReactElement => (
  <Box my={3} textAlign={"center"}>
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
);

const Sidebar = (): ReactElement => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, categories, refetch] = useFetch<Category[]>(getCategory);
  const { pathname } = useLocation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onDeleteCategory = (): void => {
    if (selectedCategory?.id != null) {
      deleteCategory(selectedCategory?.id)
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            enqueueSnackbar("Delete Successfully !", {
              variant: "success",
            });
            onCloseModal();
            setSelectedCategory(undefined);
            typeof refetch === "function" && refetch();
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        });
    }
  };

  const modalTitle = useMemo(() => {
    const mapTitle = {
      new: "Add new category",
      edit: "Edit",
      delete: "Delete",
    };
    return actionType !== null && mapTitle[actionType];
  }, [actionType]);

  const renderContentModal = useMemo(() => {
    const deleteContent = (
      <Typography>
        Are you sure you want to delete category:{" "}
        <b>{selectedCategory?.attributes.title}</b>
      </Typography>
    );
    const mapContent = {
      new: <div>Add new Category</div>,
      edit: <div>Edit Category {selectedCategory?.attributes.title}</div>,
      delete: deleteContent,
    };
    return actionType !== null && mapContent[actionType];
  }, [actionType, selectedCategory?.attributes.title]);

  const renderButtonHandler = useMemo(() => {
    const mapButton = {
      new: <Button variant="contained">Submit</Button>,
      edit: <Button variant="contained">Submit</Button>,
      delete: (
        <Button variant="contained" onClick={onDeleteCategory}>
          Confirm
        </Button>
      ),
    };
    return actionType !== null && mapButton[actionType];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType]);

  const onOpenModal = (type: ActionType, category?: Category): void => {
    setActionType(type);
    setIsVisibleModal(true);
    setSelectedCategory(category);
  };

  const onCloseModal = (): void => {
    setIsVisibleModal(false);
  };

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue.length === 0) {
      setError("Cannot be empty");
    } else {
      setError("");
    }
  };

  const onAddNewCategory = (): void => {
    if (value.length === 0) {
      setError("Cannot be empty");
    } else {
      const payload = {
        title: value,
        link: `/app/${value.toLocaleLowerCase().replace(" ", "-")}`,
      };
      addNewCategory(payload)
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            enqueueSnackbar("Add new Category Successfully !", {
              variant: "success",
            });
            setValue("");
            typeof refetch === "function" && refetch();
          }
        })
        .catch((err) => {
          console.error(err);
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        });
    }
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          height: "calc(100vh - 120px)",
          position: "relative",
        }}
      >
        {loading === true ? (
          "Loading ..."
        ) : (
          <>
            <MenuList>
              {Array.isArray(categories) ? (
                categories?.map((category) => (
                  <Link
                    to={category.attributes.link}
                    key={category.id}
                    style={{
                      color: "black",
                      textDecoration: "unset",
                    }}
                  >
                    <MenuItem selected={pathname === category.attributes.link}>
                      <ListItemIcon>
                        <CodeIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        {category.attributes.title}
                      </ListItemText>
                      <ListItemIcon
                        onClick={() => onOpenModal("edit", category)}
                      >
                        <ModeEditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemIcon
                        onClick={() => onOpenModal("delete", category)}
                      >
                        <RemoveCircleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  </Link>
                ))
              ) : (
                <Typography textAlign={"center"}>
                  Getting started with new category
                </Typography>
              )}
            </MenuList>

            <FormControl
              error={Boolean(error)}
              sx={{ p: 1.5, width: "100%" }}
              variant="outlined"
            >
              <OutlinedInput
                size="small"
                fullWidth
                value={value}
                onChange={handleChangeValue}
                endAdornment={
                  <InputAdornment
                    position="end"
                    onClick={onAddNewCategory}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <SaveIcon />
                  </InputAdornment>
                }
                placeholder="Add new Category ..."
              />
              <FormHelperText>{error}</FormHelperText>
            </FormControl>
          </>
        )}

        <Box position={"absolute"} bottom={0} width={"100%"}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100px",
              backgroundColor: "primary.main",
            }}
          >
            <EventNoteIcon
              sx={{
                color: "common.white",
              }}
              fontSize="large"
            />{" "}
            <Typography color="common.white" variant="h6">
              Sticky Notes
            </Typography>
          </Stack>
        </Box>
      </Paper>

      <CommonModal
        open={isVisibleModal}
        handleClose={onCloseModal}
        title={modalTitle as string}
        footer={
          <>
            <Button onClick={onCloseModal}>Cancel</Button>
            {renderButtonHandler}
          </>
        }
      >
        <div>{Boolean(renderContentModal) && renderContentModal}</div>
      </CommonModal>
    </>
  );
};

function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Container maxWidth={false}>
        <Grid>
          <Header />
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={3} xs={5} lg={2}>
            <Sidebar />
          </Grid>
          <Grid item md={9} lg={10}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Layout;
