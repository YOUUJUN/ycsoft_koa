const query = require("../db/mysql/query");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const TOKENSECRET = require("../config/tokensecret");
const Path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;

const Uploader = require("../lib/uploader");

class User{

    constructor (){
        this.status = "miao?";
    }

    /*-注册-*/
    async register (info){

        let nickname = info.nickname;
        let username = info.email;
        let password = info.password;
        let repassword = info.repassword;
        let user_id = uuid.v1();
        let msg = {
            status : 0,
            data : "未知错误，请联系管理员!"
        };

        let searchsql = "SELECT COUNT(*) AS nums FROM users WHERE user_name = ?";
        let searchparams = [username];

        let addsql = "INSERT INTO users(id,user_id,nickname,user_name,password) VALUE(0,?,?,?,?)";
        let addparams = [user_id,nickname,username,password];

        if(nickname.indexOf(' ')>=0 ||nickname == ''){
            msg = {
                status : 0,
                data : '昵称不能为空!'
            };

            return msg;
        }

        if(nickname.length > 20){
            msg = {
                data : "昵称不能超过20个字符!",
                status : 0
            };

            return msg;
        }

        if(username.indexOf(' ')>=0 || username == ''){
            msg = {
                status : 0,
                data : '邮箱不能为空!'
            };

            return msg;
        }

        if(password.length > 20){
            msg = {
                data : "密码不能超过20个字符!",
                status : 0
            };

            return msg;
        }

        if(password.indexOf(' ')>=0 || password == ''){
            msg = {
                status : 0,
                data : '密码不能为空!'
            };
            return msg;
        }

        if(password != repassword){
            msg = {
                status : 0,
                data : '俩次输入密码不一致!'
            };
            return msg;
        }

        let results = await query(searchsql,searchparams);

        if(results[0].nums === 0){

            let status = await this.initializeUser(user_id);

            if(status === true){
                results = await query(addsql,addparams);
                if(results.affectedRows == '1'){
                    msg = {
                        status : 1,
                        data : "注册成功!"
                    }
                }
            }

        }else{
            msg = {
                status : 0,
                message : "该邮箱已被注册!"
            };
        }


        return msg;
    }


    /*--初始化用户信息--*/
    async initializeUser(userid){
        try{
            const userPathFixer = Path.join(__dirname,"../../database/expose/users/");

            let DefaultPortrait = "/user-images/0.1436446423680504.jpg";

            let addExtralInfoSql = "INSERT INTO user_info(id,user_id,portrait,job,introduction,blog_url) VALUE(0,?,?,'','','')";
            let addExtralInfoParam = [userid,DefaultPortrait];

            let results = await query(addExtralInfoSql,addExtralInfoParam);

            let createPath = Path.join(userPathFixer,userid);
            await fsPromise.mkdir(createPath);
            let createPortraits =  Path.join(createPath,"portraits");
            await fsPromise.mkdir(createPortraits);
            let createArticle = Path.join(createPath,"articles");
            await fsPromise.mkdir(createArticle);
        }catch(err){
            console.error("初始化用户信息失败!",err);
            return false;
        }

        return true;
    }


    /*-登录-*/
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
                    userId : userId
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
            blogUrl : result1[0].blog_url,
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
                console.log("ok");
                decodedValue = decoded;
            }
        })

        if(decodedValue && decodedValue.username){
            return decodedValue;
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
        console.log("fucking hi?",this.status);
    }

    /*---用户设置---*/
    /*-用户上传头像-*/
    async upLoadPortrait(ctx){
        // const multiparty = require("multiparty");
        // let form = new multiparty.Form({uploadDir:Path.join(__dirname,"../../database")});
        // await form.parse(ctx.req,function(err,fields,files){
        //     if(err){throw err; return;}
        //     console.log(fields);//除文件外的其他附带信息
        //     console.log(files.file[0]);//文件信息
        //     return ;
        // });

        var logged = ctx.state.logged;
        let userId = logged.userId;
        let savePath = Path.join(__dirname,"../../database/expose/users/",userId,"/portraits");

        let uploader = new Uploader(ctx);

        let fileName = uploader.saveAs(savePath);

        let obj = {
            status : false,
            path : ""
        }
        if(fileName){
            let exposePath = Path.join("/users",userId,"portraits",fileName);

            let changeUserPortraitSql = "UPDATE user_info SET portrait = ? WHERE user_id = ?";
            let changeUserPortraitParam = [exposePath,userId];

            let results = await query(changeUserPortraitSql,changeUserPortraitParam);

            console.log("results",results);

            obj = {
                status : true,
                path : exposePath
            }
        }

        return obj;
    }

    async modifyUserInfo(ctx){

        let body = ctx.request.body;
        let logged = ctx.state.logged;
        if(!logged){
            console.log("没有获取到登录状态!");
            return;
        }

        let userid = logged.userId;

        let msg = {
            status : 0,
            data : "修改失败!"
        }

        let key = body.key;
        let value = body.value;

        let editUserInfoSql = null;
        let editUserInfoParam = [];

        switch (key){
            case 'nickname':
                if(value.indexOf(' ')>=0 ||value == ''){
                    editUserInfoSql = null;
                    msg = {
                        data : "昵称不能为空,或包含空格!",
                        status : 0
                    };
                }else if(value.length > 20){
                    editUserInfoSql = null;
                    msg = {
                        data : "昵称不能超过20个字符!",
                        status : 0
                    };
                }else{
                    editUserInfoSql = "UPDATE users SET nickname = ? WHERE user_id = ? ";
                    editUserInfoParam = [value,userid];
                }
                break;

            case 'job':
                if(value.length > 20){
                    editUserInfoSql = null;
                    msg = {
                        data : "职位介绍不能超过20个字符!",
                        status : 0
                    };
                }else{
                    editUserInfoSql = " UPDATE user_info SET job = ? WHERE user_id = ? ";
                    editUserInfoParam = [value,userid];
                }

                break;

            case 'introduction':
                if(value.length > 100){
                    editUserInfoSql = null;
                    msg = {
                        data : "个人介绍不能超过100个字符!",
                        status : 0
                    };
                }else {
                    editUserInfoSql = "UPDATE user_info SET introduction = ? WHERE user_id = ? ";
                    editUserInfoParam = [value, userid];
                }
                break;

            case 'blogUrl':
                editUserInfoSql = "UPDATE user_info SET blog_url = ? WHERE user_id = ? ";
                editUserInfoParam = [value,userid];
                break;
        }

        if(editUserInfoSql == null){
            return msg;
        }

        let results = await query(editUserInfoSql,editUserInfoParam);

        if(results.affectedRows == "1"){
            msg = {
                data : "修改成功!",
                status : 1
            };
        }

        return msg;
    }

}

let user = new User;

// let a = user.encryptPassword("123456");
// console.log("a",a);
//
// let b = user.encryptPassword("123456");
// console.log("b",b);


module.exports = user;