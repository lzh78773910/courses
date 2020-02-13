<template>
  <div v-if="this.commentData && this.vListCon">
    <el-row :type="flex" :justify="end">
      <el-col :span="12" :offset="3" :xs="{span: 24, offset: 0, push: 0, class: sss}">
        <video :src="nowUrl" controls></video>
      </el-col>
      <el-col :span="4" class="videoList" :push="1" :xs="{span: 24, offset: 0, push: 0}">
        <el-col :span="24" class="listHeader">
          <span class="el-icon-s-grid">视频选集</span>
          <span>{{this.sActive+1}}/{{this.comLength}}</span>
        </el-col>
        <el-col :span="24" class="listDetail">
          <ul class="listUl" v-if="vListCon.length != 0">
            <li
              v-for="(item, index) in vListCon"
              :key="index"
              class="listLi"
              :class="{active: sActive === index}"
              @click="active(item,index)"
            >
              <span>P{{index+1}} {{item.viTitle}}</span>
              <span>{{item.vConTime}}</span>
            </li>
          </ul>
          <ul v-else class="ListNull">暂无更多视频选集</ul>
        </el-col>
      </el-col>
    </el-row>

    <detail-comment
      :commentData="commentData"
      ref="detailComment"
      @submit="submit"
      v-if="this.commentData != 0"
    />
    <el-col :span="12" :offset="3" :xs="{span: 24, offset: 0, push: 0}" v-else>
      <el-card class="nullbox">
        <p class="null">暂无更多讨论</p>
        <comment-textarea ref="textarea" @submit="submit" :form="form" />
      </el-card>
    </el-col>
  </div>
</template>

<script>
import detailComment from "./detailComment";
import { videoDetail, videoComment, videoCommentAdd } from "network/video";
import commentTextarea from "components/content/overall/commentTextarea"; //输入框

// videoCommentAdd
export default {
  name: "videoDetail",
  inject: ["reload"],

  data() {
    return {
      nowVideo: 0,
      vListCon: [],
      sActive: 0,
      commentData: [],
      form: {
        desc: ""
      },
      nowUrl: ""
    };
  },
  components: {
    detailComment,
    commentTextarea
  },
  created() {
    this.videoDetail(this.$route.query.videoId);
    this.videoComment(this.$route.query.videoId);
  },
  mounted() {
    this.videoDetail(this.$route.query.videoId);
    this.videoComment(this.$route.query.videoId);
  },
  methods: {
    active(item, index) {
      this.sActive = index;
      this.nowVideo = index;
      this.nowUrl = item.viUrl;
    },
    videoDetail(videoId) {
      videoDetail(videoId).then(res => {
        this.vListCon = res.data;
        this.nowUrl = res.data[0].viUrl;
      });
    },
    videoComment(parentId) {
      videoComment(parentId).then(res => {
        this.commentData = res.data;
        this.commentData.content = res.data.vcContent;
      });
    },
    submit() {
      if (this.form.desc == "") {
        this.form.desc = this.$refs.detailComment.form.desc;
      }
      videoCommentAdd(this.$route.query.videoId, this.form.desc).then(res => {
        if (res.code == 0) {
          this.form.desc = "";
          this.$message({ message: "发表成功", type: "success" });
          this.$emit("success");
          setTimeout(this.reload(), 5000);
        } else {
          this.$message({ message: "发表失败", type: "error" });
        }
      });
    }
  },
  computed: {
    comLength() {
      return this.vListCon.length;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 4em;
}
video {
  width: 100%;
  height: 30vmax;
  transition: 1s;
  background-color: black;
  outline: none;
}

.videoList {
  height: 30vmax;
  background-color: rgba(209, 209, 209, 0.5);
}

.listHeader {
  font-size: 16px;
  padding-top: 3%;
  margin-bottom: 2%;
  /* position:fixed; */
}
.listHeader > span:first-child {
  padding-left: 1em;
}
.listHeader > span:last-child {
  color: #999999;
  font-size: 12px;
  float: right;
  text-align: center;
  padding-right: 1em;
  padding-top: 0.2em;
}
.listUl {
  overflow: auto;
  margin-left: 5%;
  width: 90%;
  list-style: none;
}
@media screen {
  .listUl {
    height: 27vmax;
    transition: 1s;
  }
}

@media (min-width: 420px) and (max-width: 768px) {
  video {
    height: 50vmax;
    transition: 1s;
  }
}
@media (max-width: 420px) {
  video {
    height: 40vmax;
    transition: 1s;
  }
}
@media (max-width: 768px) {
  .listUl {
    height: 22vmax;
    transition: 1s;
  }
  .el-row {
    margin-top: 0em;
  }
}
::-webkit-scrollbar {
  width: 0 !important;
}

.listLi {
  cursor: pointer;
  height: 35px;
  line-height: 35px;
  border-radius: 5px 5px;
}
.listLi:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-main);
  font-weight: 500;
}
.listLi > span:first-child {
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
  padding-left: 2%;
}
.listLi > span:last-child {
  width: 15%;
  float: right;
  font-weight: bolder;
}

.active {
  background-color: rgba(255, 255, 255, 0.5);
  color: var(--color-main);
  font-weight: bolder;
}

.null {
  margin: 2em 0;
  text-align: center;
  color: rgb(142, 142, 142);
  font-size: 16px;
}
.ListNull {
  font-size: 16px;
  text-align: center;
  line-height: 25vh;
  color: rgb(153, 153, 153);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>