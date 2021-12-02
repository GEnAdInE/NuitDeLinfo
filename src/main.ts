import { createApp } from 'vue';
import * as firebase from 'firebase/app';
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

createApp(App).use(store).use(router).mount('#app');
