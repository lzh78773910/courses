import { request } from './request';

export function test(text) {
    return request({
        url: '/sendAllWebSocket',
        method: 'get',
        params: {
          text
        }
    })
}
export function test2(name,text) {
    return request({
        url: '/sendOneWebSocket/'+name,
        method: 'get',
        params: {
          text
        }
    })
}