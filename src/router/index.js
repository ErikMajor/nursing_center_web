import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login'
import Register from '../components/login/Register'
import Main from '../components/main/Main'
import RoomManage from '../components/bedManage/RoomManage'
import BedManage from '../components/bedManage/BedManage'
import MealCanlender from '../components/mealManage/MealCanlender'
import MealRecords from '../components/mealManage/MealRecords'
import UserMealManage from '../components/mealManage/UserMealManage'
import MealList from '../components/mealManage/MealList'
import User from "../components/user_manage/User";
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
                    component: RoomManage
                },
                {
                    path: 'bedManage/:id',
                    component: BedManage
                },
                {
                    path: 'mealCanlender',
                    component: MealCanlender
                },
                {
                    path: 'mealRecords',
                    component: MealRecords
                },
                {
                    path: 'userMealManage',
                    component: UserMealManage
                },
                {
                    path: 'mealList/:id',
                    props: true,
                    component: MealList
                },
                {
                    path: 'user',
                    component: User
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
