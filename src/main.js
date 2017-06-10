import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueMask from './plugins/v-mask';
Vue.use(VueMask);

import Tooltips from './plugins/v-tooltip';
Vue.directive('tooltip', Tooltips);

import App from './App';
import { routes } from './routes.js';

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
