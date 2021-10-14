import {login, register, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {Message, MessageBox} from 'element-ui'

const user = {
  state: {
    token: getToken(),
    username: '',
    name: '',
    studentID: '',
    grade: '',
    major: '',
    // avatar: '',
    // roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_STUDENT_ID: (state, studentID) => {
      state.studentID = studentID
    },
    SET_GRADE: (state, grade) => {
      state.grade = grade
    },
    SET_MAJOR: (state, major) => {
      state.major = major
    },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.token
          setToken(tokenStr)
          commit('SET_USERNAME', username)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //注册
    Register({commit}, userInfo) {
      const userData = {
        user_name: userInfo.username.trim(),
        password: userInfo.password,
        name: userInfo.name,
        studentID: userInfo.studentID,
        grade: userInfo.grade,
        major: userInfo.major
      }
      return new Promise((resolve, reject) => {
        register(userData).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      // return new Promise((resolve, reject) => {
      //   getInfo().then(response => {
      //     const data = response.data
      //     if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
      //       commit('SET_ROLES', data.roles)
      //     } else {
      //       reject('getInfo: roles must be a non-null array !')
      //     }
      //     commit('SET_NAME', data.username)
      //     commit('SET_AVATAR', data.icon)
      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data;
          commit('SET_NAME', data.name)
          commit('SET_STUDENT_ID', data.studentID)
          console.log(data.studentID)
          commit('SET_GRADE', data.grade)
          commit('SET_MAJOR', data.major)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
