<template>

    <div class="profile-container">
        <div class="topic-name">
            <span>关于作者</span>
        </div>
        <div class="profile">

            <a v-bind:href="authorInfo.url" class="user-img"><img v-bind:src="authorInfo.authorPortrait"></a>

            <div class="user-info">

                <ul class="user-info-list">
                    <li><a v-bind:href="authorInfo.url" class="user-name">{{authorInfo.author}}</a></li>
                    <li><span class="user-introduction">{{authorInfo.authorIntroduction}}</span></li>
                </ul>

            </div>

        </div>

        <ul class="author-info">
            <li>
                <div>获得阅读数 : {{authorInfo.userView}}<span></span></div>
            </li>
            <li>
                <div>获得点赞数 : {{authorInfo.userLike}}<span></span></div>
            </li>
            <li>
                <div>获得关注数 : {{authorInfo.beWatchedNum}}<span></span></div>
            </li>
        </ul>
    </div>


</template>

<script>
    export default {
        name: "User",
        data (){
            return {
                authorInfo : {}
            }
        },

        methods : {

        },

        computed :{
            logged (){
                return this.$store.state.logged;
            }
        },

        mounted() {
            let vm = this;
            this.$bus.$on("sendData",(data) =>{
                console.log("data========>12",data);
                vm.authorInfo = data;
            })
        }
    }
</script>

<style scoped>


    .topic-name{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:10px;
        border-bottom:1px solid #ddd;
    }

    .topic-name span{
        font-size: 18px;
        color:rgba(0,0,0,0.8);
        font-weight: 600;
    }

    .topic-name .topic-href{
        font-size: 15px;
        align-self: end;
        color: rgba(0,0,0,0.7);
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


</style>