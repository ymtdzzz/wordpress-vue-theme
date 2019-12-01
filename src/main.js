require('./bootstrap')

import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'

import 'reset-css'

require('./assets/scss/global.scss')

Vue.filter('striphtml', function (value) {
    const div = document.createElement("div");
    div.innerHTML = value;
    return div.textContent || div.innerText || "";
});

const main = new Vue({
    router,
	store,
    render: h => h(App)
}).$mount('#app')
