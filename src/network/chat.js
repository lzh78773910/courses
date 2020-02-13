import { request } from './request';

export function appuser() {
    return request({
        method:'get',
        url: '/appusers'
    })
}

export function chatloglist(touser,currentPage,pageSize) {
    return request({
        method:'get',
        url: '/byuser/chatlog/'+touser+'/'+currentPage+'/'+pageSize
    })
}

export function chatlog(touser) {
    return request({
        method:'get',
        url: '/byuser/chatlog/'+touser
    })
}

export function upchatlog(id) {
    return request({
        method:'put',
        url: '/byuser/chatlog/'+id
    })
}
// export function sendOneWebSocket(id,text) {
//     return request({
//         method:'post',
//         url: '/sendOneWebSocket/'+id,
//         params : {
//             text
//         }
//     })
// }
export function sendOneWebSocket(id,text) {
    return request({
        method:'post',
        url: '/byuser/chatlog/'+id,
        params : {
            text
        }
    })
}