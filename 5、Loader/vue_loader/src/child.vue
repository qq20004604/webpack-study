<template>
    <div class="child-component">
        <div class="large-font child">这是子模板的输入框</div>
        <input type="text" @change="log" v-model="text">
        <span class="text">{{text}}</span>
        <br/>
        <img src="./webpack.png" alt=""/>
    </div>
</template>
<style scoped lang="less" type="text/less">
    /* 使用 less 语法，只需要配置上面的标签属性，以及安装 less-loader 即可 */
    .child-component {
        .text {
            font-size: 30px;
            font-weight: bold;
        }
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
