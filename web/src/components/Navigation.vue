<template>

    <div class="main-navigation">
        <div class="container navigation-container">
            <div class="area cols-12">

                <div class="logo">
                    <img id="logo" src="images/logo.png" style=""  />

                </div>


                <div id="main-menu" ref="navigation" class="hidden-xs">
                    <ul class="menu">

                        <li v-for="item in list" v-on:mouseenter="startAnimation()" v-on:mouseleave="endAnimation()"><a v-bind:class="item.active" v-bind:target="item.target" v-bind:href="item.href">{{item.name}}</a><span class="ribbon"></span></li>

                    </ul>
                </div>

                <div class="hamburger visible-xs" v-on:click="trans()" ref="hamburger">
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "navigation",
        props : ["list"],
        data (){
            return {

            }
        },
        methods : {
            startAnimation () {
                let ribbon = event.target.querySelector(".ribbon");
                $(ribbon).stop().css('height','2px');
                $(ribbon).animate({
                    left:'0',
                    width:'100%',
                    right:'0'
                },200);
            },
            endAnimation (){
                let ribbon = event.target.querySelector(".ribbon");
                $(ribbon).stop().animate({
                    left:'50%',
                    width:'0'
                },400);
            },

            trans (){
                let hamburger = this.$refs.hamburger;
                let navigation = this.$refs.navigation;
                if(!hamburger.classList.contains("is-active")){
                    hamburger.classList.add("is-active");
                    navigation.classList.add("show");
                }else{
                    hamburger.classList.remove("is-active");
                    navigation.classList.remove("show");
                }
            }
        },
        created : () =>{
            console.log("hello");
        }
    }
</script>

<style scoped>

    /*------------导航栏-----------*/
    a{
        text-decoration:none;
    }

    .logo{
        float: left;
    }

    #logo{
        float: left;
        display:block;
        height:64px;
        width:240px;
    }

    #main-menu{
        position:relative;
    }

    .navigation-container{
        z-index: 999;
        background: #2188b6;
    }

    .main-navigation{
        text-align:center;
        border-top:1px solid #2188b6;
        border-bottom:2px solid #2188b6;
        background-color: #2188b6;
        padding: 70px 0 35px 0;
    }

    @media (max-width: 767px) {
        .main-navigation{
            padding:10px 0;
        }

        .menu{
            display: flex;
            flex-direction: column;
        }

        .logo{
            display: flex;
            float: none;
        }
    }



    .main-navigation .menu{
        padding:0;
        padding-bottom: 2px;
        margin:0;
    }

    .menu li{
        list-style:none;
        display:inline-block;
        position:relative;
        margin-right: 5px;
    }

    .menu li:after{
        border-bottom:2px solid #e67e22;
        margin-bottom:-2px;
    }



    .menu li a{
        font-family: Libre Baskerville;
        color: #d3effb;
        font-size:16px;
        font-weight:400;
        line-height:60px;
        display:block;
        padding:0 21px;
        text-decoration:none;
    }

    .menu li a:hover{
        color: #000;
        outline: none;
    }

    #main-menu{
        overflow:hidden;
    }

    .nav-current {
        border-bottom: 2px solid #e67e22;
    }

    .ribbon{
        display:block;
        position:absolute;
        background:#e67e22;
        top:60px;
        left:50%;
    }


    /*-----汉堡---------*/
    .hamburger{
        position: absolute;
        top: 5px;
        right: 22px;
        display: none;
        width: 30px;
        line-height: 30px;
        padding-top: 4px;
    }

    @media(max-width:768px) {

    }

    .hamburger:hover{
        cursor:pointer;
        background-color:transparent;
    }

    .hamburger:hover > .line{
        background-color:#E04343;
    }

    .hamburger .line{
        width: 35px;
        height: 5px;
        background-color: rgba(0,0,0,0.4);
        display: block;
        margin: 8px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }


    .hamburger.is-active{
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        -webkit-transition-delay: 0.6s;
        -o-transition-delay: 0.6s;
        transition-delay: 0.6s;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .hamburger.is-active .line:nth-child(2){
        width: 0;
    }

    .hamburger.is-active .line:nth-child(1),
    .hamburger.is-active .line:nth-child(3){
        -webkit-transition-delay: 0.3s;
        -o-transition-delay: 0.3s;
        transition-delay: 0.3s;
    }

    .hamburger.is-active .line:nth-child(1){
        -webkit-transform: translateY(13px);
        -ms-transform: translateY(13px);
        -o-transform: translateY(13px);
        transform: translateY(13px);
    }

    .hamburger.is-active .line:nth-child(3){
        -webkit-transform: translateY(-13px) rotate(90deg);
        -ms-transform: translateY(-13px) rotate(90deg);
        -o-transform: translateY(-13px) rotate(90deg);
        transform: translateY(-13px) rotate(90deg);
    }


</style>