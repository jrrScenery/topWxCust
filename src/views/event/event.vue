<!--工作台-所有事件-->
<template>
  <div class="workBenchMyEventView">
    <header-event :title="caseListTit" :queryData="searchData" @searchPro="getSearParams"></header-event>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="(item) in opinionTab">
          <el-tab-pane :label="item.label+'('+totalData[item.numname]+')'" :name="item.name" :key="item.id">
            <div style="overflow:auto">
            <div class="eventCell" v-for="info in item.caseListArr" :key="info.CASE_ID">
              <router-link :to="{name:'casedetail',query:{caseId:info.CASE_ID,projectId:info.PROJECT_ID,ifClose:info.IF_CLOSE,ifEvaluate:info.IF_EVALUATE}}">
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
                  <el-col :span="12"><span class="tit">设备名：</span><span>{{info.DEVICE}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">SN：</span><span>{{info.SN}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><span class="tit">故障说明：</span><span>{{info.PROBLEM_DETAIL}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="1"><span class="tit" style="display: inline-block; width: 0.08rem; height: 0.08rem; border-radius: 50%;background: #ff0000;margin-right:0.05rem"></span></el-col>
                  <el-col :span="23"><span class="tit">当前状态：</span><span>{{info.DEAL_STATUS_NAME}}</span></el-col>
                </el-row>
              </div>
              </router-link>
            </div>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerEvent from '../header/headerEvent'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'event',

  components: {
    headerEvent,
    loadingtmp
  },

  data () {
    return {
      caseListTit: '我的事件',
      opinionTab: [
        {
          name: 'first',
          label: '执行中',
          caseListArr: [],
          numname:"unCloseNum"
        },
        {
          name: 'second',
          label: '待评价',
          caseListArr: [],
          numname:"unevaluateNum"
        },
        {
          name: 'third',
          label: '已评价',
          caseListArr: [],
          numname:"evaluateNum"
        },
        {
          name: 'forth',
          label: '全部',
          caseListArr: [],
          numname:"allNum"
        }
      ],
      activeName: this.$route.query.isSearch?"forth":'first',
      searchpage:1,
      isSearch:this.$route.query.isSearch,
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      tab_box: 1,
      searchData:{
        custid:  this.$route.query.custid,
        type:this.$route.query.type? this.$route.query.type.split(','):[],
        startTime: this.$route.query.startDate,
        endTime: this.$route.query.endDate,
      },
      objpages:{"first":{page:1,loadall:false, IF_CLOSE:'N',IF_EVALUATE:'',idx:0,isSearch:0},"second":{page:1,loadall:false,IF_CLOSE:'Y',IF_EVALUATE:'N',idx:1,isSearch:0},
      "third":{page:1,loadall:false,IF_CLOSE:'Y',IF_EVALUATE:'Y',idx:2,isSearch:0},
      "forth":{page:1,loadall:false,IF_CLOSE:'',IF_EVALUATE:'',idx:3,isSearch:0}},
      totalData:{"unCloseNum":0,"unevaluateNum":0,"evaluateNum":0,"allNum":0}
    }
  },
  created () {
    
  },
  activated(){
    console.log(this.$route.meta.isUseCache)
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;
      this.isSearch = 0;
      this.objpages["first"]["page"] = 1;
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].caseListArr = [];
      this.objpages["second"]["page"] = 1;
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].caseListArr = [];
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.opinionTab[2].caseListArr = [];
      this.objpages["forth"]["page"] = 1;
      this.objpages["forth"]["loadall"]= false;
      this.opinionTab[3].caseListArr = [];
      this.searchData={
        custid:  this.$route.query.custid,
        type:this.$route.query.type? this.$route.query.type.split(','):[],
        startTime: this.$route.query.startDate,
        endTime: this.$route.query.endDate,
      },
      console.log("searchData",this.searchData)
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
        objnowpage.caseListArr= []
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
      let strurl = "?action=GetCaseList";
      let params = {PAGE_NUM: objnowpage.page, PAGE_TOTAL: this.pageSize, IF_CLOSE: objnowpage.IF_CLOSE,IF_EVALUATE:objnowpage.IF_EVALUATE}
      if(this.isSearch){
        if(this.searchData.custid){params.CUST_ID = this.searchData.custid;}
        params.CASE_TYPEID = this.searchData["type"].join(",");
        params.PROJECT_NAME = this.searchData.proName;
        params.CASE_NO = this.searchData.eventNum;
        params.KEYWORD = this.searchData.keyWord;
        params.CREATE_DATE_BEGIN = this.searchData.startTime;
        params.CREATE_DATE_END = this.searchData.endTime;
      }
      console.log(params);
      fetch.get(strurl,params).then(res => {
        console.log("11111");
          console.log("res:",res);
        if('0'== res.STATUSCODE){
          
          let obj = this.opinionTab[objnowpage.idx].caseListArr;
          this.opinionTab[objnowpage.idx].caseListArr = this.returnList(flag, res, obj)
          this.totalData= res.totalData;         
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
      this.activeName="forth";
      this.objpages["forth"]["page"] = 1;
      this.objpages["forth"]["loadall"]= false;
      this.opinionTab[3].caseListArr = [];
      this.loadall = false;
      this.objpages["forth"]["isSearch"] = 1;
      this.isSearch=1;
      this.searchData = searchData;
      this.loadMore();

      this.objpages["first"]["isSearch"]=0
      this.objpages["first"]["loadall"]=false
      this.opinionTab[0].caseListArr = [];

      this.objpages["second"]["isSearch"]=0
      this.objpages["second"]["loadall"]=false
      this.opinionTab[1].caseListArr = [];

      this.objpages["third"]["isSearch"]=0
      this.objpages["third"]["loadall"]=false
      this.opinionTab[2].caseListArr = [];
    }
  },
  //在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    if (to.name == 'casedetail') {
      this.scrollTop = document.querySelector('.content').scrollTop;
      console.log("scrollTop:",this.scrollTop)
    }   
    if (to.name == 'home') {
        to.meta.isUseCache = true;    
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
  },
}
</script>

<style scoped>
  .workBenchMyEventView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0.45rem;overflow: scroll;}
  .content >>> .el-tabs{ }
  .content >>> .el-tabs__header{margin-bottom: 0.45rem; background: #ffffff}
  .content >>> .el-tabs__nav{width: 100%;position: fixed;background:#ffffff; top: 0.45rem;}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 25%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.13rem; color: #2698d6;}
  /* .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;} */
  .eventCell .cellTop .cellTopNum span{font-size: 0.13rem;display: inline-block;  height: 0.19rem; vertical-align: text-top; margin-left: 0.05rem;  text-align: center; line-height: 0.2rem; color: #666;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;font-size: 0.13rem}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;font-size: 0.13rem}
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
