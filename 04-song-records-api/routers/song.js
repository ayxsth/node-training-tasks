const { Router } = require("express");
const {
    saveSong,
    getSongs,
    removeSong,
    updateSong
} = require("../controllers/song");
const auth = require("../middleware/auth");

const router = Router();

router.post("/songs", auth, saveSong);

router.get("/songs", auth, getSongs);

router.patch("/songs/:id", auth, updateSong);

router.delete("/songs/:id", auth, removeSong);

module.exports = router;
