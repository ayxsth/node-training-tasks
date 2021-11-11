const express = require("express");
const categoryRouter = require("./routers/category");
const songRouter = require("./routers/song");
const userRouter = require("./routers/user");
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(categoryRouter);
app.use(songRouter);
app.use(userRouter);

module.exports = app;
