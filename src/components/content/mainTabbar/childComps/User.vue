<template>
  <div class="user">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar :size="30" :src="userIcon"></el-avatar>
      </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" command="me">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-star-on">我的收藏</el-dropdown-item>
                <el-dropdown-item icon="el-icon-phone" command="kefu">客服中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {logout} from "../../../../network/login";
    export default {
        name: "User",
        data() {
            return {}
        },
        methods: {
            logout(id) {
                logout(id)
                this.$message({message: "注销成功", type: 'success'})
                this.$store.commit('LOGOUT')
                this.$router.push('/home')
            },
            handleCommand(command) {
                command == "logout" && this.logout(this.$store.state.user.userId)
                command == "me" && this.me()
                command == "kefu" && this.kefu()
            },
            me() {
                this.$router.push('/me')
            },
            kefu() {
                this.$store.state.user.roleId == 2 && this.$router.push('/chat')
                this.$store.state.user.roleId == 1 && this.$router.push('/chatuser')
            }
        },
        computed: {
            userIcon() {
                if (this.$store.state.user.userIcon) {
                    return this.$store.state.user.userIcon
                } else {
                    return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                }
            }
        }
    }
</script>
<style scoped>
.user {
  margin-right: 11%;
  text-align: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>