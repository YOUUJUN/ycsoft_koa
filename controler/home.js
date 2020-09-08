const router = require('koa-router')();

const fs = require("fs");
const fsPromises = require('fs').promises;

const util = require("util");
// const execFile = util.promisify(require("child_process").execFile);
const Path = require("path");

const page_guide = require("../utils/pages/guide");
const page_community = require("../utils/pages/community");
const page_user = require("../utils/pages/user");
const page_editor = require("../utils/pages/editor");

const common = require("../utils/lib/common");

module.exports = {

    videos : async(ctx, next) =>{
        // ctx.status = 500;
        ctx.body = await common.readPages('video.html');

        await next();
    },

    pullVideoStream : async(ctx, next) => {
        let filename =  Path.join(__dirname,"../database/expose/frag_bunny.mp4");

        console.log("header ====>2",ctx.request.header);

        let stats = fs.statSync(filename);
        console.log("stats ==============> ",stats);
        let total = stats.size;

        let start = 0;
        var end = 0;
        var range = ctx.request.header.range;
        console.log("ctx.request.header",ctx.request.header,range)
        if(range && range != 0){
            var positions = range.replace(/bytes=/, "").split("-");
            console.log("positions===>",positions);
            end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        };
        console.log('end',end);

        // var range = ctx.request.header.range;
        // // var range = "bytes=500-";
        // console.log("range ===>",range);
        // if (!range) {
        //     // 416 Wrong range
        //     return ctx.status = 416;
        // }
        // var positions = range.replace(/bytes=/, "").split("-");
        // var start = parseInt(positions[0], 10);
        // var total = stats.size;
        // var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        // var chunksize = (end - start) + 1;

        ctx.status = 206;
        ctx.set({
            // "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            // "Content-Length": chunksize,
            // "Content-Type": "video/mp4"
            'Content-Type': 'video/mp4'
        });

        // console.log("total",total);
        //
        // console.log("start===>",start,"end====>",end);

        var rs = fs.createReadStream(filename, { start: start, end: end });
        // var rs = fs.createReadStream(filename);

        ctx.body = rs

        // ctx.body = stream;

        // stream.on("open", function() {
        //         stream.pipe(ctx.body);
        //     }).on("error", function(err) {
        //         console.log("err ===>",err);
        //     });

        next();
    },


    index : async (ctx,next) =>{

        let requestBody = ctx.request.ip;
        let responseBody = ctx.response;
        let nodeRequestBody = ctx.req;

        // ctx.status = 500;

        ctx.body = await common.readPages('index.html');

        await next();
    },

    products : async (ctx,next) =>{
        ctx.body = await common.readPages('product.html');
        await next();
    },

    guide : async (ctx,next) =>{
        ctx.body = await common.readPages('guide.html');
        await next();
    },


    contact : async (ctx,next) =>{
        ctx.body = await common.readPages('contact.html');
        await next();
    },

    community : async (ctx,next) =>{
        // ctx.status = 200;
        ctx.body = await common.readPages('community.html');
        await next();
    },

    personal : async (ctx,next) =>{
        ctx.body = await common.readPages('personal.html');
        await next();
    },

    /*用户设置界面跳转*/
    async setting(ctx,next){
        ctx.body = await common.readPages('setting.html');
        await next();
    },


    /*--drafts list--*/
    async drafts(ctx,next){
        let logged = ctx.state.logged;
        let params = ctx.params;
        if(!logged){
            ctx.url = '/offline.html';
        }else{
            ctx.body = await common.readPages('drafts.html');
        }

        await next();
    },

    async editor(ctx,next){
        let logged = ctx.state.logged;
        if(!logged){
            ctx.url = '/offline.html';
            await next();
            return;
        }


        let params = ctx.params;
        let project = params.project;
        let code = params.href;


        if(project == "article"){

            if(code !== "new"){

            }

            ctx.body = await common.readPages("editor.html");

        }else if(project == "doc"){

            ctx.body = await common.readPages("editor.html");

        }else{
            ctx.response.status = 404;
        }

        await next();
    },



    async topics(ctx,next){
        let params = ctx.params;
        let href = params.href;

        ctx.body = await common.readPages('topics.html');
        await next();
    },


    async topicsList(ctx, next){
        ctx.body = await common.readPages('topicList.html');
        await next();
    },

    poster : async(ctx,next) =>{
        let postId = Path.basename(ctx.url);

        let results = await page_community.getArticleInfo(postId);
        if(JSON.stringify(results) == "{}"){

            ctx.body = await common.readPages('error.html');

            await next();
        }else {
            await page_community.upDateArticleViews(postId);
            ctx.body = await common.readPages('article.html');
            await next();
        }
    },


    /*--guide--*/
    getDocNavigation : async (ctx, next) =>{
        const results = await page_guide.getSideNavigation();
        ctx.body = results;
        await next();
    },

    getDocByHash : async (ctx,next) => {
        console.log("hello");
        const  postHref = ctx.path;
        let href = postHref.split("/");
        let hash = href[href.length - 1];
        let results = await page_guide.getDocByHash(hash);

        let msg = {
            status : 0,
            content : "未知错误!"
        };

        if(results.length === 0){
            msg.content = "找不到该文档!";
        }else{
            msg.status = 1;
            msg.content  = results[0].post_content;
        }
        ctx.body = msg;

    },


    /*--user--*/

    async login (ctx, next){

        let body = ctx.request.body;

        try {
            let results = await page_user.login(body);
            ctx.cookies.set("marscript",results.token);
            ctx.body = results;
        }catch (err) {
            console.error(err);
            ctx.body = {
                info:"未知错误，请联系管理员!"
            }
        }

    },

    async logout(ctx, next){
        ctx.cookies.set("marscript","");
        ctx.body = "登出成功！";
    },

    async register(ctx, next){
        let body = ctx.request.body;

        try {
            let results = await page_user.register(body);

            ctx.body = results;
        }catch (err) {
            console.error(err);
            ctx.body = {
                info:"未知错误，请联系管理员!"
            }
        }
    },

    async verifyToken (ctx, next) {
        let msg = {
            status: 0,
            logged: false
        }

        let token = ctx.request.header.accesstoken || "";
        try {
            let result = await page_user.verifyUserToken(token);
            console.log("result--------------",result);

            if(result){
                msg.logged = true;
            }else{
                msg.logged = false;
            }
            msg.status = 1;
        }catch (e) {
            console.error(e);
            msg.status = 0;
            msg.logged = false;
        }

        ctx.body = msg;
    }
    ,


    /*--community--*/
    getHotList : async (ctx, next) =>{

        let msg = {
            status : 0,
            data : ""
        }

        try {
            let result = await page_community.getHotList();
            msg.data = result;
            msg.status = 1;
        }catch (e) {
            console.error("get hot list failed",e)
        }

        ctx.body = msg;

    },

    getArticleList : async (ctx, next) =>{

        let msg = {
            status : 0,
            data : "",
            info : ""
        }

        let body = ctx.request.body;
        console.log("body",body);

        let searchIndex = body.postIndex;
        let searchTopic = body.topic;

        let userConfig = {};

        userConfig.searchIndex = searchIndex;
        userConfig.searchTopic = searchTopic;
        userConfig.logged = ctx.state.logged;

        try {
            let results = await page_community.getArticleList(userConfig);

            if (searchIndex != 1 && results.length == 0) {
                msg.info = "已经加载完全部文章了哦！";
                msg.status = 2;
            }else{

                let arr = '/community/post/';
                let arr2 = '/personal/';

                let newResults = [];

                for (let i = 0; i < results.length; i++) {
                    newResults[i] = {
                        id : results[i].post_id,
                        userUrl : arr2.concat(results[i].user_id),
                        url: arr.concat(results[i].post_id),
                        author: results[i].nickname,
                        date: results[i].post_date,
                        title: results[i].post_title,
                        topic: results[i].topic_name,
                        likeNum : results[i].nums,
                        replyNum: results[i].replyNum,
                        ifSubscribed : results[i].ifSubscribed
                    }
                }

                msg.data = newResults;
                msg.status = 1;
            }

        }catch (e) {
            console.error("get artical list failed",e);
        }

        ctx.body = msg;
    },

    getTopicList : async (ctx, next) =>{
        let msg = {
            status : 0,
            data : ""
        }

        try {
            let result = await page_community.getTopicList(ctx);
            msg.data = result;
            msg.status = 1;
        }catch (e) {
            console.error("get hot list failed",e)
        }

        ctx.body = msg;
    },



    /*---community-article---*/

    getArticleInfo : async (ctx,next) =>{

        let msg = {
            status : 0,
            data : ""
        }

        let body = ctx.request.body;
        let postId = body.postId;

        try {
            let results = await page_community.getArticleInfo(postId);

            msg.status = 1;
            msg.data = results;

        }catch (e) {
            console.error("get article info failed",e)
        }

        ctx.body = msg;
    },

    async getComment (ctx,next){
        let msg = {
            status : 0,
            data : ""
        }

        let body = ctx.request.body;
        let postId = body.postId;

        try {
            let results = await page_community.getComment(postId);

            msg.status = 1;
            msg.data = results;

        }catch (e) {
            console.error("get articleComment failed",e)
        }

        ctx.body = msg;
    },

    async getReComment (ctx,next){
        let msg = {
            status : 0,
            data : ""
        }

        let body = ctx.request.body;
        let commentId = body.commentId;
        let postId = body.postId;

        try {
            let results = await page_community.getReComment(postId,commentId);

            msg.status = 1;
            msg.data = results;

        }catch (e) {
            console.error("get articleReComment info failed",e)
        }

        ctx.body = msg;
    },


    async addComment (ctx,next){
        let msg = {
            status : 0,
            data : "发表评论失败!"
        }

        let logged = ctx.state.logged;
        if(!logged){
            console.log("not logged");
            ctx.body = msg;
            return;
        }

        let body = ctx.request.body;

        try {
            let results = await page_community.addComment(body,logged);

            msg.status = results.status;
            msg.data = results.info;

        }catch (e) {
            console.error("add comment failed",e)
        }

        ctx.body = msg;
    },

    async addReComment (ctx,next){
        let msg = {
            status : 0,
            data : "发表评论失败!"
        }

        let logged = ctx.state.logged;
        if(!logged){
            console.log("not logged");
            ctx.body = msg;
            return;
        }

        let body = ctx.request.body;

        try {
            let results = await page_community.addReComment(body,logged);

            msg.status = results.status;
            msg.data = results.info;

        }catch (e) {
            console.error("add reComment failed",e)
        }

        ctx.body = msg;
    },


    /*---personal---*/


    async getAuthorinfo(ctx,next){

        let msg = {
            status : 0,
            data : ""
        }

        let body = ctx.request.body;

        let obj = {
            userId : body.userId
        }

        try {
            let results = await page_user.getUserInfo(obj);

            msg.status = 1;
            msg.data = results;

        }catch (e) {
            console.error("get articleReComment info failed",e)
        }

        ctx.body = msg;
    },


    async personalArticleList(ctx, next) {
        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.personalArticleList(ctx);

            msg.status = 1;
            msg.data = results;

        } catch (e) {
            console.error("get personalArticleList failed", e)
        }

        ctx.body = msg;
    },

    async verifyOwner(ctx,next){

        let body = ctx.request.body;
        let logged = ctx.state.logged;

        let msg = {
            status: 0,
            data: ""
        }

        console.log("userId,bodyId",logged.userId,body.userId);

        if(logged && logged.userId == body.userId){
            msg.data = {
                ifOwner : true
            };
        }else{
            msg.data = {
                ifOwner : false
            };
        }

        ctx.body = msg;

    },

    async getFollowUser(ctx,next){

        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.getFollowUser(ctx);

            msg.status = 1;
            msg.data = results;

        } catch (e) {
            console.error("get personalFollower failed", e)
        }

        ctx.body = msg;

    },

    /*--添加关注者模块--*/
    async addFollow(ctx,next){
        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.addFollow(ctx);
            msg = results;

        } catch (e) {

            msg.data = "操作失败!";
            console.error("get personalFollower failed", e)
        }

        ctx.body = msg;
    },

    /*--添加文章喜爱模块--*/
    async addLike(ctx, next){
        let msg = {
            success : 0,
            status: 0,
            data: "操作失败"
        }

        try {
            let results = await page_community.addLike(ctx);
            msg = results;

        } catch (e) {
            console.error("addLike failed", e)
        }

        ctx.body = msg;

    },

    async getFocusTopic(ctx,next){

        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.getFocusTopic(ctx);

            msg.status = 1;
            msg.data = results;

        } catch (e) {
            console.error("get personalFocusTopic failed", e)
        }

        ctx.body = msg;

    },

    async checkUserAuthorBind(ctx, next){
        msg = 0;

        try {
            let results = await page_community.checkUserAuthorBind(ctx);
            msg = results;
        } catch (e) {
            console.error("checkUserAuthorBind failed", e)
        }

        ctx.body = msg;

    },

    async addFocus(ctx,next){
        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.addFocus(ctx);
            msg = results;

        } catch (e) {

            msg.data = "操作失败!";
            console.error("addFocus failed", e)
        }

        ctx.body = msg;
    },


    async getTopicInfo(ctx,next){
        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.getTopicInfo(ctx);
            msg.data = results;
            msg.status = 1;
        } catch (e) {
            console.error("getTopicInfo failed", e)
        }

        ctx.body = msg;
    },


    /*-用户上传头像-*/
    async upLoadPortrait(ctx,next){
        console.log("request----?",ctx.request.host);
        let msg = {
            data : '修改失败！登录状态超时.',
            status : 0
        };

        if(!ctx.state.logged){
            ctx.body = msg;
            return;
        }

        try {
            let results = await page_user.upLoadPortrait(ctx,next);
            if(results.status === false){
                msg = {
                    data : '上传图片失败，图片大小超过上传限制',
                    status : 0,
                    url : ""
                };
            }else{
                msg = {
                    data : '上传图片成功',
                    status : 1,
                    url : results.path
                };
            }

        } catch (e) {
            console.error("upLoadPortrait failed", e);
            msg = {
                data : '未知错误,请联系管理员',
                status : 0,
                url : ""
            };
        }

        ctx.body = msg;
    },


    async getUserInfo(ctx, next){

        let msg = {
            status : 0,
            data : ""
        }

        let logged = ctx.state.logged;

        let obj = {
            userId : logged.userId
        }

        try {
            let results = await page_user.getUserInfo(obj);

            msg.status = 1;
            msg.data = results;

        }catch (e) {
            console.error("get user info failed",e);
        }

        ctx.body = msg;

    },


    /*-修改用户信息-*/
    async modifyUserInfo(ctx,next){

        let results;

        try {
            results = await page_user.modifyUserInfo(ctx);

        }catch (e) {
            console.error("modifyUserInfo failed",e);
            results = {
                data : "未知错误，请联系管理员",
                status : 0
            }
        }

        ctx.body = results;

    },



    /*---editor---*/
    /*--获取topic下拉列表值--*/
    async getEditorDropDown(ctx,next){

        let results = [];

        try {
            results = await page_editor.getEditorDropDown(ctx);
        }catch (e) {
            console.error("getEditorDropDown failed",e);
        }

        ctx.body = results;

    },

    /*--储存草稿--*/
    async draftsStorage(ctx, next){

        let results = [];

        try {
            results = await page_editor.draftsStorage(ctx);
        }catch (e) {
            console.error("draftsStorage failed",e);
        }

        ctx.body = results;

    },

    /*--通过href获取所指定的文档&文章信息--*/
    async getEditorInfo(ctx, next){

        let results = {
            status : 0,
            data : {},
            msg : "获取文章错误！"
        };

        try {
            results.data = await page_editor.getEditorInfo(ctx);
            results.status = 1;
            results.msg = "获取文章成功!"
        }catch (e) {
            results.status = 0;
            console.error("getEditorInfo failed",e);
        }

        ctx.body = results;

    },

    /*--发表文章--*/
    async postArticle(ctx,next){
        let msg = {
            message : "发表失败!未知错误!",
            status : 0,
        };

        try {
            let results = await page_editor.postArticle(ctx);
            msg = {
                message : results.message,
                status : results.status
            }
        }catch (e) {
            console.error("postArticle failed",e);
        }

        ctx.body = msg;
    },

    /*--发表文档--*/
    async postDoc(ctx,next){

        let msg = {
            message : "发表失败!未知错误!",
            status : 0,
        };

        try {
            let results = await page_editor.postDoc(ctx);
            msg = {
                message : results.message,
                status : results.status
            }
        }catch (e) {
            console.error("postDoc failed",e);
        }

        ctx.body = msg;
    },

    /*--获取草稿列表--*/
    async getDraftsList(ctx, next){

        let results = [];
        try{
            results = await page_editor.getDraftsList(ctx);
        }catch (e) {
            console.error(e);
        }

        ctx.body = results

    },

    /*--删除文章--*/
    async delArticle(ctx, next) {

        let msg = {
            status : 0,
            message : "删除失败!"
        };

        try {
            let results = await page_editor.delArticle(ctx);
            msg = results;
        } catch (e) {
            console.error(e);
        }

        ctx.body = msg;
    },

    /*--删除文档--*/
    async delDoc(ctx, next){
        let msg = {
            status : 0,
            message : "删除失败!"
        };

        try {
            let results = await page_editor.delDoc(ctx);
            msg = results;
        } catch (e) {
            console.error(e);
        }

        ctx.body = msg;
    },

    /*---修改文章---*/
    async modifyArticle(ctx, next){
        let msg = {
            status : 0,
            message : "修改失败!"
        };

        try {
            let results = await page_editor.modifyArticle(ctx);
            msg.status = results.status;
            msg.message = results.message;
            msg.data = results.data;

        } catch (e) {
            console.error(e);
        }

        ctx.body = msg;
    },

    /*---编辑器上传照片---*/
    async editorUploadimg(ctx, next){
        let msg = {
            message : '上传图片失败!',
            success : 0,
            url : ""
        };

        try {
            let results = await page_editor.editorUploadimg(ctx);

            msg = results;

        } catch (e) {
            console.error(e);
        }

        ctx.body = msg;

    }
};







