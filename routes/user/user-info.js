const express = require('express');
const router = express.Router();
const User = new require('./../../models/User');
const moment = require('moment');

// 用户信息查看页面
router.get('/',function (req, res) {
    // 查询数据
    let id = req.query.id;
    let data = {
        id : id
    };
    res.render('user/user-info',{data: data});
});

// 查询用户信息
router.get('/findArticleLabel',function (req, res) {
    // 查询数据
    let id = req.query.id;
    let criteria = { _id: id, is_deleted: 1 }; // 查询条件
    let fields = { name: 1, pwd: 1, date: 1 }; // 待返回的字段
    let options = {}; // 排序方式
    User.findOne(criteria, fields, options, function(error, result){
        if(error) {
            console.log(error);
        } else {
            let data = {
                id : result._id,
                name : result.name,
                pwd: result.pwd,
                date : moment(result.date).format('YYYY-MM-DD HH:mm:ss')
            };
            res.jsonp(data);
        }
    });
});

//下一篇文档
router.get('/findNextArticle', function (req, res) {
    //查询数据
    let id = req.query.id;
    let criteria = {is_deleted: 1, _id: {$lt: id}}; // 查询条件
    let fields = {title : 2, description : 1, date : -1, content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]}; // 排序方式
    Article.findOne(criteria, fields, options, function(error, result){
        if (error) {
            return console.log(error);
        }
        if (result == null) {
            return res.jsonp('');
        }
        let data = {
            id : result._id || '',
            title : result.title || '',
            description : result.description || '',
            content: result.content || '',
            date : moment(result.date).format('YYYY-MM-DD HH:mm:ss') || ''
        };
        return res.jsonp(data);
    });
});

//上一篇文档
router.get('/findPreviousArticle', function (req, res) {
    //查询数据
    let id = req.query.id;
    let criteria = {is_deleted: 1, _id: {$gt: id}}; // 查询条件
    let fields = {title : 2, description : 1, date : -1, content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]}; // 排序方式
    Article.findOne(criteria, fields, options, function(error, result){
        if (error) {
            return console.log(error);
        }
        if (result == null) {
            return res.jsonp('');
        }
        let data = {
            id : result._id,
            title : result.title,
            description : result.description,
            content: result.content,
            date : moment(result.date).format('YYYY-MM-DD HH:mm:ss')
        };
        return res.jsonp(data);
    });
});

module.exports = router;