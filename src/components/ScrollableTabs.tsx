import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  FormControl,
  FormHelperText,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
  Tab as TabMui,
  Tabs,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  ReactElement,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { ActionType } from "../constants";
import { Tab } from "../models";
import { addTab } from "../services";
import CommonModal from "./Modal";

interface ScrollableTabsProps {
  tabs: Tab[] | null;
  loaded: boolean;
  activeTab: number | null;
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
  categoryId: number;
  onRefetchData: VoidFunction;
}

function ScrollableTabs({
  tabs,
  loaded,
  activeTab,
  handleChangeTab,
  categoryId,
  onRefetchData,
}: ScrollableTabsProps): ReactElement {
  const id = useId();
  const { enqueueSnackbar } = useSnackbar();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedTab, setSelectedTab] = useState<Tab | undefined>(undefined);
  const [valueAddTab, setValueAddTab] = useState("");
  const [valueEditTab, setValueEditTab] = useState("");
  const [error, setError] = useState({
    new: "",
    edit: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent): void => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = (): void => {
    setContextMenu(null);
  };

  const modalTitle = useMemo(() => {
    const mapTitle = {
      new: "New",
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

  const onOpenModal = (type: ActionType, tab?: Tab): void => {
    setActionType(type);
    setIsVisibleModal(true);
    setSelectedTab(tab);
    resetError();
  };

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
      type: ActionType,
    ) => {
      const newValue = event.target.value;
      if (type === "new") {
        setValueAddTab(newValue);
      } else {
        setValueEditTab(newValue);
      }
      handleError(newValue);
    },
    [handleError],
  );

  const convertPayload = useCallback(
    (value: string) => {
      const payload = {
        title: value,
        slug: value.toLocaleLowerCase().replace(" ", "-"),
        content: null,
        category: categoryId,
      };
      return payload;
    },
    [categoryId],
  );

  const onAddTab = useCallback(() => {
    if (valueAddTab.length === 0) {
      handleError(valueAddTab);
    } else {
      if (Number.isInteger(categoryId)) {
        setIsPending(true);
        const payload = convertPayload(valueAddTab);
        addTab(payload)
          .then((result) => {
            const { status } = result;
            if (status === 200) {
              enqueueSnackbar("Add new Tab Successfully !", {
                variant: "success",
              });
              setValueEditTab("");
              onRefetchData();
              onCloseModal();
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.response.data.error.message !== null) {
              if (err.response.data.error?.details?.errors?.length > 0) {
                enqueueSnackbar(
                  err.response.data.error?.details?.errors[0].message,
                  {
                    variant: "error",
                  },
                );
              } else {
                enqueueSnackbar(err.response.data.error.message, {
                  variant: "error",
                });
              }
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
    categoryId,
    convertPayload,
    enqueueSnackbar,
    handleError,
    onCloseModal,
    onRefetchData,
    valueAddTab,
  ]);

  const onEditTab = useCallback(() => {
    if (valueEditTab.length === 0) {
      handleError(valueEditTab);
    } else {
      if (selectedTab?.id != null) {
        // setIsPending(true);
        // const payload = convertPayload(valueEditTab);
        // updateTab(selectedTab?.id, payload)
        //   .then((result) => {
        //     const { status } = result;
        //     if (status === 200) {
        //       enqueueSnackbar("Edit new Tab Successfully !", {
        //         variant: "success",
        //       });
        //       setValueEditTab("");
        //       handleRefetchData();
        //       onCloseModal();
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     if (err.response.data.error.message !== null) {
        //       enqueueSnackbar(err.response.data.error.message, {
        //         variant: "error",
        //       });
        //     } else {
        //       enqueueSnackbar(err.message, {
        //         variant: "error",
        //       });
        //     }
        //   })
        //   .finally(() => {
        //     setIsPending(false);
        //   });
      }
    }
  }, []);

  const onDeleteTab = useCallback(() => {
    if (selectedTab?.id != null) {
      // deleteTab(selectedTab?.id)
      //   .then((result) => {
      //     const { status } = result;
      //     if (status === 200) {
      //       enqueueSnackbar("Delete Successfully !", {
      //         variant: "success",
      //       });
      //       onCloseModal();
      //       setSelectedTab(undefined);
      //       handleRefetchData();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     enqueueSnackbar(err.message, {
      //       variant: "error",
      //     });
      //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFormControl = useCallback(
    (type: ActionType) => {
      return (
        <FormControl
          key={id}
          error={Boolean(type === "edit" ? error.edit : error.new)}
          sx={{ p: 1.5, width: "100%" }}
          variant="outlined"
        >
          <OutlinedInput
            size="small"
            fullWidth
            value={type === "edit" ? valueEditTab : valueAddTab}
            onChange={(event) => handleChangeValue(event, type)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                type === "edit" && onEditTab();
                type === "new" && onAddTab();
              }
            }}
            placeholder="Enter Tab ..."
          />
          <FormHelperText>
            {type === "edit" ? error.edit : error.new}
          </FormHelperText>
        </FormControl>
      );
    },
    [
      error.edit,
      error.new,
      handleChangeValue,
      id,
      onAddTab,
      onEditTab,
      valueAddTab,
      valueEditTab,
    ],
  );

  const renderButtonHandler = useMemo(() => {
    const mapButton = {
      new: (
        <Button variant="contained" onClick={onAddTab} disabled={isPending}>
          Submit
        </Button>
      ),
      edit: (
        <Button variant="contained" onClick={onEditTab} disabled={isPending}>
          Submit
        </Button>
      ),
      delete: (
        <Button variant="contained" onClick={onDeleteTab}>
          Confirm
        </Button>
      ),
    };
    return actionType !== null && mapButton[actionType];
  }, [onAddTab, isPending, onEditTab, onDeleteTab, actionType]);

  const renderContentModal = useMemo(() => {
    const deleteContent = (
      <Typography>
        Are you sure you want to delete Tab:{" "}
        <b>{selectedTab?.attributes.title}</b>
      </Typography>
    );
    const mapContent = {
      new: renderFormControl("new"),
      edit: renderFormControl("edit"),
      delete: deleteContent,
    };
    return actionType !== null && mapContent[actionType];
  }, [actionType, renderFormControl, selectedTab?.attributes.title]);

  return (
    <>
      <Stack
        flexDirection="row"
        sx={{
          width: "100%",
          bgcolor: "common.white",
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {Array.isArray(tabs) && tabs.length > 0 && activeTab !== null && (
          <div
            onContextMenu={handleContextMenu}
            style={{ cursor: "context-menu" }}
          >
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
            >
              {!loaded
                ? "Loading ..."
                : Array.isArray(tabs) &&
                  tabs?.map((tab) => (
                    <TabMui
                      key={tab.id}
                      value={tab.id}
                      label={<Typography>{tab.attributes.title}</Typography>}
                      wrapped
                    />
                  ))}
            </Tabs>
          </div>
        )}

        <Button
          variant="contained"
          onClick={() => onOpenModal("new")}
          sx={{
            height: "48px",
            borderRadius: "unset",
          }}
        >
          <AddIcon />
        </Button>
      </Stack>

      {isVisibleModal && (
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
      )}

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem>
          <Typography>Rename</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ScrollableTabs;
