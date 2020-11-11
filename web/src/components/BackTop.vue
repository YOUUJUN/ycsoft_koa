<template>

    <div class="goTop-shell" @click="goTop" v-bind:style="{visibility : visibility}">

        <div class="goTo-inner">

            <i class="el-icon-caret-top"></i>

        </div>

    </div>

</template>

<script>

    export default {
        name: "BackTop",
        data (){
            return {
                visibility : "hidden"
            }
        },
        methods : {
            goTop (){
                var vm = this;
                let scrollTop = document.documentElement.scrollTop;

                if (scrollTop > 0) {
                    window.requestAnimationFrame(vm.goTop);
                    document.documentElement.scrollTop = scrollTop - scrollTop / 6;
                }
            },

            listenScroll (){
                let vm = this;
                window.addEventListener("scroll", () =>{
                    let scrollTop = document.documentElement.scrollTop;
                    if(scrollTop > 100){
                        vm.visibility = "visible";
                    }else{
                        vm.visibility = "hidden";
                    }
                })
            }

        },

        created() {

            this.listenScroll();

        }
    }
</script>

<style>

    /*html {*/
    /*    scroll-behavior: smooth;*/
    /*}*/

</style>

<style scoped>

    .goTop-shell{
        position: fixed;
        right:100px;
        bottom: 70px;
        background-color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #409eff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        cursor: pointer;
        z-index: 5;
    }

    .goTop-shell:hover {
        background-color: #f2f6fc;
    }




</style>
