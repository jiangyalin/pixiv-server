var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//用户模板
var UserSchema = new Schema({
    name: { type: String, default: null },
    pwd: { type: String, default: '123456' },
    phone: { type: String, default: '10086' }, // 手机号
    photo: { type: String, default: null }, // 用户头像
    date: { type: Date, default: Date.now }, // 创建时间
    is_deleted: { type: Number, default: 1 } // 删除状态
});

module.exports = mongoose.model('user',UserSchema);