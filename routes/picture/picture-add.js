const express = require('express');
const router = express.Router();
const Picture = new require('./../../models/Picture');
const moment = require('moment');

// 插画添加页面
router.get('/',function (req, res) {
    let id = req.query.id;
    id = id || '';
    let data = {};
    data.id = id;
    res.render('picture/picture-add',{data: data});
});

// 添加插画
router.post('/addPicture',function (req, res) {
    // 插入数据
    let picture = {
        title: req.body.title,
        description: req.body.text,
        img: req.body.img,
        user_id: req.body.user
    };
    Picture.create(picture, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

module.exports = router;