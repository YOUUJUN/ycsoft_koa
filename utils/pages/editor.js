const query = require("../db/mysql/query");
const Path = require("path");
const uuid = require("uuid");

const Uploader = require("../lib/uploader");

class Editor{
    constructor(props) {

    }

    async getEditorDropDown(ctx){
        let body = ctx.request.body;
        let type = body.type;

        let msg = [];
        if(type === "Article"){
            let getTopicSql = "SELECT topic_name FROM topic";
            let results = await query(getTopicSql);

            let topicName = [];
            for (let i = 0; i < results.length; i++) {
                topicName[i] = results[i].topic_name;
            }

            msg = topicName;
        }else if(type === "Doc"){
            let getTopicSql = "SELECT post_category_name FROM framework_document_category";
            let results = await query(getTopicSql);
            let categoryName = [];
            for (let i = 0; i < results.length; i++) {
                categoryName[i] = results[i].post_category_name;
            }

            msg = categoryName;
        }else{
            msg = [];
        }

        return msg;
    }

    async draftsStorage(ctx){
        let logged = ctx.state.logged;
        let msg = {
            message : "新建草稿失败"
        };

        if(!logged){
            return msg;
        }

        let body = ctx.request.body;
        let referer = ctx.request.header.referer;
        let type = body.type;
        let content = body.content;
        let userId = logged.userId;
        let username = logged.username;
        let postDate = new Date().toLocaleString();

        console.log("content--------------------=",content);

        if(referer.indexOf("/article/drafts/new") !== -1 && type === "Article"){
            let randomArticleName = uuid.v1();

            let articleId = await this.newDrafts({
                type : "article",
                userId : userId,
                userName : username,
                postId : randomArticleName,
                postTitle : content.title,
                PostDate : postDate,
                postContent : content.content,
                postCategory : content.topic
            })

            msg = {
                data : articleId,
                message : "新建文章草稿成功!"
            }
        }else if(referer.indexOf("/doc/drafts/new") !== -1 && type === "Doc"){
            let randomDocName = uuid.v1();

            let docId = await this.newDrafts({
                type : "doc",
                userId : userId,
                userName : username,
                postId : randomDocName,
                postTitle : content.title,
                postDate : postDate,
                postContent : content.content,
                postCategory : content.topic
            })

            if(docId){
                msg = {
                    data : docId,
                    message : "新建文档草稿成功!"
                }
            }
        }else if(referer.indexOf("/doc/drafts/new") === -1 && type === "Article"){
            let refererCache = referer;
            let hash = refererCache.split("/").pop();
            let docName = hash;

            let checkArticleSql = "SELECT COUNT(*) AS nums FROM article_drafts WHERE post_author = ? AND post_id = ?";
            let checkArticleParams = [userId,docName];

            let checkArticleResults = await query(checkArticleSql,checkArticleParams);
            console.log("checkArticleResults[0].nums================",checkArticleResults[0].nums);
            if(checkArticleResults[0].nums == "1"){
                let articleId = await this.saveDrafts({
                    type : "article",
                    userId : userId,
                    postId : docName,
                    postTitle : content.title,
                    postDate : postDate,
                    postContent : content.content,
                    postCategory : content.topic
                })

                if(articleId){
                    msg = {
                        data : articleId,
                        message : "储存文章草稿成功!"
                    }
                }

            }else{
                msg = {
                    message : "储存文章草稿失败!找不到这篇草稿!"
                }
            }


        }else if(referer.indexOf("/doc/drafts/new") === -1 && type === "Doc"){

            let refererCache = referer;
            let hash = refererCache.split("/").pop();
            let docName = hash;

            let checkDocSql = "SELECT COUNT(*) AS nums FROM doc_drafts WHERE post_author = ? AND post_id = ?";
            let checkDocParams = [userId,docName];

            let checkDocResults = await query(checkDocSql,checkDocParams);
            if(checkDocResults[0].nums == "1"){
                let docId = await this.saveDrafts({
                    type : "doc",
                    userId : userId,
                    postId : docName,
                    postTitle : content.title,
                    postDate : postDate,
                    postContent : content.content,
                    postCategory : content.topic
                })

                if(docId){
                    msg = {
                        data : docId,
                        message : "储存文档草稿成功!"
                    }
                }

            }else{
                msg = {
                    message : "储存文档草稿失败!找不到这篇草稿!"
                }
            }


        }

        return msg;
    }



    /*
    * 保存到草稿;
    *options : {
    *   type,
    *   userId,
    *   postId,
    *   postTitle,
    *   postDate,
    *   postContent,
    *   postCategory
    *
    *}
    * */
    async newDrafts(options){
        if(!options.postTitle){
            options.postTitle = "空标题"
        }

        let addsql = "";
        let addparams = [];

        switch (options.type) {

            case "doc":
                let categoryId = await this.getCategoryId(options.postCategory);

                addsql = "INSERT INTO doc_drafts(id,post_id,post_author,latest_modify_date,post_title,post_content,post_category_id) VALUE(0,?,?,?,?,?,?)";
                addparams = [options.postId,options.userId,options.postDate,options.postTitle,options.postContent,categoryId];
                break;

            case "article" :
                let topicId = await this.getTopicId(options.postCategory);

                addsql = "INSERT INTO article_drafts(id,post_id,post_author,latest_modify_date,post_title,post_content,topic_id) VALUE(0,?,?,?,?,?,?)";
                addparams = [options.postId,options.userId,options.postDate,options.postTitle,options.postContent,topicId];
                break;
        }

        let results = await query(addsql, addparams);

        if(results.affectedRows == "1"){
            return options.postId;
        }
    }

    /*--删除文章--*/
    async delArticle(ctx){
        let msg = {
            status : 0,
            message : "删除失败!"
        };
        let logged = ctx.state.logged;
        console.log("logged-------------delArticle--",logged)
        if(!logged){
            return msg;
        }
        let body = ctx.request.body;
        let userId = logged.userId;
        let status = body.status;
        let postId = body.postId;

        let delSql = "";
        let delParams = [];
        let results = [];

        switch(status){
            case "drafts":

                delSql = "DELETE FROM article_drafts WHERE post_author = ? AND post_id = ?";
                delParams = [userId, postId];

                results = await query(delSql, delParams);

                console.log("results2 ====>",userId,postId,results);

                if(results.affectedRows == "1"){
                    msg = {
                        status : 1,
                        message : "删除成功!"
                    };
                }

                break;

            case "posts":

                delSql = "DELETE FROM article WHERE post_author = ? AND post_id = ?";
                delParams = [userId, postId];

                results = await query(delSql, delParams);
                console.log("delParams",delParams);

                if(results.affectedRows == "1"){
                    msg = {
                        status : 1,
                        message : "删除成功!"
                    };
                }

                break;
        }

        return msg;

    }


    /*--删除文档--*/
    async delDoc(ctx){
        let msg = {
            status : 0,
            message : "删除失败!"
        };
        let logged = ctx.state.logged;
        if(!logged){
            return msg;
        }
        let body = ctx.request.body;
        let userId = logged.userId;
        let status = body.status;
        let postId = body.postId;

        let delSql = "";
        let delParams = [];
        let results = [];

        switch(status){
            case "drafts":

                delSql = "DELETE FROM doc_drafts WHERE post_author = ? AND post_id = ?";
                delParams = [userId, postId];

                results = await query(delSql, delParams);

                console.log("results2 ====>",userId,postId,results);

                if(results.affectedRows == "1"){
                    msg = {
                        status : 1,
                        message : "删除成功!"
                    };
                }

                break;

            case "posts":

                delSql = "DELETE FROM framework_document WHERE post_author = ? AND post_id = ?";
                delParams = [userId, postId];

                results = await query(delSql, delParams);

                if(results.affectedRows == "1"){
                    msg = {
                        status : 1,
                        message : "删除成功!"
                    };
                }

                break;
        }

        return msg;
    }


    /*--修改草稿--*/
    async saveDrafts(options){
        console.log("options===============",options);
        if(!options.postTitle){
            options.postTitle = "空标题"
        }
        let modifySql = "";
        let modifyParam = [];

        switch (options.type) {

            case "doc" :

                let categoryId = await this.getCategoryId(options.postCategory);
                console.log("categoryId============",categoryId);

                modifySql = "UPDATE doc_drafts SET latest_modify_date = ?,post_title = ?,post_content = ?,post_category_id = ? WHERE post_author = ? AND post_id = ?";
                modifyParam = [options.postDate,options.postTitle,options.postContent,categoryId,options.userId,options.postId];

                break;

            case "article" :

                let topicId = await this.getTopicId(options.postCategory);
                console.log("topicId============",topicId);

                modifySql = "UPDATE article_drafts SET latest_modify_date = ?,post_title = ?,post_content = ?,topic_id = ? WHERE post_author = ? AND post_id = ?";
                modifyParam = [options.postDate,options.postTitle,options.postContent,topicId,options.userId,options.postId];

                break;
        }

        let results = await query(modifySql,modifyParam);

        if(results.affectedRows == "1"){
            return options.postId;
        }

    }


    /*
    * 获取文章话题ID,
    * 如没有找到，则新建话题
    *
    * */
    async getTopicId(topicName){
        if(!topicName){
            return "";
        }
        console.log("topicName-=====>",topicName);

        let lowChecker = topicName.toLowerCase();
        let checktopicsql = "SELECT COUNT(*) AS nums FROM topic WHERE LCASE(topic_name) = ?";
        let checktopicparam = [lowChecker];

        let results = await query(checktopicsql,checktopicparam);

        if(results[0].nums == "1"){
            console.log("已有话题！");

        }else{
            console.log("这是一个新话题！");
            let addtopicsql = "INSERT INTO topic(topic_id,topic_name) VALUE(0,?)";
            let addtopicparam = [topicName];

            results = await query(addtopicsql,addtopicparam);
        }

        let getTopicNameSql = "SELECT topic_id FROM topic WHERE topic_name = ?";
        let getTopicNameParam = [topicName];

        results = await query(getTopicNameSql,getTopicNameParam);

        return results[0].topic_id;
    }


    /*
    * 获取文档分类ID,
    * 如没有找到，则新建文档分类
    *
    * */
    async getCategoryId(categoryName){
        if(!categoryName){
            return "";
        }

        let lowChecker = categoryName.toLowerCase();
        let checktopicsql = "SELECT COUNT(*) AS nums FROM framework_document_category WHERE LCASE(post_category_name) = ?";
        let checktopicparam = [lowChecker];

        let results = await query(checktopicsql,checktopicparam);

        if(results[0].nums == "1"){
            console.log("已有文档分类！");

        }else{
            console.log("这是一个新文档分类！");
            let addtopicsql = "INSERT INTO framework_document_category(post_category_id,post_category_name) VALUE(0,?)";
            let addtopicparam = [categoryName];

            results = await query(addtopicsql,addtopicparam);
        }

        let getTopicNameSql = "SELECT post_category_id FROM framework_document_category WHERE post_category_name = ?";
        let getTopicNameParam = [categoryName];

        results = await query(getTopicNameSql,getTopicNameParam);

        return results[0].post_category_id;
    }


    /*--通过href获取所指定的文档&文章信息功能--*/
    async getEditorInfo(ctx){
        let logged = ctx.state.logged;
        if(!logged){
            return;
        }


        let username = logged.nickname;
        let userId = logged.userId;
        let body = ctx.request.body;
        let type = body.type;
        let postId = body.postId;

        let searchSql = "";
        let searchParams = [];

        switch(type) {

            case "Doc":

                searchSql = "SELECT doc_drafts.latest_modify_date,doc_drafts.post_author,doc_drafts.post_title,doc_drafts.post_content,framework_document_category.post_category_name FROM doc_drafts LEFT JOIN framework_document_category ON doc_drafts.post_category_id = framework_document_category.post_category_id WHERE doc_drafts.post_id = ? AND doc_drafts.post_author = ?";
                searchParams = [postId,userId];

                let docResults = await query(searchSql, searchParams);
                console.log("docResults ===============>",docResults);

                return {
                    id : postId,
                    title : docResults[0].post_title,
                    content : docResults[0].post_content,
                    topic : docResults[0].post_category_name,
                    time : docResults[0].latest_modify_date,
                    author : username
                }

                break;

            case "Article":

                searchSql = "SELECT article_drafts.latest_modify_date,article_drafts.post_author,article_drafts.post_title,article_drafts.post_content,topic.topic_name FROM article_drafts LEFT JOIN topic ON article_drafts.topic_id = topic.topic_id WHERE article_drafts.post_id = ? AND article_drafts.post_author = ?";
                searchParams = [postId,userId];

                let articleResults = await query(searchSql, searchParams);

                return {
                    id : postId,
                    title : articleResults[0].post_title,
                    content : articleResults[0].post_content,
                    topic : articleResults[0].topic_name,
                    time : articleResults[0].latest_modify_date,
                    author : username
                }

                break;

        }

    }


    /*--发表文章功能--*/
    async postArticle(ctx){
        let logged = ctx.state.logged;
        if(!logged){
            return {
                message : "发表文章失败!请检查登录状态!",
                status : 0
            }
        }

        let referer = ctx.request.header.referer;
        let body = ctx.request.body;

        let postId = referer.split("/").pop();

        let content = body.content;
        let userId = logged.userId;
        let username = logged.username;
        let postDate = new Date().toLocaleString();


        let options = {
            userId : userId,
            postId : postId,
            postTitle : content.title,
            PostDate : postDate,
            postContent : content.content,
            postCategory : content.topic
        }

        let checkSql = "SELECT COUNT(*) AS nums FROM article WHERE post_author = ? AND post_id = ?";
        let checkParams = [userId,postId];

        let results = await query(checkSql, checkParams);

        if(results[0].nums !== 0){
            return {
                message : "发表文章失败!该文章已经处于发表状态!",
                status : 0
            }
        }


        let topicId = await this.getTopicId(options.postCategory);

        let addsql = "INSERT INTO article(id,post_id,post_author,post_date,post_title,post_content,topic_id) VALUE(0,?,?,?,?,?,?)";
        let addparams = [options.postId,options.userId,options.PostDate,options.postTitle,options.postContent,topicId];

        results = await query(addsql, addparams);

        if(results.affectedRows == "1"){

            let newArticleWatchsSql = "INSERT INTO article_watchs(id,post_id,post_author,article_views) VALUE(0,?,?,0)";
            let newArticleWatchsParam = [postId,username];
            await query(newArticleWatchsSql, newArticleWatchsParam);

            let delDraftSql = "DELETE FROM article_drafts WHERE post_author = ? AND post_id = ?";
            let delDraftParams = [userId, postId];

            results = await query(delDraftSql, delDraftParams);

            return {
                message : "发表成功!发表文章到"+options.postCategory+"..发表时间为"+options.PostDate,
                status : 1
            };
        }
    }


    /*--发表文档功能--*/
    async postDoc(ctx){
        let logged = ctx.state.logged;
        if(!logged){
            return {
                message : "发表文档失败!请检查登录状态!",
                status : 0
            }
        }

        let referer = ctx.request.header.referer;
        let body = ctx.request.body;

        let postId = referer.split("/").pop();

        let content = body.content;
        let userId = logged.userId;
        let postDate = new Date().toLocaleString();


        let options = {
            userId : userId,
            postId : postId,
            postTitle : content.title,
            PostDate : postDate,
            postContent : content.content,
            postCategory : content.topic
        }

        let checkSql = "SELECT COUNT(*) AS nums FROM framework_document WHERE post_author = ? AND post_id = ?";
        let checkParams = [userId,postId];

        let results = await query(checkSql, checkParams);

        let categoryId = await this.getCategoryId(options.postCategory);

        if(results[0].nums !== 0){

            let upDataSql = "UPDATE framework_document SET post_title = ?,post_content = ?,post_category = ? WHERE post_author = ? AND post_id = ?";
            let upDataParams = [options.postTitle, options.postContent, categoryId, options.userId, options.postId];

            results = await query(upDataSql, upDataParams);

            return {
                message : "文档修改成功!该文档已经处于发表状态!",
                status : 1
            }
        }


        let addsql = "INSERT INTO framework_document(id,post_id,post_author,post_date,post_title,post_content,post_category) VALUE(0,?,?,?,?,?,?)";
        let addparams = [options.postId,options.userId,options.PostDate,options.postTitle,options.postContent,categoryId];

        results = await query(addsql, addparams);

        if(results.affectedRows == "1"){
            return {
                message : "发表成功!发表文档到"+options.postCategory+"..发表时间为"+options.PostDate,
                status : 1
            };
        }
    }


    /*----修改已发表文章功能（退回草稿）----*/
    async modifyArticle(ctx){
        let msg = {
            message : "修改失败!未知错误!",
            status : 0
        };
        let logged = ctx.state.logged;
        if(!logged){
            msg = {
                message : "修改失败!请检查登录状态!",
                status : 0
            };

            return msg;
        }

        let body = ctx.request.body;
        let userId = logged.userId;
        let postId = body.postId;

        let checkSql = "SELECT COUNT(*) AS nums FROM article WHERE post_author = ? AND post_id = ?";
        let checkParams = [userId,postId];

        let results = await query(checkSql, checkParams);

        if(results[0].nums === 0){
            return {
                message : "修改失败!改文章未处于发表状态!",
                status : 0
            }
        }

        const page_community = require("./community");

        results = await page_community.getArticleInfo(postId);

        let options = {
            type : "article",
            userId : userId,
            postId : postId,
            postTitle : results.title,
            PostDate : results.date,
            postContent : results.content,
            postCategory : results.topicName
        }

        let articleDraftId = await this.newDrafts(options)

        if(!articleDraftId){
            return {
                message : "修改失败!未知错误!",
                status : 0
            }
        }

        let delSql = "DELETE FROM article WHERE post_author = ? AND post_id = ?";
        let delParams = [userId, postId];

        results = await query(delSql, delParams);

        if(results.affectedRows === 1){
            return {
                message : "修改成功!",
                status : 1,
                data : articleDraftId
            }
        }

    }


    /*--获取草稿列表--*/
    async getDraftsList(ctx){
        let logged = ctx.state.logged;
        console.log("getDraftsList",logged);
        if(!logged){
            return;
        }

        let userId = logged.userId;
        let target = ctx.request.body.target;

        let arr = [];

        let results = [];
        switch(target){

            case "Doc" :

                let getDocDraftsSql = "SELECT doc_drafts.* FROM doc_drafts WHERE doc_drafts.post_author = ? ORDER BY doc_drafts.latest_modify_date DESC";
                let getDocDraftsParam = [userId];
                results = await query(getDocDraftsSql, getDocDraftsParam);

                arr = [];
                for(let item of results){
                    let obj = {
                        type : "doc",
                        id : item.post_id,
                        title : item.post_title,
                        date : new Date(item.latest_modify_date).toLocaleString(),
                    }
                    arr.push(obj);
                }

                break;


            case "Article" :

                let getAryticleDraftsSql = "SELECT article_drafts.* FROM article_drafts WHERE article_drafts.post_author = ? ORDER BY article_drafts.latest_modify_date DESC";
                let getAryticleDraftsParam = [userId];
                results = await query(getAryticleDraftsSql, getAryticleDraftsParam);

                arr = [];
                for(let item of results){
                    let obj = {
                        type : "article",
                        id : item.post_id,
                        title : item.post_title,
                        date : new Date(item.latest_modify_date).toLocaleString(),
                    }
                    arr.push(obj);
                }

                break;
        }

        return arr;
    }


    /*--文章编辑上传图片--*/

    async editorUploadimg(ctx){
        let msg = {
            message : '图片上传失败!',
            success : 0,
            url : ""
        };
        let logged = ctx.state.logged;
        if(!logged){
            return msg;
        }

        let userId = logged.userId;

        let savePath = Path.join(__dirname,"../../database/expose/users/",userId,"/images/articles");

        let uploader = new Uploader(ctx);

        let fileName = uploader.saveAs(savePath);

        if(fileName){
            let exposePath = Path.join("/users",userId,"/images/articles",fileName);

            msg = {
                message : '图片上传成功!',
                success : 1,
                url : exposePath
            }
        }

        return msg;

    }

}


let editor = new Editor;



module.exports = editor;


