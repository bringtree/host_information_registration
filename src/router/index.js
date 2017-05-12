import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import addHost from '@/components/addHost'
import hostSimpleInfo from '@/components/hostSimpleInfo'
import search from '@/components/search'
import department from '@/components/department'
import networkLabel from '@/components/networkLabel'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/addHost',
          name: 'addHost',
          component: addHost
        },
        {
          path: '/hostSimpleInfo',
          name: 'hostSimpleInfo',
          component: hostSimpleInfo
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/department',
          name: 'department',
          component: department
        },
        {
          path: '/networkLabel',
          name: 'networkLabel',
          component: networkLabel
        },
        {
          path: '/admin',
          name: 'admin',
          component: admin
        }
      ]
    }
  ]
})
