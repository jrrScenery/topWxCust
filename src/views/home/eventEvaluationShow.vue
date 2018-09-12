<!--首页-事件详情-服务评价编辑-->
<template>
  <div class="eventEvaluationEditorView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="serviceInfoCell" v-if="onsiteService!=null">
      <div class="serviceInfoTit" v-if="serviceType==1">故障处理服务单</div>
      <div class="serviceInfoTit" v-if="serviceType==2">现场服务单</div>
        <div class="content">
            <ul class="tableTd">
                <li>
                    <span>服务单号:</span>  
                    <span>{{onsiteService.serviceCd}}</span>          
                </li>
                <li>                
                    <span>项目编号：</span>  
                    <span>{{onsiteService.projectCode}}</span>   
                </li>
                <li>                
                    <span>项目名称：</span>
                    <span>{{onsiteService.projectName}}</span>
                </li>
                <li>                
                    <span>联系人：</span>
                    <span>{{onsiteService.realname}}</span>
                </li>
                <li>                
                    <span>联系电话：</span>
                    <span>{{onsiteService.contactMobile}}</span>
                </li>
                <li>                
                    <span>事件编号：</span>
                    <span>{{onsiteService.caseCd}}</span>
                </li>
                <li v-if="serviceType==2">                
                    <span>工程师名称：</span>
                    <span>{{onsiteService.enginnername}}</span>
                </li>
                <li v-if="onsiteService.faultDesc&&serviceType==2">                
                    <span>服务类型：</span>
                    <span>{{onsiteService.serviceType}}</span>
                </li>
                <li v-if="serviceType==1">                
                    <span>故障现象：</span>
                    <span>{{onsiteService.faultDesc}}</span>
                </li>
                <li v-if="serviceType==1">                
                    <span>分析诊断：</span>
                    <span>{{onsiteService.analysis}}</span>
                </li>
                <li v-if="serviceType==1">                
                    <span>实施结果：</span>
                    <span>{{onsiteService.implementResult}}</span>
                </li>
                <li v-if="serviceType==1">                
                    <span>遗留问题及建议：</span>
                    <span>{{onsiteService.problemSuggest}}</span>
                </li>
                <li v-if="onsiteService.workContent&&serviceType==2">                
                    <span>工作内容：</span>
                    <span>{{onsiteService.workContent}}</span>
                </li>
                <li v-if="onsiteService.workResultContent&&serviceType==2">                
                    <span>工作结果：</span>
                    <span>{{onsiteService.workResultContent}}</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="serviceInfoCell" v-if="evaluateval.length!=0">
      <div class="serviceInfoTit">客户评价</div>
      <div class="content">
        <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
          <div class="star">
            <span class="starTit">{{i+1}}.{{item.question.questionComment}}</span>
            <el-rate
                    v-model="item.scoreval"
                    disabled
                    :colors="['#666666', '#999999', '#FF9900']">
            </el-rate>
          </div>
          <div class="improve" v-if="item.scoreval<4">
            <span>{{item.question.questionComment2}}</span>
            <div class="improveCell">
              <el-checkbox-group v-model="item.aroptschked">
                <el-checkbox  disabled  v-for="itemoption in item.options" :label="itemoption.optionId" :key="itemoption.optionId">{{itemoption.optionComment}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>



        <ul class="signature">
          <li class="lisign">
            <span>客户签字</span>
            <div class="sign">

              <img :src="signimg">
            </div>
          </li>
          <li>
            <span>工程师</span>
            <div>{{engineer}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
  name: 'eventEvaluationShow',

  components: {
    headerLast
  },

  data () {
    return {
      eventEvaluationTit: '服务评价',
      signimg:"",
      engineer: '梁瑛',
      evaluateval:[],
      evaluateid: this.$route.query.evaluateid,
      serviceId:this.$route.query.serviceId,
      caseId:this.$route.query.caseId,
      serviceType:this.$route.query.serviceType,
      onsiteService:null
    }
  },
  mounted(){
    console.log(this.serviceType)
    if(this.serviceType==1){
      fetch.get("?action=/work/GetCaseroubleShootingServiceFormInfo&SERVICE_ID=" + this.serviceId+"&CASE_ID="+this.caseId).then(res=>{
        console.log(res);
        console.log("------");
        this.onsiteService = res.DATA[0]
      })
    }else if(this.serviceType==2){
      fetch.get("?action=/work/GetOnsiteServiceFormInfo&SERVICE_ID=" + this.serviceId+"&CASE_ID="+this.caseId).then(res=>{
        console.log(res);
        this.onsiteService = res.DATA[0]
      })
    }
    fetch.get("?action=GetCaseEvaluateInfo&EVALUATE_ID=" + this.evaluateid).then(res=>{
        //console.log(this.eventListArr);

      console.log(res)
      if("0" == res.STATUSCODE){
        let jsonres= res;
        this.signimg = jsonres.imgObject.imgStr;
        this.engineer = jsonres.imgObject.engineerName;
        let tmpjsonval =[];
        jsonres.question.forEach(function(v,i,ar){
          let tmpobj = {};
          tmpobj.question= v;
          tmpobj.options = jsonres.optionOption.filter(function(item){return v.questionId == item.questionId})
          tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
          tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
          tmpobj.scores = jsonres.scoreOption.filter(function(item){return v.questionId == item.questionId})
          tmpobj.scoreval= tmpobj.scores.length? tmpobj.scores[0]["questionScore"]:0;
          tmpjsonval.push(tmpobj);
        })
        console.log(tmpjsonval);
        this.evaluateval = tmpjsonval;

      }

    });
  }
  ,
  methods: {
    getCaseEvaluateInfo: function(){

    }
  }
}
</script>

<style scoped>
  .eventEvaluationEditorView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.2rem}
  .serviceInfoCell{white-space:normal}
  .serviceInfoCell .serviceInfoTit{position: relative; line-height: 0.2rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
  .serviceInfoCell .serviceInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
  .serviceInfoCell .serviceInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
  .content{background: #ffffff; color: #999999; padding: 0.1rem 0.25rem 0.15rem;}

  .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
  .tableTd span{text-align: center;}
  .tableTd span:nth-child(1){width: 100%; text-align: left;}
  .tableTd span:nth-child(2){width: 100%;text-align: left}

  .editorView .star{display: flex;}
  .editorView .star .starTit{ display: inline-block; width: 1.2rem;}
  .editorView .improve span{line-height: 0.24rem}
  .editorView .improve >>> .el-checkbox{display: block; margin: 0; font-size: 0.13rem; color: #999999;}
  .signature li{overflow: hidden;zoom:1; margin: 0; padding: 0.1rem 0;  color: #2698d6; border-bottom: 0.01rem solid #e1e1e1}
  .signature li span{ width: 0.6rem; float: left;}
  .signature li div{color: #333333; margin-left: 0.6rem;}
  .signature li .sign{ }
  .signature li .sign img{width: 100%; display: block; flex-grow: 1;}
  label.el-checkbox{white-space:normal}
  .improveCell span{ color: #666;word-wrap: break-word}
  .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #666!important;}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>
