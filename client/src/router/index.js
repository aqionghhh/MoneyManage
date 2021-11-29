import Vue from 'vue';
import Router from 'vue-router';

import Index from '../pages/Index';
import Register from '../pages/Register';
import NotFound from '../pages/404.vue';

Vue.use(Router)

export default new Router({
  routes: [
    //配置路由
    {//访问/就跳转到/index
      path: '/',
      redirect: "/index"
    },
    {
      path: '/index',
      name: "index",
      component: Index
    },
    {
      path: '/register',
      name: "register",
      component: Register
    },
    {
      path: '*',//什么都没有访问到
      name: "/404",
      component: NotFound
    },
  ]
})