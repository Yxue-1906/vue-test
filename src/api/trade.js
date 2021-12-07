import request from '../utils/request'

export function getSellingList(queryAttr) {
  return request({
    url: '/trading/all-selling',
    method: "post",
    data: queryAttr
  })
}

export function getMySellingList() {
  return request({
    url: '/trading/my-selling',
    method: 'post',
    data: {}
  })
}

export function getMyPurchaseList() {
  return request({
    url: '/order/my-purchase',
    method: 'post',
    data: {}
  })
}

export function getMySoldList() {
  return request({
    url: '/order/my-sale',
    method: 'post',
    data: {}
  })
}

export function addSelling(courseData) {
  return request({
    url: '/trading/add-selling',
    method: 'post',
    data: courseData
  })
}

export function deleteSelling(courseData) {
  return request({
    url: '/trading/delete-selling',
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
