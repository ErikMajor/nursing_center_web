import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/components/login/Login')
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/components/main/Main'),
            children: [
                {
                    path: '/checkin',
                    name: 'checkin',
                    component: () => import('@/components/customer_manage/checkin/Checkin'),
                },
            ]
        },
    ]
})

export default router