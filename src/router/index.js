import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignOut from "../views/SignOut";
import Commission from "../views/Commission";
import ManageCustomer from "../views/ManageCustomer";
import ManangeMarket from "../views/ManangeMarket";
import ReportSetting from "../views/ReportSetting";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/commission',
    name: 'commission',
    component: Commission
  },
  {
    path: '/singout',
    name: 'singout',
    component: SignOut
  },{
    path: '/managecustomer',
    name: 'managecustomer',
    component: ManageCustomer
  },{
    path: '/managemarket',
    name: 'managemarket',
    component: ManangeMarket
  },{
    path: '/reportsetting',
    name: 'reportsetting',
    component: ReportSetting
  },
]

const router = new VueRouter({
  routes
})

export default router
