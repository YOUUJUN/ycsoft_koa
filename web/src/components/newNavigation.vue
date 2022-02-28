<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            activeIndex: "1",
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>