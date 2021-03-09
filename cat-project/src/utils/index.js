//将token缓存在浏览器中
export function saveToken (token){
    localStorage.setItem("TOKEN_KEY",token)
}
//从浏览器的缓存中读取token
export const getToken=()=>localStorage.getItem("TOKEN_KEY")||''
export const removeToken =()=>localStorage.removeItem("TOKEN_KEY")