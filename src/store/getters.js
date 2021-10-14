const getters = {
  sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  username: state => state.user.username,
  name: state => state.user.name,
  studentID: state => state.user.studentID,
  grade: state => state.user.grade,
  major: state => state.user.major,
  // roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
