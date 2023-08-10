import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: () => import('../views/WorkspaceView.vue') },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue'),
      children: [
        {
          path: '', name: 'start',
          component: () => import('../views/ExplainView.vue'),
        },
        {
          path: 'sortList=:name',
          component: () => import('../views/ListView.vue'),
        },
        {
          path: 'list=:id_list',
          component: () => import('../views/ListView.vue'),
        },
        {
          path: 'tag=:id_tag',
          component: () => import('../views/TagView.vue'),
        },
      ],
    },
    { path: '/:NotFoundPage(.*)', component: () => import('../views/NotFoundPageView.vue'), },
  ]
})

export default router
