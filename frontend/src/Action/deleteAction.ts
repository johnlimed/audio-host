import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { EnumEndpoint } from "../type/EnumEndpoint";
import { EnumHost } from "../type/EnumHost";

export default async function deleteAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("dialog-input-delete") as string | null;
  console.log(id)
  try {
    const jwt = window.sessionStorage.getItem("jwt");
    if (jwt) {
      await axios.delete<boolean>(`${EnumHost.LOCAL}${EnumEndpoint.TRACK}/${id}`, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      });
    }
    
    return redirect("/");
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