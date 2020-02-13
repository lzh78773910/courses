<!--<template>-->
<!--    <el-container>-->
<!--        <el-row>-->
<!--            <el-col md="4">-->
<!--                <input v-model="username"/><button @click="test">连接</button>-->
<!--                <input v-model="tousername"/>-->
<!--                <input v-model="text" /> <button @click="send">发送</button>-->
<!--                <p v-for="(item, index) of messageList" :key="index">{{ item }}</p>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--    </el-container>-->
<!--</template>-->

<!--<script>-->
<!--    import {test2} from "../../network/test";-->

<!--    export default {-->

<!--        mounted() {-->

<!--        },-->
<!--        beforeDestroy() {-->
<!--            this.closeWebSocket();-->
<!--        },-->
<!--        data: function() {-->
<!--            return {-->
<!--                username: "",-->
<!--                text: "",-->
<!--                messageList: [],-->
<!--                tousername:''-->
<!--            };-->
<!--        },-->
<!--        methods: {-->
<!--            initWebSocket() {-->
<!--                // 连接错误-->
<!--                this.websocket.onerror = this.setErrorMessage;-->

<!--                // 连接成功-->
<!--                this.websocket.onopen = this.setOnopenMessage;-->

<!--                // 收到消息的回调-->
<!--                this.websocket.onmessage = this.setOnmessageMessage;-->

<!--                // 连接关闭的回调-->
<!--                this.websocket.onclose = this.setOncloseMessage;-->

<!--                // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。-->
<!--                window.onbeforeunload = this.onbeforeunload;-->
<!--            },-->
<!--            setErrorMessage() {-->
<!--                // eslint-disable-next-line no-console-->
<!--                console.log(-->
<!--                    "WebSocket连接发生错误   状态码：" + this.websocket.readyState-->
<!--                );-->
<!--            },-->
<!--            setOnopenMessage() {-->
<!--                // eslint-disable-next-line no-console-->
<!--                console.log("WebSocket连接成功    状态码：" + this.websocket.readyState);-->
<!--            },-->
<!--            setOnmessageMessage(event) {-->
<!--                this.messageList.push(event.data);-->
<!--            },-->
<!--            setOncloseMessage() {-->
<!--                // eslint-disable-next-line no-console-->
<!--                console.log("WebSocket连接关闭    状态码：" + this.websocket.readyState);-->
<!--            },-->
<!--            closeWebSocket() {-->
<!--                this.websocket.close();-->
<!--            },-->
<!--            send() {-->
<!--                //test(this.text)-->
<!--                test2(this.tousername,this.text)-->
<!--            },-->
<!--            test(){-->

<!--                -->
<!--                this.websocket = new WebSocket(-->
<!--                    "ws://127.0.0.1:8888/linux/websocket/"+this.username-->
<!--                )-->
<!--                this.initWebSocket();-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->