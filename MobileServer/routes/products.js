var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("./../models/product");
var User = require('./../models/user');
var path = require('path');
var multer = require('multer');


mongoose.connect('mongodb://localhost:27017/mobile');
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected arera re successfully!");
})


//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' +Date.now()+ path.extname(file.originalname));
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);

  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg| jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const minetype = filetypes.test(file.mimetype);

  if (extname && mimetype){
    return cb(null, true);
  }
  else{
    cb('Error: Image Only!');
  }
}

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



router.post("/addItem",(req, res, next) => {
      var Phone = new Product({
        name:req.body.name,
        brand: req.body.brand,
        memory: req.body.memory,
        price:req.body.price,
        description: req.body.description,
        color: req.body.color
      });
      Phone.save(function(err){
        if (err){
          res.json({
              status: "1",
              msg: err.message
          })
        }
        else{
          res.json({
              status: "0",
              msg: '',
              result:'success'
          })
        }
      });

});
router.post('/addImage', function(req, res){
    upload(req, res, (err) => {
      if (err){
        res.json({
          status:'1',
          msg: err,
          resulte:'fails'
        })
      }else{
        console.log(req.file);
        res.send('test');
      }
    });
});



module.exports = router;



