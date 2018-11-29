<template>
    <div class="load">
      <img src="../assets/loading.gif" alt="">
    </div>
</template>

<script>
    export default {
        name: "loading",

    }
</script>

<style scoped>
   .load{
     display: flex;
     justify-content: center;//主轴居中并平分
     align-items: center;
     position: absolute;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
   }
  .load img{
    margin-top: 50%;
    width: 50px;
    height: 50px;

  }
</style>
