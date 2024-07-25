import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import NotFound from './Page/NotFound';
import SignUp from './Page/Signup';

import MainLayout from './Layout/Main';

import loginAction from './Action/loginAction';
import signupAction from './Action/signupAction';
import logoutAction from './Action/logoutAction';

import authenticatedLoader from './Loader/authenticatedLoader';
import trackLoader from './Loader/trackLoader';
import uploadAction from './Action/uploadAction';
import deleteAction from './Action/deleteAction';

const Login = React.lazy(() => import("./Page/Login"));
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
        path: "*",
        element: <NotFound />
      }
    ]
  }
])