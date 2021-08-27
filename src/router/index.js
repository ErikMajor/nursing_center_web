import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login'
import Main from '../components/main/Main'


Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/main',
            component: Main,
        },

    ]
})

export default router