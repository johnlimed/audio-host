import React from "react";
import { Outlet } from "react-router-dom";

import AppBarFloat from "../Component/AppBarFloat";

type MainLayoutProps = {
  children?: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

function MainLayout(props: MainLayoutProps) {
  return (
    <React.Fragment>
      <AppBarFloat />
      <Outlet />
    </React.Fragment>
  );
}

export default MainLayout;
