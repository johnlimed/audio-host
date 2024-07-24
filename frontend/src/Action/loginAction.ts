import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { EnumEndpoint } from "../type/EnumEndpoint";
import { ILoginRes } from "../type/ILoginRes";
import { EnumHost } from "../type/EnumHost";

export default async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }
  if (!password) {
    return {
      error: "Please enter your password",
    }
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    const res = await axios.post<ILoginRes>(`${EnumHost.LOCAL}${EnumEndpoint.LOGIN}`, { username, password });
    window.sessionStorage.setItem("jwt", res.data.jwt);
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      return {
        error: `${Number(error?.response?.status)} Error. ${error.message}`,
      }
    }
    
    return {
      error: "Invalid login attempt",
    };
  }

  return redirect("/");
}