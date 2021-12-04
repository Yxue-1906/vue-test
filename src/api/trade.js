import request from '../utils/request'

export function getSellingList(queryAttr) {
  return request({
    url: '/trade/all-selling',
    method: "post",
    data: queryAttr
  })
}
