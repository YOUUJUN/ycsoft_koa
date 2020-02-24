const router = require('koa-router')();
const homeController = require('../controler/home');

module.exports = (app) => {

    router.get('/',homeController.index);
    router.get('/products',homeController.products);
    router.get('/guide',homeController.guide);
    router.get('/contact',homeController.contact);


    router.post('/getDocNavigation',homeController.getDocNavigation);

    router.get('/guide/:href',homeController.getDocByHash);

    app.use(router.routes())
        .use(router.allowedMethods());
};
