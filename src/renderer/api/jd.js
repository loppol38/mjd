/**
 * 京东相关接口
 */
import http from './http'

async function loginCheck (Cookie) {
  try {
    const res = await http.get('/order_jd_com/lazy/isPlusMember.action', {
      headers: {
        Cookie
      }
    })
    console.log('loginCheck：', res)
    return res === true
  } catch (e) {
    console.error(e)
    return false
  }
}

export default {
  loginCheck
}
