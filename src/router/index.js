import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
            path: '/',
             component: () => import(/* webpackChunkName: "home" */ '@view/Index.vue'),
             redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@view/HomeView.vue'),
                    name: 'home',
                    meta: { title: '主页' }
                }
            ]
        },
    {
            path: '/401',
            meta: { title: '401' },
            component: () => import('@comp/common/401.vue')
        },
        {
            path: '/404',
            meta: { title: '404' },
            component: () => import('@comp/common/404.vue')
        },
        {
            path: '/500',
            meta: { title: '500' },
            component: () => import('@comp/common/500.vue')
        },
  ]
})

export default router
