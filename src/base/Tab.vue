<template>
    <div id="tab">
      <router-link to="/home">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan"></use>
        </svg>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
        <span>列表</span>
      </router-link>
      <router-link to="/collect">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <span>收藏</span>
      </router-link>
      <router-link to="/add">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
        <span>添加</span>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "Tab"
    }
</script>

<style scoped lang="less">
  #tab{
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid  #9EBCDF;
    align-items: center;
    flex:1;
    a{
        display: flex;
        flex-direction:column;
        justify-content: center;
        color:#086ED6;
      span{
        margin-top: 4px;
      }
    }
  }
</style>
