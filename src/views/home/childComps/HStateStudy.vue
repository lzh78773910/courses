<template>
  <content-box>
    <div class="stateName contentTitle">
      <span>{{sName}}</span>
      <span>{{state}}</span>
      <p>{{titleP}}</p>
    </div>

    <div class="studyContent">
      <div class="videoCon">
        <video controls>
          <source
            src="http://gdkmlzh.cn-gd.ufileos.com/shipin%2FLinux.mp4?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=xPQcLFasU%2B4fl5vw0Blkcnz9oe4%3D&Expires=1577779918"
          />
        </video>
      </div>
      <div class="videoList">
        <ul class="tools">
          <li v-for="(item,index) in toolList" :key="index" @click="detailClick(item)">
            <img :src="item.tImg" alt />
            <span>{{item.tName}}</span>
          </li>
        </ul>
      </div>
      <div class="videoList talkList">
        <div class="talkTitle">
          <span class="titleHeader">最新交流</span>
          <span class="more">查看更多>></span>
        </div>
        <ul class="talk">
          <li v-for="(item, index) in discussion" :key="index" @click="itemClick(index,item)">
            <span class="talkNum">{{index+1}}</span>
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog :visible.sync="centerDialogVisible" width="70%" center>
      <span>
        <img :src="watchDetail" alt class="detail" />
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downLoad">下 载</el-button>
      </span>
    </el-dialog>
  </content-box>
</template>

<script>
import ContentBox from "components/content/overall/ContentBox";
import { discussionList } from 'network/discussion'
import { inDetail } from "common/mixin";

export default {
  name: "HStateStudy",
  mixins: [inDetail],

  data() {
    return {
      centerDialogVisible: false,
      sName: "认识Linux",
      state: "从这里开始",
      titleP: "想的多一定没做的多有效，然而不想便做一定没什么效果。",
      toolList: [
        {
          tImg: require("assets/img/home/mindMapping.png"),
          tName: "Linux学习思维导图",
          tDetail: require("assets/img/home/1.jpg")
        },
        {
          tImg: require("assets/img/home/catalog.png"),
          tName: "Linux目录结构",
          tDetail: require("assets/img/home/2.jpg")
        },
        {
          tImg: require("assets/img/home/instructions.png"),
          tName: "Linux常见指令",
          tDetail: require("assets/img/home/3.png")
        },
        {
          tImg: require("assets/img/home/null.png"),
          tName: "暂无"
        }
      ],
      ii: "",
      discussion: [],
      currentPage: 1,
      pageSize: 3
    };
  },
  components: {
    ContentBox
  },
  methods: {
    open4() {
      this.$notify.error({
        title: "错误",
        message: "暂无该详细图片"
      });
    },
    detailClick(item) {
      if (item.tDetail) {
        this.centerDialogVisible = true;
        this.ii = item.tDetail;
      } else this.open4();
    },
    discussionList(currentPage, pageSize) {
      discussionList(currentPage,pageSize).then(res => {
        this.discussion = res.data.content
      })
    }
  },
  mounted() {
    this.discussionList(this.currentPage, this.pageSize)
  },
  computed: {
    watchDetail: function() {
      return this.ii;
    }
  }
};
</script>

<style scoped>
.ContentBox {
  background-color: #f0f0f0;
  /* height: 750px; */
  box-shadow: none;
}

.stateName span:first-child {
  font-weight: bolder;
  color: var(--color-main);
}
.stateName p {
  font-size: 18px;
  color: #938493;
}
.studyContent {
  width: 100%;
  height: 400px;
  margin: 4% auto 0 5%;
  /* background-color: gold; */
}
.videoCon {
  width: 50%;
  float: left;
}
video {
  width: 100%;
  height: 100%;
  outline: none;
}

.videoList {
  width: 35%;
  height: 45%;
  /* background-color: 	rgba(33,68,131,.7); */
  float: left;
  margin-left: 5%;
  margin-bottom: 5%;
  border-top: 2px solid var(--color-main);
}

.videoList .tools {
  width: 100%;
  height: 100%;
  list-style: none;
  margin: auto;
}

.tools li {
  width: 45%;
  height: 45%;
  background-color: #fff;
  border-radius: 2%;
  margin: 2% 2% 0 2%;
  text-align: center;
  border: 1px solid #e7e7e7;
  float: left;
  cursor: pointer;
}

.tools li img {
  width: 22%;
  height: 45%;
  /* background-color: red; */
  margin: 12% 0 0 5%;
  float: left;
}
.tools li span {
  width: 70%;
  height: 100%;
  float: left;
  font-size: 16px;
  color: var(--color-main);
  margin-top: 15%;
}

.talkList {
  background-color: #fff;
}

.talkTitle {
  width: 100%;
  height: 20%;
}
.talkList .titleHeader {
  width: 74px;
  font-size: 18px;
  font-weight: bolder;
  margin: 2% 0 0 4%;
  float: left;
}
.talkList .more {
  width: 100px;
  float: right;
  margin-top: 4%;
  cursor: pointer;
}
.more:hover {
  color: red;
}
.talkList .talk {
  width: 90%;
  list-style: none;
  margin: 2% 0 0 6%;
}
.talk li {
  margin: 5% 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.talk li .talkNum {
  width: 20px;
  height: 20px;
  display: block;
  text-align: center;
  color: #fff;
  background-color: red;
  float: left;
}
.talk li span:last-child {
  width: 20px;
  margin: 0 0 0 2%;
  font-size: 14px;
}

.tools li:hover,
.talk li:hover {
  background-color: rgba(33, 68, 131, 0.3);
  transition: 0.3s;
  color: #f0f0f0;
}

.detail {
  width: 100%;
}

@media (max-width: 1135px) {
  .videoCon {
    width: 60%;
    height: 80%;
    float: left;
  }
}
@media (max-width: 804px) {
  .ContentBox {
    width: 90%;
    height: 500px;
  }
}
@media (max-width: 724px) {
  .ContentBox {
    width: 90%;
    height: 650px;
  }
  .studyContent {
    margin: 8% 0 0 0%;
  }
  .videoCon {
    margin-top: 5em;
    width: 100%;
    margin: 0;
  }
  .videoList {
    width: 45%;
    margin: 2em 2.5% 0 2.5%;
  }
  .contentTitle span {
    font-size: 20px;
  }
  .contentTitle p {
    font-size: 14px;
  }
}
@media (max-width: 502px) {
  .ContentBox {
    width: 90%;
    height: 850px;
  }
  .videoList {
    width: 100%;
  }
}
</style>