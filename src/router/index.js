import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';
import SocialTipping from '../views/SocialTipping.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/socialtipping',
    name: 'SocialTipping',
    component: SocialTipping,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'SocialTipping' && store.state.user === null) {
    next('/');
  } else if (to.name !== 'SocialTipping' && store.state.user !== null) {
    next('/socialtipping');
  } else {
    next();
  }
});

export default router;
