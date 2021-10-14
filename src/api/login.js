import request from '@/utils/request'
import store from '@/store/index'

export function login(user_name, password) {
  return request({
    url: '/log-in',
    method: 'post',
    data: {
      user_name,
      password
    }
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  //todo: change to method 'get'
  return request({
    url: '/req-stu-info',
    method: 'post',
    data: {
      token: store.getters.token
    }
  })
}

export function updateInfo(data) {
  return request({
    url: '/edit',
    method: 'post',
    data: {
      ...data,
      token: store.getters.token
    }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
