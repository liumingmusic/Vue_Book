import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'
import Element from '@/components/Element'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: Ebook
    },
    {
      path:'/element',
      component: Element
    }
  ]
})
