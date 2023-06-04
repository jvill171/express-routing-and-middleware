const express = require("express");
const itemRoutes = require("./routes/itemRoutes")
const ExpressError = require("./expressError")

const app = express();

app.use(express.json())


app.use("/items", itemRoutes)

// 404 Error handler
app.use((req, res, next)=>{
    const e = new ExpressError("Not Found", 404)
    next(e)
})

// General Error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    })
})

module.exports = app;