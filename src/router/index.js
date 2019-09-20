import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Vehicles from '@/components/Vehicles'
import Profile from '@/components/Profile'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/vehicles',
      name: 'Vehicles',
      component: Vehicles
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
