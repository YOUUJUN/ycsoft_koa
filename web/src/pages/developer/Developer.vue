<template>
    <div id="app">

        <div>
            <child1 :name='name' v-model="name"></child1>
            <p>{{name}}</p>
        </div>
        <h1>11111111111111</h1>
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
