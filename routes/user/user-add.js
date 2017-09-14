const express = require('express');
const router = express.Router();
const User = new require('./../../models/User');
const moment = require('moment');

// 用户添加页面
router.get('/',function (req, res) {
    let id = req.query.id;
    id = id || '';
    let data = {};
    data.id = id;
    res.render('user/user-add',{data: data});
});

// 添加用户
router.post('/addUser',function (req, res) {
    console.log(req.body);
    //插入数据
    let user = {
        name : req.body.name,
        pwd : req.body.pwd
    };
    User.create(user, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

module.exports = router;