const router = require('koa-router')();
const homeController = require('../controler/home');

module.exports = (app) => {

    router.get('/',homeController.index);
    router.get('/products',homeController.products);
    router.get('/guide',homeController.guide);
    router.get('/contact',homeController.contact);
    router.get('/community',homeController.community);
    router.get("/community/post/:href",homeController.poster);


    router.post('/getDocNavigation',homeController.getDocNavigation);

    router.get('/guide/:href',homeController.getDocByHash);

    router.post('/community/getHotList',homeController.getHotList);
    router.post('/community/getArticleList',homeController.getArticleList);
    router.post('/community/getTopicList',homeController.getTopicList);
    router.post('/community/getArticleInfo',homeController.getArticleInfo);
    router.post('/community/getAuthorInfo',homeController.getAuthorInfo);


    router.post('/login',homeController.login);

    router.post('/verifyToken',homeController.verifyToken);


    app.use(router.routes())
        .use(router.allowedMethods());
};
