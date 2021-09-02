import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login'
import Register from '../components/login/Register'
import Main from '../components/main/Main'
import User from "../components/user_manage/User";
// import UserImport from "../components/user_manage/UserImport";
import NursingContent from "../components/nursing_manage/NursingContent";
import NursingContentAdd from "../components/nursing_manage/NursingContentAdd";
import NursingLevel from "../components/nursing_manage/NursingLevel";
import NursingRecords from "../components/nursing_manage/NursingRecords";


Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/main',
            component: Main,
            children: [
                {
                    path: 'checkin',
                    component: () => import('@/components/customer_manage/checkin/Checkin')
                },
                {
                    path: 'checkout',
                    component: () => import('@/components/customer_manage/checkout/Checkout')
                },
                {
                    path: 'manage',
                    component: () => import('@/components/customer_manage/manage/Manage')
                },
                {
                    path: 'roomManage',
                    component: () => import('@/components/bedManage/RoomManage')
                },
                {
                    path: 'bedManage/:id',
                    component: () => import('@/components/bedManage/BedManage')
                },
                {
                    path: 'mealCanlender',
                    component: () => import('@/components/mealManage/MealCanlender')
                },
                {
                    path: 'mealRecords',
                    component: () => import('@/components/mealManage/MealRecords')
                },
                {
                    path: 'userMealManage',
                    component: () => import('@/components/mealManage/UserMealManage')
                },
                {
                    path: 'mealList/:customerId',
                    props: true,
                    component: () => import('@/components/mealManage/MealList')
                },
                {
                    path: 'user',
                    component: User
                },
                // {
                //     path: 'userImport',
                //     component: UserImport
                // },
                {
                    path: 'customerConcern',
                    component: () => import('@/components/customerConcern/CustomerConcern')
                },
                {
                    path: 'serviceConcern/:id',
                    component: () => import('@/components/customerConcern/ServiceConcern')
                },
                {
                    path: 'nursingContent',
                    component: NursingContent
                },
                {
                    path: 'nursingContentAdd',
                    component: NursingContentAdd
                },
                {
                    path: 'nursingLevel',
                    component: NursingLevel
                },
                {
                    path: 'nursingRecords',
                    component: NursingRecords
                },

            ]
        },

    ]
})

export default router
