import { createRouter, createWebHistory } from 'vue-router';
import api from "@/api";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', name: 'welcome', component: () => import('../views/WelcomeView.vue'),
      children: [
        {
          path: '', name: 'intro',
          component: () => import('../views/IntroView.vue'),
        },
        {
          path: 'signIn', name: 'signIn',
          component: () => import('../views/SignInView.vue'),
        },
        {
          path: 'signUp', name: 'signUp',
          component: () => import('../views/SignUpView.vue'),
        },
      ],
    },
    { path: '/workspace', name: 'workspace', component: () => import('../views/WorkspaceView.vue'),
      children: [
        {
          path: '', name: 'start',
          component: () => import('../views/ExplainView.vue'),
        },
        {
          path: 'sortList=:name',
          component: () => import('../views/SortListView.vue'),
        },
        {
          path: 'list=:id_list',
          component: () => import('../views/PersonalListView.vue'),
        },
        {
          path: 'tag=:id_tag',
          component: () => import('../views/TagView.vue'),
        },
      ],
    },
    { path: '/:NotFoundPage(.*)', component: () => import('../views/NotFoundPageView.vue'), },
  ]
});

router.beforeEach(async (to) => {
  const response = await api.isAuthorized();
  if (response !== 'yes') {
    if (to.path.includes('workspace')) {
      return '/';
    }
  } else {
    if (!to.path.includes('workspace')) {
      return '/workspace';
    }
  }
});

export default router
