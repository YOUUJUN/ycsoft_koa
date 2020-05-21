const query = require("../db/mysql/query");

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

}


let editor = new Editor;



module.exports = editor;


