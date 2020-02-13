<template>
    <div class="fOne">
      <span v-for="(item, index) in firstCon" :key="index">{{item}}</span>
    </div>
    <!-- <div class="fTwo">
      <span v-for="(item, index) in lastCon" :key="index">{{item}}</span>
    </div> -->
</template>

<script>
export default {
  name: 'FooterCon',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  .fCon {
    height: 100%;
    color: #fff;
    text-align: center;

  }

  .fCon div {
    padding-top: 5px;
  }
  span {
    padding-left: 6px;
  }


</style>