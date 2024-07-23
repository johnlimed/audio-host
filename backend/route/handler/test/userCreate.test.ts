import { handleUserCreate } from "../userCreate";

import { InputError } from "../../../error/InputError";
import { UserExistError } from "../../../error/UserExistError";

import { Log } from "../../../lib/logger";
import { mockDB } from "../../../lib/database/mock";
import { getMockPassword } from "../../../lib/password/mock";

import * as uuid from "../../useCase/generateUUID";

const wrapper = (req: any) => handleUserCreate(Log(), mockDB, req);

const mockPassword = getMockPassword();
const uuidSpy = jest.spyOn(uuid, "generateUUID");

describe("Given userCreate is called", () => {
  describe("When with no username", () => {
    it("Then throws an input error", () => {
      expect(wrapper({ password: "pass", name: "name" })).rejects.toThrow(InputError);
    });
  });
  describe("When with no password", () => {
    it("Then throws an input error", () => {
      expect(wrapper({ username: "username", name: "name" })).rejects.toThrow(InputError);
    });
  });
  describe("When with no name", () => {
    it("Then throws an input error", () => {
      expect(wrapper({ username: "username", password: "password" })).rejects.toThrow(InputError);
    });
  });
  describe("When existing user is found", () => {
    it("Then throws UserExistsError", () => {
      mockDB.get.mockClear();
      mockDB.get.mockReturnValueOnce([{ name: "name" }]);
      expect(wrapper({ username: "username", password: "password", name: "name" })).rejects.toThrow(UserExistError);
    });
  });
  describe("When with new user", () => {
    let res: any;
    beforeAll(async () => {
      mockDB.get.mockClear();
      mockDB.get.mockResolvedValueOnce([]);
      mockPassword.hashPassword.mockClear();
      mockPassword.hashPassword.mockResolvedValueOnce("hash");
      uuidSpy.mockClear();
      uuidSpy.mockReturnValueOnce("uuid");
      mockDB.insert.mockClear();
      res = await wrapper({ username: "username", password: "password", name: "name" });
    });
    it("Then calls getDb", () => {
      expect(mockDB.get).toHaveBeenCalledTimes(1);
    });
    it("Then calls hashPassword", () => {
      expect(mockPassword.hashPassword).toHaveBeenCalledTimes(1);
    });
    it("Then calls generateUUID", () => {
      expect(uuidSpy).toHaveBeenCalledTimes(1);
    });
    it("Then calls db.insert", () => {
      expect(mockDB.insert).toHaveBeenCalledTimes(1);
    });
    it("Then returns body", () => {
      expect(res).toStrictEqual({
        body: "successfully registered user.",
        status: 200,
      })
    });
  });
});