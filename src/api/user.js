import request from '@/utils/request'
import store from '@/store/index'

export function login(username, password) {
  return request({
    url: '/log-in',
    method: 'post',
    data: {
      username,
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

export function getStuInfo() {
  return request({
    url: '/req-stu-info',
    method: 'post',
  })
}

export function updateStuInfo(data) {
  return request({
    url: '/edit-info',
    method: 'post',
    data: data
  })
}
