<template>
    <div id="app">

        <div>
            <child1 :name='name' v-model="name"></child1>
            <p>{{name}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'Demi'
            };
        },
    };
</script>
