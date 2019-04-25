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
        res.cookie("userId", userDoc.userId, {
          path: '/',
          maxAge: 1000*60*60   //One hour
        });
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
          status: '0',
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

module.exports = router;
   