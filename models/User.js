var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//用户模板
var UserSchema = new Schema({
    name : { type: String, default: null },
    pwd : { type: String, default: '123456' },
    date : { type: Date, default: Date.now}, // 创建时间
    is_deleted : { type: Number, default: 1 }
});

module.exports = mongoose.model('user',UserSchema);