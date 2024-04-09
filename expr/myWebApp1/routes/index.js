const express = require('express');
const userM = require('../modules/usersM');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: false ,attributes: false});
});

router.get('/singup', function(req, res, next) {
  res.render('singup', { title: 'Express'});
});

// router.post('/singup',(req, res, next)=>{
//   res.redirect('/users/');
// });

router.post("/", async(req, res)=>{
  const body = req.body;
  const user = await userM.getUserWithCheckPassword(body);
  if (user.data){
    console.log(`user.data:`);
    console.log(user.data);
    res.render('index', { title: 'Express', user: body.name, attributes: user.data });
  }else{
    res.render('index', { title: 'Express', user: false, attributes: user });
  }
});

module.exports = router;
