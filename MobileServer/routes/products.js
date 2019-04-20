var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("./../models/product")

mongoose.connect('mongodb://localhost:27017/mobile');
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected arera re successfully!");
})

router.get("/", (req, res, next) => {
    Product.find({}, (err, doc)=>{
        console.log("hello");
        if (err){
            res.json({
                status: '1',
                msg: err.message,
            })
        }else{
            if (doc){
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: doc.length,
                        list: doc
                    }
                })
            }else {
                res.json({
                    status: '0',
                    msg: 'No products found!',
                })
            }        
        }
    })
})

module.exports = router;



