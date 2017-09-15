var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//用户详细信息模板
var UserSchema = new Schema({
  article_id: { type: Schema.Types.ObjectId, ref: 'User' }, // 用户id
  name: { type: String, default: null },
  pwd: { type: String, default: '123456' },
  is_deleted: { type: Number, default: 1 }
});

module.exports = mongoose.model('user',UserSchema);