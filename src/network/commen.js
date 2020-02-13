import { request } from './request';

export function commentList(currentPage,pageSize) {
    return request({
        method:'get',
        url: '/comment/'+currentPage+'/'+pageSize
    })
}

export function byusercommentList(currentPage,pageSize) {
    return request({
        method:'get',
        url: '/byuser/comment/'+currentPage+'/'+pageSize
    })
}

export function add(grade,userContent) {
    return request({
        url: '/byuser/comment',
        method:'post',
        params:{
            grade,
            userContent
        }
    })
}

export function del(commentId) {
    return request({
        url: '/byuser/comment/'+commentId,
        method:'delete',
    })
}
