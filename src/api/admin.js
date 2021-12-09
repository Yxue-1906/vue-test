import request from "../utils/request";

export function addAdmin(adminDetail) {
  return request({
    url: '/admin/create-admin',
    method: 'post',
    data: adminDetail
  })
}

export function getAdminList() {
  return request({
    url: '/admin/all-admin',
    method: 'post',
    data: {}
  })
}
