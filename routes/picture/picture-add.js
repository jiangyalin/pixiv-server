const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
var fs = require('fs');
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
router.post('/addPicture', function (req, res) {
    // 插入数据
    // const tmp_path = req.files.thumbnail.path;
    // console.log('tmp_path',tmp_path)
    // console.log(req.body)
    // console.log(req.body.img)
    console.log(req.files)
    // console.log(req.files.img.path.split(path.sep).pop())
    let information = JSON.stringify({"success":true});
    res.jsonp(information);
    // let picture = {
    //     title: req.body.title,
    //     description: req.body.text,
    //     img: req.body.img,
    //     user_id: req.body.user
    // };
    // Picture.create(picture, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         let information = JSON.stringify('success');
    //         res.jsonp(information);
    //     }
    // });
});

module.exports = router;