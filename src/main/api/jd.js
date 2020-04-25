'use strict'
/**
 * 京东相关接口
 */
import http from './http'

async function loginCheck (Cookie) {
  try {
    const {data} = await http.get('https://order.jd.com/lazy/isPlusMember.action', {
      headers: {
        Cookie
      }
    })
    console.log('loginCheck：', data)
    return data === true
  } catch (e) {
    console.error(e)
    return false
  }
}

export default {
  loginCheck
}
