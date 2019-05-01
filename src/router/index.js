import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ProductsList from '@/views/ProductsList'
import Cart from '@/views/Cart'
import orders from '@/views/orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductsList',
      component: ProductsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    }
  ]
})
