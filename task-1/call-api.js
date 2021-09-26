const request = require('postman-request');

const url = "https://reqres.in/api/users";

function callAPI(callback) {
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            return callback("An error occurred!", undefined);
        }

        callback(undefined, body);
    });
}

module.exports = callAPI;