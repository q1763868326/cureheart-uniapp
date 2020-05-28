import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import pet from './pages/pet/pet.vue'
Vue.component("pet",pet)

import friends from './pages/friends/friends.vue'
Vue.component("friends",friends)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import animate from 'animate.css';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
