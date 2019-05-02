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
  destination: '../static/',
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);

  }
}).single('file');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const minetype = filetypes.test(file.mimetype);

  if (extname && minetype){
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
    let keyword = req.param("keyword");
    let priceGt = '';
    let priceLte = '';
    let params = {deleted: false};

    if (priceLevel != "all"){
        switch(priceLevel){
            case '0':priceGt = 0; priceLte = 500; break;
            case '1':priceGt = 500; priceLte = 1000; break;
            case '2':priceGt = 1000; priceLte = 5000; break;
        }

        params['price'] = {
          $gt: priceGt,
          $lte: priceLte
        }
    }
    if (keyword){
      params['name'] = {$regex: new RegExp(keyword, "i")}
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
                                      // item.inventory = productDoc.inventory;
                                      --item.inventory;
                                  }
                              });
                              if (!found){
                                  userDoc.cartList.push({
                                      "_id": productDoc._id,
                                      "name": productDoc.name,
                                      "price": productDoc.price,
                                      "image": productDoc.image,
                                      "inventory": productDoc.inventory - 1,
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


router.post("/softDel", (req, res, next) => {
  var productId = req.body.productId;
  Product.delete({_id:productId}, (err, doc) => {
      console.log("doc" + doc);
      if (err){
          res.json({
              status: "1",
              msg: err.message
          })
      } else{
          res.json({
              status: "0",
              msg: '',
              result:'success'
          })
      }
  });
});

router.post("/addItem",(req, res, next) => {
      upload(req, res,(err) => {
        if (err){
          res.json({
            status:'1',
            msg: err,
            resulte:'fails'
          })
        }else{
          console.log("this is the updated value"+req.body.updated);
          if (req.body.updated === true){
            if (req.body.image != ''){
              console.log("this is not updated");
              let inventory = req.body.inventory,
              name = req.body.name,
              brand = req.body.brand,
              // image = req.file.originalname,
              image = req.body.image,
              memory = req.body.memory,
              price = req.body.price,
              description = req.body.description,
              color = req.body.color;
              productId = req.body.productId;
              Product.updateOne({"_id":productId},{
                  $set: {"inventory": inventory,
                          "name":name,
                          "brand":brand,
                          "image": image,
                          "memory": memory,
                          "price":price,
                          "description": description,
                          "color": color
                        }
              }, (err, doc) => {
                  if(err){
                  res.json({
                  status:'1',
                  msg:err.message,
                  result:''
                  });
                  } else{
                  res.json({
                  status:'0',
                  msg:'',
                  result:'this is 1'
                  });
                  }
              })
            }
          }else{
            console.log(req.body);
            let product = new Product({
              inventory: req.body.inventory,
              name: req.body.name,
              brand: req.body.brand,
              image: req.file.originalname,
              memory: req.body.memory,
              price: req.body.price,
              description: req.body.description,
              color: req.body.color
            });
            product.save(function(err, doc){
              if (err){
                res.json({
                    status: "1",
                    msg: err.message
                });
              }
              else{
                res.json({
                    status: "0",
                    msg: '',
                    result:'success'
                })
              }
            });
          }
        }
      });
});






router.get("/getProduct", (req, res, next) => {
    console.log(req.param);
    let productId = req.param("productId");
    Product.findOne({_id: productId},(err, productDoc) => {
        if (err){
          res.json({
          status: "1",
          msg: err.message
          })
        } else {
        if (productDoc){
          res.json({
          status: "0",
          msg: '',
          result: {
            product: productDoc
            }
          })
        } else{
          res.json({
          status: "1",
          msg: 'Product not found',
        })
  }
  }
  });
});





  router.post("/update", (req, res, next) => {
    console.log(req);
    // console.log(req.body);
    // console.log(req.file);
    if (req.body.image == ''){
      upload(req, res,(err) => {

        if (err){
          res.json({
            status:'1',
            msg: err,
            resulte:'fails'
          })
        }else{
          let inventory = req.body.inventory,
            name = req.body.name,
            brand = req.body.brand,
            image = req.file.originalname,
            // image = req.body.image,
            memory = req.body.memory,
            price = req.body.price,
            description = req.body.description,
            color = req.body.color;
            productId = req.body.productId;
            Product.updateOne({"_id":productId},{
                $set: {"inventory": inventory,
                        "name":name,
                        "brand":brand,
                        "image": image,
                        "memory": memory,
                        "price":price,
                        "description": description,
                        "color": color
                      }
            }, (err, doc) => {
                if(err){
                res.json({
                status:'1',
                msg:err.message,
                result:''
                });
                } else{
                res.json({
                status:'0',
                msg:'',
                result:'this is 1'
                });
                }
            })
          }
    });
    }
    else{
      let inventory = req.body.inventory,
            name = req.body.name,
            brand = req.body.brand,
            // image = req.file.originalname,
            image = req.body.image,
            memory = req.body.memory,
            price = req.body.price,
            description = req.body.description,
            color = req.body.color;
            productId = req.body.productId;
            console.log("productid: " + productId);
            Product.updateOne({"_id":productId},{
                $set: {"inventory": inventory,
                        "name":name,
                        "brand":brand,
                        "image": image,
                        "memory": memory,
                        "price":price,
                        "description": description,
                        "color": color
                      }
            }, (err, doc) => {
              console.log(doc);
                if(err){
                res.json({
                status:'1',
                msg:err.message,
                result:''
                });
                } else{
                res.json({
                status:'0',
                msg:'',
                result:'this is 2'
                });
                }
            })

    }



});










  // router.post("/update", (req, res, next) => {
  //   console.log(req.body);
  // let inventory = req.body.inventory,
  // name = req.body.name,
  // brand = req.body.brand,
  // image = req.file.originalname,
  // memory = req.body.memory,
  // price = req.body.price,
  // description = req.body.description,
  // color = req.body.color;
  // productId = req.body.productId;

  // Product.updateOne({"_id":productId},{
  // $set: {"inventory": inventory,
  // "name":name,
  // "brand":brand,
  // "image": image,
  // "memory": memory,
  // "price":price,
  // "description": description,
  // "color": color
  // }
  // }, (err, doc) => {
  // if(err){
  // res.json({
  // status:'1',
  // msg:err.message,
  // result:''
  // });
  // } else{
  // res.json({
  // status:'0',
  // msg:'',
  // result:'suc'
  // });
  // }
  // })

  // });







module.exports = router;



