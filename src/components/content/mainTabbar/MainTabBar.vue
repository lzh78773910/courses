<template>
  <div class="main-tab-bar">
    <tab-bar-top />
    <tab-bar v-if="this.path != '/teachVideo/'+$route.params.id " />
  </div>
</template>

<script>
import TabBarTop from './childComps/TabBarTop'
import TabBar from './childComps/TabBar'
import { wRoute } from 'common/mixin';
export default {
  name: 'MainTabBar',
  data() {
    return {
      rou: '1a6sf15g'
    }
  },
  components: {
    TabBarTop,
    TabBar
  },
  mixins: [wRoute]

}
</script>

<style scoped>
  .main-tab-bar {
    width: 100%;
  }
</style>