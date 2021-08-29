import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login'
import Main from '../components/main/Main'
import BedManage from '../components/bedManage/BedManage'
import MealCanlender from '../components/mealManage/MealCanlender'
import MealRecords from '../components/mealManage/MealRecords'
import UserMealManage from '../components/mealManage/UserMealManage'
import MealList from '../components/mealManage/MealList'


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
            children:[
                {
                    path: 'bedManage',
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
                    component: MealList
                }
                ]
        },

    ]
})

export default router
