import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'

Vue.use(Router)

// localStorage.setItem('debug', 'leancloud*')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
