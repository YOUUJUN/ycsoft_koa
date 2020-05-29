const router = require('koa-router')();
const homeController = require('../controler/home');

const uuid = require("uuid");
const Path = require("path");
const busboy = require('koa-busboy');


//format 表单提交
const uploader = busboy({
    dest: Path.join(__dirname,"../database/cache"), // default is system temp folder (`os.tmpdir()`)
    fnDestFilename: (fieldname, filename) => uuid.v1() + filename
});

module.exports = (app) => {

    router.get('/',homeController.index);
    router.get('/products',homeController.products);
    router.get('/guide',homeController.guide);
    router.get('/contact',homeController.contact);
    router.get('/community',homeController.community);
    router.get("/community/post/:href",homeController.poster);
    router.get("/personal/:href",homeController.personal);
    router.get('/guide/:href',homeController.getDocByHash);
    router.get('/users/setting',homeController.setting);
    /*--editor  artical,doc  drafts --*/
    router.get('/editor/:project/drafts/:href',homeController.editor);

    /*--page- guide--*/
    router.post('/getDocNavigation',homeController.getDocNavigation);

    /*--page- community--*/
    router.post('/community/getHotList',homeController.getHotList);
    router.post('/community/getArticleList',homeController.getArticleList);
    router.post('/community/getTopicList',homeController.getTopicList);
    router.post('/community/getArticleInfo',homeController.getArticleInfo);
    router.post('/community/getComment',homeController.getComment);
    router.post('/community/getReComment',homeController.getReComment);
    router.post('/community/addComment',homeController.addComment);
    router.post('/community/addReComment',homeController.addReComment);
    router.post('/community/addFocus',homeController.addFocus);
    router.get('/community/topics/:href',homeController.topics);
    router.post('/community/getTopicInfo',homeController.getTopicInfo);

    /*--page- personal--*/
    router.post('/personal/getAuthorinfo',homeController.getAuthorinfo);
    router.post('/personal/getArticleList',homeController.personalArticleList);
    router.post('/personal/verifyOwner',homeController.verifyOwner);
    router.post('/personal/getFollowUser',homeController.getFollowUser);
    router.post('/personal/addFollow',homeController.addFollow);
    router.post('/personal/getFocusTopic',homeController.getFocusTopic);
    router.post('/personal/checkUserAuthorBind',homeController.checkUserAuthorBind);


    /*-用户上传头像-*/
    router.post('/users/uploadimg',uploader,homeController.upLoadPortrait);
    /*-获取用户信息-*/
    router.post('/users/getUserInfo',homeController.getUserInfo);
    /*-修改用户信息-*/
    router.post('/users/modifyUserInfo',homeController.modifyUserInfo);
    router.post('/login',homeController.login);
    router.post('/register',homeController.register);


    /*--editor--*/
    router.post('/editor/getEditorDropDown',homeController.getEditorDropDown);
    router.post('/editor/draftsStorage',homeController.draftsStorage);
    router.post('/editor/getEditorInfo',homeController.getEditorInfo);
    router.post('/editor/postArticle',homeController.postArticle);
    router.post('/editor/postDoc',homeController.postDoc);



    router.post('/verifyToken',homeController.verifyToken);


    app.use(router.routes())
        .use(router.allowedMethods());
};
