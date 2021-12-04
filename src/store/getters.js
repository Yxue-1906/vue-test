const getters = {
  sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  username: state => state.user.username,
  studentID: state => state.user.studentID,
  grade: state => state.user.grade,
  major: state => state.user.major,
  authority: state => state.user.authority,
  update: state => state.user.update,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
