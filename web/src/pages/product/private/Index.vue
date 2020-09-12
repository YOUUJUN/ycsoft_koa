<template>

    <section class="index">

        <banner></banner>

        <crumbs v-bind:list="groupByType()"></crumbs>

        <panels v-bind:productsList="productsList"></panels>

    </section>

</template>

<script>
    const banner = () => import("./Banner.vue");
    const crumbs = () => import("./Crumbs.vue");
    const panels = () => import("./Panels.vue");

    export default {
        name: "Index",
        components : {banner,crumbs,panels},
        data() {
            return {
                productsList : this.$store.state.productsList
            };
        },

        methods : {
            groupByType () {
                const list = this.productsList;
                const finalData = [];
                const temArr = [];
                for(let i of list){
                    if(temArr.indexOf(i.type) === -1){
                        let obj = {};
                        obj.type = i.type;
                        obj.num = 0;
                        for(let j of list){
                            if(obj.type === j.type){
                                obj.num += 1;
                            }
                        }
                        temArr.push(obj.type);
                        finalData.push(obj);
                    }
                }
                return finalData;
            }

        },


    }

</script>

<style scoped>

</style>
