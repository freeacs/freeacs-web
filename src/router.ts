import Vue from 'vue';
import Router from 'vue-router';
import authentication from '@/store/AuthenticationModule';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authentication.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
