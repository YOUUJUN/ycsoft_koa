const router = require('koa-router')();
const homeController = require('../controler/home');

module.exports = (app) => {

    router.get('/',homeController.index);
    router.get('/products',homeController.products);
    router.get('/guide',homeController.guide);
    router.get('/contact',homeController.contact);
    router.get('/community',homeController.community);


    router.post('/getDocNavigation',homeController.getDocNavigation);

    router.get('/guide/:href',homeController.getDocByHash);

    router.post('/community/getHotList',homeController.getHotList);
    router.post('/community/getArticleList',homeController.getArticleList);
    router.post('/community/getTopicList',homeController.getTopicList);


    router.post('/login',homeController.login);


    app.use(router.routes())
        .use(router.allowedMethods());
};
