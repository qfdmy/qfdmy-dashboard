import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'el-icon-s-operation' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/admin',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'admin',
        name: 'CoreAdminList',
        component: () => import('@/views/core/admin/list'),
        meta: { title: '管理列表' }
      },
      {
        path: 'admin/create',
        name: 'CoreAdminCreate',
        component: () => import('@/views/core/admin/create'),
        meta: { title: '添加管理' },
        hidden: true
      },
      {
        path: 'admin/edit/:id(\\d+)',
        name: 'CoreAdminEdit',
        component: () => import('@/views/core/admin/edit'),
        meta: { title: '编辑管理' },
        hidden: true
      },
      {
        path: 'user',
        name: 'CoreUserList',
        component: () => import('@/views/core/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'user/create',
        name: 'CoreUserCreate',
        component: () => import('@/views/core/user/create'),
        meta: { title: '添加用户' },
        hidden: true
      },
      {
        path: 'user/edit/:id(\\d+)',
        name: 'CoreUserEdit',
        component: () => import('@/views/core/user/edit'),
        meta: { title: '编辑用户' },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
