const handler = (e) => {
    const errors = { error: [] };

    if (e.code === 11000) {
        const error = { email: "Email already in use!" };
        errors.error.push(error);
        return errors;
    }

    if (e.message.includes("validation failed")) {
        Object.values(e.errors).forEach(({ properties }) => {
            const error = {};
            error[properties.path] = properties.message;
            errors.error.push(error);
        });
    }

    return errors;
};

module.exports = handler;
