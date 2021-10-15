import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import {getCookie, removeCookies} from "./utils/support";
import {removeToken} from "./utils/auth"; // 验权

const whiteList = ['/register', '/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.log(to.path)
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({path: ''})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.name == null || store.getters.name === '' || getCookie('needUpdate')) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus = null;
          let username = store.getters.username;
          store.dispatch('GenerateRoutes', {menus, username}).then(() => { // 生成可访问的路由表
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
