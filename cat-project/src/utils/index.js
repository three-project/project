// 引入uuid
import { v4 as uuidv4 } from 'uuid'
export function getUserTempId() {
    // 读取uuid数据
    let userTempId = localStorage.getItem('USERTEMP_ID')
    // 有就返回没有就创建
    if (userTempId) return userTempId
    userTempId = uuidv4()
    // 存储到浏览器缓存
    localStorage.setItem('USERTEMP_ID', userTempId)
    return userTempId
}

// 存储token到缓存中
export function saveToken(token) {
    localStorage.setItem('token', token)
}
// 从浏览器缓存读取token
export const getToken = () => localStorage.getItem('token') || ''
// 从浏览器缓存中删除token
export const removeToken = () => localStorage.removeItem('token')