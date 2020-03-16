<template>
    <div id="app">

        <div>
            <input type="text" v-model="name"></input>
            <p>{{name}}</p>
            <p>{{obj.id}}</p>
        </div>
        <h1>11111111111111</h1>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'Demi',
                obj : {
                    id : "1"
                }
            };
        },

        watch : {
            name : function (newValue,oldValue) {
                console.log("newValue",newValue,"oldValue",oldValue);
            },

            obj : function (newValue,oldValue) {
                console.log("newValue",newValue,"oldValue",oldValue);
            }
        }
    };
</script>
