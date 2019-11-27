import Vue from 'vue'
import router from './router'
import App from './App.vue'

require('./assets/scss/style.scss')

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
})