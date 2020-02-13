<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="3" :xs="{span: 24, offset: 0}">
        <el-col :xs="{span: 22, offset: 2}">
          <span class="tabTitle el-icon-chat-dot-square">课程讨论</span>
        </el-col>

        <!-- <el-col :xs="{span: 12 , offset: 2}">
          <eltabs :eltabs="eltabs" @handleClick="handleClick" />
        </el-col> -->

        <comment1 :commentData="commentData" :sActive="sActive" @submit="submit" ref="comment1" />
      </el-col>

      <!-- 轮播图 -->
      <el-col :span="4" :push="1" :xs="{span: 0, offset: 0, push: 0}">
        <elrotation :rotation="rotation" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Eltabs from "components/common/element/Eltabs"; //tab栏插件
import Elrotation from "components/common/element/Elrotation"; //轮播图插件
import Comment1 from "components/content/comment/Comment1"; //封装的讨论内容组件
export default {
  name: "detailComment",
  data() {
    return {
      sActive: 0,
      rotation: [
        //轮播图数据
        require("assets/img/test/photo1.jpg"),
        require("assets/img/test/photo2.jpg"),
        require("assets/img/test/photo3.jpg")
      ],
      eltabs: ["按热度排序", "按时间排序"],
      form: {
        desc: ''
      }
    };
  },
  props: {
    commentData: []
  },
  components: {
    // Eltabs,
    Elrotation,
    Comment1
  },
  methods: {
    // handleClick(tab) {
    //   this.sActive = parseInt(tab.index); //要将String转成integer类型
    // },
    submit() {
      this.form.desc = this.$refs.comment1.form.desc
      this.$emit("submit");
    }
  }
};
</script>

<style scoped>
.tabTitle {
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  font-size: 18px;
}

@media (max-width: 768px) {
  .tabTitle {
    font-size: 12px;
  }
}
.el-carousel {
  margin-top: 2em;
}

.comNum > span {
  margin-right: 0.2em;
}

.OneCommentBox {
  border-top: 1px solid rgb(228, 231, 237);
  margin: 1em 0;
}
.el-row > .el-col {
  margin-top: 1.2em;
}
.el-carousel {
  height: 150px;
}
</style>