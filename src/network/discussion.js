import { request } from './request';
export function discussionList(currentPage,pageSize) {
  return request({
      method:'get',
      url: '/question/'+currentPage+'/'+pageSize
  })
}
export function discussionDetail(qId) {
  return request({
      method:'get',
      url: '/comment/'+qId
  })
}

export function add(title,description) {
  return request({
      url: '/byuser/question',
      method:'post',
      params:{
        title,
        description
      }
  })
}
export function detailAdd(parentId,content) {
  return request({
    url: '/byuser/addCommentByUser',
    method: 'post',
    params: {
      parentId,
      content
    }
  })
}
