require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const bodyParser = require('body-parser');
const cors = require('cors')
const errorHandler = require("./middleware/errorHandler");

app.use(bodyParser.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }));

const port = 8000;
app.listen(port);
console.log('Server is running on port ' + port);

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Помилка з\'єднання з базою даних:'));
db.once('open', function () {
    console.log('Підключено до бази даних');
});

const bookRouter = require("./routes/bookRoutes")
app.use("/api/v1/book", bookRouter)

const authorRouter = require("./routes/authorRoutes")
app.use("/api/v1/author", authorRouter)

const userRouter = require("./routes/userRoutes")
app.use("/api/v1", userRouter)

const commentRouter = require("./routes/commentRoutes")
app.use("/api/v1/comment", commentRouter)

app.use(errorHandler);