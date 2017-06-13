document.body.style.zoom = (window.innerWidth * 100 / 1295) + "%";

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueMask from './plugins/v-mask';
Vue.use(VueMask);

import Tooltips from './plugins/v-tooltip';
Vue.directive('tooltip', Tooltips);

Vue.mixin({
    methods: {
        focusToNext(elem) {
            if (!this.$refs[elem][0]) this.$refs[elem].$el.children[0].focus();
            else this.$refs[elem][0].$el.children[0].focus();
        },
        scrollDown(el, height) {
            let start = 0;

            const scr = setInterval(() => {
                start += 1;
                el.scrollTop += start;

                if (start > height) clearInterval(scr);

            }, 17);
        }
    }
})

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
