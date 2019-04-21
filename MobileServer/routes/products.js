var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("./../models/product")

mongoose.connect('mongodb://localhost:27017/mobile');
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected arera re successfully!");
})

router.get("/", (req, res, next) => {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    let sort = req.param("sort");    
    let priceGt = '';
    let priceLte = '';
    let params = {};

    if (priceLevel != "all"){
        switch(priceLevel){
            case '0':priceGt = 0; priceLte = 500; break;
            case '1':priceGt = 500; priceLte = 1000; break;
            case '2':priceGt = 1000; priceLte = 5000; break;
        }
        params = {
            price: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    } 

    let productsModel = Product.find(params).skip((page - 1) * pageSize).limit(pageSize);;
    productsModel.sort({'price': sort});
    productsModel.exec((err, doc)=>{
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



