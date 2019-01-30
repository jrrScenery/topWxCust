<!--基础信息-->
<template>
  <div class="eventBaseInfoView">
    <div class="baseInfoTop">
      <el-row>
        <el-col :span="10">
          <span v-if="CASEHEALTH == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
          <span v-if="CASEHEALTH == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
          <span v-if="CASEHEALTH == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></span>
          <span v-if="CASEHEALTH == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
          <span v-if="CASEHEALTH == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span> {{eventNum}}
        </el-col>
        <el-col :span="3">
            <span v-if="caseLevel == '一级' || caseLevel == '二级'" style="color: #ff0000;">{{caseLevel}}</span>
            <span v-if="caseLevel == '三级'" style="color: #ff9900;">{{caseLevel}}</span>
            <span v-if="caseLevel == '四级'" style="color: #ffff00;">{{caseLevel}}</span>
            <span v-if="caseLevel == '五级'" style="color: #1ca2a5;">{{caseLevel}}</span>
        </el-col>
        
        <el-col :span="11">
          <div class="cellTopTime"><span>{{eventTime}}</span><span style="margin-left: 0.05rem;"></span></div>
        </el-col>
      </el-row>
    </div>
    <div class="baseInfoBottom">
      <div class="companyInfo">
        <span style="color: #2698d6; font-size: 0.14rem">{{companyInfo.name}}</span>
        <h4>{{companyInfo.tit}}</h4>
        <div style="display: flex; justify-content: space-between"><p><span style="color: #999999">设备：</span>{{companyInfo.equipment}}</p><p><span style="color: #999999">SN：</span>{{companyInfo.SN}}</p></div>
        <p v-html="companyInfo.desc"></p>
        <p>{{companyInfo.size}}</p>
      </div>
      <div class="speed">
        <el-steps :active="status.active>2?status.active-1:status.active" align-center>
          <template v-for="item in status.title">
            <el-step :title="item.tit" :key="item.id"></el-step>
          </template>
        </el-steps>
        <p>状态：{{status.state}}</p>
      </div>
      <div class="peopleInfo">
        <div v-for="(item,i) in peopleInfo" :key="'peo'+i" style="display: flex; justify-content: center; width: 50%">
          <img v-if="item.imgSrc" :src="item.imgSrc" alt="">
          <img v-else src="../../assets/images/photo.png" alt="">
          <div>
            <p style="font-size: 0.14rem">
              {{item.name}}<br>
              <a @click="sendCall(item.phone)" v-bind:href="'tel:'+item.phone" style="color: #2698d6;"> {{item.phone}} </a>
            </p>
            <span style="font-size: 0.1rem; color: #999999">{{item.position}}</span></div>
        </div>
      </div>
      <ul class="eventBaseInfoCell">
        <li v-for="(item,i) in baseInfoArr" :key="'inf'+i"><span>{{item.tit}}</span>{{item.desc}}
          <a  @click="sendCall(item.phone)" v-bind:href="'tel:'+item.phone"  style="color: #2698d6;"> {{item.phone}} </a>
        </li>
      </ul>
      <div class="resolvent">
        <div style="display: flex; justify-content: space-between"><p>{{resolventObj.tit}}</p><p v-if="resolventObj.time"><span>解决时间：{{resolventObj.time}}</span></p></div>
        <div class="desc">{{resolventObj.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'eventBaseInfo',

  components: {

  },

  data () {
    return {
      title: '事件基本信息',
      health: '',
      eventNum: '',
      eventTime: '',
      caseLevel: '',
      CASEHEALTH: '',
      companyInfo: {name: '', tit: '', equipment: '', SN: '', desc: ''},
      status: {active: 1, title: [{tit: '受理'}, {tit: '诊断'}, {tit: '处理'}, {tit: '关闭'}], state: ''},
      peopleInfo: [{imgSrc: '', name: '', position: '管理责任人',phone:''}, {imgSrc: '', name: '', position: '技术责任人',phone:''}],
      baseInfoArr: [
        {tit: 'PM：', desc: '',phone:''},
        {tit: '销售：', desc: '',phone:''},
        {tit: '所属区域：', desc: ''},
        {tit: '城市：', desc: ''},
        {tit: '地址：', desc: ''}
      ],
      resolventObj: {tit: '最终解决办法', time: '', desc: ''}
    }
  },

  methods: {
    
  },
  created:function(){

    let url = "?action=GetCaseInfo&CASE_ID="+this.$route.query.caseId;
    fetch.get(url,"").then(res=>{
      console.log(res.data);
      let baseInfo = res.data;
      this.eventNum = baseInfo.CASE_NO;
      this.health = baseInfo.CASE_HEALTH;
      this.eventTime = baseInfo.HAPPENED_DATE;
      this.companyInfo.name = baseInfo.CUSTOMER_NAME;
      this.companyInfo.tit = baseInfo.PROJECT_NAME;
      this.companyInfo.equipment = baseInfo.DEVICE;
      this.companyInfo.SN = baseInfo.SN;
      this.companyInfo.desc = baseInfo.PROBLEM_DETAIL.replace(/\n/g, "<br/>");
      this.status.active = parseInt(baseInfo.CASE_STEP)-1;
      this.status.state = baseInfo.DEAL_STATUS_NAME;
      this.peopleInfo[0].name = baseInfo.MANAGER_REALNAME;
      this.peopleInfo[0].phone = baseInfo.MANAGER_MOBILE;
      this.peopleInfo[1].name = baseInfo.TECH_MANAGER_REALNAME;
      this.peopleInfo[1].phone = baseInfo.TECH_MANAGER_MOBILE;
      this.baseInfoArr[0].desc = baseInfo.PM_NAME;
      this.baseInfoArr[0].phone = baseInfo.PM_MOBILE;
      this.baseInfoArr[1].desc = baseInfo.SALE_NAME;
      this.baseInfoArr[1].phone = baseInfo.SALE_MOBILE;
      this.baseInfoArr[2].desc = baseInfo.QY_NAME;
      this.baseInfoArr[3].desc = baseInfo.CASE_LOCATION;
      this.baseInfoArr[4].desc = baseInfo.CASE_ADDRESS;
      this.resolventObj.time = baseInfo.SOLVING_TIME;
      this.resolventObj.desc = baseInfo.FINAL_SOLUTION;
      this.caseLevel = baseInfo.CASE_LEVEL;
      this.CASEHEALTH = parseInt(baseInfo.CASE_HEALTH);
     });
  }

}
     console.log(this.caseLevel);
</script>

<style scoped>
  .eventBaseInfoView{padding: 0 0.12rem; margin-bottom: 0.5rem}
  .baseInfoTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;font-size: 0.13rem;}
  .baseInfoTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .baseInfoTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.03rem; text-align: center; line-height: 0.2rem;}
  .baseInfoTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0 0 -0.03rem; text-align: right}
  .baseInfoTop .cellTopTime{text-align: right; color: #999999;}
  .baseInfoBottom{color: #262626; line-height: 0.22rem}
  .baseInfoBottom .companyInfo{}
  .baseInfoBottom .companyInfo h4{font-size: 0.14rem}
  .baseInfoBottom .speed{margin: 0.1rem 0;}
  .baseInfoBottom .speed >>> .el-step__icon{width: 0.14rem; height: 0.14rem}
  .baseInfoBottom .speed >>> .el-step__icon-inner{display: none}
  .baseInfoBottom .speed >>> .el-step__title{font-size: 0.13rem}
  .baseInfoBottom .speed p{line-height: 0.4rem; color: #e0be35; text-align: center}
  .baseInfoBottom .peopleInfo{display: flex; margin-bottom: 0.1rem; line-height: 0.2rem}
  .baseInfoBottom .peopleInfo img{width: 0.5rem; height: 0.5rem; border-radius: 50%; margin: 0.06rem 0.1rem 0 0;}
  .baseInfoBottom .resolvent{line-height: 0.2rem}
  .baseInfoBottom .resolvent p{line-height: 0.3rem}
  .baseInfoBottom .resolvent span{color: #999999}
  .baseInfoBottom .resolvent .desc{color: #999999}
  .eventBaseInfoCell{padding: 0 0.1rem 0.05rem; color: #262626; border-bottom: 0.01rem solid #e1e1e1}
  .eventBaseInfoCell span{width: 0.65rem; color: #999999; display: inline-block;}
  .baseInfoBottom .speed >>> .el-step__head.is-process{color:#409EFF;border-color:#409EFF;}
  .baseInfoBottom .speed >>> .el-step__title.is-process{font-weight:800;color:#409EFF;font-size: 16px}
</style>
