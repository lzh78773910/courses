<template>
  <div class="ContentBox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HContentBox'
}
</script>

<style scoped>
.ContentBox {
    width: 80%;
    height: 620px;
    background-color: #fff;
    margin: 30px auto 50px auto;
    box-shadow: 0 0 20px #e7e7e7;
  }
.contentTitle {
  width: 100%;
  height: 100px;
  margin: 0px auto 0 auto;
  text-align: center;
}
.contentTitle span {
  font-size: 28px;
  margin: 0px 0 0 10px;
  line-height: 100px;
}
</style>