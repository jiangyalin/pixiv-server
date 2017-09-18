const express = require('express');
const router = express.Router();

// 用户列表
router.use('/',require('./user-list'));

// 用户添加
router.use('/user-add',require('./user-add'));

// 用户查看
router.use('/user-info',require('./user-info'));

module.exports = router;
