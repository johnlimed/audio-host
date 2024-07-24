import { LoaderFunctionArgs, redirect } from "react-router-dom";

export default function authenticatedLoader({ request }: LoaderFunctionArgs) {
  const token = window.sessionStorage.getItem("jwt");
  if (token) {
    return null;
  }
  return redirect("/login");
}