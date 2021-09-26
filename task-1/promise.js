const callAPI = require('./call-api');

const promiseOne = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        return resolve(body);
    });
});

promiseOne.then(({ data }) => {
    data.forEach(datum => {
        console.log(datum, '\n');
    })
}).catch(e => {
    console.log(e);
});
