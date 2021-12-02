import { createApp } from 'vue';
import * as firebase from 'firebase/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import vSelect from 'vue-select';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyAUgICpXRIYAmDY43GcRl2e0NoPkAqnK5Y',
  authDomain: 'snsm-e12d3.firebaseapp.com',
  projectId: 'snsm-e12d3',
  storageBucket: 'snsm-e12d3.appspot.com',
  messagingSenderId: '1098742023798',
  appId: '1:1098742023798:web:d78b2abd17af9a63f74157',
};
firebase.initializeApp(firebaseConfig);

library.add(faShip);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('v-select', vSelect)
  .use(store)
  .use(router)
  .mount('#app');
