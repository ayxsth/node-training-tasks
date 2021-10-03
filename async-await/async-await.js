const callAPI = require("./call-api");

const promiseOne = new Promise((resolve, reject) => {
    callAPI((error, body) => {
        if (!error) {
            return resolve(body);
        }

        return reject(error);
    });
});

const promiseTwo = (body) =>
    new Promise((resolve) => {
        return resolve(body.data);
    });

const callPromises = async () => {
    try {
        const results = await promiseOne;
        const data = await promiseTwo(results);
        data.forEach((datum) => {
            console.log(datum, "\n");
        });
    } catch (e) {
        console.log("Error occurred!");
    }
};

callPromises();
