import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home/Home')
const TeachVideo = () => import('@/views/teachVideo/TeachVideo')
const videoDetail = () => import('@/views/teachVideo/childComps/videoDetail')
const Comment = () => import('@/views/comment/Comment')
const TeachData = () => import('@/views/teachData/TeachData')
const discussion = () => import('@/views/courseDiscussion/discussion')
const discussionDetail = () => import('@/views/courseDiscussion/childComps/discussionDetail')
const Me = () => import('@/views/me/Me')
const Test = () => import('@/views/test/test')
const Test1 = () => import('@/views/test/test1')
const Chat = () => import('@/views/chat/Chat')
const ChatUser = () => import('@/views/chat/ChatUser')
const User = () => import('@/views/user/User')
const About = () => import('@/views/about/About')

//安装插件
Vue.use(VueRouter)

const routes = [
  {//设置默认路由
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/teachVideo',
    component: TeachVideo
  },
  {
    path: '/teachVideo/:id',
    component: videoDetail
  },
  {
    path: '/comment',
    component: Comment
  },
  {
    path: '/me',
    component: Me
  } ,
  {
    path: '/test',
    component: Test
  },
  {
    path: '/test1',
    component: Test1
  },
  {
    path: '/chat',
    component: Chat
  }
  ,
  {
    path: '/teachData',
    component: TeachData
  },

  {
    path: '/discussion',
    component: discussion,
  },
  {
    path: '/discussion/:id',
    name: 'discussionDetail',
    component: discussionDetail,
  },
  {
    path: '/chatuser',
    component: ChatUser
  },
  {
    path: '/user/:userId',
    component: User
  },
  {
    path: '/about',
    component: About
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'//路由地址不以#的形式
})




export default router
