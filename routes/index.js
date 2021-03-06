const bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());//解析参数
    app.get('/',function (req, res) {
        return res.redirect('/index');
    });

    //首页
    app.get('/index',function (req, res) {
        res.render('index');
    });

    //文档管理
    app.use('/user',require('./user/index'));
    //标签管理
    app.use('/picture', require('./picture/index'));

};