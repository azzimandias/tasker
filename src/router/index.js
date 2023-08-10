import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from "@/views/WelcomeView.vue";
import WorkspaceView from '@/views/WorkspaceView.vue';
import TodayView from "@/views/TodayView.vue";
import WithFlagView from "@/views/WithFlagView.vue";
import DoneView from "@/views/DoneView.vue";
import AllView from "@/views/AllView.vue";
import ListView from "@/views/ListView.vue";



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue') },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue'),
      children: [
        {
          path: 'sortList_:name',
          component: () => import('../views/ListView.vue'),
        },
        {
          path: 'list_:id',
          component: () => import('../views/ListView.vue'),
        },
      ],
    },
  ]
})

export default router
