$(function () {

    // 图片转码
    var pictures = [];
    $('#input-img').change(function () {
        // var file = this.files;
        // var k = ImgBase(file, 0);
        // console.log('k',k);
        // for (var i = 0; i < file.length; i++) {
        //     var reader = new FileReader(); // 新建空文件属性对象
        //     if(file[i] != undefined)reader.readAsDataURL(file[i]); // 传入文件
        //     reader.onload = function() {
        //         var imgBase64 = reader.result; // 将得到的文件转成data64编码
        //         $('.kkk').append('<img src="'+imgBase64+'"/>');
        //         pictures.push(imgBase64);
        //         console.log('k')
        //     }
        // }
    });

    // function ImgBase(fe, index) {
    //     console.log('ppp')
    //     console.log('fff',fe[index] != undefined)
    //     if (fe[index] != undefined) {
    //         var reader = new FileReader();
    //         reader.onload = function() {
    //             console.log('oooo')
    //             var imgBase64 = reader.result; // 将得到的文件转成data64编码
    //             // $('.kkk').append('<img src="'+imgBase64+'"/>');
    //             pictures.push(imgBase64);
    //             console.log('k');
    //             index++;
    //             return ImgBase(fe, index);
    //         }
    //     }else {
    //         return pictures;
    //     }
    // }

    //提交数据
    var formData;
    $(".j-submit").click(function () {
        var form = document.getElementById("form-1");
        formData = new FormData(form)
        var img = pictures;
        // // console.log(img)
        var title = $("#input-title").val();
        var text = $("#input-text").val();
        var user = $("#input-user").val();
        // var user = '59bb6cd41767ff7f44844da2';
        // // if (id == ''){
        //     //添加
        //     AddPicture(img, title, text, user);
        // // } else{
        // //     //修改
        // //     EditArticle(id, title, description, content, picture);
        // // }
        // console.log(document.forms.namedItem("j-form")[0])
        // var formData = new FormData(document.forms.namedItem("j-form")[0]);
        // console.log(formData)
    });
    $('#input-img').fineUploader({
        template: 'qq-template-gallery',
        request: {
            endpoint: server.http + '/picture/picture-add/addPicture'
        },
        thumbnails: {
            placeholders: {
                waitingPath: '/images/public/user_ui_01.png',
                notAvailablePath: '/images/public/logo/icon-01.png'
            }
        },
        validation: {
            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
        }
    });
    
    //取消
    $(".j-btn-cancel").click(function () {
        window.history.go(-1);
    });

});

//添加数据
function AddPicture(img, title, text, user) {
    // var form=document.getElementById("form-1");
    // console.log(form);
    var formData = new FormData($("#form-1")[0]);
    // console.log(formData);
    // formData.append("userfile", document.getElementById('input-img')[0]);
    // console.log(formData);
    // var oMyForm = new FormData();
    // oMyForm.append("username", "Groucho");
    // oMyForm.append("accountnum", 123456);
    var file = document.getElementById('input-img').files[0];
    console.log(formData.get("img"));
    $.ajax({
        url : server.http + '/picture/picture-add/addPicture',
        data : formData,
        type: 'post',
        dataType: 'json',
        async: false,
        cache: false,
        contentType: false,
        processData: false,
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