const query = require("../db/mysql/query");

const community = {

    getHotList : async() =>{
        let topicCountSql = "SELECT topic.topic_name, COUNT(user_focus.topic_id) AS nums FROM user_focus RIGHT JOIN topic ON topic.topic_id = user_focus.topic_id GROUP BY topic.topic_name ORDER BY nums DESC LIMIT ? OFFSET ?";
        let topicCountParam = [4,0];

        const results = await query(topicCountSql,topicCountParam);
        console.log("热门话题 -------------",results);
        var msg = [];
        var arr = "/community/topics/";

        for(let item of results){
            let obj = {
                url : arr.concat(item.topic_name),
                name : item.topic_name
            }
            msg.push(obj);
        }
        console.log("msg",msg);
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

        return listResults;

    },


    getFirstLevelReplyNum : async(userConfig) =>{
        let getListSql = "SELECT COUNT(article_comment.id) AS nums FROM article LEFT JOIN article_comment ON article.post_id = article_comment.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let start = (userConfig.searchIndex - 1) * 7;
        let getListParam = [7, start];
        let results = await query(getListSql, getListParam);
        var replyNums = [];
        for (var i = 0; i < results.length; i++) {
            replyNums.push(results[i].nums);
        }

        return replyNums;
    },

    getSecondLevelReplyNum : async(userConfig) =>{
        let getListSql = "SELECT COUNT(article_recomment.id) AS nums FROM article LEFT JOIN article_recomment ON article.post_id = article_recomment.post_id GROUP BY article.post_date ORDER BY article.post_date DESC LIMIT ? OFFSET ?";
        let start = (userConfig.searchIndex - 1) * 7;
        let getListParam = [7, start];
        let results = await query(getListSql, getListParam);
        var replyNums = [];
        for (var i = 0; i < results.length; i++) {
            replyNums.push(results[i].nums);
        }

        return replyNums;
    },


    getUserIfSubscribed : async (userConfig) =>{

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

        var arr = '/community/topics/';
        var msg = [];

        for(var i = 0;i<results.length;i++){
            msg[i] = {
                url : arr.concat(results[i].topic_name),
                topicName : results[i].topic_name,
                focusNum : results[i].focus_num,
                articleNum : results[i].article_num
            }
        }

        return msg;

    }

}


module.exports = community;









