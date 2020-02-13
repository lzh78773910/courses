<template>
    <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>

      <span slot="login">

      </span>

        <span slot="footer" class="dialog-footer">

      </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "Eldialog",
        props:{
            centerDialogVisible:{
                type : Boolean,
                default(){
                    return false
                }
            }
        }
    }
</script>

<style scoped>

</style>