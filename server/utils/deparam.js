var deparam = (params) => {
    var result = {};
    for(query of params.split("&")) {
        result[query.split("=")[0]] = query.split("=")[1].replace(/\+/g, " ");
    }
    return result;
};

module.exports = {deparam};