import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.config.productionTip = false

Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.config.silent = true

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

