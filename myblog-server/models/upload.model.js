var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema; //利用mongoose下的Schema(架构，模型)

var UploadSchema = new Schema({

  name:  String,
  data: String,
  date: {type: Date, default: Date.now},
 
  desc: String
});
UploadSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Upload', UploadSchema);