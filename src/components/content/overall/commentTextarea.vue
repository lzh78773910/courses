<template>
  <el-row>
    <el-form ref="form" :model="form">
      <el-col :span="18" :offset="1" :xs="{span: 18}">
        <el-form-item>
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4" :offset="1" :xs="{span: 4, offset: 0}">
        <el-button size="mini" type="primary" @click="submit">
          <i class="el-icon-edit-outline el-icon--left"></i>发表
        </el-button>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: "commentTextarea",
  props: {
    form: {
      desc: null
    }
  },
  methods: {
    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style scoped>
.el-form {
  margin-top: 2em;
}
.el-button {
  height: 54px;
}
</style>