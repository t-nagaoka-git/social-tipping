import Vue from 'vue';
import VueRouter from 'vue-router';
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

export default router;
