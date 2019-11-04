import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
