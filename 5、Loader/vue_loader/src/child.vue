<template>
    <div>
        <div>这是子模板的输入框</div>
        <input type="text" @change="log" v-model="text">{{text}}
    </div>
</template>
<style scoped>

    div {
        font-size: 20px;
    }

</style>
<script>
    export default {
        data() {
            return {
                text: 'child'
            }
        },
        methods: {
            log() {
                console.log(this.text)
            }
        }
    }
</script>
