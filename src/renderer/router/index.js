import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/clubManager',
      name : 'clubManager',
      component: require('@/components/clubManager').default
    },
    {
      path : '/accountManager',
      name:'accountManager',
      component:require('@/components/accountManager').default
    },
    {
      path : '/turnover',
      name : 'turnover',
      component: require('@/components/turnOver').default
    },
    {
      path : '/product',
      name : 'product',
      component: require('@/components/product').default
    },
    {
      path:'/login',
      name:'login',
      component:require('@/components/login').default
    }
    ,
    {
      path: '/sale',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    
    {
      path: '*',
      redirect: '/'
    }
  ]
})
