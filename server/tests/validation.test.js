const expect = require("expect");

const {isString} = require("./../utils/validation");

describe("isString", () => {
    it("should reject non-string values", () => {
        expect(isString(123)).toBe(false);
    });

    it("should reject string with only spaces", () => {
        expect(isString("     ")).toBe(false);
    });

    it("should allow string with non-space characters", () => {
        expect(isString("  ishaan  ")).toBe(true);
    });
});