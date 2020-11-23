let blacklist = require("../database/blacklist");

module.exports = (options) =>{

    return async (ctx, next) => {

        const requset = ctx.request;

        let host = requset.host;

        for(let i of blacklist){
            if (host.includes(blacklist[1])){
                ctx.status = 504;
                ctx.body = "Suck it";
                return;
            }
        }

        await next();
    }

}
