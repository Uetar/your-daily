import * as React from "react"; 
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState ,useEffect} from "react";







export default function CustomizedSnackbar({ showSnackbar = false }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setOpen(showSnackbar);
  }, [showSnackbar]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        sx={{ vertical: "bottom", horizontal: "left" ,width:"100%"}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="login successfully "
        action={action}
      />
    </div>
  );
}
