import React from "react";
import { Outlet } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

import AppBarFloat from "../Component/AppBarFloat";

type MainLayoutProps = {
  children?: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

function MainLayout(props: MainLayoutProps) {
  return (
    <React.Fragment>
      <AppBarFloat />
      <Outlet />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={true}
        onClose={() => { }}
        message="I love snacks"
        key={"bottom-center-snack"}
      />
    </React.Fragment>
  );
}

export default MainLayout;
