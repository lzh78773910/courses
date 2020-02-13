<template>
  <div>
    <el-carousel height="45vh" v-if="this.$route.path == '/home'" interval="5000" class="first">
      <el-carousel-item v-for="(item, index) in rotation" :key="index">
        <img :src="item" alt class="rotationImg" />
      </el-carousel-item>
    </el-carousel>
    <el-carousel height="150px" v-else>
      <el-carousel-item v-for="(item, index) in rotation" :key="index">
        <img :src="item" alt class="rotationImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Elrotation",
  props: {
    rotation: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.el-carousel-item {
  width: 100%;
  height: 100%;
}
.rotationImg {
  width: 100%;
  height: 100%;
}
</style>