import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

import { EnumHost } from "../type/EnumHost";
import { EnumEndpoint } from "../type/EnumEndpoint";
import { ITrackRes } from "../type/ITrackRes";

export default async function uploadAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const passwordCheck = formData.get("passwordCheck") as string | null;

  if (!passwordCheck) {
    return {
      error: "Please re enter your password",
    }
  }
  const jwt = window.sessionStorage.getItem("jwt");
  try {
    const res = await axios.post<ITrackRes>(`${EnumHost.LOCAL}${EnumEndpoint.TRACK}`, 
      {}, 
      {
        headers: {
          "Authorization": `Bearer ${jwt}`
        }
      }
    );
    console.log(res)
    const track = res.data;
    return {
      track,
    }
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
}