import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    name: 'Login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/vote',
    component: Layout,
    redirect: '/vote/default',
    name: '投票模块',
    meta: {
      title: '投票模块',
      icon: 'el-icon-s-cooperation',
      breadcrumb: false
    },
    children: [
      {
        path: '/vote/default',
        component: () => import('@/views/vote'),
        name: 'Vote',
        meta: {
          title: '作品投票',
          icon: 'el-icon-s-cooperation'
        }
      },
      {
        path: '/vote/:voteId([1-9]\\d*)',
        component: () => import('@/views/vote/work'),
        name: 'VoteWork',
        hidden: true,
        meta: {
          title: '作品列表'
        }
      },
      {
        path: '/vote/:voteId([1-9]\\d*)/:workId(default|[1-9]\\d*)',
        component: () => import('@/views/vote/operation'),
        name: 'VoteOperation',
        hidden: true,
        meta: {
          title: '作品详情',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/active',
    component: Layout,
    redirect: '/active/default',
    meta: {
      title: '活动模块',
      icon: 'el-icon-s-cooperation',
      breadcrumb: false
    },
    children: [
      {
        path: '/active/default',
        component: () => import('@/views/active'),
        name: 'Active',
        meta: {
          title: '活动报名',
          icon: 'el-icon-star-on'
        }
      },
      {
        path: '/active/edit/:activeId(default|[1-9]\\d*)',
        component: () => import('@/views/active/edit'),
        name: 'ActiveEdit',
        hidden: true,
        meta: {
          title: '活动编辑',
          noCache: true
        }
      },
      {
        path: '/active/:activeId([1-9]\\d*)',
        component: () => import('@/views/active/enroll'),
        name: 'Enroll',
        hidden: true,
        meta: {
          title: '报名人员列表'
        }
      }
    ]
  },
  {
    path: '/live',
    component: Layout,
    redirect: '/live/default',
    meta: {
      title: '直播管理',
      // breadcrumb: false,
      icon: 'el-icon-video-camera-solid'
    },
    children: [
      {
        path: '/live/notice',
        component: () => import('@/views/live/notice'),
        name: 'LiveNotice',
        meta: {
          title: '直播预告',
          icon: 'el-icon-s-order'
        }
      },
      {
        path: '/live/default',
        component: () => import('@/views/live/index'),
        name: 'Live',
        meta: {
          title: '视频直播',
          icon: 'el-icon-view'
        }
      }
    ]
  },
  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/default',
    meta: {
      title: '答题模块',
      breadcrumb: false
    },
    children: [
      {
        path: '/paper/default',
        component: () => import('@/views/paper/index'),
        name: 'Paper',
        meta: {
          title: '试卷管理',
          icon: 'el-icon-picture'
        }
      },
      {
        path: '/subject/:paperId([1-9]\\d*)',
        component: () => import('@/views/paper/subject'),
        name: 'Subject',
        hidden: true,
        meta: {
          title: '题目列表'
        }
      },
      {
        path: '/rank/:paperId([1-9]\\d*)',
        component: () => import('@/views/rank/index'),
        name: 'Rank',
        hidden: true,
        meta: {
          title: '排行榜'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
