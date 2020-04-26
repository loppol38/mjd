'use strict'
/**
 * 京东相关接口
 */
import http from './http'

const UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'
const ContentType = 'application/x-www-form-urlencoded'
/**
 * 查询登录状态及是否为京东plus会员
 * @param Cookie
 * @returns {Promise<{isLogin: boolean}|{isLogin: boolean, isPlusMember: boolean}>}
 */
async function cookieCheck (Cookie) {
  let url = 'https://order.jd.com/lazy/isPlusMember.action'
  if (process.env.NODE_ENV === 'development') {
    url = '/order_jd_com/lazy/isPlusMember.action'
  }
  try {
    const {data} = await http.get(url, {
      headers: {
        Cookie,
        'User-Agent': UserAgent
      }
    })
    console.log('loginCheck：', data)
    return {
      isLogin: true,
      isPlusMember: data === true
    }
  } catch (e) {
    console.error(e)
    return {
      isLogin: false
    }
  }
}

/**
 * 获取下单地址
 * @param Cookie
 * @param skuId
 * @returns {Promise<string>}
 */
async function getBuyUrl (Cookie, skuId) {
  let url = 'https://itemko.jd.com/itemShowBtn'
  if (process.env.NODE_ENV === 'development') {
    url = '/itemko_jd_com/itemShowBtn'
  }
  const { data } = await http.get(url, {
    headers: {
      Cookie,
      'User-Agent': UserAgent
    },
    params: {
      skuId,
      callback: 'callback',
      from: 'pc',
      _: Date.now()
    }
  })
  console.log('getBuyUrl:', data)
  return data
}

/**
 * 获取下单信息
 * @param Cookie
 * @param sku
 * @param num
 * @returns {Promise<any>}
 */
async function getBuyInfo (Cookie, sku, num) {
  let url = 'https://marathon.jd.com/seckillnew/orderService/pc/init.action'
  if (process.env.NODE_ENV === 'development') {
    url = '/marathon_jd_com/seckillnew/orderService/pc/init.action'
  }
  const res = await http.post(url, {
    sku,
    num,
    isModifyAddress: false
  }, {
    headers: {
      Cookie,
      'User-Agent': UserAgent,
      'Content-Type': ContentType
    }
  })
  console.log('getBuyInfo:', res)
  return res.data
}

async function orderSubmit (Cookie, skuId, num, buyInfo) {
  let url = 'https://marathon.jd.com/seckillnew/orderService/pc/submitOrder.action'
  if (process.env.NODE_ENV === 'development') {
    url = '/marathon_jd_com/seckillnew/orderService/pc/submitOrder.action'
  }
  const { data } = await http.post(url, {
    skuId,
    num,
    'addressId': buyInfo['addressList'][0]['id'],
    'yuShou': true,
    'isModifyAddress': false,
    'name': buyInfo['addressList'][0]['name'],
    'provinceId': buyInfo['addressList'][0]['provinceId'],
    'cityId': buyInfo['addressList'][0]['cityId'],
    'countyId': buyInfo['addressList'][0]['countyId'],
    'townId': buyInfo['addressList'][0]['townId'],
    'addressDetail': buyInfo['addressList'][0]['addressDetail'],
    'mobile': buyInfo['addressList'][0]['mobile'],
    'mobileKey': buyInfo['addressList'][0]['mobileKey'],
    'email': buyInfo['addressList'][0]['email'],
    'postCode': buyInfo['addressList'][0]['postCode'],
    'invoiceTitle': buyInfo['invoiceInfo']['invoiceTitle'],
    // "invoiceCompanyName":buyInfo["invoiceInfo"]["invoiceCompany"],
    'invoiceContent': buyInfo['invoiceInfo']['invoiceContentType'],
    // "invoiceTaxpayerNO":buyInfo["invoiceInfo"]["invoiceCode"],
    'invoiceEmail': buyInfo['invoiceInfo']['invoiceEmail'],
    'invoicePhone': buyInfo['invoiceInfo']['invoicePhone'],
    'invoicePhoneKey': buyInfo['invoiceInfo']['invoicePhoneKey'],
    'invoice': true,
    'password': '',
    'codTimeType': 3,
    'paymentType': 4,
    'areaCode': '',
    'overseas': 0,
    'phone': '',
    'eid': 'xxx',
    'fp': 'xxx',
    'token': buyInfo['token'],
    'pru': ''
  }, {
    headers: {
      Cookie,
      'User-Agent': UserAgent,
      'Content-Type': ContentType
    }
  })
  console.log('orderSubmit:', data)
  return data
}
export default {
  cookieCheck,
  getBuyUrl,
  getBuyInfo,
  orderSubmit
}
