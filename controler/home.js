const router = require('koa-router')();

const fsPromises = require('fs').promises;

const util = require("util");
// const execFile = util.promisify(require("child_process").execFile);

const page_guide = require("../utils/pages/guide");
const page_community = require("../utils/pages/community");

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

        const msg = {
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

    /*--community--*/
    getHotList : async (ctx, next) =>{

        const msg = {
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

        const msg = {
            status : 0,
            data : "",
            info : ""
        }

        let body = ctx.request.body;
        console.log("body",body);

        let searchIndex = body.postIndex;
        let searchTopic = body.topic;

        const userConfig = {};

        userConfig.searchIndex = searchIndex;
        userConfig.searchTopic = searchTopic;

        try {
            let results = await page_community.getArticleList(userConfig);

            if (searchIndex != 1 && results.length == 0) {
                msg.info = "已经加载完全部文章了哦！";
                msg.status = 2;
            }else{

                var arr = '/community/post/';
                var arr2 = '/personal/';

                var newResults = [];

                for (var i = 0; i < results.length; i++) {
                    newResults[i] = {
                        id : results[i].post_id,
                        userUrl : arr2.concat(results[i].user_id),
                        url: arr.concat(results[i].post_id),
                        author: results[i].nickname,
                        date: results[i].post_date,
                        title: results[i].post_title,
                        topic: results[i].topic_name,
                        likeNum : results[i].nums,
                        replyNum: results[i].replyNum
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
        const msg = {
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
    }

};




