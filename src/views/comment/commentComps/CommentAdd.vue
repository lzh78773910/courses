<template>
    <div>
    <span>请发表你的反馈</span>
    <el-divider></el-divider>
        <elrate @change="change" :value="value"/>
        <br>
        <div class="add">
        <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="textarea">
        </el-input>
        </div>
        <el-button type="primary" @click="adds">提交</el-button>
    </div>
</template>

<script>
    import Elrate from "../../../components/common/element/Elrate";
    import {add} from "../../../network/commen";

    export default {
        name: "CommentAdd",
        data() {
            return {
                add:{},
                textarea: '',
                value:0
            }
        },
        components:{
            Elrate
        },
        methods:{
            adds(){
                if (this.textarea){
                    add(this.value,this.textarea).then(res=>{
                        if (res.code==0 ){
                            this.value=0
                            this.textarea=null
                        this.$message({ message: "发表成功", type: 'success' })
                        this.$emit('success')
                        }else {
                            this.$message({ message: "发表失败", type: 'error' })
                        }
                    })
                }else {
                    this.$message({ message: "内容不能为空", type: 'error' })
                }
            },
            change(value){
                this.value=value
            }
        }
    }
</script>

<style scoped>
    .add{
        width: 70%;
        margin-bottom: 20px;
    }
</style>