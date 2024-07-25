import axios, { AxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

import { EnumHost } from "../type/EnumHost";
import { EnumEndpoint } from "../type/EnumEndpoint";
import { ITrackRes } from "../type/ITrackRes";
import { IFile } from "../type/IFile";

export default async function uploadAction({ request }: LoaderFunctionArgs) {
  const jwt = window.sessionStorage.getItem("jwt");
  const { files } = document.querySelector('#fileUpload') as any;
  const file = files[0] as IFile[];
  try {
    const res = await axios.post<ITrackRes>(`${EnumHost.LOCAL}${EnumEndpoint.TRACK}`, 
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${jwt}`
        }
      }
    );

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