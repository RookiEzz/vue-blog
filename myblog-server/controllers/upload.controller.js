const mongoose = require('mongoose');
const Upload = require('../models/upload.model');
var multer  = require('multer')
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/myuploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname))
  }
})


exports.filedata = function(req,res,next){
    var upload = multer({ storage: storage, fileFilter: function(req, file, callback){
        callback(null, true)
    }
 }).single('avatar');
    upload(req,res,function(err){
        res.end('file is uploaded')
    })
}
var upload = multer({ dest: 'uploads/' });


//新建用户
exports.create = function(req, res, next){
    const upload = new Upload(req.body);
    // res.json(user);
    upload.save().then(data => {
        res.json(data)
    })
};

//更新用户数据
exports.update = function (req, res, next) {
  const upload = new Upload(req.body);
  const id = req.params.id;
  console.log('更新')
  console.log(id);

  delete req.body._id
   
  Upload.findByIdAndUpdate(id, { $set: req.body}, { new: true }).then(data=>{
      res.send(data);
  })

};

//获取所有数据
exports.list = function(req, res, next){
    var page = req.body.page?req.body.page:1;
    var limit = req.body.limit?req.body.limit:5;
    var queryCondition = {}
    if(req.body.name && req.body.name.trim().length > 0){
        var name = req.body.name;
        queryCondition = {
            'name': new RegExp(name, 'i')
        }
    }
    Upload.paginate(queryCondition, { page: page, limit: limit }, function(err, result) {
        res.json(result)
    });
    
   
};

//删除一个用户数据
exports.remove = function(req, res, next){
    const upload = new Upload(req.body);
    // res.json(user);
    Upload.remove(upload).then(data => {
        res.json(data)
    })
};