<template>

    <section class="panel">

        <article class="container panel-content">

            <div class="area cols-md-12 cols-sm-12">

                <div class="body-title-split">
                    <div class="body-title-split1 body-title-name">经典案例</div>
                    <div class="body-title-split2 body-title-small">CLASSIC CASE</div>
                </div>

                <div class="card-container">

                    <div class="card wow pulse" v-for="item of casesList">

                            <img v-bind:src="item.image" class="card-img">
                            <div class="overlay">
                                <h3 class="card-title">{{item.name}}</h3>
                                <button class="custom-btn btn-3" @click="jumpTo(item.url)"><span>查看</span></button>
                            </div>

                    </div>

                </div>


            </div>

        </article>

    </section>


</template>

<script>

    export default {
        name: "Panel",
        components : {},
        data (){
            return {
                casesList : this.$store.state.casesList
            }
        },
        methods : {
            jumpTo (address){
                window.open(address, "__blank");
            }
        },
        mounted() {
            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                console.log("new WOW()",new WOW());
                new WOW().init();
            }
        }
    }
</script>

<style scoped>
    .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
        outline: none;
    }

    /* 3 */
    .btn-3 {
        background: rgb(0,172,238);
        background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
        width: 60px;
        height: 40px;
        line-height: 42px;
        padding: 0;
        border: none;

    }
    .btn-3 span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
    }
    .btn-3:before,
    .btn-3:after {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        background: rgba(2,126,251,1);
        transition: all 0.3s ease;
    }
    .btn-3:before {
        height: 0%;
        width: 2px;
    }
    .btn-3:after {
        width: 0%;
        height: 2px;
    }
    .btn-3:hover{
        background: #fff;
        box-shadow: none;
    }
    .btn-3:hover:before {
        height: 100%;
    }
    .btn-3:hover:after {
        width: 100%;
    }
    .btn-3 span:hover{
        color: rgba(2,126,251,1);
    }
    .btn-3 span:before,
    .btn-3 span:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        background: rgba(2,126,251,1);
        transition: all 0.3s ease;
    }
    .btn-3 span:before {
        width: 2px;
        height: 0%;
    }
    .btn-3 span:after {
        width: 0%;
        height: 2px;
    }
    .btn-3 span:hover:before {
        height: 100%;
    }
    .btn-3 span:hover:after {
        width: 100%;
    }

    .cases-title{
        display: inline-block;
        font-weight: bold;
        font-size: 22px;
        color: #00aee4;
        position: relative;
        text-align: center;
        height: 22px;
        line-height: 22px;
        margin-bottom: 20px;
    }

    .cases-title::after {
        content: '';
        display: block;
        width: 93px;
        height: 1px;
        background: #00aee4;
        position: absolute;
        left: 22px;
        bottom: -10px;
        margin-left: -25px;
    }


    .body-title-split {
        display: flex;
        align-items: flex-end;
        margin-left: 50px;
    }

    .body-title-split > div.body-title-split1 {
        border-bottom: 4px solid #2867bc;
        padding-bottom: 10px;
    }

    .body-title-split .body-title-name {
        color: #222;
        font-size: 24px;
        padding-right:10px;
    }

    .body-title-split > div.body-title-split2 {
        border-bottom: 4px solid #01A1ED;
        padding-bottom: 10px;
    }

    .body-title-split .body-title-small {
        color: #666;
    }



    .panel-content{
        background-color: #fff;
        padding:30px 0;
        box-shadow: 0 6px 18px 0 rgba(82,94,102,.15);
        border-radius: 5px;
        margin-top: -20px;
        margin-bottom: 40px;
    }

    .card-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;
        flex-wrap: wrap;
        padding: 0 20px;
    }

    .card-img{
        width:100%;
        height: 100%;
        transition: all .3s;
    }

    .overlay{
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        padding:20px;
        text-align: center;
        background: rgba(0,0,0,.2);
        transition: all .3s;
    }

    .card{
        position: relative;
        display: block;
        width: 240px;
        height: 160px;
        border:1px solid #eee;
        color:#fff;
        overflow: hidden;
        margin:10px;
        /*background-image: url("/images/case/bg.jpg");*/
        /*background-repeat: no-repeat;*/
        /*background-origin: content-box;*/
        /*background-position: inherit;*/
        /*background-size: 100% 100%;*/
    }

    .card:hover .card-img{
        transform: scale(1.2);
    }

</style>
