$(function () {

    //加载数据
    FindArticle($(".j-box").attr("data-id"));
    
    //返回
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });
    
    //删除
    $(".j-btn-remove").click(function () {
        var id = $(".j-box").attr("data-id");
        $.confirm({
            title: '删除',
            confirmButton: '确认',
            cancelButton: '取消',
            content: '是否确认删除',
            confirm: function(){
                RemoveArticle(id);
            }
        });
    });
    
    //编辑
    $(".j-btn-edit").click(function () {
        var id = $(".j-box").attr("data-id");
        window.location.href='/user/user-add?id='+id;
    });

    //下一篇
    $(".j-btn-next").click(function () {
        var id = $(".j-box").attr("data-id");
        FindNextArticle(id);
    });

    //上一篇
    $(".j-btn-previous").click(function () {
        var id = $(".j-box").attr("data-id");
        FindPreviousArticle(id);
    });

});

//下一篇
function FindNextArticle(id) {
    $.ajax({
        url : server.http+'/user/user-info/findNextArticle',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            $(".j-box").attr("data-id",data.id);
            $(".j-title").text(data.name);
            $(".j-date").text(data.date);
            $(".j-description").text(data.pwd);
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//上一篇
function FindPreviousArticle(id) {
    $.ajax({
        url : server.http+'/user/user-info/findPreviousArticle',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            if (data != ''){
                $(".j-box").attr("data-id",data.id);
                $(".j-title").text(data.name);
                $(".j-date").text(data.date);
                $(".j-description").text(data.pwd);
            }
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//加载数据
function FindArticle(id) {
    $.ajax({
        url : server.http+'/user/user-info/findArticleLabel',
        data : {'id': id},
        type : 'get',
        dataType : 'json',
        success : function (data) {
            $(".j-box").attr("data-id",data.id);
            $(".j-title").text(data.name);
            $(".j-date").text(data.date);
            $(".j-description").text(data.pwd);
        },
        error : function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

//删除数据
function RemoveArticle(id) {
    $.ajax({
        url: server.http+'/user/removeArticle',
        data: {'id': id},
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (JSON.parse(data) == "success"){
                $.alert({
                    title: '已删除',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/user';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}