const query = require("../db/mysql/query");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const TOKENSECRET = require("../config/tokensecret");


class User{

    async register (){


    }

    async login (info){
        let searchUser = " SELECT * FROM users WHERE user_name = ? ";
        let userParams = [info.username];

        let msg = {};

        let results = await query(searchUser, userParams);

        if(info.username.indexOf(' ')>=0 || info.username == ''){
            msg = {
                info : "请输入用户名!",
                ret_code : '0'
            };
            res.json(msg);
            return;
        }

        else if(info.password.indexOf(' ')>=0 || info.password == ''){
            msg = {
                info : "请输入密码!",
                ret_code : '0'
            };
            res.json(msg);
            return;
        }


        if(results.indexOf(' ')>=0 || results == ''){
            msg = {
                info : "用户名或密码错误！",
                ret_code : '0'
            };

        }else{

            let username = results[0].user_name;
            let nickname = results[0].nickname;
            let userId = results[0].user_id;
            let realPass = results[0].password;

            if(info.password == realPass){

                msg = {
                    info : "登录成功！",
                    ret_code : '1'
                };

                let obj = {
                    username : username,
                    nickname : nickname,
                    userId : userId,
                    password: realPass
                }

                let token = this.createUserToken(obj);
                msg.token = token;

                let info = await this.getUserInfo(obj);

                msg.userData  = info;

            }else{
                msg = {
                    info : "用户名或密码错误！",
                    ret_code : '0'
                };
            }
        }

        return msg;

    }

    async getUserInfo (info){

        let userInfoSql = "SELECT * FROM user_info WHERE user_id = ?";
        let userInfoParam = [info.userId];
        let result1 = await query(userInfoSql,userInfoParam);
        console.log("result1",result1);

        if(!info.username){
            let userSql = "SELECT user_name,nickname FROM users WHERE user_id = ?";
            let userParam = [info.userId];
            let result0 = await query(userSql,userParam);
            info.username = result0[0].user_name;
            info.nickname = result0[0].nickname;
        }

        /*--读取用户文章数--*/
        let getArticleCountSql = "SELECT COUNT(*) AS nums FROM article WHERE post_author =?";
        let getArticleCountParam = [info.username];
        let result2 = await query(getArticleCountSql,getArticleCountParam);

        /*--读取用户所关注人数--*/
        let getConcernNumSql = "SELECT COUNT(*) AS nums FROM user_follow WHERE user_name = ?";
        let getConcernNumParam = [info.username];
        let result3 = await query(getConcernNumSql,getConcernNumParam);

        /*--读取用户被关注人数--*/
        let getBeWatchedNumSql = "SELECT COUNT(*) AS nums,users.user_name FROM user_follow LEFT JOIN users ON user_follow.author_id = users.user_id WHERE users.user_name = ?";
        let getBeWatchedNumParam = [info.username];
        let result4 = await query(getBeWatchedNumSql,getBeWatchedNumParam);

        /*---读取用户被点赞总数---*/
        let getUserLikeSql = "SELECT COUNT(*) AS nums,article.post_author FROM user_like LEFT JOIN article ON user_like.post_id = article.post_id WHERE article.post_author = ?";
        let getUserLikeParam = [info.username];
        let result5 = await query(getUserLikeSql,getUserLikeParam);

        /*---读取用户关注话题数---*/
        let getTargetNumSql = "SELECT COUNT(*) AS nums FROM user_focus WHERE user_name = ?";
        let getTargetNumParam = [info.username];
        let result6 = await query(getTargetNumSql,getTargetNumParam);


        let fixHead = "/personal/";

        let userData = {
            nickname : info.nickname,
            userId : info.userId,
            url : fixHead.concat(info.userId),
            portrait : result1[0].portrait,
            job : result1[0].job,
            introduction : result1[0].introduction,
            articleCount : result2[0].nums,
            concernNum : result3[0].nums,
            beWatchedNum : result4[0].nums,
            userLike : result5[0].nums,
            topicNum : result6[0].nums
        };

        return userData;

    }

    createUserToken (info){

        let fixedPassword = this.encryptPassword(info.password);

        info.password = fixedPassword;

        let userInfo = info;

        let token = jwt.sign(userInfo, TOKENSECRET, {
            expiresIn : "48h",
            issuer : "YOUJUN"
        })

        return token;
    }

    async verifyUserToken(token){
        let _this = this;
        let decodedValue = "";
        jwt.verify(token,TOKENSECRET,function (err, decoded) {
            if(err){
                console.log("别问，问就验证没通过");
                return false;
            }else{
                decodedValue = decoded;
            }
        })

        if(decodedValue && decodedValue.username && decodedValue.password){
            let result = await _this.verifyUserPassword(decodedValue.username,decodedValue.password);

            if(result){
                console.log("decodedValue----====>",decodedValue);
                return decodedValue;
            }
        }

        return false;
    }

    encryptPassword (password){

        const md5 = crypto.createHash("md5");

        let salt = "hellomotherfuckersonofagun";

        md5.update(password+salt);
        return md5.digest('hex');
    }

    async verifyUserPassword (username, pass){
        let searchUser = " SELECT password FROM users WHERE user_name = ? ";
        let userParams = [username];

        let results = await query(searchUser, userParams);

        let encryptedPassword = this.encryptPassword(results[0].password);

        if(encryptedPassword === pass){
            return true;
        }else{
            return false;
        }
    }

    sayHi (){
        console.log("fucking hi?");
    }

}

let user = new User;

let a = user.encryptPassword("123456");
console.log("a",a);

let b = user.encryptPassword("123456");
console.log("b",b);


module.exports = user;