import Vue from 'vue'
import Router from 'vue-router'
import Add from '../components/Add'
import Home from '../components/Home'
import List from '../components/List'
import Detail from '../components/Detail'
import Collect from '../components/Collect'
Vue.use(Router);
export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home,meta:{keepAlive:true}},
    {path:'/list',component:List},
    {path:'/add',component:Add},
    //路径参数  /detail/1 {bid:1}  必须有但是可以随机
    {path:'/detail/:bid',component:Detail,name:'detail'},
    {path:'/collect',component:Collect},
    {path:'*',redirect:'/home'} //不考虑404请求其它路径强制重定向/home
  ]
})
