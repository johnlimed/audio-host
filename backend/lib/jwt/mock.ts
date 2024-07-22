import * as jwts from "./index";

export const getMockJWT = () => {
  const verifySpy = jest.spyOn(jwts, "verifyJWT");
  const signSpy = jest.spyOn(jwts, "signJWT");
  verifySpy.mockReturnValue({
    username: "username",
    id: "id",
  });
  signSpy.mockReturnValue("token");
  return {
    verifyJWT: verifySpy,
    signJWT: signSpy,
  };
}