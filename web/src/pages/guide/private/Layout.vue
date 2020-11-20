<template>

    <div class="container-fluid select-container">
        <div class="area cols-md-3 cols-sm-12 cols-xs-12 left-bar">
            <div class="menu-content"></div>
            <div class="menu_part" v-for="(item,index) in barlist">
                <div class="menu-title" v-on:click="hideList">
                    <span data-name="category">{{index}}</span><i class="fa fa-angle-double-down"></i>
                </div>
                <ul class="menu-list" style="display: block;" ref="doc-navi">
                    <li class="list-item" v-for="son of item">
                        <a v-bind:href="'#'.concat(son.title)" v-on:click="openDoc(son.id)" v-bind:title="son.title">{{son.title}}</a>
                    </li>
                </ul>
            </div>

        </div>

        <div class="area cols-md-9 cols-sm-9 cols-md-offset-3 rightSide-body">

<!--            <div id="doc-content" ref="doc-content">-->
<!--                <textarea id="doc-value" ref="textarea"></textarea>-->
<!--            </div>-->

            <editor-md v-bind:config="config" v-bind:preview="true" v-bind:initData="initData"></editor-md>

        </div>
    </div>

</template>

<script>

    const editorMd = () => import("../../../components/Mymd.vue");

    export default {
        name: "Layout",
        props : ["barlist"],
        data() {
            return {
                config : {
                    htmlDecode: "style,script,iframe",
                    emoji: true,
                    taskList: true,
                    tex: true, // 默认不解析
                    flowChart: true, // 默认不解析
                    sequenceDiagram: true, // 默认不解析
                    codeFold: true
                },
                initData : ''
            }
        },
        components : { editorMd },
        methods : {
            openDoc (id){
                let href = "/guide/"+id;
                this.$axios({
                    url : href,
                    method: 'GET'
                }).then(msg => {
                    console.log("msg",msg);
                    this.initData = msg.data.content;
                }).catch(err => {
                    console.log(err);
                })
            },

            hideList (){

            }
        },

        computed :{

        },

        mounted() {
            this.$nextTick(()=>{
                for(let item in this.barlist){
                    let hash = this.barlist[item][0].id;
                    this.openDoc(hash);
                    return;
                }
            });
        }
    }
</script>

<style scoped>

    /*----左侧导航栏-----*/
    .left-bar {
        position: fixed;
        top: 168px;
        bottom: 0;
        overflow-y: auto;
    }

    @media(max-width: 768px){
        .left-bar {
            position: static;
        }
    }

    .menu-content {
        background: #fff;
        padding: 10px 20px;
    }


    .select-container .menu-list {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .select-container li {
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid#dcdfe6;
    }

    .select-container li a {
        color: rgba(0, 0, 0, 0.8);
        padding: 10px 0;
        text-decoration: none;
        display: block;
    }

    .menu-title {
        position: relative;
        line-height: 45px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        overflow: hidden;
        border-bottom: 1px solid #dcdfe6;
        cursor: pointer;
    }

    .menu-title i {
        position: absolute;
        top: 14px;
        right: 8px;
        transition: all 0.5s;
    }

    .menu-title .active {
        transform: rotate(180deg);
        transition: all 0.5s;
    }


    .menu-title:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        height: 35px;
        width: 10px;
        background-color: #e67e22;
    }

    .select-container li {
        cursor: pointer;
    }

    .select-container li:hover {
        background: #eeeeee;
    }

    .select-container li:hover a {
        color: #409eff;
    }


    /*--right--*/

    .rightSide-body{
        margin-top:60px;
    }

</style>
