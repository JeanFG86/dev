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
});
