import { generateUUID } from "../generateUUID";

describe("Given generateUUID is called", () => {
  describe("When there is no input", () => {
    it("Then returns a UUID", () => {
      const uuid = generateUUID();
      expect(uuid).toBeDefined();
      expect(typeof uuid).toBe("string");
    });
  });
});