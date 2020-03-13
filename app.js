const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');
const router = require('./middlewares/router');
const history = require('koa2-history-api-fallback');
const session = require('koa-session');
const jwt = require("jsonwebtoken");
const TOKENSECRET = require("./utils/config/tokensecret");


/*---登录状态检测中间件---*/
app.use( async (ctx, next) =>{
  if(ctx.url.match(/^\/community/)){
    console.log("url----",ctx.url);
    let token = ctx.request.header.accesstoken || "";
    jwt.verify(token,TOKENSECRET,function (err, decoded) {
      if(err){
        console.log("别问，问就验证没通过");
        ctx.loged = false;
      }else{
        if(decoded && decoded.username && decoded.password){
          const page_user = require("./utils/pages/user");
          let result = page_user.verifyUserPassword(decoded.username,decoded.password);
          if(result){
            ctx.state.loged = true;
          }else{
            ctx.state.loged = false;
          }
        }
      }
    })
  }
  await next();
});

// error handler
// onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());

app.use( async (ctx, next) =>{
  ctx.set("Access-Control-Allow-Origin","http://localhost:8080");
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken");
  ctx.set("Access-Control-Allow-Credentials", true);
  await next();
});

// app.use(cors({
//   origin : function (ctx) {
//     return "http://localhost:8080";
//   },
//   credentials : true
// }));



router(app);

app.use(require('koa-static')(__dirname + '/vue-dist'));

//添加ejs模板并修改模板后缀为html
// app.use(views(__dirname + '/vue-dist', {
//   map : {html:'ejs'}
// }));



// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
