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
    url: '',
    method: 'post',
    data: courseData
  })
}
