<template>
    <el-pagination
            background
            layout="prev, pager, next,jumper"
            :page-size="PageInfo.pageSize"
            :total="PageInfo.total"
            :current-page="PageInfo.currentPage"
             @prev-click="prevClick"
            @current-change="currentChange"
    >
    </el-pagination>
</template>

<script>
    export default {
        name: "El-pagination",
        props:{
            PageInfo : {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods:{
            //下一页
            prevClick(){
            },
            //当前页
            currentChange(event){
                this.$emit('currentChange',event)
            }
        }
    }
</script>

<style scoped>

</style>