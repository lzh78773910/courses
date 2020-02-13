<template>
    <div>
        <el-card class="box-card me">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户资料
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card class="box-card me">
            <img src="~assets/img/common/top.jpg" class="top-img" />
            <el-row style="margin-top: 20px;">
                <el-col :span="22">
                    <h3><i class="el-icon-user-solid"/>{{user.userNickname}}的资料</h3>
                </el-col>
                <el-col :span="2">

                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-divider/>
                <el-col :span="4">
                        <img  class="avatar-uploader icon avatar" :src="user.userIcon" >
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form label-position="top" label-width="100px"
                             :model="user" status-icon :rules="rules"  ref="userForm"
                    >
                        <el-form-item label="账号"  prop="name">
                            <el-input type="text" v-model="user.userName" disabled ></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="mail">
                            <el-input type="mail" disabled v-model="user.mail"></el-input>
                        </el-form-item>
                        <el-form-item label="学号"  prop="userNumber">
                            <el-input plain  v-model="user.userNumber" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="昵称"  prop="userNickname">
                            <el-input plain  v-model="user.userNickname" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
   import {userInfo} from "../../network/me";

   export default {
        name: "User",
        data(){
            return {
                user: {}
            }
        },
        computed:{
        },
        methods: {
            geiUserInfo(){
                userInfo(this.$route.params.userId).then(res=>{
                    this.user=res.data
                })
            }
        },
        mounted() {
            this.geiUserInfo()
        }
    }
</script>

<style scoped>
    .me{
        width: 80%;
        margin: 20px auto;
    }
    .top-img {
        width: 100%;
        height: 300px;
    }

    /*上传*/
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        border-radius: 100%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .icon{
        margin-left: 30%;
        margin-top: 30px;
    }

</style>