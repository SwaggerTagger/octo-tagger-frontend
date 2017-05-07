import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import LoginComponent from '@/components/LoginComponent'
import FullScreenComponent from '@/components/FullScreenComponent'
import RegisterComponent from '@/components/RegisterComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'Dashboard',
      children: [
        {
          path: 'view/:id',
          component: FullScreenComponent,
          name: 'FullScreenComponent'
        }
      ]
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
