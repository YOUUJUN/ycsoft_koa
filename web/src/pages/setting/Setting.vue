<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList" ref="navigation"></navigation>

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

                                            <img id="portraitImg" v-bind:src="userData.portrait">

                                            <div class="action-box">
                                                <div class="hint">支持文件大小 5M 以内的图片</div>
                                                <button class="btn upload-btn" @click="getImg()">点击上传</button>
                                                <input type="file" ref="portrait" accept="image/*" style="display:none" v-on:change="getFile()">
                                            </div>

                                        </div>

                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">昵称</span>
                                    <div class="box">
                                        <input type="text" v-model="userData.nickname" class="setting-input" placeholder="你可以在这里更改你的昵称">
                                        <button class="btn save-btn" @click="modifyUserInfo('nickname')">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">职位</span>
                                    <div class="box">
                                        <input type="text" v-model="userData.job" class="setting-input" placeholder="关于你的职业">
                                        <button class="btn save-btn" @click="modifyUserInfo('job')">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">个人介绍</span>
                                    <div class="box">
                                        <input type="text" v-model="userData.introduction" class="setting-input" placeholder="你的兴趣爱好">
                                        <button class="btn save-btn" @click="modifyUserInfo('introduction')">保存</button>
                                    </div>
                                </li>
                                <li class="setting-item">
                                    <span class="title">个人博客地址</span>
                                    <div class="box">
                                        <input type="text" v-model="userData.blogUrl" class="setting-input" placeholder="你的个人博客的地址">
                                        <button class="btn save-btn" @click="modifyUserInfo('blogUrl')">保存</button>
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
                userData : {}
            }

        },
        methods : {

            getUserLogStatus (){
                this.$axios({
                    method : "post",
                    url : "verifyToken"
                }).then(value =>{
                    console.log("value ====-====",value);
                    this.$store.commit("changeLogStatus",value.data.logged);
                }).catch(err => {
                    console.log(err);
                })
            },

            getImg (){
                this.$refs["portrait"].click();
            },

            getFile(){
                var vm = this;
                var file = this.$refs["portrait"].files[0];
                var fileType = file.type;
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = function (ev) {
                    var baseCode = ev.target.result;
                    var imgBlob = vm.convertToBlob(baseCode, fileType);

                    var formData = new window.FormData();
                    formData.append('file',imgBlob);

                    var xmlhttp = new XMLHttpRequest();

                    xmlhttp.open("POST",vm.baseURL.concat("/users/uploadimg"));
                    let marscript = window.localStorage.getItem("marscript");
                    if (marscript) {
                        xmlhttp.setRequestHeader("accessToken",marscript);
                    }
                    xmlhttp.send(formData);

                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            var msg = JSON.parse(this.responseText);
                            console.log(msg);
                            alert(msg.data);
                            if(msg.status == 1){
                                document.getElementById("portraitImg").src = baseCode;
                                vm.syncUserInfo();
                            }
                        }
                    };

                };
            },

            convertToBlob (base64Data, type) {
                //去掉base64中的换行符，webkit会自动去除，但是IOS9以及IOS8中不会自动去除，导致转换出错
                base64Data = base64Data.replace(/\s/g, '');

                var text = window.atob(base64Data.split(",")[1]);
                var buffer = new ArrayBuffer(text.length);
                var ubuffer = new Uint8Array(buffer);
                for (var i = 0; i < text.length; i++) {
                    ubuffer[i] = text.charCodeAt(i);
                }

                var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
                var blob;

                if (Builder) {
                    var builder = new Builder();
                    builder.append(buffer);
                    blob = builder.getBlob(type);
                } else {
                    blob = new window.Blob([buffer], {
                        type: type
                    });
                }
                return blob;
            },

            syncUserInfo (){
                this.$axios({
                    method : "post",
                    url : "/users/getUserInfo"
                }).then(value =>{
                    localStorage.setItem("userData",JSON.stringify(value.data.data));
                    this.$refs["navigation"].syncUserInfo();
                }).catch(err => {
                    console.log(err);
                })
            },

            modifyUserInfo(key){
                let value = this.userData[key];
                this.$axios({
                    method : "POST",
                    url : "/users/modifyUserInfo",
                    data : {
                        key : key,
                        value : value
                    }
                }).then(value => {

                    if(value.data.status == "1"){
                        this.$notify({
                            title: '成功',
                            message: value.data.data,
                            type: 'success'
                        });
                        this.syncUserInfo();
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: value.data.data
                        });
                    }
                }).catch(err => {
                    console.error(err);
                })
            }

        },

        created () {
            this.getUserLogStatus();
            this.userData = this.$common.getUserInfo();
        },

        mounted() {
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
            console.log("baseUrl",this.$axios.baseURL);
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
