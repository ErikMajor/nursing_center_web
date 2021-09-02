import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login'
import Main from '../components/main/Main'
import BedManage from '../components/bedManage/BedManage'
import MealCalender from '../components/mealManage/MealCanlender'
import MealRecords from '../components/mealManage/MealRecords'
import UserMealManage from '../components/mealManage/UserMealManage'
import MealList from '../components/mealManage/MealList'
import User from "../components/user_manage/User";
import UserImport from "../components/user_manage/UserImport";


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
            children: [
                {
                    path: 'checkin',
                    component: () => import('@/components/customer_manage/checkin/Checkin')
                },
                {
                    path: 'bedManage',
                    component: BedManage
                },
                {
                    path: 'mealCalender',
                    component: MealCalender
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
                    component: MealList
                },
                {
                    path: 'user',
                        component: User
                },
                {
                    path: 'userImport',
                        component: UserImport
                }
            ]
        },

    ]
})

export default router
