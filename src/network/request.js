import axios from 'axios'
import { Notification } from 'element-ui';

export function request(config) {
  const instance = axios.create({
    baseURL: '/api',
    tiemout: 5000
  })

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  instance.interceptors.request.use(config => {
    const id =window.sessionStorage.getItem('id')
    //  const id  =this.$store.state.user.id
    id && (config.headers.common['Authorization']  = 'beared'+id)
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    if (res.data.code == 401) {
      Notification({
        title: '温馨提示',
        message: '您还没有登录，请登录后再进行相关操作',
        position: 'bottom-right'
      })
    }
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}