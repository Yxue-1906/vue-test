import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/login'), hidden: true},
  {path: '/register', component: () => import('@/views/register/register'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('../views/user/index'),
      meta: {title: '用户面板', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/sell',
    component: Layout,
    redirect: '/sell/selling',
    name: 'sell',
    meta: {title: '交易', icon: 'product'},
    children: [
      {
        path: 'selling',
        name: 'selling',
        component: () => import('../views/trade/all-selling'),
        meta: {title: '所有出售', icon: 'selling-list'}
      },
      {
        path: 'my-selling',
        name: 'my-selling',
        component: () => import('../views/trade/my-selling'),
        meta: {title: '我不要的', icon: 'selling-list'}
      },
      {
        path: 'my-purchase',
        name: 'my-purchase',
        component: () => import('../views/trade/my-purchase'),
        meta: {title: '我买到的', icon: 'selling-list'}
      },
      {
        path: 'my-sold',
        name: 'my-sold',
        component: () => import('../views/trade/my-sold'),
        meta: {title: '我卖出的', icon: 'selling-list'}
      }
    ]
  },
  {
    path: '/ask',
    component: Layout,
    redirect: '/ask/asking',
    name: 'ask',
    meta: {title: '求课', icon: 'product'},
    children: [
      {
        path: 'asking',
        name: 'asking',
        component: () => import('../views/ask/all-asking'),
        meta: {title: '所有求课', icon: 'selling-list'}
      },
      {
        path: 'my-asking',
        name: 'my-asking',
        component: () => import('../views/ask/my-asking'),
        meta: {title: '我想要的', icon: 'selling-list'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

