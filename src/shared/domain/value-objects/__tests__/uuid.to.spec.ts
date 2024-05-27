import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("Uuid Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("error");
    }).toThrow(new InvalidUuidError());
  });

  it("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
  });

  it("should accept a valid uuid", () => {
    const uuid = new Uuid("92e21ae4-0247-4a93-b36a-e7fe2ce013e4");
    expect(uuid.id).toBe("92e21ae4-0247-4a93-b36a-e7fe2ce013e4");
  });
});
