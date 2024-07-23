import { InputError } from "../../../error/InputError";
import { mockDB } from "../../../lib/database/mock";
import { Log } from "../../../lib/logger";
import { getMockPassword } from "../../../lib/password/mock";
import { handleUserUpdate } from "../userUpdate";

const wrapper = (id: string, req: any) => handleUserUpdate(Log(), mockDB, id, req);
const mockPassword = getMockPassword();

describe("Given userUpdate is called", () => {
  describe("When with no update param", () => {
    it("Then throws InputError", () => {
      expect(wrapper("id", {})).rejects.toThrow(InputError);
    });
  });
  describe("When with no id", () => {
    it("Then throws InputError", () => {
      expect(wrapper("", {})).rejects.toThrow(InputError);
    });
  });
  describe("When with params including password to update", () => {
    let res: any;
    beforeAll(async () => {
      mockPassword.hashPassword.mockClear();
      mockPassword.hashPassword.mockResolvedValueOnce("hashed pw");
      mockDB.update.mockClear();
      mockDB.update.mockResolvedValueOnce({
        name: "my name",
        password: "hashed pw",
      })
      res = await wrapper("id", { password: "123", name: "my name" });
    });
    it("Then calls hashPassword", () => {
      expect(mockPassword.hashPassword).toHaveBeenCalledTimes(1);
    });
    it("Then calls db.update", () => {
      expect(mockDB.update).toHaveBeenCalledTimes(1);
    });
    it("Then returns the updated object", () => {
      expect(res).toStrictEqual({
        body: {
          name: "my name",
          password: "hashed pw",
        }
      });
    });
  });
});