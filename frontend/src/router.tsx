import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import TrackPlayer from './Page/TrackPlayer';
import NotFound from './Page/NotFound';
import UserCreate from './Page/UserCreate';

import MainLayout from './Layout/Main';

import loginAction from './Action/loginAction';
import signupAction from './Action/signupAction';
import logoutAction from './Action/logoutAction';

import authenticatedLoader from './Loader/authenticatedLoader';
import trackLoader from './Loader/trackLoader';
import uploadAction from './Action/uploadAction';

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
    action: uploadAction,
    children: [
      {
        index: true,
        element: <TrackPlayer />,
        loader: trackLoader
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])