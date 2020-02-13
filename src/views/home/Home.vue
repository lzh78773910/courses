<template>
  <div class="home">
    <div class="content">
      <h-course-introduce :HomeTabAContent="HomeTabAContent"/>
      <h-advantage />
      <h-state-study />
    </div>
  </div>
</template>

<script>
import HCourseIntroduce from './childComps/HCourseIntroduce'
import HAdvantage from './childComps/HAdvantage'
import HStateStudy from './childComps/HStateStudy'
import { getHomeTab } from 'network/home'
export default {
  name: 'Home',
  data() {
    return {
      HomeTabAContent: [],
    }
  },
  components: {
    HCourseIntroduce,
    HAdvantage,
    HStateStudy
  },
  created() {
    this.getHomeTab()
  },
  methods: {
    getHomeTab() {
      getHomeTab().then(res => {
        this.HomeTabAContent = res
      })
    }
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    background-color:#f0f0f0;
  }

  .content {
    width: 100%;
    background-color:#f0f0f0;
  }
  

</style>