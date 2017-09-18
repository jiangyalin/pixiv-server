$(function () {

    //搜索
    $(".j-sch").click(function () {
        GetDemo($(".j-sch-it").val());
    });
    $(".j-sch-it").keyup(function (event) {
        if (event.keyCode == 13){
            GetDemo($(this).val());
        }
    });

    //删除
    $(".j-table-1").on("click",".j-remove",function () {
        var id = $(this).parents("tr").attr("data-id");
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
    $(".j-table-1").on("click", ".j-edit", function () {
        var id = $(this).parents("tr").attr("data-id");
        window.location.href = '/picture/picture-add?id='+id;
    });

    //查看详情
    $(".j-table-1").on("click",".j-see",function () {
        var id = $(this).parents("tr").attr("data-id");
        window.location.href = '/picture/picture-info?id='+id;
    });

    //分页
    $(".j-page").pagination({
        pageSize: 5,
        remote: {
            url: server.http+'/picture/findPictureList',
            success: function (data) {
                $(".j-tips").text('共查出'+data.total+'条数据');
                //列表
                $(".j-table-1").find("tbody").html('');
                for (var i = 0;i<data.rows.length;i++){
                    $(".j-table-1").find("tbody").append('<tr data-id="'+data.rows[i]._id+'">' +
                        '<td>'+data.rows[i]._id+'</td>' +
                        '<td>'+data.rows[i].title+'</td>' +
                        '<td>'+data.rows[i].description+'</td>' +
                        '<td><img src="'+data.rows[i].img+'" style="height: 100px;"/></td>' +
                        '<td>'+data.rows[i].user_id+'</td>' +
                        '<td>'+moment(data.rows[i].date).format('YYYY-MM-DD HH:mm:ss')+'</td>' +
                        '<td>' +
                        '<div class="btn-group">' +
                        '<button type="button" class="btn btn-xs btn-default j-see">查看</button>' +
                        '<button type="button" class="btn btn-xs btn-default j-edit">编辑</button>' +
                        '<button type="button" class="btn btn-xs btn-default j-remove">删除</button>' +
                        '</div>' +
                        '</td>' +
                        '</tr>');
                }
            },
            totalName:'total'
        }
    });

});

//列表数据(搜索)
function GetDemo(name) {
    $(".j-page").pagination('destroy');
    $(".j-page").pagination({
        pageSize: 5,
        remote: {
            url: server.http+'/picture/findPictureList',
            params: {"title": name},
            success: function (data) {
                //列表
                $(".j-table-1").find("tbody").html('');
                for (var i = 0;i<data.rows.length;i++){
                    $(".j-table-1").find("tbody").append('<tr data-id="'+data.rows[i]._id+'">' +
                      '<td>'+data.rows[i]._id+'</td>' +
                      '<td>'+data.rows[i].title+'</td>' +
                      '<td>'+data.rows[i].description+'</td>' +
                      '<td><img src="'+data.rows[i].img+'" style="height: 100px;"/></td>' +
                      '<td>'+data.rows[i].user_id+'</td>' +
                      '<td>'+moment(data.rows[i].date).format('YYYY-MM-DD HH:mm:ss')+'</td>' +
                      '<td>' +
                      '<div class="btn-group">' +
                      '<button type="button" class="btn btn-xs btn-default j-see">查看</button>' +
                      '<button type="button" class="btn btn-xs btn-default j-edit">编辑</button>' +
                      '<button type="button" class="btn btn-xs btn-default j-remove">删除</button>' +
                      '</div>' +
                      '</td>' +
                      '</tr>');
                }
            },
            totalName:'total'
        }
    });
}

//删除数据
function RemoveArticle(id) {
    $.ajax({
        url: server.http+'/picture/removePicture',
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

