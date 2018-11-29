<template>
    <div>
      <Nav><span>首页</span></Nav>
      <div class="content">
          <Loading v-if="loading"></Loading>
          <template v-else>
                <Swiper :swiperSlides="sliders"></Swiper>
                <div class="container">
                  <span class="item_title">热门图书</span>
                  <ul>
                    <li v-for="hot in hotBooks">
                      <img :src="hot.bookCover" alt="">
                      <div class="bookinfo">
                        <span class="book-title">{{hot.bookName}}</span>
                        <span class="book_info_item">{{hot.bookInfo}}</span>
                        <span class="book-price">价格：￥{{hot.bookPrice}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
          </template>
      </div>
    </div>
</template>

<script>
  import Nav from '../base/Nav' //导入Nav组件并使用
  import Swiper from '../base/Swiper'
  import {getAll} from "../api";
  import Loading from '../base/Loading'
  export default {
        name: "Home",
         created(){          //用getAll()代替
        //   this.getSlider();//获取轮播图数据
        //   this.getHot();//获取热门图书数据
           this.getData();
         },
         data (){
          return {
            sliders:[],
            hotBooks:[],
            loading:true
          }
        },
        components:{
          Nav,
          Swiper,
          Loading
      },
        methods :{
          async getData(){
            let [sliders,hotBooks]=await getAll();//[sliders,books]
            this.sliders=sliders;
            this.hotBooks=hotBooks;
            //轮播图和热门图书数据获取完成
            this.loading=false;
          }
        }
    }
</script>

<style scoped lang="less">
  .container{
    color: black;
    width: 90%;
    margin: 0 auto;
    span.item_title{
      font-weight: bold;
      font-size: 18px;
      display: block;
      margin-top: 13px
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        display: flex;
        padding: 10px 0;
        justify-content: space-around;
        width:100% ;
        img{
          width: 40%;
          height: 100%;
        };
        .bookinfo{
          display: flex;
          flex-direction:column;
          justify-content: space-around;
          align-items: center;
          .book_info_item{
            font-size: 15px;
            line-height: 20px;
          }
          .book-title{
            font-size: 18px;
            font-weight: bold;
          }
          .book-price{
            color: red;
          }
        }
      }
    }
  }
</style>
