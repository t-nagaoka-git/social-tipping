import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import firebase from 'firebase';
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
  } else if (to.name === 'SocialTipping' && store.state.user !== null) {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          if (doc.id === store.state.user.userId) return;
          const user = doc.data();
          user.userId = doc.id;
          delete user.user_id;
          users.push(user);
        });
        store.commit('setUsers', users);
        next();
      })
      .catch((error) => {
        alert(error);
        next('/');
      });
  } else {
    next();
  }
});

export default router;
