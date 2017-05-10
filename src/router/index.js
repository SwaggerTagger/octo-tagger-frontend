import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import LoginComponent from '@/components/LoginComponent'
import LoginActivated from '@/components/LoginActivated'
import FullScreenComponent from '@/components/FullScreenComponent'
import RegisterComponent from '@/components/RegisterComponent'
import BillingComponent from '@/components/BillingComponent'
import AboutComponent from '@/components/AboutComponent'

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
          name: 'FullScreenComponent',
          props: true,
        },
      ],
    },
    {
      path: '/login',
      component: LoginComponent,
      name: 'LoginComponent',
      children: [
        {
          path: 'activated',
          component: LoginActivated,
          name: 'LoginActivated',
        },
      ],
    },
    {
      path: '/register',
      component: RegisterComponent,
      name: 'RegisterComponent',
    },
    {
      path: '/billing',
      component: BillingComponent,
      name: 'Billingcomponent',
    },
    {
      path: '/about',
      component: AboutComponent,
      name: 'AboutComponent',
    },
  ],
})
