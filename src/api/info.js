import request from "../utils/request";

export function getMajors() {
  return request({
    url: '/all-majors',
    method: 'post',
    data: {}
  })
}

export function getCourse(filter) {
  return request({
    url: '/course/all-course',
    method: 'post',
    data: filter
  })
}
