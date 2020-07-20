<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>
            <search-title></search-title>

            <guid-body v-bind:barlist="barList" v-if="done"></guid-body>
        </main>

        <footer>

<!--            <foot></foot>-->

        </footer>
    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const searchTitle = () => import("./private/Title.vue");
    const guidBody = () => import("./private/Layout.vue");
    const foot = () => import("../../components/Footer.vue");

    export default {
        components : {navigation,searchTitle,guidBody,foot},
        data() {
            return {
                navigationList : this.$store.state.navigationList,
                barList : [],
                done : false
            };
        },
        methods : {
            getDocNavigation (){
                this.$axios({
                    url : "/getDocNavigation",
                    method: 'POST'
                }).then(msg => {
                    let originData = msg.data;

                    let cacheObj = {};
                    for(let item of originData){
                        if(cacheObj.hasOwnProperty(item.category) === false){
                            let property = item.category;
                            cacheObj[property] = [
                                {
                                    id : item.id,
                                    title : item.title
                                }
                            ]
                            // Object.defineProperty(cacheObj, item.category,{
                            //     value : [
                            //         {
                            //             id : item.id,
                            //             title : item.title,
                            //         }
                            //     ]
                            // });
                        }else{
                            let property = item.category;
                            let cache = {
                                id : item.id,
                                title : item.title,
                            };
                            cacheObj[property].push(cache);
                        }
                    }

                    this.barList = cacheObj;
                    this.done = true;
                }).catch(err => {
                    console.log(err);
                })
            },

        },
        created() {
            this.getDocNavigation();
            this.$store.dispatch("getUserLogStatus");
        },
        mounted() {

        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

    body{
        background-color: #fff;
    }

    header{
        position: sticky;
        top: 0;
        z-index: 50;
    }

</style>
