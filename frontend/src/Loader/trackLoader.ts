import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { ITrackRes } from "../type/ITrackRes";
import { EnumHost } from "../type/EnumHost";
import { EnumEndpoint } from "../type/EnumEndpoint";

export default async function trackLoader({ request }: LoaderFunctionArgs) {
  const jwt = window.sessionStorage.getItem("jwt");
  const res = await axios.post<ITrackRes[]>(`${EnumHost.LOCAL}${EnumEndpoint.TRACK}`, {}, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });

  const tracks = res.data;
  
  return {
    tracks
  };
}