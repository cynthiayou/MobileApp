import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ProductsList from '@/views/ProductsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductsList',
      component: ProductsList
    }
  ]
})
