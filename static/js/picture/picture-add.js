$(function () {

    // 图片转码
    var pictures = [];
    $('#input-img').change(function () {
        var file = this.files[0];
        var reader = new FileReader(); // 新建空文件属性对象
        if(file != undefined)reader.readAsDataURL(file); // 传入文件
        reader.onload = function() {
            var imgBase64 = reader.result; // 将得到的文件转成data64编码
            pictures.push(imgBase64);
        }
    });

    //提交数据
    $(".j-submit").click(function () {
        var img = pictures;
        var title = $("#input-title").val();
        var text = $("#input-text").val();
        // var user = $("#input-user").val();
        var user = '59bb6cd41767ff7f44844da2';
        // if (id == ''){
            //添加
            AddPicture(img, title, text, user);
        // } else{
        //     //修改
        //     EditArticle(id, title, description, content, picture);
        // }
    });
    
    //取消
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });

});

//添加数据
function AddPicture(img, title, text, user) {
    $.ajax({
        url : server.http + '/picture/picture-add/addPicture',
        data : {'img': img, 'title': title, 'text': text, 'user': user},
        type: 'post',
        dataType: 'json',
        success: function(data){
            if (JSON.parse(data) == 'success'){
                $.alert({
                    title: '保存成功',
                    confirmButton: '关闭',
                    content: '',
                    confirm: function(){
                        window.location.href = '/picture';
                    }
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}

// 图片转码
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}