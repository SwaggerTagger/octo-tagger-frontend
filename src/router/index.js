import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import LoginComponent from '@/components/LoginComponent'
import RegisterComponent from '@/components/RegisterComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'Dashboard',
    },
    {
      path: '/login',
      component: LoginComponent,
      name: 'LoginComponent',
    },
    {
      path: '/register',
      component: RegisterComponent,
      name: 'RegisterComponent',
    },
  ],
})
