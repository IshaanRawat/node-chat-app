var moment = require("moment");

var generateMessage = (from, text) => {
    var date = moment();
    return {
        from,
        text,
        createdAt: date.valueOf()
    };
};
var generateLocationMessage = (from, latitude, longitude) => {
    var date = moment();
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: date.valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};