const query = require("../db/mysql/query");


const guide = {

    getSideNavigation : async () => {
        const getNavigationSql = "SELECT A.*,B.post_category_name FROM framework_document AS A LEFT JOIN framework_document_category AS B ON A.post_category = B.post_category_id";

        const results = await query(getNavigationSql);

        const info = [];
        for(let item of results){
            info.push({
                id : item.post_id,
                title : item.post_title,
                category : item.post_category_name
            });
        }

        return info;
    },

    getDocByHash : async (href) =>{
        const getDocumentSql = "SELECT A.* FROM framework_document AS A WHERE A.post_id = ? ";
        const getDocumentParam = [href];
        let results = await query(getDocumentSql,getDocumentParam);
        return results;
    }


};



module.exports = guide;