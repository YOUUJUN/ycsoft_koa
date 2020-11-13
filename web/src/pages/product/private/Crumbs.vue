<template>

    <div class="crumbs">

        <div class="container">
            <div class="area cols-md-12 cols-sm-12">
                <ul class="navigation inline-center" ref="list">
                    <li>
                        <button v-on:click.self="selector('total', $event)" data-domain="entire" class="active">全部<span class="scaffold-count">{{getTotal()}}</span></button>
                    </li>
                    <li v-for="item in list"><button v-on:click.self="selector(item.type, $event)">{{item.type}}<span class="scaffold-count">{{item.num}}</span></button></li>

                </ul>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: "Crumbs",
        props : ["list"],
        data (){
             return {
                 selfList : this.list
             }
        },
        methods : {
            getTotal (){
                let total = 0;
                for(let item of this.list){
                    total += item.num;
                }
                return total;
            },
            selector (type, $event){
                let vm = this;
                let shell = vm.$refs['list'];
                for(let item of shell.children){
                    item.querySelector("button").classList.remove("active");
                }
                
                $event.target.classList.add("active");

                vm.$bus.$emit("changeType",type);
            }
        },

        computed : {

        }
    }
</script>

<style scoped>

    .crumbs{
        background-color: #fff;
    }

    .navigation{
        display: flex;
        align-items: center;
        padding: 0 10px;
        overflow: auto;
        background: #fff;
        box-shadow: 0 6px 18px 0 rgba(82,94,102,.15);
        border-radius: 5px;
        margin-top: -20px;
        margin-bottom:20px;
        height:80px;
    }

    .navigation li {
        border-radius: 24px;
        margin: 10px;
        transition: all .3s ease;
        list-style: none;
    }

    .navigation li button {
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        padding: 0 18px;
        color: #666;
        background-color: #fff;
        display: block;
        border: none;
        border-radius: 24px;
        cursor: pointer;
    }

    .navigation li button:hover {
        color: #fff;
        background-color: #6875E9;
        transition: all .3s ease;
    }

    .scaffold-count{
        margin-left:4px;
    }

    .active {
        color: #fff !important;
        background-color: #6875E9 !important;
    }

</style>
