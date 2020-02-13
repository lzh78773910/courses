<template>
    <el-rate
            v-model="value"
            :disabled="disabled"
            :colors="colors"
            show-text
            text-color="#0099FF"
            @change="change"
            >
    </el-rate>
</template>

<script>
    export default {
        name: "Elrate",
        data() {
            return {
                colors: ['#99A9BF', '#0099FF', '#0066FF']
            }
        },
        props:{
            value:{
                type:Number,
                default(){
                    return 0;
                }
            },
            disabled:{
                type:Boolean,
                default(){
                    return false;
                }
            }
        },
        methods:{
            change(event){
                this.$emit('change',event)
            }
        }
    }
</script>

<style scoped>

</style>