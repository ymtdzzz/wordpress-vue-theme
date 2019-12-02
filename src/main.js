require('./bootstrap')

import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import moment from 'moment'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import 'reset-css'

require('./assets/scss/global.scss')

library.add(fas)

const locale = (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage
moment.locale(locale)

Vue.component('v-fa', FontAwesomeIcon)

Vue.config.productionTip = false

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
