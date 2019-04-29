var express = require('express');
var router = express.Router();
var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(params, (err, userDoc) => {
    if (err){
      res.json({
        status: '1',
        msg: err.message,
      })
    } else{
      if (userDoc){
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
   