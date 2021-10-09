const callAPI = require("./call-api");

const promiseOne = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        resolve(body);
    });
});

const promiseTwo = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (error) {
            return reject(error);
        }

        resolve(body);
    });
});

const callPromises = async () => {
    try {
        const result = await Promise.all([promiseOne, promiseTwo]);
        console.log(result);
    } catch (e) {
        console.log("Error occurred!");
    }
};

callPromises();
