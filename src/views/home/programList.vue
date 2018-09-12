<!--首页-需关注项目-->
<template>
  <div class="programListView">
    <header-base-five :title="programListTit+'('+totalData+')'" :queryData="searchData"  @searchPro="getSearParams"></header-base-five>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="programCell" v-for="item in programListArr" :key="item.id">
        <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}">
          <div class="cellTop">
            <el-row>
              <el-col :span="8">
                <div class="cellTopNum">{{item.PROJECT_CODE}}</div>
              </el-col>
              <el-col :span="9"> 
                <div class="cellTopColor">
                 <!-- 1 #ff0000 红，2 #ff9900 橙，3 #ffff00 黄，4 #009900 绿 -->                  
                  <span v-if="item.BASE_COLOR == 0"></span>
                  <span v-if="item.BASE_COLOR == 1" style="background: #ff0000"></span>
                  <span v-if="item.BASE_COLOR == 2" style="background: #ff9900"></span>
                  <span v-if="item.BASE_COLOR == 3" style="background: #ffff00"></span>
                  <span v-if="item.BASE_COLOR == 4" style="background: #009900"></span>{{item.HEALTH_BASE_VALUE}}
                  <span v-if="item.NOW_COLOR == 0"></span>
                  <span v-if="item.NOW_COLOR == 1" style="background: #ff0000"></span>
                  <span v-if="item.NOW_COLOR == 2" style="background: #ff9900"></span>
                  <span v-if="item.NOW_COLOR == 3" style="background: #ffff00"></span>
                  <span v-if="item.NOW_COLOR == 4" st4yle="background: #009900"></span>{{item.HEALTH_CURRENT_VALUE}}

                </div>
              </el-col>
              <el-col :span="7">
                <div class="cellTopState">状态：<span>{{item.PROJECT_STATUS}}</span></div>
              </el-col>
            </el-row>
          </div>
          <div class="cellContent">
            <p>{{item.PROJECT_NAME}}</p>
            <el-row>
              <el-col :span="12"><span class="tit">销售：{{item.SALESMAN_NAME}}</span></el-col>
              <el-col :span="12"><span class="tit">项目经理：{{item.PM_NAME}}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span class="tit">开始时间：{{item.START_DATE}}</span></el-col>
              <el-col :span="12"><span class="tit">结束时间：{{item.END_DATE}}</span></el-col>
            </el-row>
          </div>
        </router-link>
      </div>
      <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBaseFive from '../header/headerBaseFive'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
  name: 'programList',

  components: {
    headerBaseFive,
    loadingtmp
  },

  data () {
    return {
      programListTit: '需关注项目',
      programListArr: [
        /**
         {
           num: 'WVJAH60TSF',
           numone: '90.2',
           numtwo: '90.2',
           state: '执行中',
           title: '2017年河南联通IT设备维保服务公开招标项目',
           sale: '绍振洲',
           proLeader: '绍振洲',
           startTime: '2017-06-01',
           endTime: '2017-06-01'
         }*/
      ],
      // form: {},
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      isSearch: false,
      searchData: {
        industry:[]
      },
      totalData:0
    }
  },
  activated(){
    console.log(this.$route.meta.scrollTop)
    if(!this.$route.meta.isUseCache){
      this.programListArr = [];
      this.loadall= false;
      this.page =1;
      this.busy= false;
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },
  methods: {

    getEventList(){
      var flag = this.page>1;
      var reqParams = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
      if(this.isSearch){
        reqParams.BUSINESS_TYPE = this.searchData["business"]
        reqParams.INDUSTRY_NAME = this.searchData["industry"].join(",")
        reqParams.PROJECT_NAME = this.searchData["proName"]
        reqParams.CUST_NAME = this.searchData["customer"]
        reqParams.PM_NAME = this.searchData["PM"]
        reqParams.SALE_NAME = this.searchData["sale"]
      }
      fetch.get("?action=GetFocusProject",reqParams).then(res=>{
        this.totalData = res.total;
        if(flag){
          this.programListArr = this.programListArr.concat(res.data);
        }else{
          this.programListArr = res.data;
        }
        if(0 == res.data.length){
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
        this.getEventList();
      }, 500);
    },

    // 搜索条件data
    getSearParams (data) {
      this.page = 1
      this.isSearch = true;
      this.programListArr = [];
      this.searchData = data;
      this.busy = true;
      setTimeout(() => {
        this.getEventList();
      }, 500);
    }

  },
  created () {
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'home') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
}
</script>

<style scoped>
  .content{ width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll;}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
