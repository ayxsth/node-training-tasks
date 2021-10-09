const callAPI = require('./call-api');

const promiseOne = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        return resolve(body);
    });
});

const promiseTwo = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        return resolve(body);
    });
});

Promise.race([promiseOne, promiseTwo]).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
});