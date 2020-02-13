<template>

    <el-card class="box-card box-cards2">
        <span>历史记录</span>
        <el-divider content-position="left">{{userNickname}}</el-divider>
        <div class="context2">
            <el-row class="itemchat" v-for="(item, index) in chatlogList" :key="index" >
                <el-avatar class="chattouxiang" :class="item.tpye==0?'right':'left'" :size="40" :src="item.userIocn"></el-avatar>
                <div class="send" :class="item.tpye==0?'right':'left'">
                               <span>{{item.cltext}}
                               </span>
                    <div class="arrow"  :class="item.tpye==0?'sendright':'sendleft'"/>
                </div>
            </el-row>
        </div>
        <el-divider></el-divider>
        <div class="page"><elpagination @currentChange="currentChange" :PageInfo="PageInfo"/></div>
    </el-card>
</template>

<script>
    import Elpagination from "../../../components/common/element/Elpagination";
    import {chatloglist} from "../../../network/chat";
    import {PageInfo} from "../../../common/utils";

    export default {
        name: "Log",
        data(){
            return {
                PageInfo,
                chatlogList:[],
                currentPage:1,
                pageSize:10,
                totalPage:0
            }
        },
        components:{
            Elpagination
        },
        props:{
            touser:{
                type:Number,
                default() {
                    return 0
                }
            }
        },
        methods:{
            tochatloglist(touser,currentPage,pageSize){
                chatloglist(touser,currentPage,pageSize).then(res=>{
                     let data=res.data
                     this.currentPage=data.currentPage
                     this.totalPage=data.totalPage
                     this.chatlogList=data.list
                     this.PageInfo=new PageInfo(this.currentPage,this.pageSize,this.totalPage)

                })
            },
            parentMsg(touser){
                this.touser=touser
                this.tochatloglist(this.touser,this.currentPage,this.pageSize)
            },
            currentChange(value) {
                this.currentPage = value
                this.tochatloglist(this.touser,this.currentPage,this.pageSize)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .page{
        margin:10px;
        text-align: center;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
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
        right:-16px; /* 圆角的位置需要细心调试哦 */
        border-color:#F5F5F5 #F5F5F5 #F5F5F5 #3399FF;
    }
    .send .sendleft{
        left:-16px; /* 圆角的位置需要细心调试哦 */
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
    .box-cards2 {
        width: 65%;
        margin: 20px auto;
    }
    .context2{
        border-bottom: 1px #E8E8E8  solid;
        background-color: #F5F5F5;
        padding: 20px 20px;
    }
</style>