//上传文件处理
const Path = require("path");
const fs = require("fs");
const fsPromise = require("fs").promises;


const tools = new (require("./tools"))();
// let tools = new Tools;

class Uploader{
    constructor(ctx){
        this.ctx = ctx;
    }

    saveAs(savePath){
        let ctx = this.ctx;
        let file = ctx.request.files[0];

        let cacheFileState = fs.statSync(file.path);

        let size = cacheFileState.size;
        let foarmatedSize = tools.formatBytes(size);

        let typeCache = file.mimetype.split("/");
        let fileType = typeCache[1];
        let finalPath = savePath.concat(".",fileType);

        let readStream = fs.createReadStream(file.path);
        let writeStream = fs.createWriteStream(finalPath);
        readStream.pipe(writeStream);
    }

}

module.exports = Uploader;