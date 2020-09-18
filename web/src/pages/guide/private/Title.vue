<template>

    <div class="guide-header">
        <span class="guide-logo">可视化布局框架文档</span>

        <div class="field-text search-input">
            <span class="input-icon-right"><i field-band="icon" class="fa fa-search"></i></span>
            <input type="text" placeholder="搜索内容">
        </div>
    </div>

</template>

<script>
    export default {
        name: "Title"
    }
</script>

<style scoped>

    .guide-header{
        position: -webkit-sticky;
        position: sticky;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        top: 123px;
        background-color: rgba(255,255,255,0.6);
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        border-bottom: 1px solid #ddd;
        transition: background-color 0.3s ease-in-out;
        padding: 10px 60px;
        z-index:50;
    }

    @media(max-width: 768px){
        .guide-header{
            top:64px;
        }
    }

    .guide-logo{
        display: inline-block;
        font-size: 1.2em;
        height: 40px;
        line-height: 40px;
        color: #2c3e50;
        font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        font-weight: 500;
        text-decoration: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .search-input {
        width:200px;
    }

    .search-input input{
        height:100%;
        border-radius: 30px;
        font-size: 16px;
        padding: 0 12px;
    }

    .search-input span{
        right:10px;
        font-size: 18px;
    }

</style>
