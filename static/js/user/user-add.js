$(function () {

    // 剪切头像
    $('.j-photo').click(function () {
        CanvasAvatar.InitDome();
        $('#Modal-cae').modal('show');
    })

    var photo;
    $('.j-confirm-btn').click(function () {
        photo = CanvasAvatar.getImg().DataURL;
        $('#Modal-cae').modal('hide');
    });
    
    //提交数据
    $(".j-submit").click(function () {
        var id = $(".j-box").attr("data-id");
        var name = $("#input-name").val();
        var pwd = $("#input-pwd").val();
        var phone = $("#input-phone").val();
        console.log('CanvasAvatar', photo);
        // if (id == ''){
            //添加
            AddUser(name, pwd, phone, photo);
        // } else{
        //     //修改
        //     EditArticle(id, title, description, content, label);
        // }
    });
    
    //取消
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });

});

//查询所有标签
function FindAllLabel() {
    $.ajax({
        url : server.http+'/label/findAllLabel',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data){
            for (var i = 0;i<data.length;i++) {
                $("#input-label").append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}

//查询数据
function FindData(id,quill) {
    if (id){
        $.ajax({
            url : server.http+'/user/user-add/findArticle',
            data : {'id' : id},
            type: 'get',
            dataType: 'json',
            success: function(data){
                if (data.label.length) {
                    for (var i = 0; i<data.label.length; i++) {
                        $("#input-label").find("option[value='"+data.label[i]._id+"']").attr("selected",true);
                    }
                }
                //声明选择器
                $("#input-label").select2({
                    language: "zh-CN"
                });
                $("#input-title").val(data.title);
                $("#input-description").val(data.description);
                quill.setContents(JSON.parse(data.content));
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log('error ' + textStatus + " " + errorThrown);
            }
        });
    } else {
        $("#input-label").select2({
            language: "zh-CN"
        });
    }
}

//添加数据
function AddUser(name, pwd, phone, photo) {
    console.log('uuuu')
    $.ajax({
        url : server.http+'/user/user-add/addUser',
        data : {'name': name, 'pwd': pwd, 'phone': phone, 'photo': photo},
        type: 'post',
        dataType: 'json',
        success: function(data){
            if (JSON.parse(data) == 'success'){
                $.alert({
                    title: '保存成功',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/user';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}

//修改数据
function EditArticle(id, title, description, content, label) {
    $.ajax({
        url : server.http+'/user/user-add/editArticle',
        data : {'id': id, 'title': title, 'description': description, 'content': JSON.stringify(content), 'label': label},
        type: 'post',
        dataType: 'json',
        success: function(data){
            if (JSON.parse(data) == 'success'){
                $.alert({
                    title: '保存成功',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/user';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}