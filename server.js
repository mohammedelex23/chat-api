const app = require("./express");
const config = require("./config/config");
const mongoose = require("mongoose");


mongoose.connect(config.mongoUri, function (err) {
    if (err) {
        throw new Error("Unable to connect to mongodb", config.mongoUri)
    }
    console.log("connected to mongodb");
})

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    }
    console.info("Server is running on port: ", config.port)
})