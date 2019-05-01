var express = require('express');
var router = express.Router();
var User = require('./../models/user');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  User.findOne({email: req.body.email}, (err, userDoc) => {
    if (err){
      res.json({
        status: '1',
        msg: err.message,
      })
    } else{
      if (userDoc){
        res.json({
          status: '1',
          msg: 'Email already exists',
        })
      } else {
        bcrypt
          .hash(req.body.userPwd, 10)
          .then(hashedPassword => {
            const user = new User({
              userName: req.body.userName,
              email: req.body.email,
              userPwd: hashedPassword,
              orderList: [],
              cartList: [],
              addressList: []
            });
            console.log(user);
            user.save((err, doc) => {
              if (err){
                  res.json({
                      status: "1",
                      msg: err.message
                  })
              }else{
                  res.json({
                      status: "0",
                      msg: '',
                      result:'success'
                  })
              }
          })
        })
      }
    }
  })

});


router.post('/login', (req, res, next) => {
  console.log(bcrypt.hash('Admin@1234', 10));
  const pwd = req.body.userPwd;
  const params = {
    email: req.body.email,
  }
  User.findOne(params, (err, userDoc) => {
    if (err){
      res.json({
        status: '1',
        msg: err.message,
      })
    } else{
      if (userDoc){
        bcrypt
          .compare(pwd, userDoc.userPwd)
          .then((doMatch) => {
            console.log("doMatch" + doMatch);
            if(doMatch){
              res.cookie("userId", userDoc._id, {
                path: '/',
                maxAge: 1000*60*20   //20 minutes
              });
              res.cookie("userName",userDoc.userName, {
                path:'/',
                maxAge: 1000*60*20   //20 minutes
              })
              // req.session.user = userDoc;
              res.json({
                status: '0',
                msg: '',
                result:{
                  userName: userDoc.userName
                }
              })
            } else{
              res.json({
                status: '1',
                msg: 'Paaword is wrong!',
              })
            }
          })
      } else {
        res.json({
          status: '1',
          msg: 'No user found!',
      })
      }
    }
  })
});

router.post('/logout', function(req, res, next) {
  res.cookie("userId", "", {
    path:'/',
    maxAge: -1
  });
  res.json({
    status:"0",
    msg: '',
    result:''
  });
});

router.post("/checkEmail", function (req,res,next) {
  const params = {
    email: req.body.email
  }
  User.findOne(params, (err, userDoc) => {
    if (err){
      res.json({
        status: '1',
        msg: err.message,
      })
    } else{
      if (userDoc){
        res.json({
          status: '1',
          msg: 'Email already exists',
        })
      } else {
        res.json({
          status: '0',
          msg: 'email is available',
      })
      }
    }
  })
});

router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
      console.log(req.cookies.userId);
      console.log(req.cookies.userName);
      res.json({
        status:'0',
        msg:'',
        result:req.cookies.userName || ''
      });
  }else{
    res.json({
      status:'1',
      msg:'Not logged in',
      result:''
    });
  }
});



router.get("/cartList", function (req,res,next) {
  var userId = req.cookies.userId;
  User.findOne({_id:userId}, function (err,doc) {
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
          if(doc){
            res.json({
              status:'0',
              msg:'',
              result:doc.cartList
            });
          }
      }
  });
});
module.exports = router;
