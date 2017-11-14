var fs=require('fs');
fs.mkdir('c:\\Users\\18725\\Desktop\\project\\github-persomal\\pixiv-server\\public\\files\\k',function(err){
  if(err)
    console.error(err);
  console.log('创建目录成功');
});