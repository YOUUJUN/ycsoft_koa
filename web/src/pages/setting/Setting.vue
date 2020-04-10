<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container">

                <div class="area cols-md-9">


                    <div class="setting-container">

                        <h2 class="setting-title">个人资料</h2>

                        <div class="setting-box">

                            <ul class="setting-list">

                                <li class="setting-item">
                                    <span class="title">头像</span>
                                    <div class="box">

                                        <div class="portrait-box">

                                            <img id="portraitImg" src="/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/portraits/0.09973871801953105.jpg">

                                            <div class="action-box">
                                                <div class="hint">支持文件大小 5M 以内的图片</div>
                                                <button class="btn upload-btn" onclick="getImg()">点击上传</button>
                                                <input type="file" id="portrait" name="portrait" accept="image/*" style="display:none" onchange="getFile(this)">
                                            </div>

                                        </div>

                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">昵称</span>
                                    <div class="box">
                                        <input type="text" name="nickname" class="setting-input" value="柯涵" placeholder="你可以在这里更改你的昵称">
                                        <button class="btn save-btn">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">职位</span>
                                    <div class="box">
                                        <input type="text" name="job" class="setting-input" value="CSGO职业哥" placeholder="关于你的职业">
                                        <button class="btn save-btn">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">个人介绍</span>
                                    <div class="box">
                                        <input type="text" name="introduction" class="setting-input" value="A" placeholder="你的兴趣爱好">
                                        <button class="btn save-btn">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">个人博客地址</span>
                                    <div class="box">
                                        <input type="text" name="blogUrl" class="setting-input" value="" placeholder="你的个人博客的地址">
                                        <button class="btn save-btn">保存</button>
                                    </div>
                                </li>

                            </ul>

                        </div>

                    </div>


                </div>

            </div>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    export default {
        components : {navigation},
        data() {

            return {
                navigationList : this.$store.state.navigationList,
            }

        },
        methods : {

        },

        created () {
            this.$store.commit("getUserLogStatus");
        },

        mounted() {
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";


    body{
        background: #f4f5f5;
    }


    /*-------------个人资料-------------*/

    .setting-container{
        background-color: #fff;
        padding: 30px 65px;
        margin-top: 25px;
    }

    .setting-title{
        font-size: 24px; 
        padding:0;
        margin:0 0 25px 0;
    }

    .setting-list{
        display:flex;
        flex-direction: column;
        list-style: none;
        margin:0;
        padding:0;
    }

    .setting-list .setting-item{
        display:flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        padding:0;
    }

    .setting-list .setting-item:first-child{
        border-top: 1px solid #eee;
    }

    .setting-item .title{
        flex: 0 0 auto;
        align-self: center;
        width: 125px;
        font-size: 16px;
    }

    .setting-item .box{
        display:flex;
        flex-direction: row;
        justify-content: center;
        flex : 1 1 auto;
        align-self: center;
        padding:20px 10px;
    }

    .setting-input{
        flex: 1 1 auto;
        height: 40px;
        font-size: 18px;
        color: rgba(0,0,0,0.5);
        letter-spacing: 1px;
        border: none;
    }

    .save-btn{
        flex: 0 0 auto;
        align-self: center;
        padding: 0 8px;
        background-color: #fff;
        border-color: #fff;
        color: #409eff;
    }

    .portrait-box{
        display: flex;
        flex-direction: row;
    }

    .portrait-box img{
        width: 60px;
        height: 60px;
        border-radius: 4px;
        margin-right: 30px;
    }

    .hint{
        color: rgba(0,0,0,0.5);
        font-size: 14px;
        margin-bottom: 10px;
    }


</style>
