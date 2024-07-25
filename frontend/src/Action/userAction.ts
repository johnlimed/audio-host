import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { EnumEndpoint } from "../type/EnumEndpoint";
import { EnumHost } from "../type/EnumHost";

export default async function userAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();

  const action = formData.get("intent");
  if (action === "delete") {
    const id = formData.get("dialog-input-delete-user") as string | null;

    try {
      const jwt = window.sessionStorage.getItem("jwt");
      if (jwt) {
        await axios.delete<boolean>(`${EnumHost.LOCAL}${EnumEndpoint.USER}/${id}`, {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        });
      }

      return redirect("/users");
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        return {
          error: `${Number(error?.response?.status)} Error. ${error.message}`,
        }
      }

      return {
        error: "Invalid delete",
      };
    }
  }
  
  return null;
}