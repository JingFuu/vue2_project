<template>
   <div>
     <Nav :back="true">
       <span>添加页</span>
     </Nav>
     <div class="content">
       <ul>
          <span>添加书籍</span>
         <div>
           <img :src="book.bookCover" >
         </div>
         <li>
           <label for="bookName">书的名称 </label>
           <input type="text" v-model="book.bookName" id="bookName">
         </li>
         <li>
           <label for="bookCover">书的封面 </label>
           <input type="text" v-model="book.bookCover" id="bookCover">
         </li>
         <li>
           <label for="bookInfo">书的简介 </label>
           <input type="text" v-model="book.bookInfo" id="bookInfo">

         <li>
           <label for="bookPrice">书的价格 </label>
           <input type="text" v-model="book.bookPrice" id="bookPrice">
         </li>
         <div id="book_queding" @click="add">
           <svg class="icon" aria-hidden="true" >
             <use xlink:href="#icon-queding-hover"></use>
           </svg>
         </div>
       </ul>
     </div>
   </div>
</template>

<script>
  import Nav from '../base/Nav'
  import {addBook} from "../api";

  export default {
        name: "Add",
      components:{
          Nav
      },
      data(){
          return {book:{}}
      },
    methods:{
      async add(){
        await addBook(this.book)
        this.$router.push('./list')//跳回列表页
      }
    }
    }
</script>

<style scoped lang="less">
  ul{
    height: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    span{
      font-size: 20px;
    }
    li{
      font-size: 18px;
      height: 30px;
      line-height: 30px;
      input{
        border: 1px solid #2637E0;
        overflow: auto;
      }
    }
    #book_queding{
      font-size: 22px;
    }
  }
</style>
