var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: false});
});

router.post("/",(req, res)=>{
  let body = req.body;
  res.render('index', { title: 'Express', user: body.id, attributes: body });
});

module.exports = router;
