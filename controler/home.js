const router = require('koa-router')();

const fsPromises = require('fs').promises;

const util = require("util");
// const execFile = util.promisify(require("child_process").execFile);

const page_guide = require("../utils/pages/guide");

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
        console.log("fuck");
        ctx.body = msg;

    }

};




