<!--我的-通知-->
<template>
  <div class="mineNoticeView">
    <header-base-six :title="mineNoticeTit" @searchNotice="getSearParams"></header-base-six>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in mineNoticeTab">
          <el-tab-pane :label="item.label+'('+totalData[item.numname]+')'" :name="item.name" :key="item.id">
            <div style="overflow:auto">             
              <ul>
                <li v-for="info in item.eventListArr" :key="info.id" v-if="info.TOPAPP_LINK!=null">
                  <div class="div_Img">
                    <img src="../../assets/images/mineNotice_ring.png" alt="">
                    <p>{{info.SEND_NAME}}</p>
                  </div>
                  <router-link :to="{name:'serviceRate',query:{}}"  class="article">
                      <div class="title"><span class="tit_l">{{info.BIZ_NAME}}</span><span class="tit_r">{{info.CREATE_ON}}</span></div>
                      <div class="desc">{{info.TITLE}}</div>
                  </router-link>
                </li>
                <li v-for="info in item.eventListArr" :key="info.id" v-if="info.TOPAPP_LINK==null">
                  <div class="div_Img">
                    <img src="../../assets/images/mineNotice_ring.png" alt="">
                    <!--<img src="../../assets/images/mineNotice_ring1.png" alt="">-->
                    <p>{{info.SEND_NAME}}</p>
                  </div>
                  <div class="article">
                    <div class="title"><span class="tit_l">{{info.BIZ_NAME}}</span><span class="tit_r">{{info.CREATE_ON}}</span></div>
                    <div class="desc">{{info.TITLE}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>

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
      mineNoticeTit: '通知与待办',
      mineNoticeTab: [
        {
          name: 'first',
          label: '通知',
          eventListArr: [],
          numname:"noticeNum"
        },
        {
          name: 'second',
          label: '待办',
          eventListArr: [],
          numname:"todoNum"
        },
        {
          name: 'third',
          label: '全部',
          eventListArr: [],
          numname:"allNum"
        }
      ],
      // eventListArr: [
      // ],
      activeName: 'first',
      searchpage: 1,
      isSearch:0,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      formData: [],
      objpages:{"first":{page:1,loadall:false,idx:0,isSearch:0},"second":{page:1,loadall:false,idx:1,isSearch:0},
      "third":{page:1,loadall:false,idx:2,isSearch:0}},
      totalData:{"noticeNum":0,"todoNum":0,"allNum":0}
    }
  },
  activated(){ 
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;

      this.objpages["first"]["page"] = 1;
      this.objpages["first"]["loadall"]=false
      this.mineNoticeTab[0].eventListArr = [];

      this.objpages["second"]["loadall"]=false
      this.mineNoticeTab[1].eventListArr = [];

      this.objpages["third"]["loadall"]= false;
      this.mineNoticeTab[2].eventListArr = [];

      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },

  methods: {
    tabClick (e) {
      var objnowpage = this.objpages[this.activeName];
      if(this.isSearch != objnowpage.isSearch ){
        objnowpage.page= 1
        objnowpage.loadall = false
        objnowpage.eventListArr= []
        objnowpage.isSearch = this.isSearch;
        this.loadMore();
        return ;
      }
      if(objnowpage.page==1 && !objnowpage.loadall){
        this.loadMore();
      }
    },
    returnList (flag, res, obj,idx) {
      if(flag){ 
        if(idx==0){
          var noticeObj = [];
          var m=0;
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].TOPAPP_LINK!=null){
              noticeObj[m++] = res.data[i];
            }
          }
          obj = obj.concat(noticeObj);
        }else if(idx==1){
          var noticeObj = [];
          var m=0;
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].TOPAPP_LINK==null){
              noticeObj[m++] = res.data[i];
            }
          }
          obj = obj.concat(noticeObj);
        }else{
          obj = obj.concat(res.data);
        }
      }else{
        // obj = res.data;
        if(idx==0){
          var noticeObj = [];
          var m=0;
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].TOPAPP_LINK!=null){
              noticeObj[m++] = res.data[i];
            }
          }
          obj = noticeObj;
        }else if(idx==1){
          var noticeObj = [];
          var m=0;
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].TOPAPP_LINK==null){
              noticeObj[m++] = res.data[i];
            }
          }
          obj = noticeObj;
        }else{
          obj = res.data;
        }
      }
      if(0 == res.data.length||res.data.length<this.pageSize){
        this.busy = false;
        this.loadall = true;
        this.objpages[this.activeName]["loadall"] =true;
      }
      else{
        this.busy = false;
        this.objpages[this.activeName]["page"]++
      }
      return obj
    },
    
    getEventList(){
      var flag = this.objpages[this.activeName]["page"]>1;
      let objnowpage = this.objpages[this.activeName];   
      let url = "?action=/system/GetTaskMessage&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      let urlparam={};
      if(this.formData){
        urlparam.TITLE = this.formData.title;
        urlparam.SEND_NAME = this.formData.sendName
      }
      fetch.get(url,urlparam).then(res=>{
        console.log("res:",res)
        // this.totalData= res.totalData;
        let obj = this.mineNoticeTab[objnowpage.idx].eventListArr;
        this.mineNoticeTab[objnowpage.idx].eventListArr = this.returnList(flag, res, obj,objnowpage.idx)
        console.log();
      });
    },
    loadMore(){
      if(this.busy || this.objpages[this.activeName]["loadall"])return false;
      this.busy = true;
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    getSearParams (formData) {
      this.activeName="third";
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.loadall = false;
      this.mineNoticeTab[2].eventListArr = [];
      this.objpages["third"]["isSearch"] = 1;
      this.isSearch=1;
      this.searchData = searchData;
      
      this.loadMore();

      this.objpages["first"]["isSearch"]=0
      this.objpages["first"]["loadall"]=false
      this.mineNoticeTab[0].eventListArr = [];

      this.objpages["second"]["isSearch"]=0
      this.objpages["second"]["loadall"]=false
      this.mineNoticeTab[1].eventListArr = [];
    }
  },
}
</script>

<style scoped>
  .mineNoticeView{ width: 100%; height: 100%;}
  .content{width: 100%;  background: #ffffff; color: #999999;overflow-y: scroll; position: absolute; left: 0; top: 0.5rem; bottom: 0; overflow-x: hidden;}
  .mineNoticeView >>> .el-tabs__header{margin-bottom: 0.46rem; background: #ffffff;}
  .content >>> .el-tabs__nav{width: 100%;position: fixed;background:#fff;top: 0.45rem;}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
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
