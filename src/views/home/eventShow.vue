<!--首页-事件详情-->
<template>
  <div class="eventShowView">
    <header-last :title="eventShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="eventShowTabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息"   name="first"><event-base-info></event-base-info></el-tab-pane>
        <el-tab-pane label="进展情况"   name="second"><event-progress></event-progress></el-tab-pane>
        <el-tab-pane label="人员地图"  name="third" lazy><event-people></event-people></el-tab-pane>
        <el-tab-pane label="备件地图"  name="fourth" lazy><event-parts></event-parts></el-tab-pane>
      </el-tabs>
    </div>
    <div class="eventShowFooter" v-if="activeName!='third'&& activeName!='fourth'" >
      <el-row>
        <el-col :span="7">
          <router-link :to="{name:'eventReplenish',query:{caseId:this.caseId}}">
            <div>
              <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
              <span>补充说明</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="7">
          <router-link :to="{name:'eventFeedback',query:{caseId:this.caseId,projectId:this.projectId}}">
          <div>
            <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
            <span>意见反馈</span>
          </div>
          </router-link>
        </el-col>
        <el-col :span="7">
          <router-link :to="{name:'eventEvaluation',query:{caseId:this.caseId}}">
            <div>
              <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
              <span>服务评价</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="3"><div class="el-icon-more" @click.stop="popBg=!popBg"></div></el-col>
      </el-row>
    </div>
    <div v-if="popBg" class="popBg" @click.stop="popBg=!popBg">
      <ul>
        <router-link :to="{name:'eventPeople',query:{caseId:this.caseId}}">
        <li><img src="../../assets/images/eventBaseInfo_4.png" alt="">相关人员</li>
        </router-link>
        <router-link :to="{name:'eventRepair',query:{caseId:this.caseId}}">
        <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">相关报修</li>
        </router-link>
        <router-link :to="{name:'eventSLAInfo',query:{caseId:this.caseId,caseLevel:this.caseLevel,slaLevel:this.slaLevel,createDate:this.createDate}}">
        <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/sla.png" alt="">SLA信息</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import eventBaseInfo from '../../components/event/eventBaseInfo'
import eventProgress from '../../components/event/eventProgress'
import eventPeople from '../../components/event/eventPeople'
import eventParts from '../../components/event/eventParts'
import HeaderLast from '../header/headerLast'
import fetch from '../../utils/ajax'

export default {
  name: 'eventShow',

  components: {
    HeaderLast,
    eventBaseInfo,
    eventProgress,
    eventPeople,
    eventParts
  },

  data () {
    return {
      eventShowTit: '事件详情',
      activeName: 'first',
      popBg: false,
      caseId: this.$route.query.caseId,
      projectId: this.$route.query.projectId,
      slaLevel:'',
      caseLevel:'',
      createDate:''
    }
  },

  methods: {

  },
  created:function(){
    fetch.get("?action=GetCaseInfo&CASE_ID="+this.$route.query.caseId,{}).then(res=>{
      console.log(res.data);
      let baseInfo = res.data;
      this.projectId = baseInfo.PROJECT_ID ;
      this.slaLevel = baseInfo.SLA_LEVEL;
      this.caseLevel = baseInfo.CASE_LEVEL;
      this.createDate = baseInfo.CREATE_DATE;
      console.log(this.projectId);
    });
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'focusEventList') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
}
</script>

<style scoped>
  .eventShowTabs{margin: 0 0; background: #ffffff; position: relative;}
  .eventShowTabs >>> .el-tabs__header{margin: 0 0 0.1rem;}
  .eventShowTabs >>> .el-tabs__item.is-active{color: #2698d6;}
  .eventShowTabs >>> .el-tabs__active-bar{background: #2698d6;}
  .eventShowTabs >>> .el-tabs__nav{width: 100%; text-align: center;}
  .eventShowTabs >>> .el-tabs__item{width: 25%; padding: 0; font-size: 0.14rem; color: #666666;}
  .eventShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
  .eventShowFooter .el-row{}
  .eventShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
  .eventShowFooter .el-row .el-col img{vertical-align: sub;}
  .eventShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}
  .popBg{background: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
  .popBg ul{background: #f5f5f9; position: absolute; right: 0; bottom: 0.5rem; z-index: 2; line-height: 0.3rem}
  .popBg li{padding: 0 0.15rem}
  .popBg .slali{padding: 0 0.12rem}
  .popBg li:nth-child(1){border-bottom: 0.01rem solid #e1e1e1;}
  .popBg li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}
</style>
