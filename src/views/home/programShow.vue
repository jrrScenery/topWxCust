<!--首页-项目详情-->
<template>
  <div class="programShowView"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <header-last :title="programShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content" >
      <div class="programCell" v-for="item in programListArr" :key="item.PROJECT_CODE">
        <div class="cellTop">
          <el-row>
            <el-col :span="17">
              <div class="cellTopNum">{{projectInfo.PROJECT_CODE}}</div>
            </el-col>           
            <el-col :span="7">
              <div class="cellTopState">状态：<span>{{projectInfo.PROJECT_STATUS}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="cellContent" >
          <p>{{projectInfo.PROJECT_NAME}}</p>
          <el-row>
            <el-col :span="12"><span class="tit">销售：{{projectInfo.SALESMAN_NAME}}</span></el-col>
            <el-col :span="12"><span class="tit">项目经理：{{projectInfo.PM_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">开始时间：{{projectInfo.START_DATE}}</span></el-col>
            <el-col :span="12"><span class="tit">结束时间：{{projectInfo.END_DATE}}</span></el-col>
          </el-row>
        </div>

      </div>
      <div class="programTable">
        <el-tabs v-model="activeName"  @tab-click="chtab" >
          <el-tab-pane label="设备清单" name="promachine"><pro-machine @emitbusy="getEmitPage"  
          @emitparams='getEmitparams' 
          :promachinepage="needpage.promachine.page" :onchange='needpage.promachine.onchange'></pro-machine></el-tab-pane>
          <el-tab-pane label="巡检计划" name="proplan" lazy><pro-plan ></pro-plan></el-tab-pane>
          <el-tab-pane label="相关报修" name="prorepair"><pro-repair @emitbusy="getEmitPage" 
          @repairpagechange="repairPageChange"  :onchange='needpage.promachine.onchange' 
           :prorepairpage="needpage.prorepair.page" lazy ></pro-repair></el-tab-pane>
          <el-tab-pane label="分析报表" name="proreport" lazy><pro-report></pro-report></el-tab-pane>
          <el-tab-pane label="文档下载" name="profiledown" lazy><pro-file-down></pro-file-down></el-tab-pane>
          <el-tab-pane label="满意度" name="prosatisfy" lazy><pro-satisfy></pro-satisfy></el-tab-pane>
          <el-tab-pane label="意见反馈" name="profeedback" lazy><pro-feedback></pro-feedback></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import proMachine from '../../components/program/proMachine'
import proPlan from '../../components/program/proPlan'
import proRepair from '../../components/program/proRepair'
import proReport from '../../components/program/proReport'
import proFileDown from '../../components/program/proFileDown'
import proSatisfy from '../../components/program/proSatisfy'
import proFeedback from '../../components/program/proFeedback'
import fetch from '../../utils/ajax'
export default {
  name: 'programShow',

  components: {
    headerLast,
    proMachine,
    proPlan,
    proRepair,
    proReport,
    proFileDown,
    proSatisfy,
    proFeedback
  },

  data () {
    return {
      programShowTit: '项目详情',
      programListArr: [
        {

        }
      ],
      projectInfo:{},
      activeName: 'promachine',
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      needpage:{
        promachine:{page:0,loadall: false,onchange:false,searchData:{}}, 
        prorepair:{page:0,loadall: false,onchange:false,searchData:{}}
      }

    }
  },
  created () {

  },

  mounted () {
    this.getProgramInfo();
    window.addEventListener('scroll', this.handleScroll,true)
  },

  methods: {
    chtab(){
      if(this.needpage[this.activeName] && this.needpage[this.activeName]["page"]==0){
        this["needpage"][this.activeName]["page"] = 1;
      }

    },
    getEmitPage(res){
      this.busy = res.busy;
      this.needpage[this.activeName]["loadall"] = res.loadall;
    },
    getEmitparams(res){
      this.needpage[this.activeName]["page"]=0;
      this.needpage[this.activeName]["loadall"]=false
    },
    getProgramInfo(){
      fetch.get("?action=/project/GetProjectInfo&EMPID="+global_.empId+"&PROJECT_ID="+this.$route.query.projectId,{}).then(res=>{
          console.log(res);
          let baseInfo = res.data;
          this.projectInfo = baseInfo;
        });
    },
    loadMore(){
      // console.log("到底了");
      console.log(this.busy);
      if(this.needpage[this.activeName] && !this.needpage[this.activeName]["loadall"]){
        this.busy = true;
          setTimeout(() => {
            this["needpage"][this.activeName]["page"]++;
        }, 1000);
      }

    },
    handleScroll () {
      let scrollTop = document.querySelector('.programShowView').scrollTop;
      let headerTop = document.querySelector('.el-tabs__header')
      let bijiaoHeight = document.querySelector('.programTable').offsetTop - 45
      // console.log(scrollTop,'--------------',bijiaoHeight)
      if (scrollTop >= bijiaoHeight) {
        headerTop.classList.add('moveTop')
        headerTop.style.top = (Number(scrollTop) / 100) - (bijiaoHeight / 100) + 'rem'
      } else {
        headerTop.classList.remove('moveTop')
        headerTop.style.top = 0 + 'rem'
      }
    },
    repairPageChange(val){
      this.needpage["prorepair"] ={page:val,loadall:false}
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll,true)
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'programList' || to.name=='home') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
}
</script>

<style scoped>
  .programCell{padding: 0 0.15rem 0.1rem; margin-top: 0.1rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopColor span{display: inline-block; width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin-right: 0.05rem;}
  .programCell .cellTop .cellTopState{text-align: right; color: #333333;}
  .programCell .cellTop .cellTopState span{color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
  .programShowView{ height: 100%; overflow: scroll;}
  .programShowView >>> .el-tabs__item{font-size: 0.14rem; color: #666666}
  .programShowView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .programShowView >>> .el-tabs__item.is-active{color: #2698d6;}
  .programShowView >>> .el-tabs__header{padding: 0 0.1rem; margin: 0}
  .programShowView >>> .el-tabs__header .el-tabs__nav-prev{font-size: 0.2rem}
  .programShowView >>> .el-tabs__header .el-tabs__nav-next{font-size: 0.2rem}
  .programTable{background: #ffffff; padding-bottom: 0.2rem;}
  .programShowView >>> .moveTop{z-index: 999; background: #ffffff; -webkit-transform: translateZ(0)}
</style>
<style>
.programShowView .el-tabs__nav-scroll{ overflow:scroll;}
</style>

