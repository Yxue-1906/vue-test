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

export function deleteSellingAdmin(data) {
  return request({
    url: '/admin/delete-selling',
    method: 'post',
    data: data
  })
}

export function deleteAskingAdmin(data) {
  return request({
    url: '/admin/delete-requiring',
    method: 'post',
    data: data
  })
}

// export function deleteAdmin(data) {
//   return request({
//     url: '/admin/all-admin',
//     method: 'post',
//     data: {}
//   })
// }
