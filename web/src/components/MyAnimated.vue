<template>

    <div class="shell" ref="shell">

        <button @click="show = !show">点我</button>

        <transition v-bind:name="type">

            <div v-show="show">
                <slot></slot>
            </div>

        </transition>

    </div>

</template>

<script>
    export default {
        name: "MyAnimated",
        props : ["type"],
        data (){
            return{
                show :false,
                type : this.type,
                height : {
                    height : "290px"
                }
            }
        },
        methods : {
            setScrollLoader (){
                var vm = this;
                var loader = vm.$refs["shell"];

                vm.$nextTick(()=>{

                    setTimeout(() => {
                        let slot = vm.$slots.default[0];
                        console.log("slot.elm.offsetHeight",slot.elm.offsetHeight);
                        let slotHeight = slot.elm.offsetHeight == 0 ? slot.elm.height : slot.elm.offsetHeight;
                        console.log("slotHeight =====>",slotHeight);
                        loader.style.height = slotHeight + "px";

                        vm.getTop(loader,undefined,function (sum) {

                            var scrollTop = document.documentElement.scrollTop;
                            var canSee = document.documentElement.clientHeight;
                            var docHeight = document.body.scrollHeight;

                            if(canSee > sum){
                                vm.show = true;
                            }else{
                                let handler = window.addEventListener('scroll',function(){
                                    scrollTop = document.documentElement.scrollTop;
                                    canSee = document.documentElement.clientHeight;
                                    docHeight = document.body.scrollHeight;
                                    var offsetHeight = loader.offsetHeight;
                                    console.log("offsetHeight",offsetHeight);
                                    var positionValue = docHeight - (scrollTop + canSee + offsetHeight + 100);
                                    console.log("positionValue=========sum",positionValue,sum);
                                    if(positionValue < sum){
                                        vm.show = true;
                                        // window.removeEventListener("scroll",handler);
                                    }

                                });
                            }



                        });

                    },0);

                });




            },

            getTop (target, arr = [], func ){
                console.log("target ====>",target);
                console.log("target.offsetParent.tagName",target.offsetParent.tagName);
                arr.push(target.offsetTop);
                if(target.offsetParent.tagName !== "BODY"){
                    this.getTop(target.offsetParent, arr, func);
                }else{
                    // return arr;
                    let sum = 0;
                    for(let item of arr){
                        console.log("item",item);
                        sum += item;
                    }
                    func(sum);

                    // return sum;
                }
            }
        },

        mounted() {
            this.setScrollLoader();
        }
    }
</script>

<style scoped>

    .fadeLeft-enter{
        opacity: 0;
        margin-right: -500px;
    }

    .fadeLeft-enter-to{
        opacity: 1;
        margin-right: 0;
    }

    .fadeLeft-enter-active, .fadeLeft-leave-active {
        transition: all 1s;
    }
    .fadeLeft-leave-to  {
        opacity: 0;
    }




    .fadeRight-enter{
        opacity: 0;
        transform: scale(0);
    }

    .fadeRight-enter-to{
        opacity: 1;
        margin-left: 0;
        transform: scale(1);
    }

    .fadeRight-enter-active, .fadeRight-leave-active {
        transition: all 1s;
    }
    .fadeRight-leave-to  {
        opacity: 0;
    }


</style>
