import Vue from 'vue'
import Router from 'vue-router'
import NursingLevel from "../components/nursing_manage/NursingLevel";

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
                    path: 'checkin',
                    component: () => import('@/components/customer_manage/checkin/Checkin'),
                },
                {
                    path: 'nursingLevel',
                    component: NursingLevel
                }
            ]
        },
    ]
})

export default router