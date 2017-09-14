const express = require('express');
const router = express.Router();
const User = new require('./../../models/User');
const pageList = require('./../../models/pageList');
const moment = require('moment');

// 文档页面
router.get('/',function (req, res) {
    res.render('user/user-list');
});

// 文档数据(分页)
router.get('/findUserList', function (req, res) {
    // 查询数据
    const page = Number(req.query.pageIndex)+1; // 当前页码
    const pageSize = Number(req.query.pageSize); // 每页条数
    const qs = new RegExp(req.query.name); // 标题正则参数
    const Model = User; // 模板
    const populate = '';
    const criteria = {is_deleted: 1, $or: [{name: qs},{pwd: qs}]}; // 查询条件
    let fields = {name : 2, pwd : -1, date: 1}; // 待返回的字段
    const options = {sort:[{ date: -1 }]}; // 排序
    pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options, function (err, $page) {
        if (err){
            next(err);
        } else{
            var data = {
                "total": $page.count,
                "rows": $page.results
            };
            res.jsonp(data);
        }
    });
});

module.exports = router;