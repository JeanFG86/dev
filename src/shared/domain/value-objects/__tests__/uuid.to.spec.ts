import { InvalidUuidError, Uuid } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("error");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should accept a valid uuid", () => {
    const uuid = new Uuid("92e21ae4-0247-4a93-b36a-e7fe2ce013e4");
    expect(uuid.id).toBe("92e21ae4-0247-4a93-b36a-e7fe2ce013e4");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
