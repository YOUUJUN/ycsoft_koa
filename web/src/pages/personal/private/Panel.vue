<template>

    <div class="personal-container">

        <div class="personal-shell">

            <div class="head-portrait">

                <img v-bind:src="authorInfo.portrait">

            </div>

            <div class="personal-info">

                <h2>{{authorInfo.nickname}}</h2>

                <ul>

                    <li><span class="user-introduction"><i class="fa fa-briefcase"></i>{{authorInfo.job}}</span></li>

                    <li><span class="user-introduction"><i class="fa fa-address-card-o"></i>{{authorInfo.introduction}}</span></li>

                </ul>

            </div>

        </div>

        <div class="personal-control">

            <a href="/users/setting" class="btn" v-if="owner">编辑个人资料</a>
            <button class="btn active" @click="addFollow(authorInfo)" v-else-if="userFollowed">已关注</button>
            <button class="btn" @click="addFollow(authorInfo)" v-else>关注</button>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Panel",
        props :{
            authorInfo : Object,
            owner : Boolean
        },
        data (){
            return {
                userInfo : {},
                userFollowed : false
            }
        },

        methods : {
            checkUserBind (){
                this.$axios({
                    method : "post",
                    url : "/personal/checkUserAuthorBind",
                    data : {
                        userId : this.$common.getHash()
                    }
                }).then(res => {
                    if(res.data === 1){
                        this.userFollowed = true;
                    }else if(res.data === 0){
                        this.userFollowed = false;
                    }
                }).catch(err => {
                    console.error(err);
                })
            },

            addFollow(item){
                item.id = item.userId;
                this.$emit("addFollow",item);
                this.checkUserBind();
            }
        },

        computed : {

        },

        beforeCreate(){
            console.log("子组件--beforeCreate");
        },
        created() {
            this.userInfo = this.$common.getUserInfo();
            console.log("子组件--created");
        },
        beforeMount(){
            console.log("子组件--beforeMount");
        },
        mounted () {
            this.checkUserBind();
            console.log("子组件--mounted");
            console.log("attrs",this.$attrs);
        },
        beforeUpdate() {
            console.log("子组件--beforeUpdate");
        },
        updated() {
            console.log("子组件--updated");
        },
        beforeDestroy() {
            console.log("子组件--beforeDestroy");
        },
        destroyed() {
            console.log("子组件--destroyed");
        }
    }
</script>

<style scoped>


    .personal-container{
        display:flex;
        padding:35px;
        background-color: #fff;
        flex-direction: row;
        justify-content: space-between;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
    }

    .personal-shell{
        display:flex;
        flex-direction: row;
    }

    .head-portrait{
        display:flex;
        align-items: center;
    }

    .head-portrait img{
        width: 90px;
        height:90px;
        border-radius: 50%;
        margin-right: 35px;
    }

    .personal-info h2{
        margin:0 0 15px 0;
        font-size: 24px;
        font-weight: 600;
    }

    .personal-info ul{
        list-style: none;
        margin:0;
        padding:0;
    }

    .personal-info ul li a{
        color:#409eff;
        text-decoration: none;
    }


    .personal-info ul li:first-child{
        margin-bottom:8px;
    }

    /*--用户信息--*/
    .user-introduction{
        color: #72777b;
    }

    .user-introduction i{
        margin-right:6px;
    }





    .personal-control{
        display:flex;
        align-self: end;
    }

    .personal-control button{
        background-color: #fff;
        color: #409eff;
        height: 38px;
        line-height: 34px;
        font-size: 16px;
    }


    .statistics-select{
        background-color: #fff;
        margin-top:15px;
    }

    .statistics-select .statistics-select-board{
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        flex-direction: row;
        justify-content: space-around;
    }

    .statistics-select-board li{
        flex: 1 1 auto;
        text-align: center;
        border-right: 1px solid #ddd;
        padding: 18px;
        font-size: 16px;
        cursor:pointer;
    }

    .statistics-select-board li:last-child{
        border-color:#fff;
    }

    .statistics-select-board li:hover{
        color:#409eff;
    }

    .statistics-select-board span{
        margin-left: 10px;
        color: rgba(0,0,0,0.5);
    }

    .show-container{
        background-color: #fff;
        margin-top: 15px;
    }

    .article-list{
        list-style: none;
        padding:0;
        margin:0;
    }

    .user-article{
        border-bottom:1px solid #eee;
    }

    .user-article:hover{
        background-color: #fafafa;
    }

    .user-article .article-href{
        text-decoration: none;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .user-article-name{
        display:flex;
        flex-direction: column;
    }

    .user-article-name .name{
        font-size: 18px;
        font-weight: 600;
        color: rgba(0,0,0,0.6);
    }

    .user-article-name .time{
        color: rgba(0,0,0,0.4);
        font-size: 14px;
    }

    .operation-box{
        align-self: center;
    }

</style>
