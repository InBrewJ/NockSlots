import { adder } from "./index";

describe("Sanity", () => {
  it("Adds in a world that makes sense", () => {
    expect(adder(2, 2)).not.toBe(5);
  });
});
