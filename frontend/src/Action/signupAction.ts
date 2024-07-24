import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { IUserRes } from "../type/IUserRes";
import { EnumHost } from "../type/EnumHost";
import { ILoginRes } from "../type/ILoginRes";
import { EnumEndpoint } from "../type/EnumEndpoint";

export default async function signupAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const name = formData.get("name") as string | null;
  const password = formData.get("password") as string | null;
  const passwordCheck = formData.get("passwordCheck") as string | null;

  if (!username) {
    return {
      error: "Username cannot be empty",
    };
  }
  if (!name) {
    return {
      error: "Name cannot be empty",
    }
  }
  if (!password) {
    return {
      error: "Please enter your password",
    }
  }
  if (!passwordCheck) {
    return {
      error: "Please re enter your password",
    }
  }
  if (password !== passwordCheck) {
    return {
      passwordError: true,
      error: "Passwords do not match."
    }
  }

  try {
    // TODO: Need to hash password before sending.
    const res = await axios.post<IUserRes>(`${EnumHost.LOCAL}${EnumEndpoint.USER}`, {
      username,
      name,
      password,
    });
    console.log(res)

    const loginRes = await axios.post<ILoginRes>(`${EnumHost.LOCAL}${EnumEndpoint.LOGIN}`, { username, password });
    window.sessionStorage.setItem("jwt", loginRes.data.jwt);
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      return {
        error: err.message,
      }
    }
    return {
      error: "Unknown error occurred.",
    }
  }

  return redirect("/");
}