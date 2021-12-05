import request from '../utils/request'

export function getSellingList(queryAttr) {
  return request({
    url: '/trading/all-selling',
    method: "post",
    data: queryAttr
  })
}

export function addSelling(courseData) {
  return request({
    url: 'trading/add-selling',
    method: 'post',
    data: courseData
  })
}

export function buySelling(sellingData) {
  return request({
    url: '/order/purchase',
    method: 'post',
    data: sellingData
  })
}
