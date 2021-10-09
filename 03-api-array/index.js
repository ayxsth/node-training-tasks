const express = require("express");
const categoryRouter = require("./routers/category");
const bookRouter = require("./routers/book");

const app = express();

app.use(express.json());
app.use(categoryRouter);
app.use(bookRouter);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("The server is active.");
});

app.listen(port, () => {
    console.log(`The server is up at port ${port}!`);
});
