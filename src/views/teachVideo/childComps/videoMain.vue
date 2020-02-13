<template>
  <div>
    <el-card class="box-card box-cards">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教学视频</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-col
      v-show="this.$route.query.inputValue != undefined"
      :span="18"
      :offset="3"
    >以下是你输入'{{this.$route.query.inputValue}}'查询到的视频</el-col>
    <el-row>
      <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
        <el-col :xs="{span: 12 , offset: 6}" class="eltab">
          <eltabs :eltabs="eltabs" @handleClick="handleClick" />
        </el-col>
      </el-col>
    </el-row>
    <div v-if="sActive == 0">
      <el-row :gutter="60">
        <el-col
          :span="5"
          :offset="1"
          :key="index"
          class="vContent"
          v-for="(item, index) in vData"
          :xs="{span: 24,offset: 0}"
          :sm="{span: 8,offset: 0}"
          :md="{span: 8, offset: 0}"
          :lg="{span: 5,offset: 1}"
        >
          <div class="vImg" @click="itemClick(index)">
            <img :src="item.videoImg" alt />
          </div>
          <div class="vCon">
            <p class="vTitle" @click="itemClick(index)">{{item.videoTitle}}</p>
            <div class="vBottom">
              <div>
                <img src="~assets/img/common/playbackVolume.png" alt />
                播放量：{{item.viewNum}}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="page">
        <elpagination @currentChange="currentChange" :PageInfo="PageInfo[0]" />
      </div>
    </div>
    <div v-else>
      <el-row :gutter="60">
        <el-col
          :span="5"
          :offset="1"
          :key="index"
          class="vContent"
          v-for="(item, index) in vData1"
          :xs="{span: 24,offset: 0}"
          :sm="{span: 8,offset: 0}"
          :md="{span: 8, offset: 0}"
          :lg="{span: 5,offset: 1}"
        >
          <div class="vImg" @click="itemClick(index)">
            <img :src="item.videoImg" alt />
          </div>
          <div class="vCon">
            <p class="vTitle" @click="itemClick(index)">{{item.videoTitle}}</p>
            <div class="vBottom">
              <div>
                <img src="~assets/img/common/playbackVolume.png" alt />
                播放量：{{item.viewNum}}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="page">
        <elpagination @currentChange="currentChange" :PageInfo="PageInfo[1]" />
      </div>
    </div>
  </div>
</template>

<script>
import Eltabs from "components/common/element/Eltabs"; //tab栏插件
import Elpagination from "components/common/element/Elpagination";
import { PageInfo } from "common/utils";
import { inDetail } from "common/mixin";
import {
  videoList,
  videoListByNum,
  videoSeachList,
  videoSeachListByNum
} from "network/video";
export default {
  name: "videoMain",
  data() {
    return {
      eltabs: ["按时间排序", "按热度排序"],
      sActive: 0,
      currentPage: 1,
      pageSize: 12,
      currentPage2: 1,
      pageSize2: 12,
      PageInfo,
      vData: [],
      vData1: [],
      inputValue: ""
    };
  },
  components: {
    Eltabs,
    Elpagination
  },
  created() {
    if (this.$route.query.inputValue != undefined) {
      if (this.$route.query.inputValue.length != 0) {
        this.videoSeachList(
          this.currentPage,
          this.pageSize,
          this.$route.query.inputValue
        );
        this.videoSeachListByNum(
          this.currentPage2,
          this.pageSize,
          this.$route.query.inputValue
        );
      }
    } else {
      this.videoList(this.currentPage, this.pageSize);
      this.videoListByNum(this.currentPage2, this.pageSize2);
    }
  },
  mounted() {
    if (this.$route.query.inputValue != undefined) {
      if (this.$route.query.inputValue.length != 0) {
        this.videoSeachList(
          this.currentPage,
          this.pageSize,
          this.$route.query.inputValue
        );
        this.videoSeachListByNum(
          this.currentPage2,
          this.pageSize,
          this.$route.query.inputValue
        );
      }
    } else {
      this.videoList(this.currentPage, this.pageSize);
      this.videoListByNum(this.currentPage2, this.pageSize2);
    }
  },
  methods: {
    handleClick(tab) {
      this.sActive = parseInt(tab.index); //要将String转成integer类型
    },
    isShow(index2) {
      if (index2 === this.sActive) return true; //判断显示哪部分视频
    },
    videoList(currentPage, pageSize) {
      videoList(currentPage, pageSize).then(res => {
        let currentPage = this.currentPage;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo[0] = new PageInfo(currentPage, pageSize, total);
        this.vData = res.data.content;
      });
    },
    videoListByNum(currentPage, pageSize) {
      videoListByNum(currentPage, pageSize).then(res => {
        let currentPage2 = this.currentPage2;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo[1] = new PageInfo(currentPage2, pageSize, total);
        this.vData1 = res.data.content;
      });
    },
    videoSeachList(currentPage, pageSize, title) {
      videoSeachList(currentPage, pageSize, title).then(res => {
        let currentPage = this.currentPage;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo[0] = new PageInfo(currentPage, pageSize, total);
        this.vData = res.data.content;
      });
    },
    videoSeachListByNum(currentPage, pageSize, title) {
      videoSeachListByNum(currentPage, pageSize, title).then(res => {
        let currentPage2 = this.currentPage2;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo[1] = new PageInfo(currentPage2, pageSize, total);
        this.vData1 = res.data.content;
      });
    },
    currentChange(value) {
      if (this.$route.query.inputValue != undefined) {
        if (this.$route.query.inputValue.length != 0) {
          if (this.sActive == 0) {
            this.currentPage = value;
            this.videoSeachList(
              this.currentPage,
              this.pageSize,
              this.$route.query.inputValue
            );
          } else {
            this.currentPage2 = value;
            this.videoSeachListByNum(
              this.currentPage2,
              this.pageSize,
              this.$route.query.inputValue
            );
          }
        } else {
          if (this.sActive == 0) {
            this.currentPage = value;
            this.videoList(
              this.currentPage,
              this.pageSize,
              this.$route.query.inputValue
            );
          } else {
            this.currentPage2 = value;
            this.videoListByNum(
              this.currentPage2,
              this.pageSize2,
              this.$route.query.inputValue
            );
          }
        }
      } else {
        if (this.sActive == 0) {
          this.currentPage = value;
          this.videoList(this.currentPage, this.pageSize);
        } else {
          this.currentPage2 = value;
          this.videoListByNum(this.currentPage2, this.pageSize2);
        }
      }
    }
  },
  mixins: [inDetail], //详情页混动
  updated() {
    if (this.$route.query.inputValue != undefined) {
      if (this.$route.query.inputValue.length != 0) {
        this.videoSeachList(
          this.currentPage,
          this.pageSize,
          this.$route.query.inputValue
        );
        this.videoSeachListByNum(
          this.currentPage2,
          this.pageSize,
          this.$route.query.inputValue
        );
      }
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 20px;
  width: 100%;
}
.eltab {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 除掉手机端点击高亮效果 */
  -webkit-tap-highlight-color: transparent;
}

.vContent {
  margin-bottom: 35px;
  height: 200px;
}

.vImg {
  width: 100%;
  height: 70%;
  box-shadow: 0 0 5px #d1d1d1;
  text-align: center;
  border: 1px solid #d1d1d1;
  border-bottom: none;
  border-top-left-radius: 3%;
  border-top-right-radius: 3%;
}
.vImg img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-top-left-radius: 3%;
  border-top-right-radius: 3%;
}
.vImg img:hover {
  opacity: 0.7;
}
.vCon {
  width: 100%;
  height: 27%;
  border-top: none;
  border: 1px solid #d1d1d1;
  background-color: #fff;
  border-bottom-left-radius: 3%;
  border-bottom-right-radius: 3%;
}
.vCon .vTitle {
  width: 90%;
  padding: 3% 6% 0 4%;
  cursor: pointer;
  font-weight: bolder;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}
.vTitle:hover {
  color: var(--color-main);
}
.vBottom {
  width: 100%;
  height: 100%;
}
.vBottom > div > img {
  width: 11px;
  height: 11px;
}
.vBottom > div {
  /* width: 26%; */
  width: 80%;
  padding-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  float: left;
  color: #8a8a8a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .vContent {
    width: 50%;
    transition: 0.5s;
  }
}
@media (max-width: 442px) {
  .vContent {
    margin-left: 10%;
    width: 100%;
    transition: 0.5s;
  }
}
.page {
  text-align: center;
  margin-bottom: 3em;
}

.box-cards {
  width: 90%;
  margin: 20px auto;
}
@media (max-width: 767px) {
  .box-cards {
    width: 100%;
  }
}
</style>