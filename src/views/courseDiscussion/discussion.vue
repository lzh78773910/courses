<template>
  <discussion-main  @discussionList="discussionList"/>
  <!-- :content="content" :PageInfo="PageInfo" :currentPage="currentPage" :pageSize="pageSize" -->
</template>

<script>
import discussionMain from "./childComps/discussionMain";

export default {
  name: "discussion",
  data() {
    return {
      sActive: 0,
      commentData: [
        [
          {
            username: "JP.Dark",
            content:
              "入门的数据结构真心推荐郝斌老师的，讲得特别好，上课代码现敲，是在培训班上课的时候录屏的，没有任何对着屏幕念字的情况，都是自己举例子，包括名词解释都能现敲，目前b站看了那么多，没有一个能超过郝斌老师在我心中的地位……",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content: "asffa",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content: "asffa",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content: "asffa",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content: "hsdfhdfhdfhdf",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content: "3规范1人23她她",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content:
              "入门的数据结构真心推荐郝斌老师的，讲得特别好，上课代码现敲，是在培训班上课的时候录屏的，没有任何对着屏幕念字的情况，都是自己举例子，包括名词解释都能现敲，目前b站看了那么多，没有一个能超过郝斌老师在我心中的地位……",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              },
              {
                username: "JP.Dark",
                content: "asfasgfatg3sdvgds",
                date: "2018-07-20 20:35"
              }
            ]
          },
          {
            username: "JP.Dark",
            content:
              "入门的数据结构真心推荐郝斌老师的，讲得特别好，上课代码现敲，是在培训班上课的时候录屏的，没有任何对着屏幕念字的情况，都是自己举例子，包括名词解释都能现敲，目前b站看了那么多，没有一个能超过郝斌老师在我心中的地位……",
            date: "2018-07-20 20:35",
            secondLevelData: [
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              },
              {
                username: "JP.Dark",
                content: "51686186168156",
                date: "2018-07-20 20:35"
              },
              {
                username: "JP.Dark",
                content: "asfasgfatg3sdvgds",
                date: "2018-07-20 20:35"
              }
            ]
          }
        ]
      ],

    };
  },
  components: {
    discussionMain
  },

 
};
</script>

<style soped>
</style>