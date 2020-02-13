<template>

    <div class="chat">

        <el-card class="box-card box-cards">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>在线客服</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>

        <div class="box-card box-cards">
            <el-row class="con">
                <el-col :span="24">
                   <div class="righthead">
                       <h4>{{userNickname}}</h4>
                   </div>
                   <div class="context" id="liao">
                       <el-row class="itemchat" v-for="(item, index) in chatlogList" :key="index" >
                       <el-avatar class="chattouxiang" :class="item.tpye==0?'right':'left'" :size="40" :src="item.userIocn"></el-avatar>
                           <div class="send" :class="item.tpye==0?'right':'left'">
                               <span>{{item.cltext}}
                               </span>
                               <div class="arrow"  :class="item.tpye==0?'sendright':'sendleft'"/>
                           </div>
<!--                           <span :class="item.tpye==0?'right':'left'" class="clstate">{{item.clstate==0?'未读':'已读'}}-->
<!--                               </span>-->
                       </el-row>

                   </div>
                        <div class="rightbottom">
                          <textarea v-model="textarea" @keydown.13="tosendOneWebSocket()" ></textarea>
                        </div>
                </el-col>
            </el-row>
        </div>

        <log ref="child"   v-show="this.userNickname!=''"/>
    </div>
</template>

<script>
    import {appuser,chatlog,sendOneWebSocket,upchatlog} from "../../network/chat";
    import {userInfo} from "../../network/me";
    import Log from "./chatComps/Log";

    export default {
        name: "Chat",
        data(){
            return {
                touser:1,
                textarea:'',
                appuser:[],
                chatlogList:[],
                userNickname:'客服',
            }
        },
        beforeCreate() {

        },
        components:{
            Log
        },
        methods:{

            tosendOneWebSocket(){
                let text=this.textarea
                let id=this.touser
                sendOneWebSocket(id,text)
                const log = {
                    "userIocn": this.$store.state.user.userIcon,
                    "cltext": this.textarea,
                    "clstate": "1",
                    "tpye": "0"
                }
                this.chatlogList.push(log)
                this.textarea=''
            },
            tochatlog(touser){

                chatlog(touser).then(res=>{
                    this.chatlogList=  res.data
                })
            },
            toappuser(){
                appuser().then(res=>{
                    this.appuser=res.data
                })
            },
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
                let data=eval("("+event.data+")")
                upchatlog(data.CId)
                this.chatlogList.push(data);
            },
            setOncloseMessage() {
                // eslint-disable-next-line no-console
                console.log("WebSocket连接关闭    状态码：" + this.websocket.readyState);
            },
            closeWebSocket() {
                this.websocket.close();
            },
        },
        updated(){
            let ele= document.getElementById("liao");
            ele.scrollTop = ele.scrollHeight;
        },
        mounted() {
            window.onbeforeunload = this.closeWebSocket;
            this.websocket = new WebSocket(
                "ws://47.98.134.3:8888/linux/websocket/"+this.$store.state.user.userId
            )
            this.initWebSocket();
            this.tochatlog(1);
            userInfo(1).then(res=>{
                const user=res.data
                this.userNickname=user.userNickname
            })
            this.$refs.child.parentMsg(this.touser)
        },
        beforeRouteEnter:(to,from,next)=>{
            next(vm => {
                if (vm.$store.state.user.roleId!=1){
                    vm.$message.error('权限不通过');
                    next('/home');
                }
            })
        }

    }
</script>

<style scoped>

    .chat{
    }
    .clstate{
        font-size: 11px;margin-top: 20px;margin-left: 10px;margin-right: 10px
    }
    textarea{
        width: 100%;
        height: 100%;
        resize:none;
        border: none;
        outline: none;
    }
    .items{
        margin-left:5px ;
    }
    .item{
        height: 70px;
        background-color: #2E2E2E;
        border: 0;
        margin-top: 1px;
        line-height: 70px;
        color: white;
        border-radius: 5px;

    }
    .itemtouxiang{
        float: left;
         margin:15px 10px 0px 15px;
    }
    .touxiang{
       margin-top: 15px;
       margin-left: 15px;
        margin-right: 10px;
       float: left;
    }
    .con{
        width: 100%;
    }
    .box-cards {
        width: 65%;
        margin: 20px auto;
    }
    .lefthead{
        height: 80px;
        background-color: #2E2E2E;
        border-bottom: 1px white solid;
        line-height: 80px;
        color: white;
    }
    ::-webkit-scrollbar {
        width: 0 !important;
    }
    .leftbottom{
        height: 530px;
        background-color: #3D3D3D;
        overflow: auto;

    }
    .righthead{
        height: 60px;
        border-bottom: 1px #F5F5F5  solid;
        background-color: white;
        line-height: 60px;
        padding-left: 20px;
    }
    .context{
        height: 360px;
        border-bottom: 1px #E8E8E8  solid;
        overflow: auto;
        background-color: #F5F5F5;
        padding: 20px 20px;

    }
    .rightbottom{
        height: 130px;
        padding: 10px 10px;
        background-color: #FFFFFF;
    }
    .send {
        position:relative;
        background:#3399FF;
        border-radius:5px; /* 圆角 */
        padding:10px 10px;
        line-height: 20px;
        max-width: 60%;
    }
    .send .arrow {
        position:absolute;
        top:9px;
        width:0;
        height:0;
        font-size:0;
        border:solid 8px;
    }
    .send .sendright{
        right:-15px; /* 圆角的位置需要细心调试哦 */
        border-color:#F5F5F5 #F5F5F5 #F5F5F5 #3399FF;
    }
    .send .sendleft{
        left:-15px; /* 圆角的位置需要细心调试哦 */
        border-color:#F5F5F5 #3399FF #F5F5F5 #F5F5F5;
    }

    .send span{
      font-size: 15px;
      word-break:break-word;
    }
    .chattouxiang{
        margin-left: 20px;
        margin-right: 20px;
    }
    .right{
        float: right;
    }
    .left{
        float: left;
    }

    .itemchat{
        margin-top: 10px;
    }
</style>