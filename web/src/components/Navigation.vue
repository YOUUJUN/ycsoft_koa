<template>

    <div class="main-navigation">
        <div class="container navigation-container">
            <div class="area cols-12">

                <div class="logo">
                    <img id="logo" src="/images/logo.png" style=""  />

                </div>


                <div id="main-menu" ref="navigation" class="hidden-xs">
                    <ul class="menu">



                        <template v-for="item in list">

                            <li class="ribbon-wrap" v-on:mouseenter="startAnimation($event)" v-on:mouseleave="endAnimation($event)">

                                <a v-bind:class="item.active" v-bind:target="item.target" v-bind:href="item.href">{{item.name}}</a><span class="ribbon"></span>
                            </li>
                        </template>


                        <li v-if="logged">
                            <!--                            <div class="btn-group">-->
                            <!--                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">发起-->
                            <!--                                    <span class="caret"></span>-->
                            <!--                                </button>-->
                            <!--                                <ul class="dropdown-menu" role="menu">-->
                            <!--                                    <li><a href="/editor">分享经验</a></li>-->
                            <!--                                    <li><a href="#">发起问题</a></li>-->
                            <!--                                    <li><a href="#">Bug反馈</a></li>-->
                            <!--                                    <li><a href="/editor/document">编写文档</a></li>-->
                            <!--                                </ul>-->
                            <!--                            </div>-->

                            <!--                            <img class="header-portrait" src="<%- msg.userData.portrait %>">-->

                            <!--                            <dl class="select-board board-closed hide">-->
                            <!--                                <dd><a href="/personal/<%- msg.userData.userid %>">个人中心</a></dd>-->
                            <!--                                <dd><a onclick="users.logout();">退出登录</a></dd>-->
                            <!--                            </dl>-->

                            <el-dropdown trigger="click" @command="launch" v-bind:style="`margin-left:20px;`">
                                <el-button type="primary" size="mini">
                                    发起<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-bind:command="'article'">文章</el-dropdown-item>
                                    <el-dropdown-item v-bind:command="'doc'">文档</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>


                            <el-dropdown>
                                <img class="header-portrait" v-bind:src="userData.portrait">
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-on:click.native="goToPersonal">个人资料</el-dropdown-item>
                                    <el-dropdown-item v-on:click.native="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </li>

                        <li v-else >
                            <a id="selectMenu" href="javascript:void(0);" v-on:click="login">
                                <i class="fa fa-user-circle resize"></i>
                                <span class="log-btn">登录/注册</span>
                            </a>
                        </li>

                    </ul>
                </div>

                <div class="hamburger visible-xs" v-on:click="trans()" ref="hamburger">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>


<!--                <div class="user-logger">-->
<!--                    <ul class="user-box">-->
<!--                        <li v-if="logged">-->
<!--&lt;!&ndash;                            <div class="btn-group">&ndash;&gt;-->
<!--&lt;!&ndash;                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">发起&ndash;&gt;-->
<!--&lt;!&ndash;                                    <span class="caret"></span>&ndash;&gt;-->
<!--&lt;!&ndash;                                </button>&ndash;&gt;-->
<!--&lt;!&ndash;                                <ul class="dropdown-menu" role="menu">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <li><a href="/editor">分享经验</a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <li><a href="#">发起问题</a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <li><a href="#">Bug反馈</a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <li><a href="/editor/document">编写文档</a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                                </ul>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->

<!--&lt;!&ndash;                            <img class="header-portrait" src="<%- msg.userData.portrait %>">&ndash;&gt;-->

<!--&lt;!&ndash;                            <dl class="select-board board-closed hide">&ndash;&gt;-->
<!--&lt;!&ndash;                                <dd><a href="/personal/<%- msg.userData.userid %>">个人中心</a></dd>&ndash;&gt;-->
<!--&lt;!&ndash;                                <dd><a onclick="users.logout();">退出登录</a></dd>&ndash;&gt;-->
<!--&lt;!&ndash;                            </dl>&ndash;&gt;-->

<!--                            <el-dropdown trigger="click" @command="launch">-->
<!--                                <el-button type="primary" size="mini">-->
<!--                                    发起<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                                </el-button>-->
<!--                                <el-dropdown-menu slot="dropdown">-->
<!--                                    <el-dropdown-item v-bind:command="'article'">文章</el-dropdown-item>-->
<!--                                    <el-dropdown-item v-bind:command="'doc'">文档</el-dropdown-item>-->
<!--                                </el-dropdown-menu>-->
<!--                            </el-dropdown>-->


<!--                            <el-dropdown>-->
<!--                                <img class="header-portrait" v-bind:src="userData.portrait">-->
<!--                                <el-dropdown-menu slot="dropdown">-->
<!--                                    <el-dropdown-item v-on:click.native="goToPersonal">个人资料</el-dropdown-item>-->
<!--                                    <el-dropdown-item v-on:click.native="logout">退出登录</el-dropdown-item>-->
<!--                                </el-dropdown-menu>-->
<!--                            </el-dropdown>-->

<!--                        </li>-->

<!--                        <li v-else >-->
<!--                            <a id="selectMenu" href="javascript:void(0);" v-on:click="login">-->
<!--                                <i class="fa fa-user-circle resize"></i>-->
<!--                                <span class="log-btn">登录/注册</span>-->
<!--                            </a>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->

            
            </div>
        </div>

        <logPanel ref="logPanel"></logPanel>

    </div>

</template>

<script>
    const logPanel = () => import("./LogPanel.vue");
    export default {
        name: "navigation",
        components : {logPanel},
        props : ["list"],
        data (){
            return {
                userData : {}
            }
        },
        methods : {

            startAnimation (event) {
                let ribbon = event.target.querySelector(".ribbon");

                ribbon.classList.remove('ribbon-close');
                ribbon.classList.add('ribbon-open');

                let handler = () => {
                    ribbon.style = "left:0;right:0;height:2px;"
                    ribbon.removeEventListener('animationend', handler);
                }

                ribbon.addEventListener('animationend', handler);

            },

            endAnimation (event){
                let ribbon = event.target.querySelector(".ribbon");

                ribbon.classList.remove('ribbon-open');
                ribbon.classList.add('ribbon-close');

                let handler = () => {
                    ribbon.style = "left:50%;right:50%;height:2px;";
                    ribbon.removeEventListener('animationend', handler);
                }

                ribbon.addEventListener('animationend', handler);

            },

            trans (){
                let hamburger = this.$refs.hamburger;
                let navigation = this.$refs.navigation;
                if(!hamburger.classList.contains("is-active")){
                    hamburger.classList.add("is-active");
                    navigation.classList.add("show");
                }else{
                    hamburger.classList.remove("is-active");
                    navigation.classList.remove("show");
                }
            },

            login : function () {
                this.$refs.logPanel.openLogPanel();
            },

            logout : function () {
                let vm = this;
                this.$axios({
                    method : "post",
                    url : "/logout"
                }).then(value => {
                    vm.$store.commit("changeLogStatus",false);
                    localStorage.setItem("marscript","");
                    location.reload();
                }).catch(err => {
                    console.error(err);
                })


            },

            goToPersonal(){
                let vm = this;
                window.open(vm.userData.url, "_blank");
            },

            syncUserInfo (){
                this.userData = this.$common.getUserInfo();
            },

            launch(command){
                let url = "/editor/"+command+"/drafts/new";
                location.href = url;
            }

        },

        computed:{
            logged (){
                return this.$store.state.logged;
            }
        },

        created(){
            this.syncUserInfo();
        },
        mounted() {
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        }
    }
</script>

<style scoped>

    /*------------导航栏-----------*/
    a{
        text-decoration:none;
    }

    .logo{
        float: left;
    }

    #logo{
        float: left;
        display:block;
        height:64px;
        width:240px;
    }

    #main-menu{
        position:relative;
    }

    .navigation-container{
        width: 1230px;
        z-index: 997;
        background: #2188b6;
    }

    .main-navigation{
        text-align:center;
        border-top:1px solid #2188b6;
        border-bottom:2px solid #2188b6;
        background-color: #2188b6;
        padding: 20px 0 20px 0;
    }

    @media (max-width: 767px) {
        .main-navigation{
            padding:10px 0;
        }

        .menu{
            display: flex;
            flex-direction: column;
        }

        .logo{
            display: flex;
            float: none;
        }
    }



    .main-navigation .menu{
        padding:0;
        padding-bottom: 2px;
        margin:0;
    }

    .menu li{
        list-style:none;
        display:inline-block;
        position:relative;
        margin-right: 5px;
    }

    .menu li:after{
        border-bottom:2px solid #e67e22;
        margin-bottom:-2px;
    }



    .menu li a{
        font-family: Libre Baskerville;
        color: #d3effb;
        font-size:16px;
        font-weight:400;
        line-height:60px;
        display:block;
        padding: 0 15px;
        text-decoration:none;
    }

    .menu li a:hover{
        color: #000;
        outline: none;
    }

    #main-menu{
        overflow:hidden;
    }

    .nav-current {
        border-bottom: 2px solid #e67e22;
    }

    .ribbon{
        display:block;
        position:absolute;
        background:#e67e22;
        top:60px;
        left:50%;
        height:2px;
    }


    /*-----汉堡---------*/
    .hamburger{
        position: absolute;
        top: 5px;
        right: 22px;
        display: none;
        width: 30px;
        line-height: 30px;
        padding-top: 4px;
    }

    @media(max-width:768px) {

    }

    .hamburger:hover{
        cursor:pointer;
        background-color:transparent;
    }

    .hamburger:hover > .line{
        background-color:#E04343;
    }

    .hamburger .line{
        width: 35px;
        height: 5px;
        background-color: rgba(0,0,0,0.4);
        display: block;
        margin: 8px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }


    .hamburger.is-active{
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        -webkit-transition-delay: 0.6s;
        -o-transition-delay: 0.6s;
        transition-delay: 0.6s;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .hamburger.is-active .line:nth-child(2){
        width: 0;
    }

    .hamburger.is-active .line:nth-child(1),
    .hamburger.is-active .line:nth-child(3){
        -webkit-transition-delay: 0.3s;
        -o-transition-delay: 0.3s;
        transition-delay: 0.3s;
    }

    .hamburger.is-active .line:nth-child(1){
        -webkit-transform: translateY(13px);
        -ms-transform: translateY(13px);
        -o-transform: translateY(13px);
        transform: translateY(13px);
    }

    .hamburger.is-active .line:nth-child(3){
        -webkit-transform: translateY(-13px) rotate(90deg);
        -ms-transform: translateY(-13px) rotate(90deg);
        -o-transform: translateY(-13px) rotate(90deg);
        transform: translateY(-13px) rotate(90deg);
    }



    /*-----------导航栏用户按钮---------*/

    #selectMenu .fa-user-circle{
        font-size: 30px;
        vertical-align: middle;
        margin-right: 8px;
    }


    /*.user-logger{*/
    /*    position: absolute;*/
    /*    right: -45px;*/
    /*    top: 12px;*/
    /*}*/

    /*.user-logger .user-box{*/
    /*    list-style: none;*/
    /*    margin:0;*/
    /*    padding:0;*/
    /*    vertical-align: middle;*/
    /*}*/

    /*.user-box a{*/
    /*    display: block;*/
    /*    text-decoration: none !important;*/
    /*    white-space: nowrap;*/
    /*}*/

    /*.user-box > li{*/
    /*    display: flex;*/
    /*    flex-direction: row;*/
    /*    align-items: center;*/
    /*    list-style: none;*/
    /*    margin-right:8px;*/
    /*}*/

    /*.user-logger .resize{*/
    /*    font-size: 35px;*/
    /*    color: #fff;*/
    /*    margin-right: 8px;*/
    /*}*/

    /*.user-logger .log-btn{*/
    /*    font-size: 17px;*/
    /*    color:#fff;*/
    /*    vertical-align: super;*/
    /*}*/

    /*.user-logger .log-btn:hover{*/
    /*    text-decoration: none !important;*/
    /*}*/

    #selectMenu{
        color:#fff;
    }

    .title-username{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 70px;
    }

    .header-portrait{
        display:inline-block;
        width:35px;
        height:35px;
        border-radius: 50%;
        margin-left:8px;
    }

    .header-portrait + .log-btn{
        vertical-align: baseline;
    }

    .el-dropdown{
        vertical-align: middle;
    }




    .ribbon-open{
        animation: animate-open .2s;
    }

    .ribbon-opened{
        left: 0;
        right: 0;
    }

    .ribbon-close{
        animation : animate-close .2s;
    }

    @keyframes animate-open{
        0% {
            left : 50%;
            right: 50%;
        }

        25% {
            left: 37.5%;
            right: 37.5%;
        }

        50% {
            left : 25%;
            right: 25%;
        }

        75% {
            left : 12.5%;
            right: 12.5%;
        }

        100% {
            left : 0;
            right : 0;
        }
    }

    @keyframes animate-close{

        0% {
            left : 0;
            right : 0;
        }

        25% {
            left : 12.5%;
            right: 12.5%;
        }

        50% {
            left : 25%;
            right: 25%;
        }

        75% {
            left: 37.5%;
            right: 37.5%;
        }

        100% {
            left : 50%;
            right: 50%;
        }

    }


</style>
