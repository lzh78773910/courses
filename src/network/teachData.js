import { request } from './request'
export function teachDataList(currentPage,pageSize) {
  return request({
    method: 'get',
    url: '/resources/'+currentPage+'/'+pageSize
  })
}
export function teachDataType(currentPage,pageSize) {
  return request({
    method: 'get',
    url: '/resourceType/'+currentPage+'/'+pageSize
  })
}
export function dataDownLoad(resUrl) {
  return request({
    // url: '/resource/download',
    url: '/download',
    params: {
      resUrl
    }
  })
}
export function dataByRtId(rtId) {
  return request({
    method: 'get',
    url: '/resources/'+rtId
  })
}