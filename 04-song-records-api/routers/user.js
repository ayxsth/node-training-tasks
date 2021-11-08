const { Router } = require("express");
const {
    saveUser,
    loginUser,
    getUsers,
    updateUser,
    removeUser
} = require("../controllers/user");
const auth = require("../middleware/auth");

const router = Router();

router.post("/users", saveUser);

router.post("/users/login", loginUser);

router.get("/users", auth, getUsers);

router.patch("/users/:id", auth, updateUser);

router.delete("/users/:id", auth, removeUser);

module.exports = router;
