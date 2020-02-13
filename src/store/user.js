const user = {
    state: {
        id:window.sessionStorage.getItem('id'),
        userId:null,
        userName:null,
        userNickname:null,
        userIcon:null,
        userNumber:null,
        mail:null,
        roleId:null
    },
    mutations: {
        //将id保存到sessionStorage里，id表示登陆状态
        SET_ID: (state, data) => {
            state.id = data
            window.sessionStorage.setItem('id', data)
        },
        //获取用户信息
        SET_USER: (state, data) => {
            // 把用户信息存起来
            state.userId = data.userId
            state.userName = data.userName
            state.userNickname = data.userNickname
            state.userIcon = data.userIcon
            state.userNumber = data.userNumber
            state.mail = data.mail
            state.roleId = data.roleId
        },
        SET_USERICON: (state, data) => {
            //修改用户头像
            state.userIcon = data
        },
        //登出
        LOGOUT: (state) => {
            // 登出的时候要清除token
            state.id = null
            state.userId = null
            state.userName = null
            state.userNickname = null
            state.userIcon = null
            state.userNumber = null
            window.sessionStorage.removeItem('id')
        }
    },
    actions: {

    }
};

export default user;