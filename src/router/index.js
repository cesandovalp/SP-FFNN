import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Examples from '@/components/Examples/Examples'
import Custom from '@/components/Examples/Custom'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/'         , name: 'Home'      , component: Home     },
    { path: '/Login'    , name: 'Login'     , component: Login    },
    { path: '/Examples' , name: 'Examples'  , component: Examples },
    { path: '/Custom'   , name: 'Custom'    , component: Custom   }
  ]
})
