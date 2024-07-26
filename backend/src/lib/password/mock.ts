import * as password from "./index";

export const getMockPassword = () => {
  const verifySpy = jest.spyOn(password, "verifyPassword");
  const hashSpy = jest.spyOn(password, "hashPassword");

  return {
    verifyPassword: verifySpy,
    hashPassword: hashSpy,
  };
}