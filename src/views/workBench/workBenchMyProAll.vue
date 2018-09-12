<!--工作台-所有项目-->
<template>
  <div class="workBenchMyProView">
    <header-base-five :title="workBenchMyProTit"  :queryData="searchData"  @searchPro="getSearParams"></header-base-five>
    <!-- <div style="height: 0.45rem;"></div> -->
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <template v-for="item in workBenchMyProTab">
          <el-tab-pane :label="item.label+'('+totalData[item.numname]+')'" :name="item.name" :key="item.id">
            
            <div style="overflow:auto">
            <div class="programCell" v-for="info in item.programListArr" :key="info.id">
              <router-link :to="{name:'programShow',query:{projectId:info.PROJECT_ID}}">
              <div class="cellTop">
                <el-row>
                  <el-col :span="9">
                    <div class="cellTopNum">{{info.PROJECT_CODE}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="cellTopColor">
                      <span v-if="info.BASE_COLOR == 0"></span>
                      <span v-if="info.BASE_COLOR == 1" style="background: #ff0000"></span>
                      <span v-if="info.BASE_COLOR == 2" style="background: #ffff00"></span>
                      <span v-if="info.BASE_COLOR == 3" style="background: #009900"></span>{{info.HEALTH_BASE_VALUE}}
                      <span v-if="info.NOW_COLOR == 0"></span>
                      <span v-if="info.NOW_COLOR == 1" style="background: #ff0000"></span>
                      <span v-if="info.NOW_COLOR == 2" style="background: #ffff00"></span>
                      <span v-if="info.NOW_COLOR == 3" style="background: #009900"></span>{{info.HEALTH_CURRENT_VALUE}}
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <div class="cellTopState" v-if="info.PROJECT_STATUS">状态：<span>{{info.PROJECT_STATUS}}</span></div>
                  </el-col>
                </el-row>
              </div>
              <div class="cellContent">
                <p>{{info.PROJECT_NAME}}</p>
                <el-row>
                  <el-col :span="12"><span class="tit">销售：{{info.SALESMAN_NAME}}</span></el-col>
                  <el-col :span="12"><span class="tit">项目经理：{{info.PM_REALNAME}}</span></el-col>
                </el-row>
                <el-row>
                  <el-col :span="12"><span class="tit">开始时间：{{info.START_DATE}}</span></el-col>
                  <el-col :span="12"><span class="tit">结束时间：{{info.END_DATE}}</span></el-col>
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
import headerBaseFive from '../header/headerBaseFive'
import loadingtmp from '@/components/load/loading'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchMyProAll',
  components: {
    headerBaseFive,
    loadingtmp
  },

  data () {
    return {
      workBenchMyProTit: '所有项目',
      workBenchMyProTab: [
        {
          name: 'first',
          label: '执行中',
          programListArr: [],
          numname:"execNum"
        },
        {
          name: 'second',
          label: '已过保',
          programListArr: [],
          numname:"closeNum"
        },
        {
          name: 'third',
          label: '全部',
          programListArr: [],
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
      searchData: {
        industry:[]
      },
      objpages:{"first":{page:1,loadall:false,IF_SURANCE:1,idx:0,isSearch:0},"second":{page:1,loadall:false,IF_SURANCE:0,idx:1,isSearch:0},
      "third":{page:1,loadall:false,IF_SURANCE:'',idx:2,isSearch:0}},
      totalData:{"execNum":0,"closeNum":0,"allNum":0}
    }
  },

  mounted () {
  },

  activated(){ 
    if(!this.$route.meta.isUseCache){
      this.busy= false;
      this.loadall= false;
      this.page =1;

      this.objpages["first"]["page"] = 1;
      this.objpages["first"]["loadall"]=false
      this.workBenchMyProTab[0].programListArr = [];

      this.objpages["second"]["loadall"]=false
      this.workBenchMyProTab[1].programListArr = [];

      this.objpages["third"]["loadall"]= false;
      this.workBenchMyProTab[2].programListArr = [];
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },

  methods: {
    tabClick (e) {
      console.log("tabclick");
      var objnowpage = this.objpages[this.activeName];
      if(this.isSearch != objnowpage.isSearch ){
        objnowpage.page= 1
        objnowpage.loadall = false
        objnowpage.programListArr= []
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
      let strurl = "?action=GetProjectList&TYPE=all";
      let urlparam = {PAGE_NUM: objnowpage.page, PAGE_TOTAL: this.pageSize, IF_SURANCE: objnowpage.IF_SURANCE}

      if(this.searchData){
        urlparam.BUSINESS_TYPE = this.searchData["business"]
        urlparam.INDUSTRY_NAME = this.searchData["industry"].join(",")
        urlparam.PROJECT_NAME = this.searchData["proName"]
        urlparam.CUST_NAME = this.searchData["customer"]
        urlparam.PM_NAME = this.searchData["PM"]
        urlparam.SALE_NAME = this.searchData["sale"]
      }

      fetch.get(strurl,urlparam).then(res => {
        console.log(res);
        this.totalData= res.totalData;
        let obj = this.workBenchMyProTab[objnowpage.idx].programListArr;
        this.workBenchMyProTab[objnowpage.idx].programListArr = this.returnList(flag, res, obj)
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
      this.activeName="third";
      this.objpages["third"]["page"] = 1;
      this.objpages["third"]["loadall"]= false;
      this.loadall = false;
      this.workBenchMyProTab[2].programListArr = [];
      this.objpages["third"]["isSearch"] = 1;
      this.isSearch=1;
      this.searchData = searchData;
      
      this.loadMore();

      this.objpages["first"]["isSearch"]=0
      this.objpages["first"]["loadall"]=false
      this.workBenchMyProTab[0].programListArr = [];

      this.objpages["second"]["isSearch"]=0
      this.objpages["second"]["loadall"]=false
      this.workBenchMyProTab[1].programListArr = [];
    }

  }
}
</script>

<style scoped>
  .workBenchMyProView{width: 100%;}
  .content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;overflow: scroll;}
  .workBenchMyProView >>> .el-tabs__header{margin-bottom: 0.46rem; background: #ffffff;}
  .content >>> .el-tabs__nav{width: 100%;position: fixed;background:#fff;top: 0.45rem;}
  .content >>> .el-tabs__active-bar{background: #2698d6}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%; text-align: center; padding: 0; color: #999999}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.2rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6; word-break:break-all;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0 0.03rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
