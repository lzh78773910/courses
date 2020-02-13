<template>
  <el-row class="tab-bar">
    <el-col :span="19" :offset="5">
      <el-col
        :span="2"
        v-for="(item, index) in navData"
        :key="index"
        :xs="0"
        :sm="{span:3}"
        :md="3"
        :lg="2"
      >
        <div @click="navClick(item)" class="nav-on">
          <ul>
            <li>
              <i :class="item.icon"></i>
              {{item.liCon}}
            </li>
          </ul>
        </div>
      </el-col>

      <!-- 搜索框 -->
      <el-col :xs="{span: 16, offset:8}" :sm="{span: 5, offset: 0}" :md="{span: 4, offset:0}" :lg="{span: 5,offset: 4}">
        <nav-search />
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
// import NavMain from "./NavMain";
import { TabRoute } from "common/mixin";
import NavSearch from "./NavSearch";
export default {
  name: "TabBar",
  components: {
    // NavMain,
    NavSearch
  },
  data() {
    return {};
  },
  mixins: [TabRoute]
};
</script>

<style scoped>
.tab-bar {
  height: 50px;
  border-top: 3px solid #cfb872;
  background-color: var(--color-main);
  color: #fff;
}

ul li {
  font-size: 14px;
  line-height: 47px;
  float: right;
  list-style: none;
  text-align: center;
  cursor: pointer;
}
ul li:hover {
  color: #daa520;
}
.search {
  height: 100%;
  float: left;
}

.nav-on {
  height: 100%;
  float: left;
}
.nav-on:hover {
  background-color: rgba(10, 37, 120, 0.4);
  box-shadow: 0px 0px 3px #fff;
  transition: 0.5s;
}
/* @media (max-width: 767px) {
  .tab-bar {
    display: none;
  }
} */
</style>