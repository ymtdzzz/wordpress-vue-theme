require('./bootstrap')

import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import moment from 'moment'

import 'reset-css'

require('./assets/scss/global.scss')

const locale = (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage
moment.locale(locale)

Vue.filter('striphtml', function (value) {
    const div = document.createElement("div");
    div.innerHTML = value;
    return div.textContent || div.innerText || "";
})

Vue.filter('moment', function (date) {
    return moment(date).format('LL');
})

const main = new Vue({
    router,
	store,
    render: h => h(App)
}).$mount('#app')
