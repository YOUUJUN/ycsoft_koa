<template>

    <div class="timeline-entry-list">

        <ul id="entryList" class="entry-list">

            <li class="item" v-for="item of articleList">
                <a v-bind:href="item.url">
                    <div class="entry-box">
                        <div class="entry">

                            <div class="content-box">

                                <div class="info-box">
                                    <div class="info-row">
                                        <ul class="meta-list">
                                            <li>
                                                <object><a v-bind:href="item.userUrl"><span class="username">{{item.author}}</span>
                                                    -</a></object>
                                            </li>
                                            <li><span class="time">{{getTimeDif(item.date)}}</span> -</li>
                                            <li><a v-bind:href="'/community/topics/'.concat(item.topic)"><span class="tag">{{item.topic}}</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="info-row">
                                        <object><span class="title">{{item.title}}</span></object>
                                    </div>
                                    <div class="info-row">
                                        <ul class="action-list">
                                            <li>
                                                <object><a class="btn diy-btn" v-bind:class="{active: item.ifSubscribed}" href="javascript:void(0)" @click="addLike(item)"><i class="fa fa-heart"></i><span>{{item.likeNum}}</span></a>
                                                </object>
                                            </li>
                                            <li>
                                                <object>
                                                    <a class="btn diy-btn" v-bind:href="'/community/post/'+ item.id +'#Comment'">
                                                        <i class="fa fa-comment"></i>{{item.replyNum}}</a>
                                                </object>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </a></li>


            <li id="loader" class="item" ref="loader">

                <ul class="skeleton-box" v-if="postSwitch">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                <div class="skeleton-info-box" v-else>
                    <ul>
                        <li><span class="modal-icon fa fa-file-text-o"></span></li>
                        <li><span class="skeleton-info">已经加载完全部文章了哦！</span></li>
                    </ul>
                </div>

            </li>

        </ul>

    </div>

</template>

<script>

    export default {
        name: "Panel",
        props : {
            forTopics : Boolean
        },
        data() {
            return {
                articleList: [],
                postIndex : 0,
                postSwitch : true
            }
        },
        methods: {

            getArticleList(topic) {

                let topicValue = topic || "";

                this.postIndex += 1;

                this.$axios({
                    url: "/community/getArticleList",
                    method: "POST",
                    data : {
                        postIndex : this.postIndex,
                        topic : topicValue
                    }
                }).then(msg => {
                    if(msg.data.data.length === 0){
                        this.postSwitch = false;
                        return;
                    }
                    this.articleList = this.articleList.concat(msg.data.data);
                }).catch(err => {
                    console.log(err);
                })
            },

            getTimeDif (timer){
                var date = new Date(timer);
                var newDate = new Date();
                var str = '';

                var dif = newDate.getTime() - date.getTime();
                //计算出相差天数
                var days=Math.floor(dif/(24*3600*1000));

                //计算出小时数
                var leave1=dif%(24*3600*1000); //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                var leave2=leave1%(3600*1000); //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000));
                //计算相差秒数
                var leave3=leave2%(60*1000); //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000);
                if(seconds == 0 && minutes == 0 && hours == 0 && days == 0){
                    str = '刚刚';
                }else if(minutes == 0 && hours == 0 && days == 0){
                    str = seconds + '秒前';
                }else if(hours == 0 && days == 0){
                    str = minutes + '分钟前';
                }else if(days == 0){
                    str = hours + '小时前';
                }else if(days > 0){
                    str = days + '天前';
                }

                return str;
            },

            setScrollLoader (){
                var vm = this;
                /*---首页滚动加载---*/
                window.addEventListener('scroll',function(){
                    var loader = vm.$refs["loader"];
                    var scrollTop = document.documentElement.scrollTop;
                    var canSee = document.documentElement.clientHeight;
                    var docHeight = document.body.scrollHeight;
                    var num = loader.offsetHeight;

                    var positionValue = docHeight - (scrollTop + canSee);

                    if(positionValue == 0){
                        if(vm.forTopics){
                            vm.getArticleList(vm.$common.getHash());
                        }else{
                            vm.getArticleList();
                        }
                    }
                });
            },

            addLike(item){
                if(!this.$store.getters.getLogStatus()){
                    this.$parent.$refs['navigation'].login();
                    return;
                }

                let postId = item.id;

                this.$axios({
                    method : "post",
                    url : "/community/addLike",
                    data : {
                        postId : postId
                    }
                }).then(value =>{
                    if(value.data.success === 0){
                        return;
                    }

                    if(value.data.status === 1){
                        item.ifSubscribed = true;
                        item.likeNum += 1;
                    }else if(value.data.status === 0){
                        item.ifSubscribed = false;
                        item.likeNum -= 1;
                    }

                }).catch(err => {
                    console.error(err);
                })

            },

        },

        computed:{

        },

        created() {

            if(this.forTopics){
                this.getArticleList(this.$common.getHash());
            }else{
                this.getArticleList();
            }
        },

        mounted() {
            this.setScrollLoader();
        }
    }
</script>

<style scoped>


    /*---------文章展示主体-------*/

    .entry-box ul{
        list-style: none;
        text-decoration: none;
        margin:0;
        padding:0;
    }

    .entry-box li{
        list-style: none;
        display: inline-block;
    }


    .timeline-entry-list{
        background-color: #fff;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
    }

    .entry-list{
        list-style: none;
        text-decoration: none;
        margin:0;
        padding:0;
    }

    .entry-list .item{
        display:block;
        border-bottom: 1px solid rgba(178,186,194,.15);
    }

    .item a{
        text-decoration: none;
    }

    .item a:hover{
        text-decoration: none;
    }

    .entry-list .item:hover{
        background-color: #fafafa;
    }

    .content-box{
        padding: 18px;
    }

    .meta-list{
        font-size: 0;
    }

    .meta-list li {
        font-size: 14px;
        margin-right:6px;
        color: rgba(0,0,0,0.2);
    }

    .meta-list li span {
        color: rgba(0,0,0,0.5);
    }

    .meta-list a span:hover{
        color:#409eff;
    }

    .info-row .title{
        color:rgba(0,0,0,0.7);
        font-size: 17px;
        font-weight: 600;
        margin: 4px 0 8px 0;
        display: block;
    }

    .action-list li{
        margin-right:5px;
    }

    .btn.diy-btn{
        height: 20px;
        line-height: 20px;
        color: #409eff;
        font-size: 13px;
        background-color: #fff;
        opacity: 0.6;
        padding: 0 4px;
    }

    .btn.diy-btn:hover{
        color:#fff;
        background-color: #409eff;
        border-color: #409eff;
    }

    .btn.diy-btn i{
        margin-right:4px;
    }

    .btn.diy-btn.active{
        background-color: #a0cfff;
        border-color: #a0cfff;
    }

    .btn.diy-btn.active i {
        color: red;
    }


</style>





