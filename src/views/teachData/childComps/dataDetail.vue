<template>
  <el-row>
    <el-col :span="18" :offset="3" :xs="{span: 24, offset: 0}">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
        </div>
        <div class="text item">
          <el-table :data="tableData" style="width: 100%" @row-click="cllick">
            <el-table-column prop="filename" label="文件名"></el-table-column>
            <el-table-column prop="update" label="上传时间"></el-table-column>
            <el-table-column label="操作" width="210">
              <template slot-scope="scope">
                <!-- <el-button type="primary"  @click.stop.prevent="centerDialogVisible = true">查看</el-button> -->
                <el-button type="primary"  @click.stop.prevent="downLoad(scope.$index, tableData)">查看</el-button>
                <!-- <el-button type="primary"  @click.stop.prevent="deleteRow(scope.$index, tableData)">下载</el-button> -->
                <el-button type="primary"  @click.stop.prevent="downLoad(scope.$index, tableData)">下载文件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>


    <!-- <vue-editor-md/> -->



<el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="80%"
  center>
  <span>
    <!-- <iframe src="http://gdkmlzh.cn-gd.ufileos.com/%2FUsers%2Feddie%2Fdesktop%2Fresource%2F%2F5ee5121b-2b01-47ba-9a8a-264be88e5fb3name0.pdf?UCloudPublicKey=TOKEN_0c9d0118-e892-4784-8702-34bf5b992604&Signature=YUz6YpG%2FXZbfR1uh%2FqRQ%2FAxG6o0%3D&Expires=1892261643" width="100%" height="100%" border="0" /> -->
    <div id="test-editor">
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="downLoad">下 载</el-button>
  </span>
</el-dialog>



  </el-row>




</template>


<script>
// import {vueEditorMd} from "vue-editor-md3"
// import $ from "jquery";
// import editormd from '~assets/editormd/editormd.min.js';
// $(function() {
  // editormd('test-editor', {
  //   width: '100%',
  //   height: 600,
  // })
// })

export default {
  
  name: "dataDetail",
  components: {
    // vueEditorMd
  },
  data() {
    return {
      centerDialogVisible: false,
      word: 'http://gdkmlzh.cn-gd.ufileos.com/kejian%2F8555931e-fe95-4276-881b-d15abd545194nameLinux%E7%B2%BE%E5%93%81%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E%E4%B9%A6.doc?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=5QeBZHsY2lCvg2ecH8j4yhAy1nw%3D&Expires=1576909252',
      word1: 'http://gdkmlzh.cn-gd.ufileos.com/kejian%2F%E8%93%9D%E8%89%B2%E6%B8%90%E5%8F%98.pptx?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=hO6o%2BO%2B%2B3rYd0HjDO7IZEycBhXU%3D&Expires=1577075517',
      tableData: [
        {
          id: 1,
          update: "2016-05-02",
          filename: "linux全套视频下载",
          fileurl: 'http://gdkmlzh.cn-gd.ufileos.com/kejian%2F%E6%96%B0%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E6%A1%A3.txt?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=k2h8wa8hiduPhTU85BXfKhy%2BWLk%3D&Expires=1576909665'
        },
        {
          id: 2,
          update: "2016-05-04",
          filename: "linux常用命令大全",
          fileurl: 'http://gdkmlzh.cn-gd.ufileos.com/%2FUsers%2Feddie%2Fdesktop%2Fresource%2F%2F5ee5121b-2b01-47ba-9a8a-264be88e5fb3name0.pdf?UCloudPublicKey=TOKEN_0c9d0118-e892-4784-8702-34bf5b992604&Signature=YUz6YpG%2FXZbfR1uh%2FqRQ%2FAxG6o0%3D&Expires=1892261643'
        },
        {
          id: 3,
          update: "2016-05-01",
          filename: "linux视频配套课件",
          fileurl: 'http://gdkmlzh.cn-gd.ufileos.com/kejian%2FLinux%E7%B2%BE%E5%93%81%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E%E4%B9%A6.doc?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=YydLgDO1kGUFNGMSgH9vFVgOM5Q%3D&Expires=1576904225'
        },
        {
          id: 4,
          update: "2016-05-03",
          filename: "linux目录结构",
          fileurl: 'http://gdkmlzh.cn-gd.ufileos.com/kejian%2F8555931e-fe95-4276-881b-d15abd545194nameLinux%E7%B2%BE%E5%93%81%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E8%AF%B4%E6%98%8E%E4%B9%A6.doc?UCloudPublicKey=7XUUrIZu_COBbktItgfRT0tYkbMP_GSP-OWjXsTe&Signature=ZevuzUWiropv0AH62hgkqH0ewTg%3D&Expires=1576905116'
        }
      ]
    };
  },
  methods: {
    cllick(row,event,column) {
      console.log(row)
      console.log(event)
      console.log(column)
      console.log(row.id)
    },
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      this.centerDialogVisible = true
      console.log(index)
      console.log(rows)
    },
    downLoad(row, tableData) {
      console.log(row)
      console.log(tableData[row].fileurl)
      let urls = tableData[row].fileurl
      window.open(urls)
      // window.location.href = urls
    },

  },
  mounted() {
    
  }
};
</script>

<style scoped>
/* @import "assets/css/editormd.min.css"; */
/* @import '~assets/editormd/css/editormd.min.css'; */
@import '~assets/editormd/css/editormd.min.css';
@import '~assets/editormd/css/editormd.preview.min.css';


</style>