<template>
  <div>
    <!--      头部登录与注册-->
    <div class="top-user" v-if="this.path != '/teachVideo/'+$route.params.id">
      <!-- 移动端导航栏 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-s-unfold el-icon--left"></i>目录
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :icon="item.icon"
            v-for="(item, index) in navData"
            :key="index"
            :path="item.liPath"
            @click.native="navClick(item)"
          >{{item.liCon}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <login-and-reg v-if="!user" class="login" />
      <user v-if="user" />
    </div>
    <!--      头部登录与注册-->
    <video-tab v-else />
    <!-- <img src="~assets/img/common/top.jpg" alt class="top-img" v-if="this.path === '/home'" /> -->

    <elrotation :rotation="rotation" v-if="this.path === '/home'" />
  </div>
</template>

<script>
import { wRoute, TabRoute } from "common/mixin";
import VideoTab from "./VideoTab";
import LoginAndReg from "./LoginAndReg";
import User from "./User";
import Elrotation from "components/common/element/Elrotation"; //轮播图插件

export default {
  name: "TabBarTop",
  data() {
    return {
      centerDialogVisible: false,
      rotation: [
        //轮播图数据
        require("assets/img/common/top.jpg"),
        require("assets/img/common/top2.jpg"),
        require("assets/img/common/top3.jpg"),
        require("assets/img/common/top4.jpg")
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user.id != null;
    }
  },
  components: {
    VideoTab,
    LoginAndReg,
    User,
    Elrotation
  },
  mixins: [wRoute, TabRoute]
};
</script>

<style scoped>
.top-user {
  width: 100%;
  height: 35px;
  padding-top: 6px;
  padding-bottom: 2px;
  background-color: var(--color-main);
  color: white;
}

.top-img {
  width: 100%;
  height: 300px;
}

.login {
  margin-top: 0.4em;
  margin-right: 2em;
}
.el-dropdown {
  margin: 0.2em 0 0 1em;
  float: left;
  color: #fff;
  cursor: pointer;
  display: none;
}
@media (max-width: 768px) {
  .el-dropdown {
    display: block;
  }
}
</style>