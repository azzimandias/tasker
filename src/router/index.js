import { createRouter, createWebHistory } from 'vue-router'
import WorkspaceView from '../views/WorkspaceView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'workspace', component: WorkspaceView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  ]
})

export default router
