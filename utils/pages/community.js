const query = require("../db/mysql/query");

const community = {

    getHotList : async() =>{
        let topicCountSql = "SELECT topic.topic_name, COUNT(user_focus.topic_id) AS nums FROM user_focus RIGHT JOIN topic ON topic.topic_id = user_focus.topic_id GROUP BY topic.topic_name ORDER BY nums DESC LIMIT ? OFFSET ?";
        let topicCountParam = [4,0];

        const results = await query(topicCountSql,topicCountParam);
        let msg = [];
        let arr = "/community/topics/";

        for(let item of results){
            let obj = {
                url : arr.concat(item.topic_name),
                name : item.topic_name
            }
            msg.push(obj);
        }
        return msg;

    },

    setUserCookie : async(ctx) => {

        let userConfig = {};
        userConfig.searchIndex = 0;
        userConfig.preferences = [];

        ctx.cookies.set("user",userConfig,{
            maxAge : 86400000,
            httpOnly : true
        })

    },

    getArticleList :  async(userConfig) =>{
        let start = (userConfig.searchIndex - 1) * 7;

        let getListSql = "SELECT article.*,topic.topic_name,users.nickname,users.user_id,COUNT(user_like.id) AS nums FROM article LEFT JOIN topic ON article.topic_id = topic.topic_id LEFT JOIN users ON article.post_author = users.user_name LEFT JOIN user_like ON article.post_id = user_like.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let getListParam = [7, start];

        let listResults = await query(getListSql, getListParam);

        let firstLevelNum = await community.getFirstLevelReplyNum(userConfig);
        let secondLevelNum = await community.getSecondLevelReplyNum(userConfig);

        for(let i =0;i<listResults.length;i++){
            listResults[i].replyNum = parseInt(firstLevelNum[i]) + parseInt(secondLevelNum[i]);
        }

        if(userConfig.logged){
            let subscribeResults = await community.getUserIfSubscribed(userConfig);

            console.log("listResults ===>",listResults);
            listResults.forEach(function (item,index) {
                if(subscribeResults.includes(item.post_id)){
                    listResults[index].ifSubscribed = true;
                }else{
                    listResults[index].ifSubscribed = false;
                }
            })
        }

        return listResults;

    },


    getFirstLevelReplyNum : async(userConfig) =>{
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

    getSecondLevelReplyNum : async(userConfig) =>{
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


    getUserIfSubscribed : async (userConfig) =>{
        let sql = "SELECT post_id FROM article AS b WHERE b.post_id IN (SELECT a.post_id FROM user_like AS a WHERE user_name = ?)";
        let param = [userConfig.logged.username];
        let results = await query(sql,param);

        let arr = [];

        for(let i=0;i<results.length;i++){
            arr[i] = results[i].post_id;
        }

        console.log("arr === >",arr);

        return arr;

    },


    getTopicList : async (ctx) =>{
        let body = ctx.request.body;
        let limit = body.limit;

        let getArticleNumSql = "";
        let getArticleNumParam = [];


        if(limit && limit == 'false'){
            getArticleNumSql = "SELECT COUNT(user_focus.topic_id) AS focus_num, n.topic_name, n.article_num FROM (SELECT topic.topic_name, topic.topic_id, COUNT(article.topic_id) AS article_num FROM topic LEFT JOIN article ON topic.topic_id = article.topic_id GROUP BY article.topic_id) AS n LEFT JOIN user_focus ON n.topic_id = user_focus.topic_id GROUP BY n.topic_name ORDER BY article_num DESC";
            getArticleNumParam = [];
        }else{
            getArticleNumSql = "SELECT COUNT(user_focus.topic_id) AS focus_num, n.topic_name, n.article_num FROM (SELECT topic.topic_name, topic.topic_id, COUNT(article.topic_id) AS article_num FROM topic LEFT JOIN article ON topic.topic_id = article.topic_id GROUP BY article.topic_id) AS n LEFT JOIN user_focus ON n.topic_id = user_focus.topic_id GROUP BY n.topic_name ORDER BY article_num DESC LIMIT ? OFFSET ?";
            getArticleNumParam = [5,0];
        }

        let results = await query(getArticleNumSql, getArticleNumParam);

        let arr = '/community/topics/';
        let msg = [];

        for(let i = 0;i<results.length;i++){
            msg[i] = {
                url : arr.concat(results[i].topic_name),
                topicName : results[i].topic_name,
                focusNum : results[i].focus_num,
                articleNum : results[i].article_num
            }
        }

        return msg;

    },



    /*---community-article---*/


    async getArticleInfo (postId){

        let getArticleSql = "SELECT article.*,users.nickname,users.user_id,user_info.portrait,user_info.introduction FROM article RIGHT JOIN users ON article.post_author = users.user_name LEFT JOIN user_info ON users.user_id = user_info.user_id WHERE article.post_id = ?";
        let getArticleParam = [postId];

        let msg = {}
        let fixHead = "/personal/";
        let results = await query(getArticleSql,getArticleParam);

        let articleView = await community.getArticleViews(postId);

        if(results.length == 0){
            return msg;
        }

        msg = {
            url : fixHead.concat(results[0].user_id),
            authorName : results[0].post_author,
            author : results[0].nickname,
            authorPortrait : results[0].portrait,
            authorIntroduction : results[0].introduction,
            date : results[0].post_date,
            title : results[0].post_title,
            content : results[0].post_content,
            articleView : articleView
        };

        /*---读取该文章作者浏览量总数---*/
        let getUserViewsSql = "SELECT SUM(article_views) AS nums FROM article_watchs WHERE post_author = ?";
        let getUserViewsParam = [msg.authorName];

        results = await query(getUserViewsSql,getUserViewsParam);
        msg.userView = results[0].nums;

        /*---读取该文章作者被点赞总数---*/
        let getUserLikeSql = "SELECT COUNT(*) AS nums,article.post_author FROM user_like LEFT JOIN article ON user_like.post_id = article.post_id WHERE article.post_author = ?";
        let getUserLikeParam = [msg.authorName];

        results = await query(getUserLikeSql,getUserLikeParam);
        msg.userLike = results[0].nums;

        msg.articleView = await community.getArticleViews(postId);

        /*---读取该文章作者被关注的总数---*/
        let getBeWatchedNumSql = "SELECT COUNT(*) AS nums,users.user_name FROM user_follow LEFT JOIN users ON user_follow.author_id = users.user_id WHERE users.user_name = ?";
        let getBeWatchedNumParam = [msg.authorName];

        results = await query(getBeWatchedNumSql,getBeWatchedNumParam);

        msg.beWatchedNum = results[0].nums;

        return msg;

    },

    async getArticleViews (postId){
        let getArticleViewsSql = "SELECT article_views FROM article_watchs WHERE post_id = ?";
        let getArticleViewsParam = [postId];

        let results = await query(getArticleViewsSql,getArticleViewsParam);

        return results[0].article_views;
    },


}


module.exports = community;









