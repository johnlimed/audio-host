import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from './Page/Home';
import NotFound from './Page/NotFound';
import UserCreate from './Page/UserCreate';

import MainLayout from './Layout/Main';

import loginAction from './Action/loginAction';
import signupAction from './Action/signupAction';
import logoutAction from './Action/logoutAction';

import authenticatedLoader from './Loader/authenticatedLoader';

const Login = React.lazy(() => import("./Page/Login"));

export default createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "/signup",
    element: <UserCreate />,
    action: signupAction
  },
  {
    path: "/logout",
    action: logoutAction
  },
  {
    path: "/",
    loader: authenticatedLoader,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])