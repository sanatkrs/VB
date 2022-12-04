
exports.getDate = function() {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();

    today = today.toLocaleDateString("en-US", options);

    return today;
}

exports.getDay = function() {

    var options = { weekday: 'long'};
    var today  = new Date();

    today = today.toLocaleDateString("en-US", options);

    return today;
}
