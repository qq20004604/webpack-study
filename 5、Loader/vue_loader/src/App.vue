<template>
    <div>
        <div>{{msg}}</div>
        <button @click="changeMsg">点击更改文字内容</button>
        <span v-if="ms > 0">距离更改还有{{ms}}毫秒</span>
        <child></child>
    </div>
</template>
<style scoped>

</style>
<script>
    import child from './child.vue'
    export default {
        data() {
            return {
                msg: 'hello vue',
                ms: 0
            }
        },
        methods: {
            changeMsg() {
                new Promise((resolve, reject) => {
                    this.ms = 2000
                    let timer = setInterval(() => {
                        this.ms -= 16
                        if (this.ms <= 0) {
                            this.ms = 0
                            resolve()
                            clearInterval(timer)
                        }
                    }, 16)
                }).then(() => {
                    this.msg === 'hello vue' ? this.msg = 'this is qq20004604\`s demo!' : this.msg = 'hello vue'
                })
            }
        },
        components: {
            child
        }
    }
</script>
