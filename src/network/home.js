import { request } from './request';

export function getHomeTab() {
  return request({
    url: '/home/label'
  })
}
export function gettotal() {
  return request({
    url: '/home/totalcout'
  })
}
export function gettoday() {
  return request({
    url: '/home/cout'
  })
}
export function Abouts() {
  return request({
    url: '/home/herf'
  })
}