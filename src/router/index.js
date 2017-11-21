import Vue from 'vue'
import Router from 'vue-router'
import Fotografie from '@/components/Fotografie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Fotografie',
      component: Fotografie
    }
  ]
})
