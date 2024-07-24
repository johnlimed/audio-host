import React from "react";
import AppBarFloat from "../Component/AppBarFloat";

type MainLayoutProps = {
  children: string | JSX.Element | JSX.Element[] | "() => JSX.Element" | undefined;
}

function MainLayout(props: MainLayoutProps) {
  return (
    <React.Fragment>
      <AppBarFloat />
      {props.children}
    </React.Fragment>
  );
}

export default MainLayout;
