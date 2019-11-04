import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Todos from '@/views/Todos'
import SecondTask from '@/views/SecondTask'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/todos/:page',
        name: 'Todos',
        component: Todos
    },
    {
        path: '/second-task',
        name: 'SecondTask',
        component: SecondTask
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
