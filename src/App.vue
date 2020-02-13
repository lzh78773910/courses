<template>
  <div id="app">
    <main-tab-bar />
    <div id="v-content" v-bind:style="{minHeight: Height+'px'}">
      <router-view v-if="isRouterAlive" />
    </div>
    <c-footer />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import cFooter from "components/content/footer/Footer";
import "element-ui/lib/theme-chalk/display.css";

export default {
  name: "App",
  components: {
    MainTabBar,
    cFooter
  },
  provide() {
    // 注册一个方法
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      Height: 0
    };
  },
  mounted() {
    //动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.Height = document.documentElement.clientHeight - 100; 
    //监听浏览器窗口变化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 100;
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
</style>
