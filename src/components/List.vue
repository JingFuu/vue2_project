<template>
    <div>
      <Nav :back="true">
        <span>列表页</span>
      </Nav>
        <div class="content" ref="scroll" @scroll="loadMore">
          <ul>
            <router-link v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index" tag="li">
              <img :src="book.bookCover" alt="">
              <div class="bookinfo">
                <span class="book-title">{{book.bookName}}</span>
                <span class="book-info">{{book.bookInfo}}</span>
                <span class="book-price">
                   <p>价格：￥{{book.bookPrice}}</p>
                  <button @click.stop="remove(book.bookId)">删除</button>
                </span>
              </div>
            </router-link>
          </ul>
        </div>
    </div>
</template>

<script>
  import Nav from '../base/Nav'
  import {pagination,removeBook} from '../api'
    export default {
      components:{
          Nav
      },
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
      data(){
         return {
           books:[],
           offset:0, //请求偏移量 0-5条数据
           hasMore:true,//判断是否还有更多的数据，为false就不发请求
           isLoading:false,//默认没有正在加载,点击开始加载
         }
      },
      created(){
        this.getData();
      },
      methods:{
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
        async getData(){ //获取全部图书数据函数
          if(this.hasMore ===true&&!this.isLoading){
            this.isLoading=true;
            let {hasMore,books}=await pagination(this.offset);
            this.books=[...this.books,...books] //当前已经获取到的书本数
            this.hasMore=hasMore
            this.offset=this.books.length;//从当前获取到的书本数开始偏移
            this.isLoading=false;//当前请求加载完毕
          }
        },
        async remove(id){//根据传过来的id删除书籍
          await removeBook(id);
          //要删除前台数据
          this.books = this.books.filter(item => item.bookId !== id)
        },
      }
    }
</script>

<style scoped lang="less">
  .content{
    ul{
      line-height: 20px;
      color: black;
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      li{
        border-bottom: 1px solid #cccccc;
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
          .book-title{
            font-size: 17px;
            font-weight: bold;
          }
          .book-price{
            width: 100%;
            display: flex;
            justify-content: space-around;
            font-size: 16px;
            color: red;
            button{
              background-color: red;
              color: #fff;
              border-radius: 10px;
              width: 45px;
            }
          }
        }
      }
    }
  }
</style>
