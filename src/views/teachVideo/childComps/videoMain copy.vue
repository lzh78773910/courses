<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
        <el-col :xs="{span: 12 , offset: 6}" class="eltab">
          <eltabs :eltabs="eltabs" @handleClick="handleClick" />
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="60">
      <el-col
        :span="21"
        :offset="1"
        v-for="(vCon, index2) in vData"
        :key="index2"
        :xs="{span: 24, offset: 0}"
      >
        <el-col
          :span="5"
          :offset="1"
          v-for="(item, index) in vCon"
          :key="index"
          class="vContent"
          v-show="isShow(index2)"
          :v-model="vCon"
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
              <!-- <div>
                <img src="~assets/img/common/collection.png" alt />
                {{item.vColl}}
              </div>-->
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <div class="page">
      <elpagination @currentChange="currentChange" :PageInfo="PageInfo" />
    </div>
  </div>
</template>

<script>
import Eltabs from "components/common/element/Eltabs"; //tab栏插件
import Elpagination from "components/common/element/Elpagination";
import { PageInfo } from "common/utils";
import { sortByKey } from "common/computed";
import { inDetail } from "common/mixin";
import { videoList } from "network/video";
export default {
  name: "videoMain",
  data() {
    return {
      eltabs: ["按时间排序", "按热度排序"],
      sActive: 0,
      currentPage: 1,
      pageSize: 12,
      PageInfo,
      vData: []
    };
  },
  components: {
    Eltabs,
    Elpagination
  },
  mounted() {
    this.videoList(this.currentPage, this.pageSize);
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
        this.PageInfo = new PageInfo(currentPage, pageSize, total);
        let video = [];
        for (let i = 0; i < 2; i++) {
          video.push(res.data.content);
        }
        this.vData = video;
      });
    },
    currentChange(value) {
      this.currentPage = value;
      this.videoList(this.currentPage, this.pageSize);
    }
  },
  mixins: [inDetail], //详情页混动
  watch: {
    sActive(val) {
      if (val === 1) {
        sortByKey(this.vData[1], "createtime");
        sortByKey(this.vData[0], "viewNum");
      } else {
        sortByKey(this.vData[1], "viewNum");
        sortByKey(this.vData[0], "createtime");
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
}
</style>