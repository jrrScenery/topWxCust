<!--工作台-我的事件-->
<template>
  <div class="workBenchMyEventView">
    <header-my-event :title="workBenchMyEventTit" :queryData="searchData" @searchPro="getSearParams"></header-my-event>
    <div style="height: 0.45rem;"></div> 
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in opinionTab">
          <el-tab-pane :label="item.label+'('+totalData[item.numname]+')'" :name="item.name" :key="item.id">
            <div class="eventCell" v-for="info in item.eventListArr" :key="info.id">
              <router-link :to="{name:'eventShow',query: {caseId:info.CASE_ID}}">
              <div class="cellTop">
                <el-row>
                  <el-col :span="1">
                    <span class="spheathcolor" :class="'spheathcolor'+info.CASE_HEALTH" ></span>
                  </el-col>
                  <el-col :span="12">
                    <div class="cellTopNum">
                      {{info.CASE_NO}}
                      <span class="speventlevel" :class="'speventlevelcolor'" >{{info.CASE_LEVEL}}</span>
                    </div>
                  </el-col>
                  
                  <el-col :span="11">
                    <div class="cellTopTime"><span>{{info.CREATE_DATE}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <el-row>
                  <el-col :span="12"><span class="tit">状态：</span><span>{{info.DEAL_STATUS_NAME}}</span></el-col>
                  <el-col :span="12"><span class="tit">类型：</span><span>{{info.CASE_TYPE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">厂商：</span><span>{{info.FACTORY}}</span></el-col>
                  <el-col :span="12"><span class="tit">型号：</span><span>{{info.DEVICE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">序列号：</span><span>{{info.SN}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">说明：</span><span>{{info.PROBLEM_DETAIL}}</span></el-col>
                </el-row>
              </div>
              </router-link>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerMyEvent from '../header/headerMyEvent'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'workBenchMyEvent',

  components: {
    headerMyEvent,
    loadingtmp,
    footerHome
  },

  data () {
    return {
      workBenchMyEventTit: '我的事件',
      opinionTab: [
        {
          name: 'first',
          label: '执行中',
          eventListArr: [],
          numname:"unCloseNum"
        },
        {
          name: 'second',
          label: '已评价',
          eventListArr: [],
          numname:"evaluateNum"
        },
        {
          name: 'third',
          label: '待评价',
          eventListArr: [],
          numname:"unevaluateNum"
        },
        {
          name: 'forth',
          label: '全部',
          eventListArr: [],
          numname:"allNum"
        }
      ],
      activeName: 'first',
      searchpage:1,
      isSearch:0,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 1,
      searchData:{
        industry:[],
        type:[]
      },
      objpages:{"first":{page:1,loadall:false, IF_CLOSE:'N',idx:0,isSearch:0},"second":{page:1,loadall:false,IF_CLOSE:'Y',idx:1,isSearch:0},
      "third":{page:1,loadall:false,IF_CLOSE:'',idx:2,isSearch:0}},
      totalData:{"unCloseNum":0,"evaluateNum":0,"unevaluateNum":0,"allNum":0}
    }
  },
  created () {
    
  },
  activated(){ 
    this.searchData={
      customer:'',
      endTime:'',
      eventNum:'',
      industry:[],
      keyWord:'',
      PM:'',
      proName:'',
      sale:'',
      startTime:'',
      type:this.$route.query.type? this.$route.query.type.split(','):["1","2"],
    }
    this.isSearch = 0;
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;
      this.objpages["first"]["page"] = 1;
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].eventListArr = [];
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].eventListArr = [];
      this.objpages["third"]["loadall"]= false;
      this.opinionTab[2].eventListArr = [];
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },
  methods: {
    tabClick (e) {
      console.log("tabclick");
      var objnowpage = this.objpages[this.activeName];
      this.loadall= objnowpage.loadall;
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
    returnList (flag, res, obj) {
      if(flag){
        obj = obj.concat(res.data);
      }else{
        obj = res.data;
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
      let strurl = "?action=GetCaseList&TYPE=my";
      let params = {PAGE_NUM: objnowpage.page, PAGE_TOTAL: this.pageSize, IF_CLOSE: objnowpage.IF_CLOSE}

      if(this.isSearch){
        params.INDUSTRY_NAME = this.searchData.industry.join(",");
        params.CASE_TYPE = this.searchData["type"].join(",");
        params.CUSTOMER_NAME = this.searchData.customer;
        params.PROJECT_NAME = this.searchData.proName;
        params.PM_NAME = this.searchData.PM;
        params.CASE_NO = this.searchData.eventNum;
        params.KEYWORD = this.searchData.keyWord;
        params.SALE_NAME = this.searchData.sale;
        params.START_TIME = this.searchData.startTime;
        params.END_TIME = this.searchData.endTime;
      }
      console.log("SSS_params", params);
      fetch.get(strurl,params).then(res => {
        console.log(res);
        if('0'== res.STATUSCODE){
          let obj = this.opinionTab[objnowpage.idx].eventListArr;
          this.opinionTab[objnowpage.idx].eventListArr = this.returnList(flag, res, obj)
          this.totalData= res.totalData;
          console.log(this.totalData)          
        }
        else{

        }
      });
      
      
    },

    loadMore(){
      if(this.busy || this.objpages[this.activeName]["loadall"])return false;
      this.busy = true;
      
      console.log("loadMore");
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    getSearParams (searchData) {
      console.log(searchData);
      this.activeName="third";
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.opinionTab[2].eventListArr = [];
      this.loadall = false;
      this.objpages["third"]["isSearch"] = 1;
      this.isSearch=1;
      this.searchData = searchData;
      this.loadMore();

      this.objpages["first"]["isSearch"]=0
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].eventListArr = [];

      this.objpages["second"]["isSearch"]=0
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].eventListArr = [];
    }
  },
  //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    if (to.name == 'eventShow') {
      this.scrollTop = document.querySelector('.content').scrollTop;
    }   
    next();
  },
  //进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter (to, from, next) {
    console.log("next:",next);
    next(vm => {
      console.log("vmvmvm",vm.scrollTop);
      document.querySelector('.content').scrollTop = vm.scrollTop
    })
  }
}
</script>

<style scoped>
  .workBenchMyEventView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;}
  .content >>> .el-tabs__header{margin: 0; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 25%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .eventCell{padding: 0 0.18rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.3rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.13rem; color: #2698d6;}
  /* .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;} */
  .eventCell .cellTop .cellTopNum span{display: inline-block;font-size: 0.13rem;  height: 0.19rem; vertical-align: text-top; margin-left: 0.03rem;  text-align: center; line-height: 0.2rem; color: #666;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;font-size: 0.13rem;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;font-size: 0.13rem;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .speventlevel{}
  .speventlevelcolor1{ background:#ff0000; }
  .speventlevelcolor2{ background:#ff0000; }
  .speventlevelcolor3{ background:#ff9900; }
  .speventlevelcolor4{ background:#ffff00; }
  .speventlevelcolor5{ background:#1ca2a5; }

  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .spheathcolor1{background: #009900;}
  .spheathcolor2{background: #ffff00;}
  .spheathcolor3{background: #ff9900;}
  .spheathcolor4{background: #ff0000;}
</style>
