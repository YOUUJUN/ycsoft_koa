const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
// const cors = require('koa-cors');
const router = require('./middlewares/router');
const history = require('koa2-history-api-fallback');
const session = require('koa-session');
const jwt = require("jsonwebtoken");
const TOKENSECRET = require("./utils/config/tokensecret");

const watchDags = require("./middlewares/watchdog");

app.use(watchDags());


/*---登录状态检测中间件---*/
app.use( async (ctx, next) =>{
  if(ctx.url.match(/^\/community/) || ctx.url.match(/^\/personal/) || ctx.url.match(/^\/users/) || ctx.url.match(/^\/editor/) || ctx.url.match(/^\/offline/)){
    let cookie = ctx.cookies.get("marscript");
    let token = ctx.request.header.accesstoken || cookie || "";
    const page_user = require("./utils/pages/user");
    let result = await page_user.verifyUserToken(token);
    ctx.state.logged = result;

  }
  await next();
});


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());


// let allowOriginURL = (process.env.NODE_ENV !== 'production') ? "http://localhost:8090" : "http://106.13.63.236:8090";
let allowOriginURL = (process.env.NODE_ENV !== 'production') ? "http://localhost:8090" : "";
app.use( async (ctx, next) =>{

  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Origin", allowOriginURL);

  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken, range");
  ctx.set("Access-Control-Expose-Headers" , "Content-Range");
  await next();
});

app.use(require('koa-static')(__dirname + '/database/expose'));
app.use(require('koa-static')(__dirname + '/views'));
app.use(require('koa-static')(__dirname + '/vue-public'));

router(app);  //koa-router 应在koa-static下面注册，否则koa-router会根据静态路径多次match,影响性能

//添加ejs模板并修改模板后缀为html
// app.use(views(__dirname + '/vue-dist', {
//   map : {html:'ejs'}
// }));


// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  let now = new Date().toLocaleString();
  let memoryStatus = process.memoryUsage();
  console.log("memoryStatus===>",memoryStatus);
  console.log(`${now} ${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on('error', (err, ctx) => {
  let now = new Date().toLocaleString();
  console.error('server error',now, err, ctx);
});

module.exports = app;
