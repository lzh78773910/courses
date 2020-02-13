<template>

  <div @click="navClick" class="nav-on">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "TabBarNav",
  data() {
    return {};
  },
  props: {
    path: String
  },

};
</script>

<style scoped>
.nav-on {
  height: 100%;
  float: left;
}
.nav-on:hover {
  background-color: 	rgba(10,37,120,.4);
  box-shadow: 0px 0px 3px #fff;
  transition:.5s;
} 

</style>