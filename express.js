const express = require("express");
const { default: helmet } = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const indexRouter = require("./routes/index.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const app = express();




app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(helmet());
app.use(cors());
app.use(morgan("dev"))


app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", authRouter);


// error middleware
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
});


module.exports = app;


