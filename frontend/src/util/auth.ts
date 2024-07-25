export const isAdmin = () => {
  const res = sessionStorage.getItem("isAdmin");
  return res === "true";
}