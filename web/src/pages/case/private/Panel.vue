<template>

    <section class="panel">

        <article class="container panel-content">

            <div class="area cols-md-12 cols-sm-12">


                <div class="card-container">

                    <div class="card btn-3">
                        <div class="card-shell">
                            <img src="/images/case/bg.jpg" class="card-img">
                            <div class="overlay">
                                <h3 class="card-title">北京汽车解体厂</h3>
    <!--                            <button class="custom-btn btn-3"><span>查看</span></button>-->
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                </div>

                <div class="card-container">

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
                        </div>
                    </div>

                    <div class="card">
                        <img src="/images/case/bg.jpg" class="card-img">
                        <div class="overlay">
                            <h3 class="card-title">北京汽车解体厂</h3>
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
        components : {}
    }
</script>

<style scoped>
    /*.custom-btn {*/
    /*    width: 130px;*/
    /*    height: 40px;*/
    /*    color: #fff;*/
    /*    border-radius: 5px;*/
    /*    padding: 10px 25px;*/
    /*    font-family: 'Lato', sans-serif;*/
    /*    font-weight: 500;*/
    /*    background: transparent;*/
    /*    cursor: pointer;*/
    /*    transition: all 0.3s ease;*/
    /*    position: relative;*/
    /*    display: inline-block;*/
    /*    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),*/
    /*    7px 7px 20px 0px rgba(0,0,0,.1),*/
    /*    4px 4px 5px 0px rgba(0,0,0,.1);*/
    /*    outline: none;*/
    /*}*/

    /*!* 3 *!*/
    /*.btn-3 {*/
    /*    background: rgb(0,172,238);*/
    /*    background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);*/
    /*    width: 130px;*/
    /*    height: 40px;*/
    /*    line-height: 42px;*/
    /*    padding: 0;*/
    /*    border: none;*/

    /*}*/
    .btn-3 .card-shell {
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
        background: transparent;
        box-shadow: none;
    }
    .btn-3:hover:before {
        height: 100%;
    }
    .btn-3:hover:after {
        width: 100%;
    }
    .btn-3 .card-shell:hover{
        color: rgba(2,126,251,1);
    }
    .btn-3 .card-shell:before,
    .btn-3 .card-shell:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        background: rgba(2,126,251,1);
        transition: all 0.3s ease;
    }
    .btn-3 .card-shell:before {
        width: 2px;
        height: 0%;
    }
    .btn-3 .card-shell:after {
        width: 0%;
        height: 2px;
    }
    .btn-3 .card-shell:hover:before {
        height: 100%;
    }
    .btn-3 .card-shell:hover:after {
        width: 100%;
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
        justify-content: space-around;
        margin: 40px 0;
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
