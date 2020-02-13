<template>
  <div class="chat">
    <el-card class="box-card box-cards">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客服中心</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>

    <div class="box-card box-cards">
      <el-row class="con">
        <el-col :span="7">
          <div class="lefthead">
            <el-avatar class="touxiang" :size="50" :src="this.$store.state.user.userIcon"></el-avatar>
            <h3>{{this.$store.state.user.userNickname}}</h3>
          </div>
          <div class="leftbottom">
            <div
              class="item"
              v-for="(item, index) in appuser"
              :key="index"
              @click="tochatlog(item.userId,item.userNickname)"
              v-show="item.userId != $store.state.user.userId"
            >
              <!--                            this.$router.push('/user/'+item.userId)-->
              <div @click="touserInfo(item.userId)">
                <el-avatar class="itemtouxiang" :size="40" :src="item.userIcon"></el-avatar>
              </div>
              <h5>
                {{item.userNickname}}
                <el-badge is-dot class="items" v-if="item.xinxi"></el-badge>
              </h5>
            </div>
          </div>
        </el-col>
        <el-col :span="17" v-if="showright">
          <div class="righthead">
            <h4>{{userNickname}}</h4>
          </div>
          <div class="context" id="liao2">
            <el-row class="itemchat" v-for="(item, index) in chatlogList" :key="index">
              <el-avatar
                class="chattouxiang"
                :class="item.tpye==0?'right':'left'"
                :size="40"
                :src="item.userIocn"
              ></el-avatar>
              <div class="send" :class="item.tpye==0?'right':'left'">
                <span @contextmenu.prevent="show()">{{item.cltext}}</span>
                <div class="arrow" :class="item.tpye==0?'sendright':'sendleft'" />
              </div>
              <!--                           <span :class="item.tpye==0?'right':'left'" class="clstate" v-show="item.tpye==0" >{{item.clstate==0?'未读':'已读'}}-->
              <!--                               </span>-->
            </el-row>
          </div>
          <div class="rightbottom">
            <textarea v-model="textarea" @keydown.13="tosendOneWebSocket()"></textarea>
          </div>
        </el-col>
      </el-row>
    </div>

    <log ref="child" v-show="this.userNickname!=''" />
  </div>
</template>

<script>
import {
  appuser,
  chatlog,
  sendOneWebSocket,
  upchatlog
} from "../../network/chat";

import Log from "./chatComps/Log";
export default {
  name: "Chat",
  data() {
    return {
      textarea: "",
      appuser: [],
      chatlogList: [],
      userNickname: "",
      showright: true,
      touser: 0
    };
  },
  updated() {
    let ele = document.getElementById("liao2");
    ele.scrollTop = ele.scrollHeight;
  },
  computed: {
    logshow() {
      return false;
    }
  },
  components: {
    Log
  },
  beforeCreate() {},

  methods: {
    touserInfo(userId) {
      this.$router.push("/user/" + userId);
    },
    tosendOneWebSocket() {
      let text = this.textarea;
      let id = this.touser;
      sendOneWebSocket(id, text).then(res => {
        console.log(res);
      });
      const log = {
        userIocn: this.$store.state.user.userIcon,
        cltext: this.textarea,
        clstate: "1",
        tpye: "0"
      };
      this.chatlogList.push(log);
      this.textarea = "";
    },
    //websocket
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage;

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage;

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.closeWebSocket;
    },
    setErrorMessage() {
      // eslint-disable-next-line no-console
      console.log(
        "WebSocket连接发生错误   状态码：" + this.websocket.readyState
      );
    },
    setOnopenMessage() {
      // eslint-disable-next-line no-console
      console.log("WebSocket连接成功    状态码：" + this.websocket.readyState);
    },
    setOnmessageMessage(event) {
      let data = eval("(" + event.data + ")");
      console.log(data);
      if (data.userId == this.touser) {
        upchatlog(data.CId);
        this.chatlogList.push(data);
      }
    },
    setOncloseMessage() {
      // eslint-disable-next-line no-console
      console.log("WebSocket连接关闭    状态码：" + this.websocket.readyState);
    },
    closeWebSocket() {
      this.websocket.close();
    },
    tochatlog(touser, userNickname) {
      this.logshow = true;
      this.touser = touser;
      chatlog(touser).then(res => {
        this.chatlogList = res.data;
        this.userNickname = userNickname;
        this.showright = true;
      });
      // setInterval(() => {
      //     this.tochatlog();
      // }, 300);
      this.$refs.child.parentMsg(this.touser);
    },
    toappuser() {
      appuser().then(res => {
        this.appuser = res.data;
      });
    },
    send() {
      console.log("发送");
      const log = {
        userIocn:
          "http://gdkmlzh.cn-gd.ufileos.com/img%2F5e3af915-83c8-4f23-9953-25ccb46363c1.jpg?UCloudPublicKey=TOKEN_0c9d0118-e892-4784-8702-34bf5b992604&Signature=8p462HhcXyhM%2FJmhhnygrZotLjw%3D&Expires=1891772663",
        cltext: this.textarea,
        clstate: "0",
        tpye: "1"
      };
      this.chatlogList.push(log);
      this.textarea = "";
    },
    show() {
      console.log("asdas");
    }
  },
  mounted() {
    window.onbeforeunload = this.closeWebSocket;

    this.websocket = new WebSocket(
      "ws://47.98.134.30:8888/linux/websocket/" + this.$store.state.user.userId
    );
    this.initWebSocket();

    this.toappuser();
    setInterval(() => {
      this.toappuser();
    }, 3000);
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$store.state.user.roleId != 2) {
        vm.$message.error("权限不通过");
        next("/home");
      }
    });
  }
};
</script>

<style scoped>
.page {
  margin: 10px;
  text-align: center;
}
.chat {
}
.clstate {
  font-size: 11px;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
}
textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
}
.items {
  margin-left: 5px;
}
.item {
  height: 70px;
  background-color: #2e2e2e;
  border: 0;
  margin-top: 1px;
  line-height: 70px;
  color: white;
  border-radius: 5px;
}
.itemtouxiang {
  float: left;
  margin: 15px 10px 0px 15px;
}
.touxiang {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 10px;
  float: left;
}
.con {
  width: 100%;
}
.box-cards {
  width: 65%;
  margin: 20px auto;
}
.lefthead {
  height: 80px;
  background-color: #2e2e2e;
  border-bottom: 1px white solid;
  line-height: 80px;
  color: white;
}
::-webkit-scrollbar {
  width: 0 !important;
}
.leftbottom {
  height: 530px;
  background-color: #3d3d3d;
  overflow: auto;
}
.righthead {
  height: 60px;
  border-bottom: 1px #f5f5f5 solid;
  background-color: white;
  line-height: 60px;
  padding-left: 20px;
}
.context {
  height: 360px;
  border-bottom: 1px #e8e8e8 solid;
  overflow: auto;
  background-color: #f5f5f5;
  padding: 20px 20px;
}
.rightbottom {
  height: 130px;
  padding: 10px 10px;
  background-color: #ffffff;
}
.send {
  position: relative;
  background: #3399ff;
  border-radius: 5px; /* 圆角 */
  padding: 10px 10px;
  line-height: 20px;
  max-width: 60%;
}
.send .arrow {
  position: absolute;
  top: 9px;
  width: 0;
  height: 0;
  font-size: 0;
  border: solid 8px;
}
.send .sendright {
  right: -16px; /* 圆角的位置需要细心调试哦 */
  border-color: #f5f5f5 #f5f5f5 #f5f5f5 #3399ff;
}
.send .sendleft {
  left: -16px; /* 圆角的位置需要细心调试哦 */
  border-color: #f5f5f5 #3399ff #f5f5f5 #f5f5f5;
}

.send span {
  font-size: 15px;
  word-break: break-word;
}
.chattouxiang {
  margin-left: 20px;
  margin-right: 20px;
}
.right {
  float: right;
}
.left {
  float: left;
}

.itemchat {
  margin-top: 10px;
}
.box-cards2 {
  width: 65%;
  margin: 20px auto;
}
.context2 {
  border-bottom: 1px #e8e8e8 solid;
  background-color: #f5f5f5;
  padding: 20px 20px;
}
</style>