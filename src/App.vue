<template>
  <div id="app">
    <!--需要缓存的-->
    <!--为组件添加动画效果-->
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!--正常走下面-->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
      <Tab></Tab>
  </div>
</template>
<script>
  import Tab from './base/Tab'
export default {
  name: 'App',
  components:{
    Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#086ED6;
}
  .content{
    position: fixed;
    width: 100%;
    top: 35px;
    bottom: 51px;
    overflow: auto;
  }
  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.2s linear;
  }
  .fadeIn-leave-active{
    transition: all 0.2s linear;
    opacity: 0;
  }
</style>
