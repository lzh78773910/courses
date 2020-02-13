<template>
  <el-row>
    <el-col
      :span="24"
      :xs="{span: 24}"
      v-for="(data, index) in commentData"
      :key="index"
      v-show="isShow(index)"
    >
    {{data.content}}
      <el-col :span="24" class="comConBox">
        <el-card class="comCon">
          <!-- 讨论数量计算 -->
          <p class="comNum">
            <span>{{comNum}}</span>个讨论
          </p>
          <!-- 输入框 -->
          <comment-textarea :form="form" />

          <el-row v-for="(item, index) in data" :key="index" class="OneCommentBox">
            <!-- 一级评论 -->
            <el-col
              :xs="{span: 4, offset: 0}"
              :sm="{span: 4, offset: 1}"
              :md="{span: 3, offset: 1}"
              :lg="{span:2, offset: 1}"
              :span="2"
            >
              <img src="~assets/img/test/test1.jpg" alt />
            </el-col>
            <el-col :span="22" :xs="20" :sm="{span: 19}">
              <div class="conDetail">
                <p>{{item.username}}</p>
                <p>{{item.content}}</p>
                <p>
                  {{item.date}}
                  <span @click="openInput">回复</span>
                </p>
                <!-- 一级评论结束点 -->
              </div>

              <!-- 二级评论框 -->
              <el-col v-for="(item2, index2) in item.secondLevelData" :key="index2">
                <!-- 二级评论 -->
                <el-col
                  :xs="{span: 4, offset: 0}"
                  :sm="{span: 4, offset: 0}"
                  :md="{span: 3, offset: 0}"
                  :lg="{span:2, offset: 0}"
                  :span="2"
                >
                  <img src="~assets/img/test/test1.jpg" alt />
                </el-col>
                <el-col :span="22" :xs="{span: 20}" :sm="{span: 19}">
                  <div class="conDetail">
                    <p>{{item2.username}}</p>
                    <p>{{item2.content}}</p>
                    <p>
                      {{item.date}}
                      <span @click="openInput">回复</span>
                    </p>
                  </div>
                  <!-- 二级评论结束点 -->
                </el-col>
                <!-- 二级评论框结束点 -->
              </el-col>

              <!-- 二级输入框 -->
              <comment-textarea :form="form" v-show="isClick" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import commentTextarea from "components/content/overall/commentTextarea"; //输入框
import { sortByKey } from "common/computed";

export default {
  name: "Comment",
  components: {
    commentTextarea
  },
  data() {
    return {
      form: {
        desc: ""
      },
      isClick: false
    };
  },
  props: {
    commentData: {
      type: Array,
      default() {
        return [];
      }
    },
    sActive: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  methods: {
    isShow(index) {
      if (index === this.sActive) return true; //判断显示哪部分视频
    },
    openInput() {
      this.isClick = !this.isClick//输入框
    }
  },
  computed: {
    comNum: function() {
      //计算讨论数量
      return this.commentData[0].length;
    }
  },
  mounted() {
    //计算热度
    sortByKey(this.commentData[0], "secondLevelData");
  },
  beforeUpdate() {
    sortByKey(this.commentData[0], "secondLevelData");
  }
};
</script>

<style scoped>
.comNum {
  font-size: 16px;
  margin-left: 0.5em;
}
.comConBox {
  margin-top: 2em;
}
.comCon {
  margin: 0.2em 0;
}

.comCon img {
  width: 5vh;
  height: 5vh;
  border-radius: 50%;
}

.comCon p {
  margin: 0.8em 0em;
}

.conDetail > p:nth-child(1) {
  color: rgb(97, 122, 132);
  font-weight: 600;
  cursor: pointer;
}
.conDetail > p:nth-child(1):hover {
  color: rgb(0, 161, 214);
}
.conDetail > p:nth-child(3) {
  color: rgb(97, 122, 132);
}
.conDetail > p:nth-child(3) span {
  cursor: pointer;
  padding: 3px;
  border-radius: 15%;
}
.conDetail > p:nth-child(3) span:hover {
  color: rgb(0, 161, 214);
  background-color: rgb(229, 233, 239);
}
</style>