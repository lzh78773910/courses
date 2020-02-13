<template>
  <div>
    <el-card class="box-card box-cards">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教学反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="box-card box-cards">
      <eltabs :eltabs="eltabs" @handleClick="handleClick" />
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :comment="item"
        v-loading="loading"
        :showdelete="showdelete"
        @delSuccess="delSuccess"
      />
      <div class="page">
        <elpagination @currentChange="currentChange" :PageInfo="PageInfo" />
      </div>
      <el-divider></el-divider>
      <div class="add" v-if="addshow">
        <comment-add @success="addSuccess" />
      </div>
    </el-card>
  </div>
</template>

<script>
import Eltabs from "../../components/common/element/Eltabs";
import CommentItem from "./commentComps/CommentItem";
import Elpagination from "../../components/common/element/Elpagination";
import CommentAdd from "./commentComps/CommentAdd";
import { commentList, byusercommentList } from "../../network/commen";
import { PageInfo } from "../../common/utils";
export default {
  name: "Comment",
  components: {
    Eltabs,
    CommentItem,
    Elpagination,
    CommentAdd
  },
  data() {
    return {
      eltabs: ["课程评价", "我的评价"],
      eltabsindex: 0,
      currentPage: 1,
      pageSize: 10,
      commentList: [],
      loading: true,
      PageInfo,
      addshow: true,
      showdelete: false
    };
  },
  created() {
    this.getCommentList(this.currentPage, this.pageSize);
  },
  mounted() {},
  methods: {
    //网络请求
    getCommentList(currentPage, pageSize) {
      commentList(currentPage, pageSize).then(res => {
        this.commentList = res.data.content;
        let currentPage = this.currentPage;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo = new PageInfo(currentPage, pageSize, total);
        this.loading = false;
        this.showdelete = false;
        this.addshow = true;
      });
    },
    getMyCommentList(currentPage, pageSize) {
      byusercommentList(currentPage, pageSize).then(res => {
        if (res.code == 0) {
          this.commentList = res.data.content;
          let currentPage = this.currentPage;
          let pageSize = res.data.size;
          let total = res.data.totalElements;
          this.PageInfo = new PageInfo(currentPage, pageSize, total);
          this.loading = false;
          this.showdelete = true;
          this.addshow = false;
        }
      });
    },
    //事件处理
    handleClick(tab) {
      this.eltabsindex = tab.index;
      if (tab.index == 0) {
        this.currentPage = 1;
        this.getCommentList(this.currentPage, this.pageSize);
      } else {
        if (this.$store.state.user.userId) {
          this.currentPage = 1;
        }
        this.getMyCommentList(this.currentPage, this.pageSize);
      }
    },
    currentChange(value) {
      this.currentPage = value;
      if (this.eltabsindex == 0) {
        this.getCommentList(this.currentPage, this.pageSize);
      } else {
        this.getMyCommentList(this.currentPage, this.pageSize);
      }
    },
    addSuccess() {
      //添加成功刷新数据
      this.getCommentList(this.currentPage, this.pageSize);
    },
    delSuccess() {
      this.getMyCommentList(this.currentPage, this.pageSize);
    }
  }
};
</script>

<style scoped>
.box-cards {
  width: 80%;
  margin: 20px auto;
}
.page {
  margin: 10px;
  text-align: center;
}
.add {
  margin-top: 100px;
}
@media (max-width: 767px) {
  .box-cards {
    width: 100%;
  }
}
</style>