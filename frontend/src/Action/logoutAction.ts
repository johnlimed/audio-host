import axios, { AxiosError } from "axios";
import { redirect } from "react-router-dom";

import { EnumEndpoint } from "../type/EnumEndpoint";
import { EnumHost } from "../type/EnumHost";

export default async function logoutAction() {
  // Sign in and redirect to the proper destination if successful.
  try {
    const jwt = window.sessionStorage.getItem("jwt");
    if (jwt) {
      await axios.post<boolean>(`${EnumHost.LOCAL}${EnumEndpoint.LOGOUT}`, {}, {
        headers: {
          "Authorization": `Bearer ${jwt}` 
        } 
      });
      window.sessionStorage.removeItem("jwt");
      window.sessionStorage.removeItem("isAdmin");
    }
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      return {
        error: `${Number(error?.response?.status)} Error. ${error.message}`,
      }
    }

    return {
      error: "Invalid logout attempt",
    };
  }

  return redirect("/login");
}