import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from "@/views/WelcomeView.vue";
import WorkspaceView from '@/views/WorkspaceView.vue';
import TodayView from "@/views/TodayView.vue";
import WithFlagView from "@/views/WithFlagView.vue";
import DoneView from "@/views/DoneView.vue";
import AllView from "@/views/AllView.vue";
import PersonalListView from "@/views/PersonalListView.vue";



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue') },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue') },
    { path: '/workspace/',
      name: 'today',
      component: () => import('../views/WorkspaceView.vue'),
      children: [
        {
          path: 'today',
          component: () => import('../views/TodayView.vue'),
        },
        {
          path: 'with_flag',
          component: () => import('../views/WithFlagView.vue'),
        },
        {
          path: 'done',
          component: () => import('../views/DoneView.vue'),
        },
        {
          path: 'all',
          component: () => import('../views/AllView.vue'),
        },
        {
          path: ':id',
          component: () => import('../views/PersonalListView.vue'),
        },
      ],
    },
  ]
})

export default router
