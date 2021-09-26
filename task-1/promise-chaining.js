const callAPI = require('./call-api');

const promiseOne = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        return resolve(body);
    });
});

const promiseTwo = (body) => new Promise(resolve => {
    return resolve(body.data);
});

promiseOne.then(body => {
    return promiseTwo(body);
}).then(data => {
    data.forEach(datum => {
        console.log(datum, '\n');
    });
}).catch(e => {
    console.log(e);
});
