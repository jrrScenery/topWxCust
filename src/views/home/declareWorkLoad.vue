<!--工作量确认表填写-->
<template>
  <div class="declareWordLoadView">
    <header-last :title="declareTitle"></header-last>
    <div style="height: 0.45rem;"></div>
      <div class="content">
          <el-form ref="form" :model="form" label-width="0.9rem">
            <el-form-item label="派工者">
              <el-input v-model="form.creatorRolename" class="bInput"></el-input>
            </el-form-item>
            <!-- <hr class="secondBoundaries"></hr> -->
            <el-form-item label="开始时间">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="form.expectStart"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="结束时间">
                <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="form.expectEnd"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="实施工作量">
              <el-tooltip class="item" effect="light" content="已确认实施工作量 (单位小时，如：1.5)" placement="right">
                <el-input v-model="form.standardWorkload" class="bInput"></el-input>
                <el-button></el-button>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="路途工作量">
              <el-input placeholder="请输入路途工作量 (单位小时，如：1.5)" v-model="form.wayWorkload" class="bInput"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        
        </div>

  </div>
</template>

<script>
import headerLast from "../header/headerLast"
import fetch from "../../utils/ajax.js"


export default {
  name: "declareWorkLoad",

  components: {
      headerLast,
  },

  data () {
    return {
      declareTitle:"工作量申报",
      form: {
        expectStart: '',
        expectEnd: '',
        creatorRolename: '',
        standardWorkload: '',
        wayWorkload: ''
      }
    }
  },
  created (){
    this.form.expectStart = this.$route.query.expectStart;
    this.form.expectEnd = this.$route.query.expectEnd;
    this.form.creatorRolename = this.$route.query.creatorRolename;
    this.form.standardWorkload = this.$route.query.standardWorkload;
    this.form.wayWorkload = this.$route.query.wayWorkload;
    this.form.caseId = this.$route.query.caseId;
    this.form.workId = this.$route.query.workId;
  },
  methods: {
    onSubmit (formName) {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.form.expectStart = this.formatTime(this.form.expectStart);
      this.form.expectEnd = this.formatTime(this.form.expectEnd);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("form", this.form)
          let params = "&START_TIME="+this.form.expectStart+"&END_TIME="+this.form.expectEnd+"&CASE_ID="+this.form.caseId+"&WORK_ID="+this.form.workId+"&NORMAL_WORKLOAD="+this.form.standardWorkload+"&EXTRA_WORKLOAD="+this.form.wayWorkload;
          fetch.get("?action=/work/DeclareWorkload"+params,"").then(res=>{

              loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine'
                });

                  let nowcaseid = vm.form.caseId;
                  let nowwordid = vm.form.workId;
                  setTimeout(function(){vm.$router.push({ name: "workBenchTaskDetailInfo",query:{caseId:nowcaseid,workId:nowwordid}})},1000);
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
    },
    //   let form = this.form;
    //   fetch.get("?action=/work/DeclareWorkload"+"&START_TIME="+form.expectStart+"&END_TIME="+form.expectEnd+"&CASE_ID="+form.caseId+"&WORK_ID="+form.workId+"&NORMAL_WORKLOAD="+form.standardWorkload+"&EXTRA_WORKLOAD="+form.wayWorkload,{}).then(res=>{
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaa", res)
    //   })
      
    // },
    formatTime (chtime){
      let d = new Date(chtime);
      let time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return time
    },
    noKeyword () {
      document.activeElement.blur()
    },
  }


}
</script>

<style scoped>
  .declareWordLoadView{width:100%;background: #ffffff;}
  .content{margin-top: 0.05rem;background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
   
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}

  .secondBoundaries{padding: 0 20px 0;margin: 20px 0;line-height: 10px;z-index: 999}
</style>

      
  