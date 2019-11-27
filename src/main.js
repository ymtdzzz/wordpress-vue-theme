import Vue from 'vue'
import router from './router'
import App from './App.vue'

require('./assets/scss/style.scss')

const main = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')