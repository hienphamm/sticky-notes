import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogProps,
} from "@mui/material/";
import { ReactElement } from "react";

interface ModalProps extends DialogProps {
  children: JSX.Element;
  isVisible?: boolean;
  handleClose: VoidFunction;
  title: string;
  onSubmit?: VoidFunction;
  footer?: null | JSX.Element | boolean;
  closeByClickOutside?: boolean;
}

function CommonModal({
  children,
  isVisible,
  handleClose,
  onSubmit,
  title,
  footer = true,
  ...props
}: ModalProps): ReactElement {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={"xs"}
      {...props}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {typeof footer === "boolean" && footer !== null && footer ? (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>
              Login
            </Button>
          </>
        ) : (
          <>{footer}</>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CommonModal;
