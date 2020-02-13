import { request } from './request';

export function updateUser(userNumber,userNickname) {
    return request({
        url: '/byuser/user',
        method: 'put',
        params: {
            userNumber,
            userNickname
        }
    })
}
export function userInfo(userId) {
    return request({
        url: '/user/'+userId,
        method: 'get',
    })
}

export function updatePass(oldpass,pass) {
    return request({
        url: '/byuser/user/pass',
        method: 'put',
        params: {
            oldpass,
            pass
        }
    })
}
