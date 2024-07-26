import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import MainLayout from './Layout/Main';

import loginAction from './Action/loginAction';
import signupAction from './Action/signupAction';
import logoutAction from './Action/logoutAction';

import authenticatedLoader from './Loader/authenticatedLoader';
import trackLoader from './Loader/trackLoader';
import uploadAction from './Action/uploadAction';
import deleteAction from './Action/deleteAction';
import userLoader from './Loader/userLoader';
import userAction from './Action/userAction';

const User = React.lazy(() => import("./Page/User"));
const Login = React.lazy(() => import("./Page/Login"));
const SignUp = React.lazy(() => import("./Page/Signup"));
const NotFound = React.lazy(() => import("./Page/NotFound"));
const TrackPlayer = React.lazy(() => import("./Page/TrackPlayer"));

export default createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "/signup",
    element: <SignUp />,
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
    action: uploadAction,
    children: [
      {
        index: true,
        element: <TrackPlayer />,
        loader: trackLoader,
        action: deleteAction
      },
      {
        path: "users",
        element: <User />,
        loader: userLoader,
        action: userAction,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])