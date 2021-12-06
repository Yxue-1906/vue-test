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
    meta: {title: '出售', icon: 'product'},
    children: [
      {
        path: 'selling',
        name: 'selling',
        component: () => import('@/views/sell/selling/index'),
        meta: {title: '所有出售', icon: 'selling-list'}
      },
      {
        path: 'my-selling',
        name: 'my-selling',
        component: () => import('@/views/sell/my-selling/index'),
        meta: {title: '我的出售', icon: 'selling-list'}
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'selling-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden: true
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

