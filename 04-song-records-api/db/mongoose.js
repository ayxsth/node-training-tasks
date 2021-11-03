const mongoose = require("mongoose");

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/song-records-api");
        console.log("🚀 Database connected successfully!");
    } catch (e) {
        console.log(e.message);
    }
})();
