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
    url: '/student/register',
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
