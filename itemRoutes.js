const express = require('express')
const router = new express.Router()

const ExpressError = require("./expressError")

const fakeDb = require("./fakeDb")

router.get("/", (req, res)=>{
    res.json({fakeDb})
})

router.post("/", (req, res)=>{
    const newItem = req.body
    fakeDb.push(newItem)
    res.status(201).json({"added": newItem})
})

router.get("/:name", (req, res, next)=>{
    const foundItem = fakeDb.find(item =>  item.name == req.params.name);
    if(!foundItem){
        throw new ExpressError("Item not found", 404)
    }
    res.json({foundItem})
})

router.patch("/:name", (req, res, next)=>{
    const foundItem = fakeDb.find(item =>  item.name == req.params.name);
    if(!foundItem){
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    res.json({"updated": foundItem })
})

router.delete("/:name", (req, res, next)=>{
    const foundIdx = fakeDb.findIndex(item =>  item.name == req.params.name);
    if(foundIdx < 0){
        throw new ExpressError("Item not found", 404)
    }
    fakeDb.splice(foundIdx, 1);
    res.json({message: "Deleted"})
})

module.exports = router;