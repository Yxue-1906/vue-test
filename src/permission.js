import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import {getCookie, removeCookies} from "./utils/support";
import {removeToken} from "./utils/auth"; // 验权

const whiteList = ['/register', '/login'] // 不重定向白名单
// 3457
// 使用默认名字从router import了生成的路由器
// 这里定义了全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path in whiteList) {
      next({path: ''})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.update) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let username = store.getters.username;
          store.dispatch('GenerateRoutes', username).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({...to, replace: true})
          })
          // next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            // next({path: '/'})
            console.log()
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
