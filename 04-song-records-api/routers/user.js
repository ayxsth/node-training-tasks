const { Router } = require("express");
const {
    saveUser,
    getUsers,
    updateUser,
    removeUser
} = require("../controllers/user");

const router = Router();

router.post("/users", saveUser);

router.get("/users", getUsers);

router.patch("/users/:id", updateUser);

router.delete("/users/:id", removeUser);

module.exports = router;
