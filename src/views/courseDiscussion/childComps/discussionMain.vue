<template>
  <el-row>
    <el-row class="tab">
      <el-col
        :span="16"
        :offset="4"
        :xs="{span: 24, offset: 0}"
        :sm="{span: 20, offset: 2}"
        :md="{span: 20, offset: 2}"
        :lg="{span: 16, offset: 4}"
      >
        <el-card class="box-card box-cards">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>课程讨论</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-col
      :span="16"
      :offset="4"
      :xs="{span: 24, offset: 0}"
      :sm="{span: 20, offset: 2}"
      :md="{span: 20, offset: 2}"
      :lg="{span: 16, offset: 4}"
    >
      <el-card>
        <el-col class="con" v-for="(item, index) in content" :key="index">
          <img :src="item.user.userIcon" alt />
          <p @click="itemClick(index,item)">{{item.title}}</p>
          <p>
            <!-- <span><i class="el-icon-s-comment"></i>1个回复</span>
            <span><i class="el-icon-view"></i>10次浏览</span>-->
            <span>
              <i class="el-icon-user-solid"></i>
              作者:{{item.user.userNickname}}
            </span>
            <span>
              <i class="el-icon-time"></i>
              {{item.createtime | showDate}}
            </span>
          </p>
        </el-col>
      </el-card>
      <div class="page">
        <elpagination @currentChange="currentChange" :PageInfo="PageInfo" />
      </div>
      <el-input placeholder="请输入标题" v-model="title" clearable></el-input>
      <vuequill-editor class="editor" ref="quillEditor" />
      <el-button type="primary" @click="add" class="addButton">提交</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { formatDate } from "common/utils";
import Elpagination from "components/common/element/Elpagination";
import { discussionList, add } from "network/discussion";
import { PageInfo } from "common/utils";
import { inDetail } from "common/mixin";

import vuequillEditor from "components/common/else/vuequillEditor";
export default {
  name: "discussionMain",
  data() {
    return {
      commentData: [],
      currentPage: 1,
      pageSize: 10,
      content: [],
      PageInfo,
      description: "",
      form: {
        desc: ""
      },
      title: ""
    };
  },

  components: {
    Elpagination,
    vuequillEditor
  },
  mixins: [inDetail],
  created() {
    this.discussionList(this.currentPage, this.pageSize);
  },
  mounted() {
    this.discussionList(this.currentPage, this.pageSize);
  },
  methods: {
    //网络请求
    discussionList(currentPage, pageSize) {
      discussionList(currentPage, pageSize).then(res => {
        this.content = res.data.content;
        let currentPage = this.currentPage;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo = new PageInfo(currentPage, pageSize, total);
      });
    },
    currentChange(value) {
      this.currentPage = value;
      this.discussionList(this.currentPage, this.pageSize);
    },
    add() {
      if (this.title != "" && this.$refs.quillEditor.aa != "") {
        add(this.title, this.$refs.quillEditor.aa).then(res => {
          if (res.code == 0) {
            this.title = "";
            this.$refs.quillEditor.aa = "";
            this.$message({ message: "发表成功", type: "success" });
            this.$emit("success");
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
.con {
  margin: 2em 0em;
  margin-top: 0em;
  padding-bottom: 2em;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.con:last-child {
  padding-bottom: 0em;
  border-bottom: none;
}
img {
  width: 5em;
  height: 5em;
  border-radius: 10%;
  float: left;
  cursor: pointer;
}
.el-col > p:nth-child(2) {
  font-size: 20px;
  color: rgb(13, 130, 183);
  font-weight: bold;
  padding-left: 0.5em;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-col > p:nth-child(3) {
  padding-left: 6em;
  color: rgb(156, 156, 156);
}
p > span {
  margin-left: 1em;
}
p > span:nth-child(1) {
  margin-left: 0em;
}

@media (max-width: 400px) {
  .el-col > p:nth-child(3) {
    display: block;
  }
  p > span:nth-child(2) {
    display: block;
    margin-left: 0em;
  }
}
.page {
  margin: 20px 0 10px;
  text-align: center;
}
.el-row {
  margin: 20px auto;
}
.editor {
  height: 30em;
  background-color: #fff;
  /* padding: 0 0 5em; */
}
.addButton {
  margin-top: 5em;
}
@media (max-width: 639px) {
  .editor {
    padding-bottom: 2.3em;
  }
}
@media (max-width: 445px) {
  .editor {
    height: 20em;
    padding-bottom: 5em;
  }
}
</style>