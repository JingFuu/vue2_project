<template>
      <swiper :options="swiperOption" v-if="swiperSlides.length>1">
        <swiper-slide v-for="(slide,key) in swiperSlides" :key="key">
          <img :src="slide"  >
        </swiper-slide >
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
</template>
<script>
  export default {
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          loop: true,
          slidesPerView: 'auto',
          loopedSlides: 8,
          autoplay:true,
          effect : 'fade',
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>
<style scoped lang="less">
  img{
    width: 100%;
  }
</style>
