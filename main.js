import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import pet from './pages/pet/pet.vue'
Vue.component("pet",pet)

import friends from './pages/friends/friends.vue'
Vue.component("friends",friends)

import music from './pages/music/music.vue'
Vue.component("music",music)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
import animate from 'animate.css';

// import VueSocketIO from 'vue-socket.io'
// Vue.use(VueSocketIO, 'http://116.62.47.156:8000');

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
