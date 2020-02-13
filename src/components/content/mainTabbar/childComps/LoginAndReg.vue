<template>
    <div class="loginAndreg">
        <div style="text-align: right">
      <span @click="centerDialogVisible = true">
        <i class="el-icon-user"></i>&nbsp;登录
      </span>
            <span>
        <i class="user-i"></i>
      </span>
            <span @click="dialogreg = true">
        <i class="el-icon-circle-plus-outline"></i>&nbsp;注册
      </span>
        </div>
        <!--登录对话框-->
        <el-dialog
                title="登录"
                center
                :width="dialogWidth"
                :visible.sync="centerDialogVisible"
                :close-on-click-modal="false"
                @close="close"
        >
            <div class="from">
                <el-form
                        label-position="top"
                        label-width="50px"
                        :model="user"
                        status-icon
                        :rules="rules"
                        ref="loginForm"
                >
                    <el-form-item label="账号" prop="name">
                        <el-input v-model="user.name" placeholder="长度在 6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="user.pass" placeholder="长度在 6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="margin: 0 auto;">
                            <el-button
                                    plain
                                    type="primary"
                                    style="width: 100%;margin: 10px 0 0 0"
                                    @click="submitForm('loginForm')"
                            >登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <span style="font-size: 13px">
          没有账号?
          <el-link
                  type="primary"
                  :underline="false"
                  @click="dialogreg = true,centerDialogVisible=false"
          >注册</el-link>
        </span>
                <span style="float: right">
          <el-link
                  type="primary"
                  :underline="false"
                  @click="dialogPass = true,centerDialogVisible=false"
          >忘记密码?</el-link>
        </span>
            </div>
        </el-dialog>
        <!--登录对话框-->
        <!--注册对话框-->
        <el-dialog
                title="注册"
                :visible.sync="dialogreg"
                :close-on-click-modal="false"
                class="registerBox"
                :width="dialogWidth"
        >
            <div class="from">
                <el-form
                        label-position="left"
                        label-width="100px"
                        :model="user"
                        status-icon
                        :rules="rules"
                        ref="regForm"
                >
                    <el-form-item label="账号" prop="name">
                        <el-input type="text" v-model="user.name" placeholder="长度在 6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="user.pass" placeholder="长度在 6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="学号" prop="userNumber" inline="true">
                        <el-input plain v-model="user.userNumber" placeholder="长度为6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="userNickname" inline="true">
                        <el-input plain v-model="user.userNickname" placeholder="长度为 0 到 6 个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="mail">
                        <el-input type="mail" v-model="user.mail" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" inline="true">
                        <el-input plain style="width: 52%" v-model="user.code" placeholder="长度为6个字符"></el-input>
                        <el-button style="margin-left: 15px" @click="getCode" v-show="show">{{codeBtn}}</el-button>
                        <el-button style="margin-left: 15px" v-show="!show">请等待 {{count}}s</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div style="margin: 0 auto;">
                            <el-button
                                    plain
                                    type="primary"
                                    style="width: 100%;margin: 10px 0 0 0"
                                    @click="submitForm('regForm')"
                            >注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <span style="font-size: 13px">
          已有账号?
          <el-link
                  type="primary"
                  :underline="false"
                  @click="dialogreg = false,centerDialogVisible=true"
          >登录</el-link>
        </span>
            </div>
        </el-dialog>
        <!--注册对话框-->
        <!--找回密码对话框-->
        <el-dialog title="找回密码" :width="dialogWidth" :visible.sync="dialogPass" :close-on-click-modal="false">
            <div class="from">
                <el-form
                        label-position="left"
                        label-width="100px"
                        :model="user"
                        status-icon
                        :rules="rules"
                        ref="passForm"
                >
                    <el-form-item label="邮箱" prop="mail">
                        <el-input type="mail" v-model="user.mail" placeholder="请输入注册时填写的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" inline="true">
                        <el-input plain style="width: 16vh" v-model="user.code" placeholder="长度为6个字符"></el-input>
                        <el-button style="margin-left: 15px" @click="getCode" v-show="show">{{codeBtn}}</el-button>
                        <el-button style="margin-left: 15px" v-show="!show">请等待 {{count}}s</el-button>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="user.pass" placeholder="长度在 6 到 16 个字符"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                                plain
                                type="primary"
                                style="width: 100%;margin: 10px 0 0 0"
                                @click="submitForm('passForm')"
                        >提交</el-button>
                    </el-form-item>
                </el-form>
                <span style="font-size: 13px">
          已有账号?
          <el-link
                  type="primary"
                  :underline="false"
                  @click="dialogPass = false,centerDialogVisible=true"
          >登录</el-link>
        </span>
            </div>
        </el-dialog>
        <!--找回密码对话框-->
    </div>
</template>

<script>
import { login, mail, add, updatePassword } from "network/login";
export default {
  name: "LoginAndReg",
  data() {
    return {
      centerDialogVisible: false,
      dialogreg: false,
      dialogPass: false,
      show: true,
      count: "",
      timer: null,
      codeBtn: "获取验证码",
      user: {
        name: "",
        pass: "",
        mail: "",
        code: "",
        userNumber: "",
        userNickname: ""
      },
      dialogWidth: 0,
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        userNumber: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        userNickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入邮箱正确格式", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          formName == "loginForm" &&
            this.getUser(this.user.name, this.user.pass);
          formName == "regForm" && this.addUser();
          formName == "passForm" &&
            this.updatePassword(this.user.mail, this.user.code, this.user.pass);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close() {
      this.user = {};
    },
    getUser(name, pass) {
      login(name, pass).then(res => {
        if (res.code == 0) {
          this.$message({ message: "登录成功", type: "success" });
          this.$store.commit("SET_ID", res.data.sessionId);
          this.$store.commit("SET_USER", res.data.user);
          this.centerDialogVisible = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    //获取验证码
    getCode() {
      const userMail = this.user.mail;
      var mailtest = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (mailtest.test(userMail)) {
        this.$message({
          message: "验证码正发往邮箱，请耐心等待以下",
          type: "success"
        });
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        mail(this.user.mail).then(res => {
          if (res.code == 0) {
            this.$message({
              message: "验证码已发送到邮箱，请查收",
              type: "success"
            });
          } else {
            this.$message({ message: res.data, type: "error" });
          }
        });
      } else {
        this.$message({ message: "请先输入正确的邮箱", type: "error" });
      }
    },
    addUser() {
      add(this.user).then(res => {
        if (res.code == 0) {
          this.$message({ message: "注册成功", type: "success" });
          this.dialogreg = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    updatePassword() {
      updatePassword(this.user.mail, this.user.code, this.user.pass).then(
        res => {
          if (res.code == 0) {
            this.$message({ message: "修改成功", type: "success" });
            this.dialogPass = false;
          } else {
            this.$message({ message: res.msg, type: "error" });
          }
        }
      );
    },
    setDialogWidth() {
      var val = document.body.clientWidth;
      const def = 800; // 默认宽度
      if (val < def) {
        this.dialogWidth = "100%";
      } else {
        this.dialogWidth = 70 + 'vh';
      }
    }
  },
  created() {
    this.setDialogWidth();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth();
      })();
    };
  }
};
</script>

<style scoped>
.user-i {
  border: 1px solid white;
}
span {
  margin: 0 5px;
  font-size: 14px;
}
top-user span:hover {
  color: #daa520;
}
.loginAndreg {
  margin-right: 11%;
}
.from {
  padding: 10px 22px;
}
</style>