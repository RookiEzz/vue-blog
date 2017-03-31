const mongoose = require('mongoose');
const User = require('../models/user.model')

//用户登录
exports.login = function(req, res, next){
    const user = new User(req.body);
    const name = req.body.name;
    const password = req.body.password;
    console.log(name, password)
    // res.json(user);
    User.findOne({name:name, password: password}).then(data=>{
        res.json(data)
    })
};

//新建用户
exports.create = function(req, res, next){
    const user = new User(req.body);
    // res.json(user);
    user.save().then(data => {
        res.json(data)
    })
};

//更新用户数据
exports.update = function (req, res, next) {
  const user = new User(req.body);
  const id = req.params.id;
  console.log('更新')
  console.log(id);

  delete req.body._id
   
  User.findByIdAndUpdate(id, { $set: req.body}, { new: true }).then(data=>{
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
    User.paginate(queryCondition, { page: page, limit: limit }, function(err, result) {
        res.json(result)
    });
    
   
};

//删除一个用户数据
exports.remove = function(req, res, next){
    const user = new User(req.body);
    // res.json(user);
    User.remove(user).then(data => {
        res.json(user)
    })
};