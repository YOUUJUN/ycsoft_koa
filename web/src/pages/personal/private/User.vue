<template>

    <div>

        <div class="profile-container" v-if="owner">
            <ul class="stat-list">
                <li>
                    <div class="article">关注</div>
                    <div class="count">{{authorInfo.concernNum}}</div>
                </li>
                <li>
                    <div class="article">关注者</div>
                    <div class="count">{{authorInfo.beWatchedNum}}</div>
                </li>
            </ul>
        </div>

        <div class="profile-container" v-else>
            <div class="topic-name">
                <span>个人成就</span>
            </div>
            <div class="profile">

                <a href="javascript:void(0);" class="user-img"><img v-bind:src="authorInfo.url"></a>

                <div class="user-info">

                    <ul class="user-info-list">
                        <li><a href="" class="user-name">{{authorInfo.nickname}}</a></li>
                        <li><span class="user-introduction">{{authorInfo.introduction}}</span></li>
                    </ul>

                </div>

            </div>

            <ul class="author-info">
                <li>
                    <div>获得阅读数 : {{authorInfo.articleCount}}<span></span></div>
                </li>
                <li>
                    <div>获得点赞数 : {{authorInfo.userLike}}<span></span></div>
                </li>
                <li>
                    <div>获得关注数 : {{authorInfo.beWatchedNum}}<span></span></div>
                </li>
            </ul>
        </div>



    </div>
    
</template>

<script>
    export default {
        name: "User",
        props :{
            authorInfo : Object,
            owner : Boolean
        },
        data (){
            return {
                userInfo : {}
            }
        },
        computed : {


        },

        created() {
            this.userInfo = this.$common.getUserInfo();
        }
    }
</script>

<style scoped>

    /*-------话题标签容器-------*/

    .tags-container{
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
        background-color: #fff;
    }

    .tags-container .topic-name, .profile-container .topic-name{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:10px;
        border-bottom:1px solid #ddd;
    }

    .tags-container .topic-name span, .profile-container .topic-name span{
        font-size: 18px;
        color:rgba(0,0,0,0.8);
        font-weight: 600;
    }

    .tags-container .topic-name .topic-href{
        font-size: 15px;
        align-self: end;
        color: rgba(0,0,0,0.7);
    }

    .topic-tags{
        display: flex;
        flex-direction: column;
        list-style: none;
        margin:0;
        padding: 0;
    }

    .topic-tags-link:hover{
        text-decoration: none;
    }

    .tags-box {
        display:flex;
        flex-direction: row;
        padding:15px;
        border-bottom: 1px solid rgba(178,186,194,.15);
    }

    .tags-box img{
        width:50px;
    }

    .tags-box:hover{
        background-color: #fafafa;
    }

    .topic-tips{
        margin-left:10px;
    }

    .topic-tips div:first-child{
        font-size: 16px;
        color:rgba(0,0,0,0.9);
    }

    .topic-tips div:last-child{
        font-size: 14px;
        color:rgba(0,0,0,0.5);
    }


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



    .user-name{
        font-size: 16px;
        color:rgba(0,0,0,0.6);
    }

    .user-name:hover{
        text-decoration: none;
        color:#409eff;
    }

    .author-info{
        display:flex;
        flex-direction: column;
        list-style: none;
        margin:0;
        padding: 0 0 8px 18px;
    }

    .author-info li {
        font-size: 15px;
        margin-bottom: 8px;
        color: rgba(0,0,0,0.6);
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

    .stat-list li:nth-child(2){
        border-left:1px solid #ddd;
        border-right:1px solid #ddd;
    }

    .stat-list li:last-child{
        border-right:none;
    }

    .stat-list li div:first-child{
        color:rgba(0,0,0,0.5);
        margin-bottom: 4px;
    }

    .stat-list li div:last-child{
        color:rgba(0,0,0,1);
        font-weight: 600;
    }

</style>