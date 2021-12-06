import request from "../utils/request";

export function getAskingList(queryAttr) {
  return request({
    url: '/trading/all-requiring',
    method: 'post',
    data: queryAttr
  })
}

export function getMySellingList() {
  return request({
    url: '/trading/my-requiring',
    method: 'post',
    data: {}
  })
}
exp
