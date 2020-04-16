const router = require('koa-router')();
const homeController = require('../controler/home');

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

    router.post('/getDocNavigation',homeController.getDocNavigation);

    router.post('/community/getHotList',homeController.getHotList);
    router.post('/community/getArticleList',homeController.getArticleList);
    router.post('/community/getTopicList',homeController.getTopicList);
    router.post('/community/getArticleInfo',homeController.getArticleInfo);
    router.post('/community/getComment',homeController.getComment);
    router.post('/community/getReComment',homeController.getReComment);
    router.post('/community/addComment',homeController.addComment);
    router.post('/community/addReComment',homeController.addReComment);

    router.post('/personal/getAuthorinfo',homeController.getAuthorinfo);
    router.post('/personal/getArticleList',homeController.personalArticleList);
    router.post('/personal/verifyOwner',homeController.verifyOwner);
    router.post('/personal/getFollowUser',homeController.getFollowUser);
    router.post('/personal/addFollow',homeController.addFollow);
    router.post('/personal/getFocusTopic',homeController.getFocusTopic);
    router.post('/personal/checkUserAuthorBind',homeController.checkUserAuthorBind);

    router.post('/community/addFocus',homeController.addFocus);

    router.get('/community/topics/:href',homeController.topics);
    router.post('/community/getTopicInfo',homeController.getTopicInfo);

    /*-用户上传头像-*/
    router.post('/users/uploadimg',homeController.upLoadPortrait)



    router.post('/login',homeController.login);

    router.post('/verifyToken',homeController.verifyToken);


    app.use(router.routes())
        .use(router.allowedMethods());
};
