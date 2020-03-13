<template>

    <div class="hot-topic-title">

        <h4>热门话题</h4>

        <ul class="hot-topic-box">

            <li class="hot-topic-item" v-for="item in hotTopic">
                <a v-bind:href="item.url">
                    <img src="/images/topic-mid-img.png">
                    <h2>{{item.name}}</h2>
                </a>
            </li>

        </ul>

    </div>

</template>

<script>
    export default {
        name: "Hot",
        data () {
            return {
                hotTopic : [
                    {
                        url:"/community/topics/CSGO",
                        name:"CSGO"
                    },
                    {
                        url:"/community/topics/NODE",
                        name:"SQL"
                    },
                    {
                        url:"/community/topics/WEB前端",
                        name:"WEB前端"
                    },
                    {
                        url:"/community/topics/SQL",
                        name:"SQL"
                    }
                    ]
            }
        },

        methods : {
            getHotTopic (){
                this.$axios({
                    url : "/community/getHotList",
                    method : "POST"
                }).then(msg =>{
                    this.hotTopic = msg.data.data;
                }).catch(err =>{
                    console.log(err);
                })
            }
        },
        created() {
            this.getHotTopic();
        }
    }
</script>

<style scoped>


    /*--------热门话题--------*/

    .hot-topic-title{
        position:relative;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
        padding: 18px 0;
        margin-bottom:25px;
    }

    .hot-topic-title h4{
        margin: 0 0 10px 10px;
        display: inline-block;
    }

    .hot-topic-box{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        list-style: none;
        height: 100%;
        padding: 0;
        margin:0;
        align-items: center;
    }

    .hot-topic-item a{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 12px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
        text-decoration: none;
        color: rgba(0,0,0,0.5);
    }

    .hot-topic-item img{
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }

    .hot-topic-item h2{
        font-size: 18px;
        margin: 0;
        align-self: baseline;
    }

    @media screen and (max-width:768px) {

        .hot-topic-item {
            margin-bottom: 15px;
        }

    }

</style>




