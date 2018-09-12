<!--我的-意见反馈详情-->
<template>
  <div class="mineFeedbackShowView">
    <header-last :title="mineFeedbackShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="cell" v-for="item in mineFeedbackShowObj" :key="item.id">
        <div class="title">{{item.title}}</div>
        <ul>
          <li v-for="info in item.cellObj" :key="info.id"  v-if="info.rightCon!=null">
            <p>{{info.leftTit}}</p><p v-html="info.rightCon"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
  name: 'mineFeedbackShow',
  components: {
    headerLast
  },

  data () {
    return {
      mineFeedbackShowTit: '意见反馈详情',
      mineFeedbackShowObj: [
        {
          title: '基本信息',
          cellObj: [
            {leftTit: '任务编号：', rightCon: ''},
            {leftTit: '意见来源：', rightCon: ''},
            {leftTit: '意见类型：', rightCon: ''},
            {leftTit: '提交人：', rightCon: ''},
            {leftTit: '联系电话：', rightCon: ''},
            {leftTit: '提交时间：', rightCon: ''},
            {leftTit: '项目编号：', rightCon: ''},
            {leftTit: '项目名称：', rightCon: ''},
            {leftTit: '事件编号：', rightCon: ''},
            {leftTit: '意见内容：', rightCon: ''}
          ]
        },
        {
          title: '跟踪处理情况',
          cellObj: [
            {leftTit: '原因分析：', rightCon: ''},
            {leftTit: '处理结果：', rightCon: ''},
            {leftTit: '处罚措施：', rightCon: ''},
            {leftTit: '评估人：', rightCon: ''},
            {leftTit: '任务关闭时间：', rightCon: ''}
          ]
        }
        // ,
        // {
        //   title: '评估定性',
        //   cellObj: [
        //     {leftTit: '问题定性分类：', rightCon: ''},
        //     {leftTit: '问题根源分类：', rightCon: ''},
        //     {leftTit: '责任人：', rightCon: ''},
        //     {leftTit: '问题定性描述：', rightCon: ''}
        //   ]
        // }
      ]
    }
  },
  mounted () {
  },
  methods: {
  },
  mounted () {
  },
  created () {
    let url = "?action=GetComplaintsInfo&COMPLANT_ID="+this.$route.query.complantId;
    fetch.get(url,"").then(res=>{
      console.log(res.data);
      this.mineFeedbackShowObj[0].cellObj[0].rightCon = res.data.TASK_CODE;
      this.mineFeedbackShowObj[0].cellObj[1].rightCon = res.data.TASK_FROM;
      this.mineFeedbackShowObj[0].cellObj[2].rightCon = res.data.TASK_TYPE;
      this.mineFeedbackShowObj[0].cellObj[3].rightCon = res.data.COMPLAINT_USER;
      this.mineFeedbackShowObj[0].cellObj[4].rightCon = res.data.TELEPHONE;
      this.mineFeedbackShowObj[0].cellObj[5].rightCon = res.data.CREATE_ON;
      this.mineFeedbackShowObj[0].cellObj[6].rightCon = res.data.PROJECT_CODE;
      this.mineFeedbackShowObj[0].cellObj[7].rightCon = res.data.PROJECT_NAME;
      this.mineFeedbackShowObj[0].cellObj[8].rightCon = res.data.CASE_CD;
      this.mineFeedbackShowObj[0].cellObj[9].rightCon = res.data.COMPLAINT_COMMENT.replace(/\n/g, "<br/>");
      this.mineFeedbackShowObj[1].cellObj[0].rightCon = res.data.REASON;
      this.mineFeedbackShowObj[1].cellObj[1].rightCon = res.data.ACCEPT_OPINION.replace(/\n/g, "<br/>");
      this.mineFeedbackShowObj[1].cellObj[2].rightCon = res.data.QUESTION_REMARK;
      this.mineFeedbackShowObj[1].cellObj[3].rightCon = res.data.EVALUATOR;
      this.mineFeedbackShowObj[1].cellObj[4].rightCon = res.data.CLOSE_TIME;
      // this.mineFeedbackShowObj[2].cellObj[0].rightCon = res.data.QUALITY_RESULT;
      // this.mineFeedbackShowObj[2].cellObj[1].rightCon = res.data.QUESTION_TYPE;
      // this.mineFeedbackShowObj[2].cellObj[2].rightCon = res.data.RESPONSIBLE_BY;
      // this.mineFeedbackShowObj[2].cellObj[3].rightCon = res.data.QUESTION_REMARK.replace(/\n/g, "<br/>");
    });
    console.log(this.mineFeedbackShowObj[1]);
  },
}
</script>

<style scoped>
  .mineFeedbackShowView{ width: 100%;}
  .content{width: 100%; margin-top: 0.05rem; color: #999999; background: #ffffff;}
  .content .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
  .content .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
  .content ul li{padding: 0 0.25rem;}
  .content ul li{display: flex; line-height: 0.25rem;}
  .content ul li p:nth-child(1){width: 0.91rem;}
  .content ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
  textarea{width:100%;height:100%; border: 0; outline:none;resize:none; min-height: 0.25rem; max-height: 1rem}
</style>
