var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("./../models/product");
var User = require('./../models/user');

mongoose.connect('mongodb://localhost:27017/mobile');
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected arera re successfully!");
})

router.get("/list", (req, res, next) => {
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
});

router.post("/addCart", (req, res, next) => {
    var userId = req.cookies.userId;
    var productId = req.body.productId;
    User.findOne({_id: userId}, (err, userDoc) => {
        if (err){
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if (userDoc){
                Product.findOne({_id: productId}, (err3, productDoc) => {
                    if (err3){
                        res.json({
                            status: "1",
                            msg: err3.message
                        })
                    } else {
                        if (productDoc){
                            if (productDoc.inventory == 0){
                                res.json({
                                    status: "1",
                                    msg: "Out of stock"
                                }) 
                            } else{
                                productDoc.inventory--;
                            };
                            found = false;
                            userDoc.cartList.forEach((item) => {
                                if (item._id == productId){
                                    found = true;
                                    item.productNum++;
                                }
                            });
                            if (found){
                                userDoc.save((err2, doc2) => {
                                    if (err2){
                                        res.json({
                                            status: "1",
                                            msg: err2.message
                                        })
                                    }else{
                                        res.json({
                                            status: "0",
                                            msg: '',
                                            result:'success'
                                        })
                                    }
                                })
                            } else {
                                userDoc.cartList.push({
                                    "_id": productDoc._id,
                                    "name": productDoc.name,
                                    "price": productDoc.price,
                                    "image": productDoc.image,
                                    "productNum": 1,
                                    "checked": 1
                                });
                                userDoc.save((err4, doc2) => {
                                    if (err4){
                                        res.json({
                                            status: "1",
                                            msg: err4.message
                                        })
                                    }else{
                                        res.json({
                                            status: "0",
                                            msg: '',
                                            result:'success'
                                        })
                                    }
                                })
                            }                            
                        }
                    }
                });
            }
        }
    })

});

module.exports = router;



