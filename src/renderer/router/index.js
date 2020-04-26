import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/pages/account').default
    },
    {
      path: '/task',
      name: 'task',
      component: require('@/pages/task').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
