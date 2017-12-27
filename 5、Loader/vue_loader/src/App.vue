<template>
    <div class="app">
        <div class="large-font">{{msg}}</div>
        <button @click="changeMsg">点击更改文字内容</button>
        <span v-if="ms > 0" :class="[$style.test, foo.bar]">距离更改还有{{ms}}毫秒</span>
        <child></child>
    </div>
</template>
<style scoped>

    .large-font {
        font-size: 20px;
    }

    /* 使用这个语法，可以让这个选择器被编译为：
       例如：.app[data-v-04c2046b] .child
       优点是可以在父元素的组件里，控制子元素的样式，
       实际使用中注意选择器权重的问题。
     */
    .app /deep/ .child {
        color: red;
    }
</style>

<!-- 调用方法示例：<div :class="$style.test"> -->
<style module>
    .test {
        border: 2px solid gold;
    }
</style>

<!-- 调用方法示例： <div :class="foo.bar"> -->
<style module="foo">
    .bar {
        position: relative;
        animation: move 2s linear infinite;
    }

    @keyframes move {
        0% {
            left: 0;
        }
        50% {
            left: 100px;
        }
        100% {
            left: 0;
        }
    }
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
                console.log(this.$style)
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
