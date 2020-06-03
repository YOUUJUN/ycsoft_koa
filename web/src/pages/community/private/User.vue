<template>

    <div>

        <div class="profile-container hidden-xs" v-if="logged">
            <div class="profile">

                <a v-bind:href="userData.url" class="user-img"><img v-bind:src="userData.portrait"></a>

                <div class="user-info">

                    <ul class="user-info-list">
                        <li><a v-bind:href="userData.url" class="user-name">{{userData.nickname}}</a></li>
                        <li><span class="user-introduction">{{userData.introduction}}</span></li>
                    </ul>

                </div>

            </div>

            <ul class="stat-list">
                <li>
                    <a v-bind:href="userData.url">
                        <div class="article">文章</div>
                        <div class="count">{{userData.articleCount}}</div>
                    </a>
                </li>
                <li>
                    <a v-bind:href="userData.url.concat('#concern')" href="/personal/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410#concern">
                        <div class="article">被关注</div>
                        <div class="count">{{userData.beWatchedNum}}</div>
                    </a>
                </li>
                <li>
                    <a v-bind:href="userData.url.concat('#topics')">
                        <div class="article">关注者</div>
                        <div class="count">{{userData.concernNum}}</div>
                    </a>
                </li>
            </ul>
        </div>

        <div class="profile-container hidden-xs" v-else>

            <div class="register-head">
                <span>没有账号，现在注册一个!</span>
            </div>

            <div class="register-box">

                <div class="field-text">
                                <span class="input-icon-left">
                                    <i class="fa fa-user-circle"></i>
                                </span>
                    <input name="nickname" placeholder="给自己取一个昵称" type="text" v-model="registerData.nickname">
                </div>
                <div class="field-text">
                                <span class="input-icon-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                    <input name="email" placeholder="输入你的邮箱" type="text" v-model="registerData.email">
                </div>

                <div class="field-text">
                                <span class="input-icon-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                    <input name="password" placeholder="设置你的密码" type="password" v-model="registerData.password">
                </div>

                <div class="field-text">
                                <span class="input-icon-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                    <input name="re-password" placeholder="确认你的密码" type="password" v-model="registerData.repassword">
                </div>

                <div class="register-box-foot">
                    <div class="show-msg"></div>
                    <button class="btn" @click="register">注册</button>
                </div>

            </div>
        </div>


    </div>


</template>

<script>
    export default {
        name: "User",
        data (){
            return {
                userData : {},
                registerData : {}
            }
        },

        methods : {
            getUserInfo (){
                let userData = window.localStorage.getItem("userData");
                this.userData = JSON.parse(userData);
                console.log("userData",this.userData);
            },

            register (){
                if(this.registerChecker()){
                    this.$axios({
                        url : "/register",
                        method : "POST",
                        data : this.registerData
                    }).then(value => {
                        console.log(value);
                        this.warn = value.data.message;
                        if(value.data.status == 0){
                            this.$notify({
                                title: '注册失败!',
                                type: 'success'
                            });
                        }else if(value.data.status == 1){
                            this.$notify({
                                title: '注册成功!',
                                type: 'success'
                            });
                            this.$emit("openLoginPanel");
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }

            },
            registerChecker(){
                if(!this.registerData.nickname){
                    this.warn = "请填写您的昵称!";
                    return false;
                }
                if(!this.registerData.email){
                    this.warn = "请输入您的邮箱!";
                    return false;
                }

                if(!this.registerData.password){
                    this.warn = "请输入密码!";
                    return false;
                }

                if(this.registerData.password !== this.registerData.repassword){
                    this.warn = "俩次密码输入不相同";
                    return false;
                }

                this.warn = "";
                return true;
            }
        },

        computed :{
            logged (){
                return this.$store.state.logged;
            }
        },

        created() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>

    /*--------------右侧展示栏------------*/

    .profile-container{
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
        background-color: #fff;
        margin-bottom:25px;
    }

    .profile{
        display: flex;
        flex-direction: row;
        padding:18px 0 18px 18px;
    }

    .profile .user-img{
    }

    .user-img img{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
    }

    .user-info{
        height:100%;
    }

    .user-info-list{
        list-style: none;
        padding: 0;
        margin: 0 0 0 10px;
    }

    .user-info-list li{
        display:flex;
        margin-bottom: 10px;
    }

    .user-introduction{
        color: rgba(0,0,0,0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
    }

    .user-info .user-name{
        font-size: 16px;
        font-weight: 600;
        font-family: -apple-system,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Arial,sans-serif;
        color:rgba(0,0,0,0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 150px;
    }

    .user-name:hover{
        text-decoration: none;
        color:#409eff;
    }





    .stat-list{
        display: flex;
        flex-direction: row;
        list-style: none;
        margin:0;
        padding:18px;
        border-top:1px solid #ddd;
    }

    .stat-list li{
        flex:1 1 auto;
        list-style: none;
        text-align: center;
    }

    .stat-list li a{
        display: block;
        text-decoration: none;
    }

    .stat-list li:nth-child(2){
        border-left:1px solid #ddd;
        border-right:1px solid #ddd;
    }

    .stat-list li div:first-child{
        color:rgba(0,0,0,0.5);
        margin-bottom: 4px;
    }

    .stat-list li div:last-child{
        color:rgba(0,0,0,1);
        font-weight: 600;
    }

    .stat-list li div:first-child:hover, .stat-list li div:last-child:hover{
        color:#409eff;
    }



    /*-----------右侧未登录状态下注册栏----------*/

    .register-head{
        padding: 10px;
        border-bottom: 1px solid #eee;
        font-size: 15px;
        color: rgba(0,0,0,0.8);
    }

    .register-box{
        padding:15px 25px 15px 25px;
    }

    .register-box .field-text input {
        height: 30px;
        line-height: 30px;
        background: #eee;
    }

    .register-box .field-text {
        margin-bottom: 6px;
    }

    .register-box .field-text:last-child {
        margin-bottom: 0;
    }

    .register-box-foot{
        display:flex;
        justify-content: space-between;
    }

    .register-box-foot .show-msg{
        color:red;
    }


</style>