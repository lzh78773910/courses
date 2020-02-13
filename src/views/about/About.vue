<template>
  <div>
    <el-row>
      <el-col :xs="{span:24,offset: 0}" :sm="{span: 24, offset: 0}" :lg="{span: 16,offset: 4}">
        <el-card>
          <img src="~assets/img/common/top4.jpg" class="top-img" />
          <h3>#友情链接</h3>
          <el-divider />
          <el-col :offset="2">
            <el-link
              :underline="false"
              :href="item.url"
              class="conBox"
              v-for="(item,index) in list"
              :key="index"
            >{{item.name}}</el-link>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Abouts } from "network/home";
export default {
  name: "About",
  data() {
    return {
      list: []
    };
  },
  methods: {
    Abouts() {
      Abouts().then(res => {
        this.list = res.data;
      });
    }
  },
  created() {
    this.Abouts();
  },
  mounted() {
    this.Abouts();
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 5em;
}
.top-img {
  width: 100%;
  height: 300px;
}
h3{
  margin: 1.2em 0 1em 5em;
}
.el-divider {
  width: 90%;
  margin: 0 auto 2em;
}
.conBox {
  width: 25vh;
  margin: 2em 1em;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>