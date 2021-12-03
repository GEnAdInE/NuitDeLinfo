import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShip, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import vSelect from 'vue-select';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

library.add(faShip, faPen, faCheck);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('v-select', vSelect)
  .use(store)
  .use(router)
  .mount('#app');
