const expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./../utils/message");

describe("Generate Message", () => {
    it("should generate correct message object", () => {
        const from = "Ishaan";
        const text = "Test message"
        var res = generateMessage(from, text);

        expect(typeof res.createdAt).toBe("number");
        expect(res).toMatchObject({from, text});
    });
});

describe("Generate Location Message", () => {
    it("should generate correct location message object", () => {
        const from = "Ishaan";
        const latitude = 1;
        const longitude = 1;
        const url = "https://www.google.com/maps?q=1,1";
        var res = generateLocationMessage(from, latitude, longitude);

        expect(typeof res.createdAt).toBe("number");
        expect(res).toMatchObject({from, url});
    });
});