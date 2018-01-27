var deparam = (params) => {
    var result = {};
    for(query of params.split("&")) {
        result[query.split("=")[0]] = query.split("=")[1].replace(/\+/g, " ");
    }
    console.log(result);
    return result;
};

module.exports = {deparam};