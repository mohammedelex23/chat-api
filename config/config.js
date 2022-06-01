const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "abc6-38dj-2ps-22zx",
    mongoUri: process.env.MONGO_URI ||
        process.env.MONGO_HOST ||
        "mongodb://" + (process.env.IP || "localhost" + ":") +
        (process.env.MONGO_PORT || "27017") +
        "/chat-api"
}

module.exports = config;