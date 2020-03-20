<template>


    <div class="re-comment-board popover-top" v-if="panelVisibility">

        <div class="re-comment-list">


            <div class="re-comment-item" v-for="(item,index) in reCommentList" v-bind:key="index" v-on:mouseenter="showReply(item)" v-on:mouseleave="hideReply(item)">
                <a class="comment-portrait" v-bind:href="item.url"><img v-bind:src="item.portrait"></a>

                <div class="comment-info">

                    <div class="comment-user-info">
                        <a v-bind:href="item.url" class="user-name">{{item.nickname}}</a>
                        <span class="user-introduction">{{item.introduction}}</span>
                    </div>

                    <div class="comment-message" data-index="0">{{item.message}}</div>

                    <div class="comment-footer">
                        <span class="comment-time">{{getTimeDif(item.addtime)}}</span><a class="comment-reply" v-bind:class="{invisible : item.replyVisibility}" href="javascript:void(0)" @click="setReplyHead(item)" ref="replyBtn">回复</a>
                    </div>

                </div>
            </div>


        </div>

        <div class="re-comment-textarea" v-if="logged">
            <div class="field-textarea">
                <textarea id="re-comment-textarea" rows="1" v-on:input="changeReplyBtn" v-bind:placeholder="replyState" v-model="replyInfo.message"></textarea>
            </div>

            <button id="reCommentBtn" class="btn" @click="reComment" ref="shoot" v-if="shootStatus">发表</button>
            <button id="replyCancelBtn" class="btn" @click="replyCancel" v-else>取消</button>
        </div>

    </div>


</template>

<script>
    export default {
        name: "ReComment",
        props: {
            exist: Boolean,
            commentInfo: Object
        },

        data() {
            return {
                loaded: false,
                reCommentList: [],
                replyVisibility : false,
                replyInfo :{
                    postId : '',
                    commentId : '',
                    defendant :'',
                    defendantId : '',
                    plaintiff :'',
                    addTime : '',
                    message : ''
                },
                shootStatus : true,
            }
        },

        methods:{
            getTimeDif (timer){
                return this.$common.getTimeDif(timer);
            },

            reComment(){
                this.replyInfo.addTime = new Date().toLocaleString();

                let defendant = this.replyInfo.defendant;
                if(defendant !== ""){
                    this.replyInfo.message = "回复 " + defendant + "：" + this.replyInfo.message;
                }

                this.$axios({
                    method : "post",
                    url : "/community/addReComment",
                    data : {
                        replyInfo : this.replyInfo
                    }
                }).then(res =>{
                    alert(res.data.data);

                    if(res.data.status == '1'){
                        this.getReComment();
                    }

                }).catch(err =>{

                })

            },

            getReComment(){
                this.$axios({
                    method: "post",
                    url: "/community/getReComment",
                    data: {
                        commentId: this.commentInfo.commentid,
                        postId: this.$common.getHash()
                    }
                }).then(res => {
                    this.reCommentList = res.data.data;
                    for(let item of this.reCommentList){
                        this.$set(item,"replyVisibility",true);
                    }
                    this.loaded = true;
                }).catch(err => {

                })
            },

            showReply(target){
                if(this.logged){
                    target.replyVisibility = false;
                }
            },

            hideReply(target){
                target.replyVisibility = true;
            },

            setReplyHead(target){
                console.log("target====>",target);
                this.shootStatus = false;

                if(!this.$store.state.logged){
                    return;
                }

                let userInfo = this.$common.getUserInfo();

                this.replyInfo.message = "";
                this.replyInfo.commentId = target.commentid;
                this.replyInfo.postId = this.$common.getHash();
                this.replyInfo.defendant = target.nickname;
                this.replyInfo.defendantId = target.userid;
                this.replyInfo.plaintiff = userInfo.nickname;
            },

            replyCancel(){
                let userInfo = this.$common.getUserInfo();
                this.replyInfo.postId = this.$common.getHash();
                this.replyInfo.commentId = this.commentInfo.commentid;
                this.replyInfo.defendant = "";
                this.replyInfo.defendantId = this.commentInfo.userid;
                this.replyInfo.plaintiff = userInfo.nickname;
                this.replyInfo.message = "";

                this.shootStatus = true;
            },

            changeReplyBtn(){
                this.shootStatus = true;
            }
        },

        computed: {

            logged (){
                return this.$store.state.logged;
            },

            panelVisibility() {
                return this.exist;
            },

            replyState(){
                if(this.replyInfo.defendant){
                    return "回复 " + this.replyInfo.defendant;
                }else{
                    return "";
                }
            }

        },

        watch:{
            exist (){
                if (!this.loaded) {
                    this.getReComment();
                }
            }
        },

        mounted() {
            this.replyCancel()
        }
    }
</script>

<style scoped>

    /*-------------------留言板-----------------*/

    .message-board{
        padding:60px;
    }

    .message-header{
        text-align: center;
        font-size: 18px;
        color:rgba(0,0,0,0.7);
    }

    .comment-box{
        display:flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9fa;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        text-align: center;
    }

    .comment-box-header{
        display:flex;
        flex-direction: row;
    }

    .comment-info{
        width:100%;
    }


    .comment-box .post-btn{
        width: 60px;
        align-self: flex-end;
        margin-top: 12px;
    }

    .welcome-box{
        display:flex;
        justify-content: center;
        padding: 30px 0;
        background-color: #f8f9fa;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        text-align: center;
    }

    .message-welcome {
        font-size: 15px;
        color: rgba(0,0,0,0.6);
        vertical-align: middle;
        line-height: 28px;
        margin-left: 10px;
    }

    .comment-list{
        list-style: none;
        padding: 0;
        margin:35px 0 0 0;
    }

    .comment-item{
        display:flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom:30px;
    }

    .comment-list li:last-child{
        border-bottom: none;
    }



    .comment-portrait{
        height: 100%;
        margin-right:15px;
    }

    .comment-portrait img{
        width:45px;
        height:45px;
        border-radius: 50%;
    }

    .comment-user-info .user-name{
        color:#333;
        font-size: 15px;
        font-weight: 600;
        margin-right:8px;
    }

    .comment-user-info .user-name:hover{
        color:#409eff;
    }

    .comment-user-info .user-introduction{
        font-size: 12px;
        color:rgba(0,0,0,0.5);
    }

    .comment-message{
        margin:4px 0 6px 0;
        color:#333;
        font-size: 14px;
    }


    .comment-footer{
        color:rgba(0,0,0,0.6);
    }

    .re-comment{
        font-size: 13px;
        margin-right:10px;
        text-decoration: none !important;
        color:rgba(0,0,0,0.6);
        cursor:pointer;
    }

    .re-comment i{
        margin-right:6px;
        font-size: 16px;
    }

    .comment-time{
        font-size: 12px;
    }

    .comment-reply{
        font-size: 12px;
        margin-left:10px;
        color:rgba(0,0,0,0.6);
    }

    .comment-reply:hover{
        text-decoration: none;
        color:#409eff;
    }


    /*---留言板对话框---*/

    .re-comment-board{
        position:relative;
        border:1px solid #eee;
        padding:25px 35px;
        margin-top:15px;
    }

    .re-comment-list{
        list-style: none;
        padding:0;
        margin:0;
    }

    .re-comment-item{
        display:flex;
        flex-direction: row;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom:30px;
    }


    .re-comment-list li:last-child{
        border-bottom: none;
    }

    .popover-top:before{
        position:absolute;
        content:'';
        top:-10px;
        left:30px;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #dcdfe6;
    }

    .popover-top:after{
        position: absolute;
        content: '';
        top:-9px;
        left:30px;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:10px solid #fff;
    }

    /*---回复输入框---*/


    .re-comment-textarea{
        display:flex;
        flex-direction: row;
    }

    .re-comment-textarea textarea{
        height:35px;
        overflow: hidden;
        overflow-wrap: break-word;
        resize: none;
        padding: 6px;
        font-size: 14px;
    }

    .re-comment-textarea .btn{
        line-height: 32px;
        height: 35px;
        margin-left: 10px;
    }

</style>