import Vue from 'vue'
import Vuex from 'vuex'
import user from './user';
import persistedState from 'vuex-persistedstate'


//安装插件vuex
Vue.use(Vuex)


//创建Store对象
const state= {
    id:1,
}

const store = new Vuex.Store ({
  plugins: [ persistedState({ storage: window.sessionStorage })],
  state,
  modules:{
    // this.$store.state.user.token
    // //获取当前登录人
    // this.$store.state.user.user
    user
  },
})

//挂载vuex实例上
export default store