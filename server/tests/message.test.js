const expect = require("expect");

var {generateMessage} = require("./message");

describe("Generate Message", () => {
    it("should generate correct message object", () => {
        const from = "Ishaan";
        const text = "Test message"
        var res = generateMessage(from, text);

        expect(typeof res.createdAt).toBe("number");
        expect(res).toMatchObject({from, text});
    });
});