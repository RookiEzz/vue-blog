var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/comment.controller'); //引入控制器

router.post('/list', dataCtrl.list)
router.post('/data', dataCtrl.create);
router.post('/delete', dataCtrl.remove);
router.put('/data/:id', dataCtrl.update);
module.exports = router;
