<template>

    <div>

        <div class="nick-title">

            <div>
                <a v-bind:href="articleInfo.url">
                    <img class="nick-img" v-bind:src="articleInfo.authorPortrait">
                </a>
            </div>

            <div>
                <div class="nickname">{{articleInfo.author}}</div>
                <div class="article-status">
                    <span>{{new Date(articleInfo.date).toLocaleString()}}</span>
                    <span>阅读 :  {{articleInfo.articleView}}</span>
                </div>
            </div>

        </div>

        <h2 class="article-title">{{articleInfo.title}}</h2>

        <editor-md v-bind:config="config" v-bind:preview="true" v-bind:initData="articleInfo.content"></editor-md>







        <!--<div id="Comment" class="message-board">

            <h4 class="message-header">评论</h4>

            <div class="welcome-box">
                <button class="btn" onclick="doAsk(userMenu);">登录</button><span class="message-welcome"> 登录来发表您的看法吧！</span>
            </div>

            <ul class="comment-list"><li class="comment-item">            <a href="/personal/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410" class="comment-portrait"><img src="/users/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410/portraits/0.09973871801953105.jpg"></a>

                <div class="comment-info">

                    <div class="comment-user-info">
                        <a href="/personal/0192e830-1bbb-11e9-b9c9-cdaf3c9a2410" class="user-name">柯涵</a>
                        <span class="user-introduction">A</span>
                    </div>

                    <div class="comment-message">12</div>

                    <div class="comment-footer">
                        <a class="re-comment" data-v="4002cc90-3c10-11ea-bc92-c9f421a8f221" onclick="reComment.open(this)"><i class="fa fa-commenting-o"></i><span class="comment-count">0条评论</span></a>
                        <span class="comment-time">52天前</span>
                    </div></div></li></ul>

        </div>-->





    </div>



</template>

<script>

    const editorMd = () => import("../../../components/Mymd.vue");

    export default {
        name: "Panel",
        components : {editorMd},
        data() {
            return {
                config : {
                    htmlDecode: "style,script,iframe",
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析
                    codeFold: true
                },
                articleInfo : {}
            }
        },

        methods : {

            getHash (){
                console.log("window",window.location.pathname);
                let path = window.location.pathname.split("/");
                let postId = path.pop();
                return postId;
            },

            loadArticle (id){
                this.$axios({
                    url : "/community/getArticleInfo",
                    method: 'Post',
                    data : {
                        postId : id
                    }
                }).then(msg => {
                    console.log("msg ==->2",msg);
                    this.articleInfo = msg.data.data;

                    this.$bus.$emit('sendData', this.articleInfo);

                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            let vm = this;
            this.loadArticle(vm.getHash());
        }

    }
</script>

<style scoped>


    /*----------文章容器---------*/

    .nick-title{
        padding:20px;
        display:flex;
        flex-direction:row;
    }

    .nick-img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right:12px;
    }

    .nickname {
        font-size: 18px;
        margin-bottom: 4px;
    }

    .article-status{
        color: rgba(0,0,0,0.6);
    }

    .article-status span:first-child{
        margin-right:18px;
    }

    .article-title{
        font-size: 30px;
        font-weight: 700;
        line-height: 45px;
        margin: 20px 0 0 20px;
    }


</style>