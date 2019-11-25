import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test.vue'
import home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
    routes:[{
        path:'/',
        name:'home',
        component:home
    },
        {

        }]
})
