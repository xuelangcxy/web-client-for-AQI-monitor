var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: '用户注册' });
});

router.get('/monitor', function(req, res, next) {
  res.render('monitor', { title: '空气质量检测系统' });
});

module.exports = router;
