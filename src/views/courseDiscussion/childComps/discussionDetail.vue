<template>
  <el-row class="box">
    <el-col
      :span="16"
      :offset="4"
      :xs="{span: 24, offset: 0}"
      :sm="{span: 20, offset: 2}"
      :md="{span: 20, offset: 2}"
      :lg="{span: 16, offset: 4}"
    >
      <el-card>
        <el-col :span="24" class="head">
          <h1>{{content.title}}</h1>
          <p>
            <span>
              <i class="el-icon-user-solid"></i>
              作者:{{content.user.userNickname}}
            </span>
            <span>
              <i class="el-icon-time"></i>
              发布时间：{{content.createtime | showDate}}
            </span>
          </p>
        </el-col>
        <el-col :span="24" class="con" v-html="content.description">{{content.description}}</el-col>
      </el-card>
      <comment1
        :commentData="commentData"
        class="aaa"
        v-if="this.commentData != 0"
        @submit="submit"
        ref="comment1"
      />
      <el-card v-else>
        <p class="null">暂无更多讨论</p>
        <comment-textarea ref="textarea" @submit="submit" :form="form" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {
  discussionList,
  discussionDetail,
  detailAdd
} from "network/discussion";
import commentTextarea from "components/content/overall/commentTextarea"; //输入框
import { formatDate } from "common/utils";

import Comment1 from "components/content/comment/Comment1";
export default {
  name: "discussionDetail",
  inject: ["reload"],
  data() {
    return {
      qId: 0,
      discussion: {},
      commentData: [],
      content: [],
      currentPage: 1,
      pageSize: 10,
      form: {
        desc: ""
      }
    };
  },
  components: {
    Comment1,
    commentTextarea
  },

  created() {
    this.qId = this.$route.params.id;
    this.discussion = this.$route.query.discussion;
    this.currentPage = this.$route.query.currentPage;
    // this.discussionDetail(this.qId);
    // this.discussionList(this.currentPage, this.pageSize);
  },
  mounted() {
    this.discussionDetail(this.qId);
    this.discussionList(this.currentPage, this.pageSize);
  },
  destroyed() {},
  methods: {
    discussionDetail(qId) {
      discussionDetail(qId).then(res => {
        this.commentData = res.data;
      });
    },
    discussionList(currentPage, pageSize) {
      discussionList(currentPage, pageSize).then(res => {
        let number = res.data.content.length;
        for (let i = 0; i < number; i++) {
          if (res.data.content[i].qid == this.qId) {
            this.content = res.data.content[i];
          }
        }
      });
    },
    submit() {
      if (this.form.desc == "") {
        this.form.desc = this.$refs.comment1.form.desc;
      }
      if (this.form.desc != "") {
        detailAdd(this.qId, this.form.desc).then(res => {
          if (res.code == 0) {
            this.form.desc = "";
            this.$message({ message: "发表成功", type: "success" });
            this.$emit("success");
            setTimeout(this.reload(), 5000);
          } else {
            this.$message({ message: "发表失败", type: "error" });
          }
        });
      } else {
        this.$message({ message: "标题和内容不能为空", type: "error" });
      }
    }
  },
  filters: {
    showDate: value => {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.box {
  margin-top: 5em;
}
.head {
  padding-bottom: 2em;
  border-bottom: 1px solid rgb(234, 234, 234);
}
.head h1 {
  margin-bottom: 0.5em;
}
.head span {
  color: rgb(142, 142, 142);
}
.head span:nth-child(2) {
  margin-left: 2em;
}
.con {
  margin-top: 0.5em;
  margin-bottom: 2em;
}
.aaa {
  margin-top: -2.2em;
  margin-bottom: 2.2em;
}
.null {
  margin: 2em 0;
  text-align: center;
  color: rgb(142, 142, 142);
  font-size: 16px;
}
.el-button {
  height: 54px;
}
</style>