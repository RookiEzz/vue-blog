var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/cate.controller'); //引入控制器
/* GET users listing. */

router.post('/', userCtrl.getall)
router.post('/data', userCtrl.create);
router.post('/delete', userCtrl.remove);
router.put('/data/:id', userCtrl.update);
module.exports = router;
