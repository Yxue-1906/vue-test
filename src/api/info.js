import request from "../utils/request";

export function getMajorList() {
  return request({
    url: '/all-majors',
    method: 'post',
    data: {}
  })
}

export function getCourseList(filter) {
  return request({
    url: '/course/all-course',
    method: 'post',
    data: filter
  })
}

export function addCourse(courseDetail) {
  return request({
    url: '/course/add-course',
    method: 'post',
    data: courseDetail
  })
}

export function deleteCourse(course_id) {
  return request({
    url: '/course/delete-course',
    method: 'post',
    data: {course_id}
  })
}
