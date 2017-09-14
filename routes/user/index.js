const express = require('express');
const router = express.Router();

//文档列表
router.use('/',require('./user-list'));

//文档添加
router.use('/user-add',require('./user-add'));

//文档添查看
router.use('/user-info',require('./user-info'));

module.exports = router;
