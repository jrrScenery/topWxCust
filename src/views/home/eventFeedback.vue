<!--首页-事件详情-意见反馈-->
<template>
  <div class="eventFeedbackView">
    <header-last :title="eventFeedbackTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-form :model="formData" label-width="0.8rem" ref="formData">
        <el-form-item label="意见类型">
          <template>
            <el-select v-model="value4" clearable placeholder="请选择意见类型">
              <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <div class="article">{{title}}</div>
        <el-form-item class="text">
          <el-input type="textarea" v-model="formData.article" placeholder="请输入意见内容"></el-input>
        </el-form-item>
        <el-form-item class="submitBtn">
          <el-button @click="submitForm('formData')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import qs from 'qs'

export default {
  name: 'eventFeedback',

  components: {
    headerLast
  },

  data () {
    return {
      eventFeedbackTit: '意见反馈',
      title: '意见内容',
      formData: {
        name: '',
        phone: '',
        region: '',
        type: '',
        article: '',
        email : ''
      },
      options: [{
          value: '1',
          label: '意见'
        }, {
          value: '2',
          label: '投诉'
        }, {
          value: '3',
          label: '咨询'
        }, {
          value: '4',
          label: '扣款'
        }, {
          value: '5',
          label: '事故'
        }],
        value4: '1',
        caseId: this.$route.query.caseId,
        projectId: this.$route.query.projectId
    }
  },
  created(){
    console.log("11111111111")
    console.log(this.$route.query.projectId);
  },

  methods: {
    submitForm (formName) {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = "&PROJECT_ID="+ this.$route.query.projectId +"&TYPE="+this.value4 + "&NAME="+this.formData.name + "&PHONE="+this.formData.phone+"&EMAIL="+this.formData.email+"&CONTENT="+window.encodeURI(this.formData.article);
          fetch.get("?action=UpdateSuggest&CASE_ID="+this.$route.query.caseId+params,"").then(res=>{
              console.log(res);
              loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine'
                });

                  let nowcaseid = vm.caseId;
                  setTimeout(function(){vm.$router.push({ name: 'casedetail',query:{caseId:nowcaseid}})},1000);
              }
              else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
              }
              
          });
        } else {
          this.$message({
                  message:"请正确填写",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
          return false
        }
      })
    }
  },
  created:function(){

    this.formData.name = localStorage.getItem("realName");
    this.formData.phone = localStorage.getItem("mobile");
    this.formData.email = localStorage.getItem("email");

  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
  .article{line-height: 0.3rem; background: #f5f5f9; color: #acacac; padding-left: 0.25rem;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
