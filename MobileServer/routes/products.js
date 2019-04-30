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
    let brand = req.param("brand");  
    let internalStorage = req.param("internalStorage");
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
    
    if (brand != "all"){
        if (brand == 'iPhone'){
            params['brand'] = 'Apple';
        } else{
            params['brand'] = brand;
        }        
    }

    if (internalStorage != "all"){
        params['memory'] = internalStorage;
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
    Product.findOne({_id: productId}, (err, productDoc) => {
        if (err){
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            if (productDoc){
                product = productDoc;
                if (productDoc.inventory <= 0){
                    res.json({
                        status: "2",
                        msg: "Out of stock!"
                    })
                } else{
                    User.findOne({_id: userId}, (err2, userDoc) => {
                        if (err2){
                            res.json({
                                status: "1",
                                msg: err2.message
                            })
                        } else {
                            if (userDoc){
                                found = false;
                                userDoc.cartList.forEach((item) => {
                                    if (item._id == productId){
                                        found = true;
                                        item.productNum++;
                                        item.inventory = productDoc.inventory;
                                    }
                                });
                                if (!found){
                                    userDoc.cartList.push({
                                        "_id": productDoc._id,
                                        "name": productDoc.name,
                                        "price": productDoc.price,
                                        "image": productDoc.image,
                                        "inventory": productDoc.inventory,
                                        "productNum": 1,
                                        "checked": 1
                                    });
                                }
                                userDoc.save((err3, doc3) => {
                                    if (err3){
                                        res.json({
                                            status: "1",
                                            msg: err3.message
                                        })
                                    }else{
                                        productDoc.inventory--;
                                        productDoc.save((err4, doc4) => {
                                            if (err4){
                                                res.json({
                                                    status: "1",
                                                    msg: err4.message
                                                })
                                            } else{
                                                res.json({
                                                    status: "0",
                                                    msg: '',
                                                    result:'success'
                                                })
                                            }
                                        });                                         
                                    }
                                });
                            }
                        }
                    })    
                }              
            }else{
                res.json({
                    status: "1",
                    msg: "Product not found."
                })
            }
        }
    });

    

});

module.exports = router;



