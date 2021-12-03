import {login, register, logout, updateStuInfo, getStuInfo} from '../../api/user'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {getCookie, removeCookie, setCookie} from "../../utils/support";
import {stat} from "copy-webpack-plugin/dist/utils/promisify";

const user = {
  state: {
    token: getToken(),
    username: '',
    name: '',
    studentID: '',
    grade: -1,
    major: -1,
    // avatar: '',
    authority: -1,
    update: true,
  },

  mutations: {
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // },
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
    SET_AUTHORITY: (state, authority) => {
      state.authority = authority;
    },
    SET_UPDATE: (state, update) => {
      state.update = update;
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const authority = data.authority;
          setToken(data.token);
          console.log(data);
          // setCookie('username', username)
          // commit('SET_TOKEN', tokenStr); //提交了一个mutation, tokenStr是它的payload
          //todo: move to GetInfo
          commit('SET_AUTHORITY', authority);
          commit('SET_UPDATE', true);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // //注册
    // Register({commit}, userInfo) {
    //   const userData = {
    //     user_name: userInfo.username.trim(),
    //     password: userInfo.password,
    //     name: userInfo.name,
    //     studentID: userInfo.studentID,
    //     grade: userInfo.grade,
    //     major: userInfo.major
    //   }
    //   return new Promise((resolve, reject) => {
    //     register(userData).then(response => {
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

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
        if (this.authority < 2) {
          commit('SET_NAME', this.state.authority === 0 ? "Super Admin" : "Admin");
          commit('SET_STUDENT_ID', "00000000");
          commit('SET_GRADE', 9999);
          commit('SET_MAJOR', 1);
          commit('SET_UPDATE', false);
          resolve();
        } else {
          console.log("jfkdlsj");
          getStuInfo().then(response => {
            const data = response.data;
            commit('SET_NAME', data.name)
            commit('SET_STUDENT_ID', data.studentID)
            commit('SET_GRADE', data.grade)
            commit('SET_MAJOR', data.major)
            commit('SET_UPDATE', false)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    UpdateInfo({commit}, data) {
      return new Promise((resolve, reject) => {
        updateStuInfo(data).then(response => {
          //todo: travel through all words
          resolve()
          setCookie("needUpdate", 1)
        })
      }).catch(error => {
        reject(error)
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
