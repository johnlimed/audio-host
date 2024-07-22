import { Log } from "../../../lib/logger";
import { getMockJWT } from "../../../lib/jwt/mock";
import { mockDB } from "../../../lib/database/mock";
import { getMockPassword } from "../../../lib/password/mock";

import { handleUserLogin } from "../handleUserLogin";

import { AuthenticationError } from "../../../error/AuthenticationError";

const mockJWT = getMockJWT();
const mockPassword = getMockPassword();

const wrapper = (req: any, token?: string) => handleUserLogin(Log(), mockDB, req, token);

describe("Given handleUserLogin is called", () => {
  describe("When with an unknown username", () => {
    let promise: any;
    beforeAll(() => {
      mockDB.get.mockClear();
      mockDB.get.mockReturnValueOnce(null);
      promise = wrapper({});
    });
    it("Then throws an Authentication Error", () => {
      expect(promise).rejects.toThrow(AuthenticationError);
    });
  });

  describe("When with a valid jwt token", () => {
    let result: any;
    beforeAll(async () => {
      mockDB.get.mockClear();
      mockDB.get.mockReturnValueOnce({ username: "hello" });
      result = await wrapper({}, "bearer string");
    });
    it("Then calls verifyJWT", () => {
      expect(mockJWT.verifyJWT).toHaveBeenCalledTimes(1);
    });
    it("Then returns the token", () => {
      expect(result).toStrictEqual({ body: { jwt: "string" }});
    });
  });

  describe("When with no jwt and a invalid password", () => {
    let promise: any;
    beforeAll(() => {
      mockDB.get.mockClear();
      mockDB.get.mockReturnValueOnce([{ username: "hello", password: "pass" }]);
      mockPassword.verifyPassword.mockClear();
      mockPassword.verifyPassword.mockRejectedValue(new AuthenticationError());
      promise = wrapper({});
    });
    it("Then calls db.get", () => {
      expect(mockDB.get).toHaveBeenCalledTimes(1);
    });
    it("Then calls verifyPassword", () => {
      expect(mockPassword.verifyPassword).toHaveBeenCalledTimes(1);
    });
    it("Then throws authencation error", () => {
      expect(promise).rejects.toThrow(AuthenticationError);
    });
  });

  describe("When with no jwt and a valid password", () => {
    let result: any;
    beforeAll(async () => {
      mockDB.get.mockClear();
      mockDB.get.mockReturnValueOnce([{ username: "hello", password: "pass" }]);
      mockPassword.verifyPassword.mockClear();
      mockPassword.verifyPassword.mockResolvedValueOnce();
      result = await wrapper({});
    });
    it("Then calls db.get", () => {
      expect(mockDB.get).toHaveBeenCalledTimes(1);
    });
    it("Then calls verifyPassword", () => {
      expect(mockPassword.verifyPassword).toHaveBeenCalledTimes(1);
    });
    it("Then returns jwt token", () => {
      expect(result).toStrictEqual({ body: { jwt: "token" }});
    });
  });
});