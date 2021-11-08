const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                throw new Error();
            }

            const user = await User.findById(decoded.id);

            if (!user) {
                throw new Error();
            }

            req.user = user;
            next();
        });
    } catch (e) {
        res.status(401).send({ error: "Authentication not successful!" });
    }
};

module.exports = auth;
