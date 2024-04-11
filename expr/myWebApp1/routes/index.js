const express = require('express');
const userM = require('../modules/usersM');
const router = express.Router();
const jwt = require("../modules/jwt");

const deepCopy=(inputData)=>JSON.parse(JSON.stringify(inputData));

/* GET home page. */
router.get('/', function(req, res, next) {
  // const token = deepCopy(req.headers.authorization);
  const token = req.cookies.token;
  const user = token?jwt.verify(token):false;
  console.log(user);
  if(user){
    res.render('index', { title: 'Express', user: user.name ,attributes: user});
  }else{
    res.render('index', { title: 'Express', user: false ,attributes: false});
  }
});

router.get('/singup', function(req, res, next) {
  res.render('singup', { title: 'Express'});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', user: false ,attributes: false});
});

router.post("/login", async(req, res)=>{
  const body = req.body;
  const user = await userM.getUserWithCheckPassword(body);
  if (user.data){
    const token = jwt.sign(user.data);
    res.cookie(`token`,token);
    res.redirect(`/`);
  }else{
    res.render('login', { title: 'Express', user: false, attributes: user });
  }
});

module.exports = router;
