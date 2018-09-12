<!--首页-需关注事件-->
<template>
  <div class="eventListView">
    <header-base :title="eventListTit+'('+totalData+')'" :searchType="searchType" :queryData="searchData"  @searchPro="searchList"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="eventCell" v-for="item in eventListArr" :key="item.CASEID">
        <router-link :to="{name:'eventShow',query:{caseId:item.CASEID}}">
        <div class="cellTop">
          <el-row>
            <el-col :span="11">
              <span class="spheathcolor" :class="'spheathcolor'+item.CASEHEALTH"  ></span>  {{item.CODE}}
            </el-col>
            <el-col :span="2">
              <span class="speventlevel" v-if="item.CASELEVEL==='一级'" :class="'speventlevelcolor'+1">{{item.CASELEVEL}}</span>
                 <span class="speventlevel" v-if="item.CASELEVEL==='二级'" :class="'speventlevelcolor'+2" >{{item.CASELEVEL}}</span>
                 <span class="speventlevel" v-if="item.CASELEVEL==='三级'" :class="'speventlevelcolor'+3" >{{item.CASELEVEL}}</span>
                 <span class="speventlevel" v-if="item.CASELEVEL==='四级'" :class="'speventlevelcolor'+4" >{{item.CASELEVEL}}</span>
                 <span class="speventlevel" v-if="item.CASELEVEL==='五级'" :class="'speventlevelcolor'+5" >{{item.CASELEVEL}}</span>
            </el-col>
            <el-col :span="11">
              <div class="cellTopTime"><span>{{item.DATE_TIME}}</span><span style="margin-left: 0.05rem;"></span></div>
            </el-col>
          </el-row>
        </div>

        <div class="cellContent">
          <el-row>
            <el-col :span="12"><span class="tit">厂商：</span><span>{{item.FACTORY_NM}}</span></el-col>
            <el-col :span="12"><span class="tit">型号：</span><span>{{item.MODEL_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">客户：</span><span>{{item.CUSTOM}}</span></el-col>
            <el-col :span="12"><span class="tit">城市：</span><span>{{item.CITY}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">状态：</span><span>{{item.CASE_STATUS}}</span></el-col>
            <el-col :span="12"><span class="tit">类型：</span><span>{{item.TYPE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">case描述：</span><span>{{item.REASON}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">关注原因：</span><span>{{item.ITEM}}</span></el-col>
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
import fetch from '../../utils/ajax'
import headerBase from '../header/headerBase'
import loadingtmp from '@/components/load/loading'

export default {
  name: 'eventList',

  components: {
    headerBase,
    loadingtmp
  },

  data () {
    return {
      eventListTit: '需关注事件',
      searchType: 'focusEvent',
      eventListArr: [
        /**{
          num: 'CS1608260014',
          timeone: '2016-08-26',
          timetwo: '09:24:57',
          firm: 'IBM',
          model: '9117-570(P5 570)',
          state: '待管理人处理',
          type: '非故障技术支持',
          alarm: 'CASE人员到场OLA超时'
        },
        {
          num: 'CS1608260014',
          timeone: '2016-08-26',
          timetwo: '09:24:57',
          firm: 'IBM',
          model: '9117-570(P5 570)',
          state: '待管理人处理',
          type: '非故障技术支持',
          alarm: 'CASE人员到场OLA超时'
        }*/
      ],
      page:1,
      pageSize:10,
      busy:true,
      loadall: false,
      isSearch:false,
      searchData:{
        industry:[]
      },
      totalData:0
    }
  },
  activated(){
    console.log(this.$route.meta.savedPosition)
    if(!this.$route.meta.isUseCache){
      this.eventListArr = [];
      this.page =1;
      this.loadall =false;
      this.busy= false;
      this.loadMore();
    }
    this.$route.meta.isUseCache = false;
  },
  methods: {

    getEventList(){
      var params = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
      if(this.isSearch){
        params.INDUSTRY_NAME = this.searchData.industry.join(",");
        params.CASE_TYPE = this.searchData.type.join(",");
        params.CUST_NAME = this.searchData.customer;
        params.PROJECT_NAME = this.searchData.proName;
        params.PM_NAME = this.searchData.PM;
        params.CASE_CD = this.searchData.eventNum;
        params.KEYWORD = this.searchData.keyWord;
        params.SALE_NAME = this.searchData.sale;
        params.START_TIME = this.searchData.startTime;
        params.END_TIME = this.searchData.endTime;
      }
      //console.log(params);
      var flag = this.page>1;
      fetch.get("?action=GetFocusCase",params).then(res=>{
        console.log(res);
        this.totalData = res.total;
        if(flag){
            this.eventListArr = this.eventListArr.concat(res.data);
        }else{
            this.eventListArr = res.data;
        }
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = false;
          this.loadall = true;
        }
        else{
          this.busy = false;
          this.page++
        }

      });
    },
    loadMore(){
      if(this.busy || this.loadall)
        return;
      this.busy = true;
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },

    searchList(formData){
      this.searchData = formData;
      this.eventListArr=[];
      this.isSearch = true;
      this.page = 1;
      this.loadall= false;
      this.loadMore();
    }
  },
  created(){

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
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.03rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0 0 -0.03rem; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .eventCell .cellTop .spheathcolor1{background: #009900;}
  .eventCell .cellTop .spheathcolor2{background: #ffff00;}
  .eventCell .cellTop .spheathcolor3{background: #ff9900;}
  .eventCell .cellTop .spheathcolor4{background: #ff0000;}

  .speventlevelcolor1{ color:#ff0000; }
  .speventlevelcolor2{ color:#ff0000; }
  .speventlevelcolor3{ color:#ff9900; }
  .speventlevelcolor4{ color:#ffff00; }
  .speventlevelcolor5{ color:#1ca2a5; }

</style>
