import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import Vehicles from '@/components/Vehicles'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/vehicles'
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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
  mode: 'history'
})
