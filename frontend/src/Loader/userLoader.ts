import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { EnumHost } from "../type/EnumHost";
import { EnumEndpoint } from "../type/EnumEndpoint";
import { IUserRes } from "../type/IUserRes";

export default async function userLoader({ request }: LoaderFunctionArgs) {
  const jwt = window.sessionStorage.getItem("jwt");
  const res = await axios.get<IUserRes[]>(`${EnumHost.LOCAL}${EnumEndpoint.USER}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });

  const users = res.data;

  return {
    users
  };
}