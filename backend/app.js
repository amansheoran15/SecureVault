require("dotenv").config({ path: "./config/config.env" });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const dataRouter = require('./routes/data')
const {authenticate} = require("./middlewares/auth");
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use('/api/user', userRouter);
app.use('/api/data', dataRouter);

app.get('/', authenticate, (req, res) => {
    res.send('Welcome to my website!');
})

module.exports = app;