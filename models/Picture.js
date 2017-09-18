var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//标签模板
var PictureSchema = new Schema({
  title : { type: String, default: null}, // 标题
  description : { type: String, default: null}, // 说明文
  img: { type: Array, default: []}, // 图片
  date : { type: Date, default: Date.now}, // 上传时间
  user_id : { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  is_deleted : { type: Number, default: 1} // 删除状态
});

module.exports = mongoose.model('picture',PictureSchema);