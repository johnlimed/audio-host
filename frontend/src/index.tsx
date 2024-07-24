import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline'; 
import { ThemeProvider } from '@mui/material/styles';

import './index.css';
import theme from './theme';
import Home from './Page/Home';
import NotFound from './Page/NotFound';
import MainLayout from './Layout/Main';
import reportWebVitals from './reportWebVitals';

import loginAction from './Action/loginAction';
import UserCreate from './Page/UserCreate';
import signupAction from './Action/signupAction';
import logoutAction from './Action/logoutAction';

import authenticatedLoader from './Loader/authenticatedLoader';

const Login = React.lazy(() => import("./Page/Login"));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
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

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </ThemeProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
