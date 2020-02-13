<template>
    <div>
        <el-card class="box-card me">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人中心
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
        <el-card class="box-card me">
            <img src="~assets/img/common/top.jpg" class="top-img" />
            <el-row style="margin-top: 20px;">
                <el-col :span="22">
                    <h3><i class="el-icon-user-solid"/>我的资料</h3>
                </el-col>
                <el-col :span="2">
                    <el-link type="primary" :underline="false" @click="dialogPass = true"><i class="el-icon-thumb"/>修改密码</el-link>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-divider/>
                <el-col :span="4">
                    <el-upload
                            class="avatar-uploader icon"
                            name="icon"
                            :action="RouteContext+actionUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :headers="sessionId"
                    >
                        <img  :src="imageUrl" class="avatar">
                    </el-upload>
                </el-col>
                <el-col :span="10" :offset="2">

                    <el-form label-position="top" label-width="100px"
                             :model="user" status-icon :rules="rules"  ref="userForm"
                    >
                        <el-form-item label="账号"  prop="name">
                            <el-input type="text" v-model="user.userName" disabled placeholder="长度在 6 到 16 个字符"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="mail">
                            <el-input type="mail" disabled v-model="user.mail" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="学号"  prop="userNumber" inline="true">
                            <el-input plain  v-model="user.userNumber" placeholder="长度为6 到 16 个字符"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称"  prop="userNickname" inline="true">
                            <el-input plain  v-model="user.userNickname" placeholder="长度为 0 到 6 个字符"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <div style="margin: 0 auto;">
                                <el-button plain type="primary" style="width: 100%;margin: 10px 0 0 0" @click="submitForm('userForm')">修改信息</el-button>
                            </div>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>



<!--            修改密码对话框-->
            <el-dialog title="修改密码" width="30%" :visible.sync="dialogPass" :close-on-click-modal="false">
                <div class="from">
                    <el-form label-position="left" label-width="100px"
                             :model="user" status-icon :rules="rules"  ref="passForm"
                    >
                        <el-form-item label="原始密码"  prop="oldpass">
                            <el-input type="password" v-model="user.oldpass" placeholder="长度为6个16字符"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码"  prop="pass">
                            <el-input type="password" v-model="user.pass" placeholder="长度为6个16字符"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码"  prop="pass2">
                            <el-input type="password" v-model="user.pass2" placeholder="长度为6个16字符"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button plain type="primary" style="width: 100%;margin: 10px 0 0 0" @click="submitForm('passForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {RouteContext} from "../../common/const";
    import {updateUser,updatePass} from "../../network/me";

    export default {
        name: "Me",
        data(){
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                sessionId: {
                    Authorization:  this.$store.state.user.id
                },
                dialogPass:false,
                RouteContext,
                user: {
                    oldpass:'',
                    pass:'',
                    pass2:'',
                    userId: '',
                    userName: '',
                    userNickname:'',
                    userIcon: '',
                    userNumber:'',
                    mail:'',
                },
                rules: {
                    userNumber: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                    userNickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 1, max: 6, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:6, max:16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                oldpass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:6, max:16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                pass2: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
                imageUrl: '',
            }
        },
        computed:{
            actionUrl(){
                return '/byuser/user/icon'
            },
            userIcon(){
                if(this.$store.state.user.userIcon){
                    return  this.$store.state.user.userIcon
                }else {
                    return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                }
            }
        },
        methods:{
            init(){
                this.user.userId=this.$store.state.user.userId
                this.user.userName=this.$store.state.user.userName
                this.user.userNickname=this.$store.state.user.userNickname
                this.user.userIcon=this.$store.state.user.userIcon
                this.user.userNumber=this.$store.state.user.userNumber
                this.user.mail=this.$store.state.user.mail
                this.imageUrl=this.$store.state.user.userIcon
            },
            setUser(userId,userNumber,userNickname){
                updateUser(userNumber,userNickname).then(res => {
                    if(res.code==0){
                        this.$message({ message: "修改成功", type: 'success' })
                        this.$store.commit('SET_USER', res.data)
                    }else{
                        this.$message({ message: res.msg, type: 'error' })
                    }
                })
            },
            setPass(oldpass,pass){
               updatePass(oldpass,pass).then(res=>{
                   if(res.code==0){
                       this.$message({ message: "修改密码成功，请重新登录", type: 'success' })
                       this.$store.commit('LOGOUT')
                       this.dialogPass=false
                       this.$router.push('/home')
                   }else{
                       this.$message({ message: res.msg, type: 'error' })
                   }
               })
            },
            handleAvatarSuccess(res, file) {
                console.log(res)
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$store.commit('SET_USERICON',res.data)
                this.imageUrl = res.data
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        formName=='userForm' && this.setUser(this.user.userId,this.user.userNumber,this.user.userNickname)
                        formName=='passForm' && this.setPass(this.user.oldpass,this.user.pass)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        beforeRouteEnter:(to,from,next)=>{
           next(vm => {
               vm.init()
               if (vm.$store.state.user.id==null){
                   vm.$message.error('你还没有登录，请先登录');
                   next('/home');
               }
           })
        },

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