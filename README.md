# vue-cli3 练手项目vue-book

## 1、项目中用到的包

**less less-loader  axios vue-router vuex **

## 2、目录说明

- 根目录mock是模拟后台数据
- src/api 代表的是所有的接口
- base 基础组件，如Tab栏、轮播图、导航等可复用的组件
- components 页面组件
- static/font 字体图标文件
- static/css 样式文件说明
- static/css/reset.css是让不同浏览器具有相同的显示效果
- static/css/border.css 该css样式用于解决移动端1像素边框问题。问题分析：有些手机的屏幕分辨率较高，是2-3倍屏幕。css样式中border:1px solid red;在2倍屏下，显示的并不是1个物理像素，而是2个物理像素。为了解决这个问题，引入border.css是非常有必要的。

## 3、项目注意点
- 在main.js中导入相关静态资源文件，如css文件，字体文件
```
import '../static/css/reset.css'//
import  '../static/css/border.css'
import '../static/font/iconfont'
```

## 4、flex布局注意
- 水平垂直居中：
```
    display: flex;
    justify-content: space-around;//主轴居中并平分
    align-items: center;//交叉轴居中，需要设置高度，默认占满
```
- 竖直居中：改变主轴方向即可
```
	 flex-direction:column;
     justify-content: center;//垂直方向居中不平分
```
- 注意最外层加上 flex:1

- **router-link-exact-active与router-link-active**
> 二者都是路由激活时样式，区别是后者是二级路由激活时也触发样式

## 5、组件使用注意
**以在Home页面级组件使用基础组件Tab为例**
- 引入组件`import Nav from '../base/Tab'`
- 注册组件` components:{Nav}`
- 使用组件`<template><Nav></Nav></template>`

## 6、使用vue-awesome-swiper轮播图组件
- 安装`npm install vue-awesome-swiper --save`
- 在main.js中全局挂载
```
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
```
- 在base中新建Swiper.vue
- 使用参考[ https://surmon-china.github.io/vue-awesome-swiper/]( https://surmon-china.github.io/vue-awesome-swiper/ "使用参考")
- swiper参数配置参考[ https://www.swiper.com.cn/api/scrollbar/185.html]( https://www.swiper.com.cn/api/scrollbar/185.html)
- 注意loop=true不生效BUG 处理加上`<swiper :options="swiperOption" v-if="swiperSlides.length>1">`

## 7、api接口设计，以getSliders()为例
**注意每个接口返回的都是promise实例**
-每个请求对应返回一个promise实例
```
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'
//添加默认的请求路径
//获取轮播图数据
export  let getSliders = ()=> {
  return axios.get('/sliders')//返回promise对象
}
```
- 组件中获取数据使用async-await
```
async created(){
          let {data:sliders}= await getSliders();//等待promise对象返回结果,如果没等待res.data为undefined.
         this.sliders = sliders; //为组件挂载上数据
        },
```

## 8、添加热门图书功能
**组件设计步骤**
- 先写服务端，确保数据能正常返回
- 增加api方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件

## 9、动态路由实现图书详情页跳转功能

**1、问题我们希望根据渲染出来的不同图书li点击跳转到一个同一个图书详情页组件，然后渲染出不同图书详细信息**

**2、我们需要给路由动态绑定一个to属性而不是写死**

**3、路由参数为我们实现了这一功能**
- 先在路由里面配置`{path:'/detail/:bid',component:Detail,name:'detail'},`注意bid就是我们动态传递的路由参数
- 以`http://localhost:8080/#/detail/14`为例

**4、监听路由参数的变化**
- 路由参数通过$route对象获取 
```
{"_custom":{"type":"router",
"abstract":true,
"value":{"path":"/detail/14",
"query":{},
"params":{"bid":14},
"fullPath":"/detail/14",
"name":"detail",
"meta":{}}}}
```
- 通过watch()监听路由变化,根据传递多来的路由参数bid渲染出不同的图书详情信息
```
watch: {
            $route (to,from){
                // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
                console.log(to);
                console.log(from);
                this.dynamicSegment = to.params.id
            }
        }
```
**watch用法详解**
- 1、对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。在实例化时为每个键调用 $watch() ;
- 2、监听的数据后面写成对象形式，包含handler方法和immediate，之前我们写的函数其实就是在写这个handler方法；

- 3、immediate表示在watch中首次绑定的时候，是否执行handler，值为true则表示在watch中声明的时候，就立即执行handler方法，值为false，则和一般使用watch一样，在数据发生变化的时候才执行handler。
- 4、慎用deep:true深度监控对象变化
>deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler。
优化，我们可以是使用字符串形式监听。
```
watch: {
 'obj.a': {
  handler(newName, oldName) {
   console.log('obj.a changed');
  },
  immediate: true,
  // deep: true
 }
}
```
- 5、图书详情页组件数据逻辑实现
```
export default {
        watch:{
          $route(){ //监控路由变化，重新获取数据
            this.getData()
          }
        },
        created(){//页面一加载 需要根据传递过来的bid发送请求,获取书籍的详细信息数据
          this.getData();
        },
        methods:{
          async getData(){//通过路由参数bid找到某一项后赋值给book
            this.book=await findBook(this.bid)
            //如果没有查找到返回对象是空，需要跳转回列表页(void 0代替undefind)
            Object.keys(this.book).length>0? void 0:this.$router.push('/list')
          }
        },
        computed :{
          bid() {
            return this.$route.params.bid
          }
        },
       data(){
          return {book:{}}
       },
       components:{
          Nav
        }
    }
```

## 10、loading功能实现

- 将组件中所有获取数据的方法，放在getAll(）方法中,当数组里所有方法执行完后，返回的是一个promise实例
```
export let getAll= ()=> {
  return axios.all([getSliders(),getHotBook()])
};
```
- 等所有数据获取完成，`this.loading=false`v-if销毁loading

## 11、路由元信息实现页面缓存
### （1）介绍
我们可以通过$route.matched获取到当前路由所有的路由记录，$route.matched[n].meta可以获取其中一个路由记录的meta字段

### （2）给每个路由添加一个自定义的meta对象，在meta对象中可以设置一些状态，来进行一些操作。用它来做登录校验再合适不过了

### （3）使用
- 判断将要跳转的路由是否需要验证登录,为需要
```
let router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    //判断路由记录是否需要验证登录
    if(to.matched.some(current => current.meta.needLogin)){
        //只要记录上需要登录 我们就得验证
        /*
         * 自己封装方法判断登录 sessionstorage localstorage cookie啥的自行决定
         */
         let isLogin = getLoginStatus();//自己定义的判断登录的方法
         if(!isLogin) {
             next({
                 path: '/login', //跳转到登录页
                 query: {
                     redirect: to.fullPath //登录页需要知道从哪跳过来的，方便登录成功后回到原页面
                 }
             });
         } else {
             next();
         }
    } else {
        next();
    }
});
ATT： next一定要执行不然钩子函数不会resolved。
```
- 配合<keep-alive>做状态判断，将需要缓存的组件缓存起来
```
<div id="app">
    <!--需要缓存的-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--正常走下面-->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
//需要缓存的路由对象设置
{path:'/home',component:Home,meta:{keepAlive:true}},
```

## 12、下拉加载功能(按需加载数据)
**模拟接口设计**
- 默认后台每次给5条数据，前端告诉后台现在需要从第几条开始给
- 路径：/page?offset=5
- 后台返回还要告诉前端是否有更多的数据 hasMore:true

**功能介绍**
- 由于页面数据较多，第一次默认请求5条数据，当用户往下滑动距容器底部20px时再请求数据，这样往复请求，实现了按需加载，优化体验

**详细设计**
- 为需要添加滚动事件的dom添加ref属性方便获取`<div class="content" ref="scroll" @scroll="loadMore">`
- 判断何时加载数据
```
let{scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
            if(scrollTop+clientHeight+20>scrollHeight){
              //alert('hello')
              this.getData() //获取更多图书数据
```
- 用定时器模拟滚动只触发一次,修复触发多次问题
```
loadMore(){
          //触发scroll事件，可能触发n次 先进来开一个定时器，下一次触发将上次清除掉
          clearTimeout(this.timer) //防抖
          this.timer=setTimeout(()=>{
            let{scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
            if(scrollTop+clientHeight+20>scrollHeight){
              //alert('hello')
              this.getData() //获取更多图书数据
            }
          },300)
        },
```

## 13、下拉刷新功能、
-  vue中有插件vue-pull-refresh实现下拉加载，下拉刷新功能
-  原生实现
```
mounted(){
        let scroll = this.$refs.scroll;//获取到要拖拽的元素
        let top = scroll.offsetTop;//距最近定位父元素内壁距离35
        let distance =0 ;//拉动距离默认为0
        scroll.addEventListener('touchstart',(e) => {
          //滚动条在最顶端时，并且当前盒子在顶端时候 才继续走
          if (scroll.scrollTop !=0 || scroll.offsetTop != top) return;
          let start = e.touches[0].pageY;//手指点击开发
          let move = e=>{
            let current = e.touches[0].pageY;
             distance = current - start ;//求得拉动距离 负的不要
            if (distance >0){
               if(distance<=50){ //如果大于50了，认为就是50
                 scroll.style.top=distance + top+'px';
                 distance =distance
               }else{
                 distance = 50;
                 scroll.style.top=top+50+'px';
               }
            }else {
              ////如果不在考虑范围内，移除move end 事件
              scroll.removeEventListener('touchmove',move)
              scroll.removeEventListener('touchend',end)
            }
          }
          let end=e=>{
            clearInterval(this.timer1)
            this.timer1=setInterval(()=>{
                if(distance>0){
                  distance -=1;
                  scroll.style.top=distance + top+'px';
                }else{
                  clearInterval(this.timer1)
                  distance=0;
                  scroll.style.top=top+'px';
                  scroll.removeEventListener('touchmove',move)
                  scroll.removeEventListener('touchend',end)
                  //在这里刷新数据 vue中有插件vue-pull-refresh刷新
                  this.offset=0;//清除偏移量
                  this.books=[];
                  this.getData();
                }
            },5)
          };
          scroll.addEventListener('touchmove',move,false)
          scroll.addEventListener('touchend',end,false)
        },false)
      },
```
