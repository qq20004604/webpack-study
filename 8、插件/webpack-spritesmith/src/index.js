/**
 * Created by 王冬 on 2017/12/26.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 要么写这个，然后在 webpack.config.js 里设置别名
import Vue from 'Vue'
// 要么用下面这个
// import Vue from 'vue/dist/vue.js'
import App from './App.vue'

new Vue({
    el: '#app',
    template: '<App></App>',
    components: {
        App
    }
})
