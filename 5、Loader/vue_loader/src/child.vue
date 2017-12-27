<template>
    <div>
        <div class="large-font child">这是子模板的输入框</div>
        <input type="text" @change="log" v-model="text">{{text}}
    </div>
</template>
<style scoped>
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
