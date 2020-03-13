<template>

    <div class="tags-container">

        <div class="topic-name">
            <span>话题标签</span><a href="/community/topics" class="topic-href">更多..</a>
        </div>

        <ul class="topic-tags">

            <li v-for="item of topicList">
                <a v-bind:href="item.url" class="topic-tags-link">
                    <div class="tags-box">
                        <img src="/images/topic-mid-img.png">
                        <div class="topic-tips">
                            <div data-target="topicName">CSGO</div>
                            <div>5 文章 · 2 关注</div>
                        </div>
                    </div>
                </a>
            </li>

            <li>
                <a href="/community/topics/WEB前端" class="topic-tags-link">
                    <div class="tags-box">
                        <img src="/images/topic-mid-img.png">
                        <div class="topic-tips">
                            <div data-target="topicName">WEB前端</div>
                            <div>2 文章 · 1 关注</div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>

    </div>
    
</template>

<script>
    export default {
        name: "Topic",
        data (){
            return {
                topicList : []
            }
        },
        methods : {
            getTopicList (){
                this.$axios({
                    method : "POST",
                    url : "/community/getTopicList"
                }).then(value => {
                    this.topicList = value.data.data;
                }).catch(err =>{
                    console.log(err);
                })
            }
        },
        created() {
            this.getTopicList();
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

    .topic-tags-link{
        text-decoration:none;
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

</style>