const query = require("../db/mysql/query");
const uuid = require("uuid");
var formidable = require('formidable');
const fs = require("fs");
const Path = require("path");

const community = {

    getHotList: async () => {
        let topicCountSql = "SELECT topic.topic_name, COUNT(user_focus.topic_id) AS nums FROM user_focus RIGHT JOIN topic ON topic.topic_id = user_focus.topic_id GROUP BY topic.topic_name ORDER BY nums DESC LIMIT ? OFFSET ?";
        let topicCountParam = [4, 0];

        const results = await query(topicCountSql, topicCountParam);
        let msg = [];
        let arr = "/community/topics/";

        for (let item of results) {
            let obj = {
                url: arr.concat(item.topic_name),
                name: item.topic_name
            }
            msg.push(obj);
        }
        return msg;

    },

    setUserCookie: async (ctx) => {

        let userConfig = {};
        userConfig.searchIndex = 0;
        userConfig.preferences = [];

        ctx.cookies.set("user", userConfig, {
            maxAge: 86400000,
            httpOnly: true
        })

    },

    getArticleList: async (userConfig) => {

        console.log("searchTopic ==>",userConfig.searchTopic);

        let start = (userConfig.searchIndex - 1) * 7;

        let getListSql = "SELECT article.*,topic.topic_name,users.nickname,users.user_id,COUNT(user_like.id) AS nums FROM article LEFT JOIN topic ON article.topic_id = topic.topic_id LEFT JOIN users ON article.post_author = users.user_name LEFT JOIN user_like ON article.post_id = user_like.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let getListParam = [7, start];

        if(userConfig.searchTopic){
            getListSql = "SELECT article.*,topic.topic_name,users.nickname,users.user_id,COUNT(user_like.id) AS nums FROM article LEFT JOIN topic ON article.topic_id = topic.topic_id LEFT JOIN users ON article.post_author = users.user_name LEFT JOIN user_like ON article.post_id = user_like.post_id WHERE topic.topic_name = ? GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
            getListParam = [userConfig.searchTopic,7, start];
        }

        let listResults = await query(getListSql, getListParam);

        let firstLevelNum = await community.getFirstLevelReplyNum(userConfig);
        let secondLevelNum = await community.getSecondLevelReplyNum(userConfig);

        for (let i = 0; i < listResults.length; i++) {
            listResults[i].replyNum = parseInt(firstLevelNum[i]) + parseInt(secondLevelNum[i]);
        }

        if (userConfig.logged) {
            let subscribeResults = await community.getUserIfSubscribed(userConfig.logged);

            listResults.forEach(function (item, index) {
                if (subscribeResults.includes(item.post_id)) {
                    listResults[index].ifSubscribed = true;
                } else {
                    listResults[index].ifSubscribed = false;
                }
            })
        }

        return listResults;

    },


    getFirstLevelReplyNum: async (userConfig) => {
        let getListSql = "SELECT COUNT(article_comment.id) AS nums FROM article LEFT JOIN article_comment ON article.post_id = article_comment.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let start = (userConfig.searchIndex - 1) * 7;
        let getListParam = [7, start];
        let results = await query(getListSql, getListParam);
        let replyNums = [];
        for (let i = 0; i < results.length; i++) {
            replyNums.push(results[i].nums);
        }

        return replyNums;
    },

    getSecondLevelReplyNum: async (userConfig) => {
        let getListSql = "SELECT COUNT(article_recomment.id) AS nums FROM article LEFT JOIN article_recomment ON article.post_id = article_recomment.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let start = (userConfig.searchIndex - 1) * 7;
        let getListParam = [7, start];
        let results = await query(getListSql, getListParam);
        let replyNums = [];
        for (let i = 0; i < results.length; i++) {
            replyNums.push(results[i].nums);
        }

        return replyNums;
    },


    getUserIfSubscribed: async (userConfig) => {
        let sql = "SELECT post_id FROM article AS b WHERE b.post_id IN (SELECT a.post_id FROM user_like AS a WHERE user_name = ?)";
        let param = [userConfig.username];
        let results = await query(sql, param);

        let arr = [];

        for (let i = 0; i < results.length; i++) {
            arr[i] = results[i].post_id;
        }

        console.log("arr === >", arr);

        return arr;

    },


    getTopicList: async (ctx) => {
        let logged = ctx.state.logged;

        let body = ctx.request.body;
        let limit = body.limit;

        let getArticleNumSql = "";
        let getArticleNumParam = [];


        if (limit) {
            getArticleNumSql = "SELECT COUNT(user_focus.topic_id) AS focus_num, n.topic_name, n.article_num FROM (SELECT topic.topic_name, topic.topic_id, COUNT(article.topic_id) AS article_num FROM topic LEFT JOIN article ON topic.topic_id = article.topic_id GROUP BY article.topic_id) AS n LEFT JOIN user_focus ON n.topic_id = user_focus.topic_id GROUP BY n.topic_name ORDER BY article_num DESC LIMIT ? OFFSET ?";
            getArticleNumParam = [5, 0];
        } else {
            getArticleNumSql = "SELECT COUNT(user_focus.topic_id) AS focus_num, n.topic_name, n.article_num FROM (SELECT topic.topic_name, topic.topic_id, COUNT(article.topic_id) AS article_num FROM topic LEFT JOIN article ON topic.topic_id = article.topic_id GROUP BY article.topic_id) AS n LEFT JOIN user_focus ON n.topic_id = user_focus.topic_id GROUP BY n.topic_name ORDER BY article_num DESC";
            getArticleNumParam = [];
        }

        let results = await query(getArticleNumSql, getArticleNumParam);

        let arr = '/community/topics/';
        let msg = [];

        for (let i = 0; i < results.length; i++) {
            let obj = {
                url: arr.concat(results[i].topic_name),
                topicName: results[i].topic_name,
                focusNum: results[i].focus_num,
                articleNum: results[i].article_num,
                ifFocused : false
            }
            msg.push(obj);
        }


        if(logged){
            let userFocusTopicSql = "SELECT topic.topic_name FROM user_focus LEFT JOIN topic ON user_focus.topic_id = topic.topic_id WHERE user_name = ?";
            let userFocusTopicParam = [logged.username];

            results = await query(userFocusTopicSql,userFocusTopicParam);

            let focusList = [];
            for(let item of results){
                focusList.push(item.topic_name);
            }

            for(let item of msg){
                if(focusList.includes(item.topicName)){
                    item.ifFocused = true;
                }else{
                    item.ifFocused = false;
                }
            }
        }


        return msg;

    },


    /*---community-article---*/

    async getArticleInfo(postId) {

        let getArticleSql = "SELECT article.*,users.nickname,users.user_id,user_info.portrait,user_info.introduction FROM article RIGHT JOIN users ON article.post_author = users.user_name LEFT JOIN user_info ON users.user_id = user_info.user_id WHERE article.post_id = ?";
        let getArticleParam = [postId];

        let msg = {}
        let fixHead = "/personal/";
        let results = await query(getArticleSql, getArticleParam);

        let articleView = await community.getArticleViews(postId);

        if (results.length == 0) {
            return msg;
        }

        msg = {
            url: fixHead.concat(results[0].user_id),
            authorName: results[0].post_author,
            author: results[0].nickname,
            authorPortrait: results[0].portrait,
            authorIntroduction: results[0].introduction,
            date: results[0].post_date,
            title: results[0].post_title,
            content: results[0].post_content,
            articleView: articleView
        };

        /*---读取该文章作者浏览量总数---*/
        let getUserViewsSql = "SELECT SUM(article_views) AS nums FROM article_watchs WHERE post_author = ?";
        let getUserViewsParam = [msg.authorName];

        results = await query(getUserViewsSql, getUserViewsParam);
        msg.userView = results[0].nums;

        /*---读取该文章作者被点赞总数---*/
        let getUserLikeSql = "SELECT COUNT(*) AS nums,article.post_author FROM user_like LEFT JOIN article ON user_like.post_id = article.post_id WHERE article.post_author = ?";
        let getUserLikeParam = [msg.authorName];

        results = await query(getUserLikeSql, getUserLikeParam);
        msg.userLike = results[0].nums;

        /*---读取该文章作者被关注的总数---*/
        let getBeWatchedNumSql = "SELECT COUNT(*) AS nums,users.user_name FROM user_follow LEFT JOIN users ON user_follow.author_id = users.user_id WHERE users.user_name = ?";
        let getBeWatchedNumParam = [msg.authorName];

        results = await query(getBeWatchedNumSql, getBeWatchedNumParam);

        msg.beWatchedNum = results[0].nums;

        return msg;

    },

    async getArticleViews(postId) {
        let getArticleViewsSql = "SELECT article_views FROM article_watchs WHERE post_id = ?";
        let getArticleViewsParam = [postId];

        let results = await query(getArticleViewsSql, getArticleViewsParam);

        return results[0].article_views;
    },


    async getComment(postId) {
        let getCommentSql = "SELECT article_comment.*,COUNT(article_recomment.id) AS nums,users.nickname,user_info.* FROM article_comment LEFT JOIN users ON article_comment.user_id = users.user_id LEFT JOIN user_info ON user_info.user_id = article_comment.user_id LEFT JOIN article_recomment ON article_comment.comment_id = article_recomment.comment_id WHERE article_comment.post_id = ? GROUP BY article_comment.id Order By article_comment.add_time Desc";
        let getCommentParam = [postId];

        let results = await query(getCommentSql, getCommentParam);

        let msg = [];
        let fixHead = "/personal/";
        for (let i = 0; i < results.length; i++) {
            let obj = {
                commentid: results[i].comment_id,
                userid: results[i].user_id,
                nickname: results[i].nickname,
                url: fixHead.concat(results[i].user_id),
                portrait: results[i].portrait,
                introduction: results[i].introduction,
                addtime: results[i].add_time,
                message: results[i].message,
                reCommentNum: results[i].nums
            }
            msg.push(obj);
        }

        return msg;
    },


    async getReComment(postId, commentId) {
        console.log("postId", postId, commentId);
        let getReCommentSql = "SELECT article_recomment.*,users.nickname,user_info.* FROM article_recomment LEFT JOIN users ON article_recomment.user_id = users.user_id LEFT JOIN user_info ON user_info.user_id = article_recomment.user_id WHERE article_recomment.post_id = ? AND article_recomment.comment_id = ? GROUP BY article_recomment.add_time";
        let getReCommentParam = [postId, commentId];

        let results = await query(getReCommentSql, getReCommentParam);

        var msg = [];
        var arr = "/personal/";
        for (var i = 0; i < results.length; i++) {
            let obj = {
                commentid: results[i].comment_id,
                userid: results[i].user_id,
                nickname: results[i].nickname,
                url: arr.concat(results[i].user_id),
                portrait: results[i].portrait,
                introduction: results[i].introduction,
                addtime: results[i].add_time,
                message: results[i].message
            }
            msg.push(obj);
        }

        return msg;
    },


    async addComment(body, logInfo) {
        let postId = body.commentInfo.postId;
        let content = body.commentInfo.message;
        let addTime = new Date().toLocaleString();
        let userId = logInfo.userId;

        let msg = {
            info: '发表评论失败!',
            status: 0
        };

        if (content == '') {
            msg = {
                info: '请输入评论内容',
                status: 0
            };

            return msg;
        }

        let commentId = uuid.v1();

        let getObjectIdSql = "SELECT users.user_id FROM article LEFT JOIN users ON users.user_name = article.post_author WHERE article.post_id = ? ";
        let getObjectIdParam = [postId];

        let results = await query(getObjectIdSql, getObjectIdParam);
        console.log("results", results);
        let objectId = results[0].user_id;

        let addCommentSql = "INSERT INTO article_comment(id,comment_id,post_id,object_id,user_id,message,add_time) VALUE(0,?,?,?,?,?,?)";
        let addCommentParam = [commentId, postId, objectId, userId, content, addTime];

        results = await query(addCommentSql, addCommentParam);

        if (results.affectedRows == '1') {
            msg = {
                info: '发表评论成功！',
                status: 1
            }
        }

        return msg;

    },


    async addReComment(body, logInfo) {
        let postId = body.replyInfo.postId;
        let commentId = body.replyInfo.commentId;
        let content = body.replyInfo.message;
        let addTime = new Date().toLocaleString();
        let userId = logInfo.userId;
        let objectId = body.replyInfo.defendantId;

        let msg = {
            info: '发表评论失败!',
            status: 0
        };

        if (content == '') {
            msg = {
                info: '请输入评论内容',
                status: 0
            };

            return msg;
        }

        let addReCommentSql = "INSERT INTO article_recomment(id,comment_id,post_id,user_id,object_id,message,add_time) VALUE(0,?,?,?,?,?,?)";
        let addReCommentParam = [commentId, postId, userId, objectId, content, addTime];

        let results = await query(addReCommentSql, addReCommentParam);

        if (results.affectedRows == '1') {
            msg = {
                info: '发表评论成功！',
                status: 1
            }
        }

        return msg;

    },


    /*---personal---*/


    async personalArticleList(ctx) {
        let body = ctx.request.body
        let userId = body.userId;
        let logged = ctx.state.logged;

        let getArticleSql = "SELECT article.*,topic.topic_name,users.nickname,users.user_id,COUNT(user_like.id) AS nums FROM article LEFT JOIN topic ON article.topic_id = topic.topic_id LEFT JOIN users ON article.post_author = users.user_name LEFT JOIN user_like ON article.post_id = user_like.post_id WHERE users.user_id = ? GROUP BY article.post_date ORDER BY article.post_date DESC";
        let getArticleParam = [userId];
        let results = await query(getArticleSql, getArticleParam);

        let getCommentSql = "SELECT COUNT(article_comment.id) AS nums FROM article LEFT JOIN article_comment ON article.post_id = article_comment.post_id LEFT JOIN users ON article.post_author = users.user_name WHERE users.user_id = ? GROUP BY article.post_date ORDER BY article.post_date DESC";
        let results2 = await query(getCommentSql, getArticleParam);

        let getReCommentSql = "SELECT COUNT(article_recomment.id) AS nums FROM article LEFT JOIN article_recomment ON article.post_id = article_recomment.post_id LEFT JOIN users ON article.post_author = users.user_name WHERE users.user_id = ? GROUP BY article.post_date ORDER BY article.post_date DESC";
        let results3 = await query(getReCommentSql, getArticleParam);


        let msg = [];
        let arr = "/community/post/";
        for (var i = 0; i < results.length; i++) {
            let obj = {
                title: results[i].post_title,
                date: results[i].post_date,
                url: arr.concat(results[i].post_id),
                id: results[i].post_id,
                likeNum: results[i].nums,
                commentNum: results2[i].nums + results3[i].nums
            }
            msg.push(obj);
        }


        if (logged) {
            let subscribeResults = await community.getUserIfSubscribed(logged);

            msg.forEach(function (item, index) {
                if (subscribeResults.includes(item.post_id)) {
                    msg[index].ifSubscribed = true;
                } else {
                    msg[index].ifSubscribed = false;
                }
            })
        }

        return msg;

    },

    async getFollowUser(ctx) {

        let logged = ctx.state.logged;

        let body = ctx.request.body;

        let getTargetIdSql = "SELECT user_name FROM users WHERE user_id = ?";
        let getTargetIdParam = [body.userId];

        let result1 = await query(getTargetIdSql, getTargetIdParam);
        let username = result1[0].user_name;

        let getAuthorInfoSql = "SELECT user_follow.author_id, user_info.*,users.nickname FROM user_follow LEFT JOIN user_info ON user_info.user_id = user_follow.author_id LEFT JOIN users ON users.user_id = user_follow.author_id WHERE user_follow.user_name = ?";
        let getAuthorInfoParam = [username];

        let results = await query(getAuthorInfoSql, getAuthorInfoParam);

        var data = [];

        var arr = "/personal/";
        for (var i = 0; i < results.length; i++) {
            let obj = {
                nickname: results[i].nickname,
                id: results[i].user_id,
                url: arr.concat(results[0].user_id),
                portrait: results[i].portrait,
                introduction: results[i].introduction,
                ifFollowed: false
            }
            data.push(obj);
        }


        if (logged) {
            let checkFollowSql = "SELECT author_id FROM user_follow WHERE user_name = ?";
            let checkFollowParam = [logged.username];

            results = await query(checkFollowSql, checkFollowParam);

            var checkList = [];

            for (var i = 0; i < results.length; i++) {
                checkList[i] = results[i].author_id;
            }


            for (let item of data) {
                if (checkList.includes(item.id)) {
                    item.ifFollowed = true;
                } else {
                    item.ifFollowed = false;
                }
            }
        }


        return data;

    },


    async checkUserAuthorBind(ctx) {
        let body = ctx.request.body;
        let logged = ctx.state.logged;

        let checkIfConcernSql = "SELECT COUNT(*) AS nums FROM user_follow WHERE user_name = ? AND author_id = ?";
        let checkIfConcernParam = [logged.username, body.userId];

        let results = await query(checkIfConcernSql, checkIfConcernParam);

        if (results[0].nums == 0) {
            return false;
        } else {
            return true;
        }

    },

    async addFollow(ctx) {
        let msg = {
            data: "操作失败!",
            status: 0
        };

        let logged = ctx.state.logged;

        if (!logged) {
            return;
        }
        let body = ctx.request.body;

        let authorId = body.userId;
        let username = logged.username;
        console.log("username==--==", username, authorId);

        if (logged.userId == authorId) {
            return {
                data: "不能关注自己哦!",
                status: 0
            };
        }

        let checkFollowSql = "SELECT COUNT(*) AS nums FROM user_follow WHERE user_name = ? AND author_id = ?";
        let checkFollowParam = [username, authorId];

        /*---查询是否已经关注该作者---*/
        let result = await query(checkFollowSql, checkFollowParam);

        let nums = result[0].nums;

        console.log("nums ====> ", nums);

        if (nums == "0") {
            let upDateFollowSql = "INSERT user_follow(id,user_name,author_id) VALUE(0,?,?)";
            let upDateFollowParam = [username, authorId];

            let result = await query(upDateFollowSql, upDateFollowParam);

            if (result.affectedRows == '1') {
                msg = {
                    data: "关注成功!",
                    status: 1
                };

            }
        } else {

            let delFollowSql = "DELETE FROM user_follow WHERE user_name = ? AND author_id = ?";
            let delFollowParam = [username, authorId];

            result = await query(delFollowSql, delFollowParam);

            console.log("ok", result);

            if (result.affectedRows == '1') {

                msg = {
                    data: "取消关注成功!",
                    status: 2
                };

            }

        }

        return msg;

    },

    async getFocusTopic(ctx) {
        let body = ctx.request.body;

        let logged = ctx.state.logged;

        let userId = body.userId;

        let getAuthorNameSql = "SELECT user_name FROM users WHERE user_id = ?";
        let getAuthorNameParam = [userId];

        let result = await query(getAuthorNameSql, getAuthorNameParam);

        let username = result[0].user_name

        let getFocusTopicSql = "SELECT topic.topic_name FROM user_focus LEFT JOIN topic ON user_focus.topic_id = topic.topic_id WHERE user_name = ?";
        let getFocusTopicParam = [username];

        result = await query(getFocusTopicSql, getFocusTopicParam);

        let msg = [];
        for (let i = 0; i < result.length; i++) {
            let obj = {
                name: result[i].topic_name,
                userFocused: false
            }
            msg.push(obj);
        }

        if (logged) {

            let checkUserFocusSql = "SELECT topic.topic_name FROM user_focus LEFT JOIN topic ON user_focus.topic_id = topic.topic_id WHERE user_name = ?";
            let checkUserFocusParam = [logged.username];

            result = await query(checkUserFocusSql, checkUserFocusParam);

            let userFocus = [];
            for (let i = 0; i < result.length; i++) {
                userFocus[i] = result[i].topic_name;
            }

            for (let item of msg) {
                if (userFocus.includes(item.name)) {
                    item.userFocused = true;
                }
            }

        }

        console.log("msg", msg);

        return msg;

    },


    async addFocus(ctx) {

        let msg = {
            data: "操作失败!",
            status: 0
        };

        let logged = ctx.state.logged;

        if (!logged) {
            return;
        }
        let body = ctx.request.body;

        let topicName = body.topicName;
        console.log("body",body);

        /*---根据话题名获取话题ID---*/
        let getTopicIdSql = "SELECT topic_id FROM topic WHERE topic_name = ?";
        let getTopicIdParam = [topicName];

        let results = await query(getTopicIdSql, getTopicIdParam);

        let topicId = results[0].topic_id;

        let checkFocusSql = "SELECT COUNT(*) AS nums FROM user_focus WHERE topic_id = ? AND user_name = ?";
        let checkFocusParam = [topicId, logged.username];

        results = await query(checkFocusSql, checkFocusParam);

        let ifFocused = results[0].nums;

        if (ifFocused == "0") {
            let addUserTopicFocusSql = "INSERT INTO user_focus(id,user_name,topic_id) VALUE(0,?,?)";
            let addUserTopicFocusParam = [logged.username, topicId];

            results = await query(addUserTopicFocusSql, addUserTopicFocusParam);

            if (results.affectedRows == '1') {
                msg = {
                    status: 1,
                    data: "关注成功!"
                }
            }

        } else {
            let delUserTopicFocusSql = "DELETE FROM user_focus WHERE topic_id = ? AND user_name = ?";
            let delUserTopicFocusParam = [topicId, logged.username];

            results = await query(delUserTopicFocusSql, delUserTopicFocusParam);

            if (results.affectedRows == '1') {
                msg = {
                    status: 2,
                    data: "已取消关注该话题!"
                }
            }

        }

        return msg;

    },


    async getTopicInfo (ctx){

        let logged = ctx.state.logged;

        let body = ctx.request.body;
        let topicName = body.topicName;

        let getTopicIdSql = "SELECT topic_id FROM topic WHERE topic_name = ?";
        let getTopicIdParam = [topicName];

        /*获取话题关注数*/
        let results = await query(getTopicIdSql,getTopicIdParam);

        let topicId = results[0].topic_id;

        let topicInfoSql = "SELECT COUNT(*) AS nums FROM user_focus WHERE topic_id = ?";
        let topicInfoParam = [topicId];

        results = await query(topicInfoSql,topicInfoParam);

        let data = {
            name : topicName,
            num : results[0].nums,
            ifFocused : false
        };

        if(logged){

            let checkFocusSql = "SELECT COUNT(*) AS nums FROM user_focus WHERE topic_id = ? AND user_name = ?";
            let checkFocusParam = [topicId,logged.username];

            results = await query(checkFocusSql,checkFocusParam);

            if(results[0].nums == 0){
                data.ifFocused = false;
            }else if(results[0].nums == 1){
                data.ifFocused = true;
            }
        }

        return data;

    },



    /*---用户设置---*/
    /*-用户上传头像-*/
    async upLoadPortrait(ctx){
        // const multiparty = require("multiparty");
        // let form = new multiparty.Form({uploadDir:Path.join(__dirname,"../../database")});
        // await form.parse(ctx.req,function(err,fields,files){
        //     if(err){throw err; return;}
        //     console.log(fields);//除文件外的其他附带信息
        //     console.log(files.file[0]);//文件信息
        //     return ;
        // });


        // const Busboy = require('busboy');
        //
        // let busboy = new Busboy(ctx.req);
        //
        // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        //     console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        //     file.on('data', function(data) {
        //         console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        //     });
        //     file.on('end', function() {
        //         console.log('File [' + fieldname + '] Finished');
        //     });
        // });
        // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        //     console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        // });
        // busboy.on('finish', function() {
        //     console.log('Done parsing form!');
        //     // res.writeHead(303, { Connection: 'close', Location: '/' });
        //     // res.end();
        // });

        // console.log('ctx.request.body', ctx.request.files[0]);
        console.log('ctx.request.body', ctx.req);
        // console.log('ctx.request', ctx.request.body);



        // let file = ctx.request;
        // console.log('ctx.request.file', ctx.request.file);
        // console.log('ctx.file', ctx.file);
        // console.log('ctx.request.body', ctx.request.body);
        // console.log("__dirname",Path.join(__dirname,"../../database"));
        // console.log("file",file.path);
        // let readStream = fs.createReadStream(file);
        // let writeStream = fs.createWriteStream(Path.join(__dirname,"../../database"));
        // readStream.pipe(writeStream);




    }


}


module.exports = community;









