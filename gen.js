var fakerator = require("fakerator")("en-EN");


function get_name_country() {
    var name = fakerator.names.name();
    var country = fakerator.address.country();

    return {name, country};
}


var value = get_name_country();

console.log( value );