const express = require("express");
const categoryRouter = require("./routers/category");
const songRouter = require("./routers/song");
const userRouter = require("./routers/user");
require("./db/mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(categoryRouter);
app.use(songRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`🚀 The server is up at port ${port}!`);
});
