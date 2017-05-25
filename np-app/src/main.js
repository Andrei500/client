import Vue from 'vue';
import App from './App';
import router from './router';

import VueMask from './plugins/v-mask';
Vue.use(VueMask);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
