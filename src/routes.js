import Auth from './components/pages/Auth.vue';
import Closet from './components/pages/Closet.vue';

export const routes = [
    {
        path: '/',
        component: Closet
    },
    {
        path: '/login',
        component: Auth
    },
    {
        path: '*',
        component: Auth
    }
];
