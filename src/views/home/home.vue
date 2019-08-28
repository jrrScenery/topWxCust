<!--首页-->
<template>
  <div class="homeView">

    <div class="swiper">
      <el-carousel arrow="always" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in imgObj" :key="item.id">
          <img :src="item.imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="text-align:center;margin-top:0.1rem" v-for="items in workBenchObj" :key="items.id" >
      <div v-if="items.arr.length!=0">
        <ul class="ul_workBench" >
            <template v-for="item in items.arr">
              <li class="li_workBench" :key="item.id">
                <router-link :to="{name:item.href,params:item.params}" >
                  <img  :src="item.imgSrc" alt="">
                </router-link>
                <span>{{item.text}}</span>
              </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'index',

  components: {
  },

  data () {
    return { 
      imgObj: [
        {imgSrc: require('@/assets/images/swiper_1.jpg')},
        {imgSrc: require('@/assets/images/swiper_2.jpg')},
        {imgSrc: require('@/assets/images/swiper_3.jpg')},
        {imgSrc: require('@/assets/images/swiper_4.jpg')},
        {imgSrc: require('@/assets/images/swiper_5.jpg')}
      ],
      workBenchObj: [
        {arr: [{imgSrc: require('@/assets/images/my_1.png'), text: '一键报修', href: 'onceRepaire'},{imgSrc: require('@/assets/images/my_2.png'), text: '我的项目', href: 'programList'},{imgSrc: require('@/assets/images/my_3.png'), text: '报表统计', href: 'report'}]},
        {arr: [{imgSrc: require('@/assets/images/my_4.png'), text: '项目日历', href: 'projectCalendar'},{imgSrc: require('@/assets/images/my_5.png'), text: '产品中心', href: 'serviceProduct'}]}//,{imgSrc: require('@/assets/images/my_5.png'), text: '客户评价', href: 'homeRate'}
      ]
    }
  },

  methods:{

  },
  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }　
  },
  mounted:function(){
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .homeView{width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  .swiper img{width: 100%; height: 100%}
  .homeView .ul_workBench{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;font-size: 0.15rem}
  .homeView .ul_workBench:first-child .li_workBench:first-child span{width: 110%; margin-left: -5%;}
  .homeView .ul_workBench .li_workBench{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 33%; height: 0.55rem; text-align: center;}
  .homeView .ul_workBench .li_workBench:nth-child(n+5){margin-top: 0.15rem;}
  .ul_workBench img{ width: 0.3rem; height: 0.3rem; margin: auto;}
</style>

