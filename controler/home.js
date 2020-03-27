const router = require('koa-router')();

const fsPromises = require('fs').promises;

const util = require("util");
// const execFile = util.promisify(require("child_process").execFile);
const Path = require("path");

const page_guide = require("../utils/pages/guide");
const page_community = require("../utils/pages/community");
const page_user = require("../utils/pages/user");

module.exports = {
    index : async (ctx,next) =>{

        let requestBody = ctx.request.ip;
        let responseBody = ctx.response;
        let nodeRequestBody = ctx.req;

        ctx.url = '/index.html';

        await next();
    },

    products : async (ctx,next) =>{
        ctx.url = '/product.html';
        await next();
    },

    guide : async (ctx,next) =>{
        ctx.url = '/guide.html';
        await next();
    },

    contact : async (ctx,next) =>{
        ctx.url = '/contact.html';
        await next();
    },

    community : async (ctx,next) =>{
        ctx.url = '/community.html';
        await next();
    },

    personal : async (ctx,next) =>{
        ctx.url = '/personal.html';
        await next();
    },

    poster : async(ctx,next) =>{
        let postId = Path.basename(ctx.url);

        let results = await page_community.getArticleInfo(postId);
        console.log("results",results);
        if(JSON.stringify(results) == "{}"){

            ctx.url = '/error.html'

            await next();
        }else {
            ctx.url = '/article.html';
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

    async addFollow(ctx,next){
        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.addFollow(ctx);
            msg = results;

        } catch (e) {

            msg.data = "关注失败!";
            console.error("get personalFollower failed", e)
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

        let msg = {
            status: 0,
            data: ""
        }

        try {
            let results = await page_community.checkUserAuthorBind(ctx);

            msg.status = 1;
            msg.data = results;

        } catch (e) {
            console.error("checkUserAuthorBind failed", e)
        }

        ctx.body = msg;

    }






};







