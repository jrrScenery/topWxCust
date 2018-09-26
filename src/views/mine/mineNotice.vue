<!--我的-通知-->
<template>
  <div class="mineNoticeView">
    <header-base-six :title="mineNoticeTit" @searchNotice="searchNotice"></header-base-six>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul>
        <li v-for="item in eventListArr" :key="item.id">
          <div class="div_Img">
            <img src="../../assets/images/mineNotice_ring.png" alt="">
            <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
            <p>{{item.SEND_NAME}}</p>
          </div>
          <div class="article">
            <div class="title"><span class="tit_l">{{item.BIZ_NAME}}</span><span class="tit_r">{{item.CREATE_ON}}</span></div>
            <div class="desc">{{item.TITLE}}</div>
          </div>
        </li>
      </ul>

      <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>

    </div>
  </div>
</template>

<script>
import headerBaseSix from '../header/headerBaseSix'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
export default {
  name: 'mineNotice',
  components: {
    headerBaseSix,
    loadingtmp
  },

  data () {
    return {
      mineNoticeTit: '通知',
      eventListArr: [
      ],
      serchPage: '',
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      formData: []
    }
  },

  methods: {
    getEventList(flag){
      let url = "?action=/system/GetTaskMessage&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      fetch.get(url,"").then(res=>{
        console.log(res);
        if(flag){
            this.eventListArr = this.eventListArr.concat(res.data);
        }else{
            this.eventListArr = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }

      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        if ( this.serchPage == 1) {
          this.searchNoticeIn(this.formData)
        } else {
          this.getEventList(this.page>1);
        }
      }, 500);
    },

    searchNotice (formData) {
      this.page = 1;
      this.eventListArr = []
      this.searchNoticeIn(formData);
    },

    // 搜索条件data
    searchNoticeIn (formData) {
      this.formData = formData
      console.log(this.formData)
      this.loadall = false
      this.serchPage = 1
      let notice = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TITLE: this.formData.title,SEND_NAME: this.formData.sendName};
      fetch.get("?action=GetTaskMessage",notice).then(res=>{
        console.log(res)
        if(this.page > 1){
          this.eventListArr = this.eventListArr.concat(res.data);
        }else{
          this.eventListArr = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }
      })
    }
  },
  created () {

  }
}
</script>

<style scoped>
  .mineNoticeView{ width: 100%; height: 100%;}
  .content{width: 100%;  background: #ffffff; color: #999999;overflow-y: scroll; position: absolute; left: 0; top: 0.5rem; bottom: 0; overflow-x: hidden;}
  .content ul{padding: 0 0.2rem;}
  .content ul li{display: flex; padding: 0.07rem 0; border-bottom: 0.01rem solid #e6e6e6;}
  .content ul li .div_Img{padding: 0.05rem 0; width: 0.4rem; margin-right: 0.15rem; text-align: center}
  .content ul li img{width: 0.4rem; height: 0.4rem;}
  .content ul li .article{width: calc(100% - 0.55rem);}
  .content ul li .article .title{line-height: 0.3rem; display: flex; justify-content: space-between}
  .content ul li .article .title .tit_l{font-size: 0.15rem; color: #191919; width: calc(100% - 1.27rem); overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .content ul li .article .title .tit_r{font-size: 0.12rem; width: 1.27rem; vertical-align: top; text-align: right}
  .content ul li .article .desc{line-height: 0.2rem;}
</style>
