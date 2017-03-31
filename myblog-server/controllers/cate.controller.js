const mongoose = require('mongoose');
const Cate = require('../models/cate.model')


exports.create = function(req, res, next){
    var cate = new Cate(req.body);
    cate.save().then(data=>{
        res.send(data)
    })

};

//更新用户数据
exports.update = function (req, res, next) {
  

};

//获取所有数据
exports.getall = function(req, res, next){
    
    Cate.GetFullArrayTree(function (err, tree) {
        res.send(tree);
});
   
};

//删除一个用户数据
exports.remove = function(req, res, next){
    
};