import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/color-changer',
        name: 'ColorChanger',
        component: () => import('../views/ColorChanger.vue')
    },
    {
        path: '/font-auto-resize',
        name: 'FontAutoResize',
        component: () => import('../views/FontAutoResize.vue')
    },
    {
        path: '/about',
        name: 'About',
        // 路由级代码分割
        // 这会为该路由生成一个单独的 chunk (About.[hash].js)
        // 当路由被访问时才会加载
        component: () => import('../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router