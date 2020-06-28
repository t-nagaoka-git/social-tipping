import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCXFyD814y43adY79r5_AwqLbWVrJvFyZo',
  authDomain: 'mysocialtippingproject.firebaseapp.com',
  databaseURL: 'https://mysocialtippingproject.firebaseio.com',
  projectId: 'mysocialtippingproject',
  storageBucket: 'mysocialtippingproject.appspot.com',
  messagingSenderId: '867786685702',
  appId: '1:867786685702:web:8215ac995fc80e4703f287',
  measurementId: 'G-4L64J2SQ5J',
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
