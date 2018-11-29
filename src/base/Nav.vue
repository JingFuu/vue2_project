<template>
    <div id="nav">
          <slot></slot>
      <svg class="icon" aria-hidden="true" v-if="back" @click="goBack">
        <use xlink:href="#icon-fanhui2"></use>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        props:{
          back:{ //动态绑定back值决定返回按钮是否显示
            type:Boolean,
            default:false
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1);//回退一个路由
          }
        }
    }
</script>

<style scoped lang="less">
  #nav{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    background-color:  #9EBCDF;
    height: 35px;
    line-height: 35px;
    .icon{
      position: absolute;
      left: 10px;
      top:3px;
    }
    span{
      font-size: 18px;
      color: #086ED6;
      font-weight: bold;
    }
  }

</style>
