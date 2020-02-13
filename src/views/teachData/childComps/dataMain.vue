<template>
  <el-row>
    <el-row class="tab">
      <el-col :span="19" :offset="2" :xs="{span: 24, offset: 0}">
        <el-card class="box-card box-cards">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>教学反馈</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <!-- 移动端tab栏 -->
    <el-col class="hidden-sm-and-up">
      <el-tabs type="border-card" @tab-click="phoneTab">
        <el-tab-pane label="全部资源" />
        <el-tab-pane v-for="(item, index) in dList" :key="index" :label="item.rtTitle" />
      </el-tabs>
    </el-col>
    <!-- PC端tab栏 -->
    <el-col :span="3" :offset="2" :xs="{span: 24, offset: 0}" class="hidden-xs-only">
      <el-card class="box-card2 box-card1" @click.native="overTab">全部资源</el-card>
      <el-card
        class="box-card2"
        v-for="(item, index) in dList"
        :key="index"
        @click.native="tabType(item)"
      >{{item.rtTitle}}</el-card>
    </el-col>

    <el-col :span="16" :xs="{span: 24, offset: 0}">
      <el-card>
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
        </div>

        <div class="text item">
          <el-table :data="vData" style="width: 100%" @row-click="cllick">
            <el-table-column prop="resTitle" label="文件名"></el-table-column>
            <el-table-column label="上传时间" width="200">
              <template slot-scope="scope">{{scope.row.createtime | showDate}}</template>
            </el-table-column>
            <el-table-column prop="viewNum" label="查看次数" width="120"></el-table-column>
            <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                <el-button type="primary" @click.stop.prevent="detail(scope.$index,scope.row)">查看</el-button>
                <!-- <el-button type="primary"  @click.stop.prevent="deleteRow(scope.$index, tableData)">下载</el-button> -->
                <el-button type="primary" @click="downLoad(scope.row)">下载文件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>

    <el-col>
      <div class="page">
        <elpagination @currentChange="currentChange" :PageInfo="PageInfo" />
      </div>
    </el-col>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="80%" center>
      <span>{{resContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downLoad">下载文件</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { formatDate } from "common/utils";
import Elpagination from "components/common/element/Elpagination";
import { teachDataList, teachDataType, dataByRtId, } from "network/teachData";
import { PageInfo } from "common/utils";

export default {
  name: "detaMain",
  data() {
    return {
      centerDialogVisible: false,
      dList: [],
      vData: [],
      currentPage: 1,
      pageSize: 10,
      PageInfo,
      tab: 0,
      resContent: ""
    };
  },
  components: {
    Elpagination
  },
  created() {
    // this.teachDataList(this.currentPage, this.pageSize);
    this.teachDataType(this.currentPage, this.pageSize);
  },
  mounted() {
    this.teachDataList(this.currentPage, this.pageSize);
  },
  methods: {
    teachDataList(currentPage, pageSize) {
      teachDataList(currentPage, pageSize).then(res => {
        this.vData = res.data.content;
      });
    },
    teachDataType(currentPage, pageSize) {
      teachDataType(currentPage, pageSize).then(res => {
        let currentPage = this.currentPage;
        let pageSize = res.data.size;
        let total = res.data.totalElements;
        this.PageInfo = new PageInfo(currentPage, pageSize, total);
        this.dList = res.data.content;
      });
    },
    currentChange(value) {
      this.currentPage = value;
      this.teachDataList(this.currentPage, this.pageSize);
    },
    detail(index, row) {
      this.vData[index].viewNum = this.vData[index].viewNum + 1;
      this.centerDialogVisible = true;
      this.resContent = row.resContent;
    },
    downLoad(row) {
      this.$message({ type: "warning", message: "暂不支持pdf、图片下载" });
      let url = row.resUrl;
      window.open(url);
      // dataDownLoad(row.resUrl)
    },
    tabType(item) {
      dataByRtId(item.rtId).then(res => {
        this.vData = res.data;
      });
    },
    phoneTab(tab) {
      if (tab.label != "全部资源") {
        for (let i = 0; i < this.dList.length; i++) {
          if (this.dList[i].rtTitle == tab.label) {
            dataByRtId(this.dList[i].rtId).then(res => {
              this.vData = res.data;
            });
          }
        }
      } else {
        teachDataList(this.currentPage, this.pageSize).then(res => {
          this.vData = res.data.content;
        });
      }
    },
    overTab() {
      teachDataList(this.currentPage, this.pageSize).then(res => {
        this.vData = res.data.content;
      });
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
.el-row {
  background-color: #f1f1f1;
  margin-top: 2vh;
}

.el-row > .el-col:nth-child(2) {
  margin-right: 2em;
}

.box-card2 {
  text-align: center;
  font-size: 14px;
  color: rgb(102, 102, 102);
  cursor: pointer;
}

.box-card2:hover {
  color: rgb(64, 158, 255);
  box-shadow: 0px 0px 10px rgb(64, 158, 255);
}
.box-card1:hover {
  color: #fff;
}
.box-card1 {
  background-color: rgb(64, 158, 255);
  color: #fff;
}
.page {
  margin: 20px 0 10px;
  text-align: center;
}
/* .box-cards {
  width: 85%;
  margin: 20px auto;
}
@media (max-width: 767px) {
  .box-cards {
    width: 100%;
  }
} */
.tab {
  margin: 20px 0;
}
</style>