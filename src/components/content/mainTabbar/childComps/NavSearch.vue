<template>
  <div class="NavSearch">
    <input type="text" placeholder="请输入搜索内容" v-model="inputValue" @keyup.enter="searchClick" />
    <button @click="searchClick">
      <img src="~assets/img/common/search.png" alt="搜索" />
    </button>
  </div>
</template>

<script>
export default {
  name: "NavSearch",
  data() {
    return {
      inputValue: "",
      currentPage: 1,
      pageSize: 12
    };
  },
  computed: {},
  methods: {
    searchClick() {
      if (this.$route.path != "/teachVideo") {
        console.log("当前不在视频页面");
        let inputValue = this.inputValue;
        this.$router.push({
          path: "/teachVideo",
          query: {
            inputValue
          }
        });
        this.inputValue = "";
      } else {
        console.log("当前在视频页面");
        let inputValue = this.inputValue;
        this.$router.push({
          path: "/teachVideo",
          query: {
            inputValue
          }
        });
      }
      this.inputValue = "";
    }
  }
};
</script>

<style scoped>
.NavSearch {
  margin-top: 7.5px;
}
/**提取公共部分 */
input[type="text"],
button {
  height: 32px;
  float: left;
  border: none;
  outline: none;
}
input[type="text"] {
  width: 60%;
  padding-left: 20px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

button {
  width: 13%;
  /* background-color: #fff; */
  background-color: #f0f0f0;

  border-left: 1px solid #b0b0b0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
button img {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
}
</style>