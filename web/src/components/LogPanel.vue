<template>

    <div>

        <!-- <div class="dialog" v-show="logShow">

            <div class="dialog-title-content clearfix"><span class="dialog-title">登录</span>
                <i v-on:click="closeLogPanel" class="fa fa-close dialog-close"></i>
            </div>

            <div class="dialog-body clearfix">
                <div class="log-content">
                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-user-circle"></i>
                    </span>
                        <input type="text" name="user_name" placeholder="输入你的邮箱账号" v-model="logData.username">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="password" placeholder="输入你的密码" v-model="logData.password">
                    </div>
                </div>
                <div class="turn-to">
                    <a href="javascript:void(0);" v-on:click="togglePanel">没有账号? 点此注册</a>
                </div>
            </div>

            <div class="dialog-resize-helper dialog-resize-s"></div>
            <div class="dialog-resize-helper dialog-resize-x"></div>
            <div class="dialog-resize-helper dialog-resize-z"></div>
            <div class="dialog-resize-helper dialog-resize-y"></div>

            <div class="dialog-footer clearfix"><div class="show-msg"></div><div class="dialog-button-content">
                <button v-on:click="login">登录</button>
                <button v-on:click="closeLogPanel">取消</button>
            </div></div>

        </div>



        <div class="dialog" v-show="registerShow">

            <div class="dialog-title-content clearfix"><span class="dialog-title">注册</span>
                <i v-on:click="closeRegisterPanel" class="fa fa-close dialog-close"></i>
            </div>

            <div class="dialog-body clearfix">
                <div class="log-content" ref="register">
                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-user-circle"></i>
                    </span>
                        <input type="text" name="nickname" placeholder="给自己取一个昵称" v-model="registerData.nickname" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                        <input type="text" name="email" placeholder="输入你的邮箱" v-model="registerData.email" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="password" placeholder="设置你的密码" v-model="registerData.password" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="re-password" placeholder="确认你的密码" v-model="registerData.repassword" v-on:blur="registerChecker();delErrorBorder($event)">
                    </div>
                </div>
                <div class="turn-to">
                    <a href="javascript:void(0);" v-on:click="togglePanel" ref="toggle">已有账号? 点此登录</a>
                </div>
            </div>

            <div class="dialog-resize-helper dialog-resize-s"></div>
            <div class="dialog-resize-helper dialog-resize-x"></div>
            <div class="dialog-resize-helper dialog-resize-z"></div>
            <div class="dialog-resize-helper dialog-resize-y"></div>

            <div class="dialog-footer clearfix"><div class="show-msg"></div><div class="dialog-button-content">
                <button v-on:click="register">注册</button>
                <button v-on:click="closeRegisterPanel">取消</button>
            </div></div>

        </div> -->


        <el-dialog
        title="登录"
        :visible.sync="logShow"
        :append-to-body = "true"
        :lock-scroll="true"
        width="25%"
        >
            
            <div class="clearfix">
                <div class="log-content">
                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-user-circle"></i>
                    </span>
                        <input type="text" name="user_name" placeholder="输入你的邮箱账号" v-model="logData.username">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="password" placeholder="输入你的密码" v-model="logData.password">
                    </div>
                </div>
                <div class="turn-to">
                    <a href="javascript:void(0);" v-on:click="togglePanel">没有账号? 点此注册</a>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="login">登 录</el-button>
                <el-button @click="closeLogPanel">取 消</el-button>
            </div>
        </el-dialog>


        <el-dialog
        title="注册"
        :visible.sync="registerShow"
        :append-to-body = "true"
        :lock-scroll="true"
        width="25%"
        >
            
            <div class="clearfix">
                <div class="log-content" ref="register">
                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-user-circle"></i>
                    </span>
                        <input type="text" name="nickname" placeholder="给自己取一个昵称" v-model="registerData.nickname" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                        <input type="text" name="email" placeholder="输入你的邮箱" v-model="registerData.email" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="password" placeholder="设置你的密码" v-model="registerData.password" @blur="delErrorBorder($event)">
                    </div>

                    <div class="field-text">
                    <span class="input-icon-left">
                        <i class="fa fa-lock"></i>
                    </span>
                        <input type="password" name="re-password" placeholder="确认你的密码" v-model="registerData.repassword" v-on:blur="registerChecker();delErrorBorder($event)">
                    </div>
                </div>
                <div class="turn-to">
                    <a href="javascript:void(0);" v-on:click="togglePanel" ref="toggle">已有账号? 点此登录</a>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="register">注 册</el-button>
                <el-button @click="closeRegisterPanel">取 消</el-button>
            </div>
        </el-dialog>



    </div>

</template>

<script>
    export default {
        name: "LogPanel",
        data (){
            return {
                logShow : false,
                registerShow : false,
                registerData : {
                    nickname : '',
                    email : '',
                    password : '',
                    repassword : ''
                },
                logData : {
                    username : '',
                    password : ''
                }
            }
        },
        methods : {
            openLogPanel : function () {
                this.logShow = true;
            },
            closeLogPanel : function () {
                this.logShow = false;
            },
            openRegisterPanel : function () {
                this.registerShow = true;
            },
            closeRegisterPanel : function () {
                this.registerShow = false;
            },
            togglePanel (){
                this.registerShow = !this.registerShow;
                this.logShow = !this.logShow;
            },
            login () {
                let vm = this;
                if(this.loginChecker()){
                    this.$axios({
                        url : "/login",
                        method : "POST",
                        data : this.logData
                    }).then(value => {
                        if(value.data.ret_code == 0){
                            this.$notify.error({
                                title: '登录失败!',
                                message: value.data.info
                            });
                        }else if(value.data.ret_code == 1){
                            this.$notify({
                                title: '登录成功!',
                                type: 'success'
                            });
                            localStorage.setItem("marscript",value.data.token);
                            localStorage.setItem("userData",JSON.stringify(value.data.userData));
                            vm.$store.commit("changeLogStatus",true);
                            this.closeLogPanel();
                            location.reload();
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            register (){

                if(this.registerChecker()){
                    this.$axios({
                        url : "/register",
                        method : "POST",
                        data : this.registerData
                    }).then(value => {
                        if(value.data.message){
                            this.warn(value.data.message);
                        }
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
                            this.$refs["toggle"].click();
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }

            },

            addErrorBorder(target){
                console.log("target",target);
                target.classList.add("error-border");
            },

            delErrorBorder(event){
                var target = event.target;
                target.classList.remove("error-border");
            },

            warn (message) {
                this.$message({
                    message : message,
                    type : "error"
                });
            },

            registerChecker(){
                var register = this.$refs['register'];
                if(!this.registerData.nickname){
                    this.warn("请填写您的昵称!");
                    this.addErrorBorder(register.querySelector("[name = 'nickname']"));
                    return false;
                }
                if(!this.registerData.email){
                    this.warn("请输入您的邮箱!");
                    this.addErrorBorder(register.querySelector("[name = 'email']"));
                    return false;
                }

                if(!this.registerData.password){
                    this.warn("请输入密码!");
                    this.addErrorBorder(register.querySelector("[name = 'password']"));
                    return false;
                }

                if(this.registerData.password !== this.registerData.repassword){
                    this.warn("俩次密码输入不相同");
                    this.addErrorBorder(register.querySelector("[name = 'password']"));
                    this.addErrorBorder(register.querySelector("[name = 're-password']"));
                    return false;
                }
                return true;
            },

            loginChecker(){
                if(!this.logData.username){
                    this.warn("请输入您的邮箱或用户名!");
                    return false;
                }

                if(!this.logData.password){
                    this.warn("请输入密码!");
                    return false;
                }

                return true;
            }

        }
    }
</script>

<style scoped>

    

    .clearfix::after, .clearfix::before {
        content: " ";
        display: table;
    }

    .clearfix:after {
        clear: both;
    }

    .dialog-body{
        padding:6px 16px 48px 16px;
        width:auto;
        height:auto;
        overflow:auto;
    }

    


    /deep/.el-dialog__footer{
        background-color:rgb(248, 248, 248);
        padding:10px;
    }



    .dialog-button-content button{
        display: inline-block;
        background-color: #fff;
        color: black;
        border: 2px solid #008CBA;
        border-radius:3px;
        padding: 0 6px;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        font-size: 14px;
        height: 30px;
        line-height: 26px;
        margin: 0 6px;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        cursor: pointer;
    }

    .dialog-button-content button:hover {
        background-color: #008CBA;
        color: white;
    }



    .dialog-body .message-box{
        padding: 15px;
        border-radius: 4px;
        margin:0;
    }



    /*---------------登录界面---------------*/

    .log-content{
        padding:15px;
    }

    .log-content .field-text input {
        height: 35px;
        line-height: 35px;
    }

    .log-content .field-text {
        margin-bottom: 15px;
    }

    .log-content .field-text:last-child {
        margin-bottom: 0;
    }

    .turn-to{
        text-align: right;
        padding: 0 15px;
    }

    .dialog-footer .show-msg{
        float: left;
        margin: 10px;
        font-size: 15px;
        color: red;
    }



</style>
