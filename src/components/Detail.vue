<template>
    <div class="detail">
        <Nav :back="true">
          <span>详情页</span>
        </Nav>
        <div class="content">
          <ul>
            <div>
              <img :src="book.bookCover" >
            </div>
            <li>
              <label for="bookName">书的名称 </label>
              <input type="text" v-model="book.bookName" id="bookName">
            </li>
            <li>
              <label for="bookInfo">书的简介 </label>
              <input type="text" v-model="book.bookInfo" id="bookInfo">

            <li>
              <label for="bookPrice">书的价格 </label>
              <input type="text" v-model="book.bookPrice" id="bookPrice">
            </li>
            <div id="book_queding" @click="update">
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
    import {findBook,updateBook} from "../api";

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
          async update(){  //点击调用此方法修改图书信息
            await updateBook(this.bid,this.book);
            this.$router.push('/list')//修改完成后挑战页面
          },
          async getData(){//通过路由参数bid找到某一项后赋值给book
            this.book=await findBook(this.bid)
            //如果没有查找到返回对象是空，需要跳转回列表页
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
</script>
<style scoped lang="less">
  .detail{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
    z-index: 99;
  }
  ul{
    margin: 50px 10px 0px 10px;
    height: 90%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
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
