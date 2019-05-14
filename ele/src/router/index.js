import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const home=resolve=>require(['../page/home/home'],resolve)
const home1=resolve=>require(['../page/home/home1'],resolve)
const home2=resolve=>require(['../page/home/home2'],resolve)
const Foote=resolve=>require(['../page/home/foote'],resolve)
const nr=resolve=>require(['../components/shoplist/nr.vue'],resolve)
const Shop=resolve=>require(['../components/shoplist/shop.vue'],resolve)
const Sh=resolve=>require(['../components/shoplist/sh.vue'],resolve)
const my=resolve=>require(['@/components/list/my.vue'],resolve)
const order=resolve=>require(['@/components/list/order.vue'],resolve)
const search=resolve=>require(['@/components/list/seach.vue'],resolve)
const login=resolve=>require(['@/components/login.vue'],resolve)
const user=resolve=>require(['@/components/user.vue'],resolve)
const adress=resolve=>require(['@/components/adress/adress.vue'],resolve)
const address=resolve=>require(['@/components/adress/address.vue'],resolve)
const addresss=resolve=>require(['@/components/adress/addresss.vue'],resolve)
const forget=resolve=>require(['@/components/password/password.vue'],resolve)

Vue.use(Router)

export default new Router({
  routes:[{
    path:'/',
    component:App,
    children:[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:home
      },
      {
        path:'/home1/:id',
        name:'home1',
        component:home1
      },
      {
        path:'/msite/:geoha',
        name:'home2',
        component:home2
      },
      {
        path:'/foote/:tit',
        name:'foote',
        component:Foote
      },
      {
        path:'/shop/:geoha/:id',
        name:'shop',
        component:Shop
      },
      {
        path:'/nr',
        component:nr
      },
      {
        path:'/sh',
        component:Sh
      },
      {
        path:'/my',
        component:my
      },
      {
        path:'/login',
        component:login
      },
      {
        path:'/user',
        component:user
      },
      {
        path:'/adress',
        component:adress
      },
      {
        path:'/address',
        component:address
      },
      {
        path:'/addresss',
        component:addresss
      },
      {
        path:'/forget',
        component:forget
      },
      {
        path:'/order',
        component:order
      },
      {
        path:'/search',
        component:search
      }
    ]
  }]
})

