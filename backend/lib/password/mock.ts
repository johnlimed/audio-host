import * as password from "./index";

export const getMockPassword = () => {
  const verifySpy = jest.spyOn(password, "verifyPassword");

  return {
    verifyPassword: verifySpy,
  };
}