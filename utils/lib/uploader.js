//上传文件处理

var Path = require("path");
class Uploader{
    constructor(file){
        console.log('ctx.request.body', ctx.request.files[0]);
        let readStream = fs.createReadStream(file.path);
        console.log("readStream",readStream);
        var name = "miao.jpg";
        let writeStream = fs.createWriteStream(Path.join(__dirname,"../../database/foo",name));
        readStream.pipe(writeStream);
    }


}

let uploader = new Uploader;

module.exports = uploader;