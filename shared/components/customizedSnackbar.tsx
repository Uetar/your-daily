import { Alert, AlertColor, Snackbar } from "@mui/material";
import React from "react";

export default function CustomizedSnackbar({
  open,
  severity,
  message,
  handleClose,
}: {
  open: boolean;
  severity: AlertColor;
  message: string;
  handleClose: any;
}) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
