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
  IconButton,
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

import React, { ReactElement, useCallback, useMemo, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { ActionType } from "../constants";
import useAxios from "../hooks/useAxios";
import { Category, PayloadCategory } from "../models";
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
  getCategories,
} from "../services";
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

  const { data, onRefetch, loaded } = useAxios<any, Category[]>(
    getCategories(),
  );
  const { pathname } = useLocation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [actionType, setActionType] = useState<Exclude<
    ActionType,
    "new"
  > | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [valueAddCategory, setValueAddCategory] = useState("");
  const [valueEditCategory, setValueEditCategory] = useState("");
  const [error, setError] = useState({
    new: "",
    edit: "",
  });
  const [isPending, setIsPending] = useState(false);

  const onDeleteCategory = useCallback(() => {
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
            handleRefetchData();
          }
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar(err.message, {
            variant: "error",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar, selectedCategory?.id]);

  const modalTitle = useMemo(() => {
    const mapTitle = {
      edit: "Edit",
      delete: "Delete",
    };
    return actionType !== null && mapTitle[actionType];
  }, [actionType]);

  const onCloseModal = useCallback(() => {
    setActionType(null);
    setIsVisibleModal(false);
    resetError();
  }, []);

  const resetError = (): void => {
    setError({
      edit: "",
      new: "",
    });
  };

  const handleError = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setError({
          edit: actionType === "edit" ? "Cannot be empty" : "",
          new: actionType !== "edit" ? "Cannot be empty" : "",
        });
      } else {
        setError({
          edit: "",
          new: "",
        });
      }
    },
    [actionType],
  );

  const handleChangeValue = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: "new" | "edit",
    ) => {
      const newValue = event.target.value;
      if (type === "new") {
        setValueAddCategory(newValue);
      } else {
        setValueEditCategory(newValue);
      }
      handleError(newValue);
    },
    [handleError],
  );

  const handleRefetchData = useCallback(() => {
    typeof onRefetch === "function" && onRefetch();
  }, [onRefetch]);

  const convertPayload = (value: string): PayloadCategory => {
    const payload = {
      title: value,
      link: `/app/${value.toLocaleLowerCase().replace(" ", "-")}`,
    };
    return payload;
  };

  const onAddNewCategory = (): void => {
    if (valueAddCategory.length === 0) {
      handleError(valueAddCategory);
    } else {
      setIsPending(true);
      const payload = convertPayload(valueAddCategory);
      addNewCategory(payload)
        .then((result) => {
          const { status } = result;
          if (status === 200) {
            enqueueSnackbar("Add new Category Successfully !", {
              variant: "success",
            });
            setValueAddCategory("");
            handleRefetchData();
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.data.error.message !== null) {
            enqueueSnackbar(err.response.data.error.message, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          }
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  };

  const onEditCategory = useCallback(() => {
    if (valueEditCategory.length === 0) {
      handleError(valueEditCategory);
    } else {
      if (selectedCategory?.id != null) {
        setIsPending(true);
        const payload = convertPayload(valueEditCategory);
        updateCategory(selectedCategory?.id, payload)
          .then((result) => {
            const { status } = result;
            if (status === 200) {
              enqueueSnackbar("Edit new Category Successfully !", {
                variant: "success",
              });
              setValueEditCategory("");
              handleRefetchData();
              onCloseModal();
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.response.data.error.message !== null) {
              enqueueSnackbar(err.response.data.error.message, {
                variant: "error",
              });
            } else {
              enqueueSnackbar(err.message, {
                variant: "error",
              });
            }
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    }
  }, [
    enqueueSnackbar,
    handleError,
    handleRefetchData,
    onCloseModal,
    selectedCategory?.id,
    valueEditCategory,
  ]);

  const renderContentModal = useMemo(() => {
    const deleteContent = (
      <Typography>
        Are you sure you want to delete category:{" "}
        <b>{selectedCategory?.attributes.title}</b>
      </Typography>
    );
    const mapContent = {
      edit: (
        <FormControl
          error={Boolean(error.edit)}
          sx={{ p: 1.5, width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            size="small"
            fullWidth
            value={valueEditCategory}
            onChange={(event) => handleChangeValue(event, "edit")}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onEditCategory();
              }
            }}
            placeholder="Enter Category ..."
          />
          <FormHelperText>{error.edit}</FormHelperText>
        </FormControl>
      ),
      delete: deleteContent,
    };
    return actionType !== null && mapContent[actionType];
  }, [
    actionType,
    error.edit,
    handleChangeValue,
    onEditCategory,
    selectedCategory?.attributes.title,
    valueEditCategory,
  ]);

  const renderButtonHandler = useMemo(() => {
    const mapButton = {
      edit: (
        <Button
          variant="contained"
          onClick={onEditCategory}
          disabled={isPending}
        >
          Submit
        </Button>
      ),
      delete: (
        <Button variant="contained" onClick={onDeleteCategory}>
          Confirm
        </Button>
      ),
    };
    return actionType !== null && mapButton[actionType];
  }, [actionType, onDeleteCategory, onEditCategory, isPending]);

  const onOpenModal = (
    type: Exclude<ActionType, "new">,
    category?: Category,
  ): void => {
    setActionType(type);
    setIsVisibleModal(true);
    setSelectedCategory(category);
    resetError();
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
        {!loaded ? (
          "Loading ..."
        ) : (
          <>
            <MenuList>
              {Array.isArray(data) ? (
                data?.map((category) => (
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
                        onClick={() => {
                          setValueEditCategory(category.attributes.title);
                          onOpenModal("edit", category);
                        }}
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

            {actionType !== "edit" && (
              <FormControl
                error={Boolean(error.new)}
                sx={{ p: 1.5, width: "100%" }}
                variant="outlined"
              >
                <OutlinedInput
                  size="small"
                  fullWidth
                  value={valueAddCategory}
                  onChange={(event) => handleChangeValue(event, "new")}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      onAddNewCategory();
                    }
                  }}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <IconButton
                        disabled={isPending}
                        onClick={onAddNewCategory}
                      >
                        <SaveIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter Category ..."
                />
                <FormHelperText>{error.new}</FormHelperText>
              </FormControl>
            )}
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
