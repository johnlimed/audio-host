import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

import AppBarFloat from "../Component/AppBarFloat";
import { SnackContext } from "../Context/appContext";

function MainLayout() {
  const [message, setMessage] = useState<string>("Default message");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => {
          e.preventDefault();
          setOpenSnackbar(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SnackContext.Provider
      value={{
        message,
        setMessage,
        setOpenSnackbar
      }}
    >
      <AppBarFloat />
      <Outlet />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        message={message}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        key={"bottom-center-snack"}
        action={action}
      />
    </SnackContext.Provider>
  );
}

export default MainLayout;
