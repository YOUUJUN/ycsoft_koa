<template>

    <section>

        <banner></banner>

        <crumbs v-bind:list="groupByType()"></crumbs>

        <panels></panels>

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
                productsList : [
                    {
                        type : "基础模板",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "基础模板",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "后台模板",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo2.png","/images/template/platform-demo2.png"],
                        href : "/"
                    },
                    {
                        type : "后台模板",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo2.png"],
                        href : "/"
                    },
                    {
                        type : "数据可视化",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "数据可视化",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "企业成功案例",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "企业成功案例",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    },
                    {
                        type : "企业成功案例",
                        name : "商家管理系统",
                        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
                        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
                        href : "/"
                    }
                ]
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
