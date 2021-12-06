import request from "../utils/request";

export function getAskingList(queryAttr) {
  return request({
    url: '/trading/all-requiring',
    method: 'post',
    data: queryAttr
  })
}

export function getMyAskingList() {
  return request({
    url: '/trading/my-requiring',
    method: 'post',
    data: {}
  })
}


export function addAsking(courseData) {
  return request({
    url: '/trading/add-requiring',
    method: 'post',
    data: courseData
  })
}

export function deleteAsking(courseData) {
  return request({
    url: '/trading/delete-requiring',
    method: 'post',
    data: courseData
  })
}

export function fulfillAsking(askingData) {
  return request({
    url: '/order/transfer',
    method: 'post',
    data: askingData
  })
}
