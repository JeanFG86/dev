import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("Uuid Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("error");
    }).toThrow(new InvalidUuidError());
  });
});
