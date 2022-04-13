require("express-async-errors")
const express = require("express")
const rateLimit = require('express-rate-limit')

const sendMessage = require("../routes/sendMessage")

const routes = async(app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // RateLimit
    app.use(rateLimit({
        windowMs: 5000,
        max: 1,
        standardHeaders: true,
        legacyHeaders: false,
    }))

    app.use("/api/sendMessage", sendMessage)

    // Catch error
    app.use((err, req, res, next) => {
        res.status(500).json({ message: "Internal Server Error", err })
    })
}

module.exports = routes