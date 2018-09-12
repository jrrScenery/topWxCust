<!--新增备件填写-->
<template>
  <div class="addPartsView">
      <div class="content">
          <el-form ref="form" :rules="rules" :model="form" label-width="1rem">
            <el-form-item label="备件来源">
              <el-radio-group v-model="form.partsSource" disabled>
                <!-- <el-radio label="1">供货件</el-radio> -->
                <el-radio label="2">换下件</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="PN/FRU">
              <el-input v-model="form.pnFru" placeholder="请输入PN/FRU" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="序列号">
              <el-input v-model="form.SN" placeholder="请输入序列号" class="bInput"></el-input>
            </el-form-item>
            <el-form-item label="备件类型">
              <el-select v-model="form.partsType" placeholder="请选择备件类型" clearable>
                <el-option v-for="item in partsTypeList" :label="item.partsTypeName" :value="item.partsTypeId" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有包装" prop="ifPackage">
              <el-radio-group v-model="form.ifPackage">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否已带走" prop="ifTakeaway">
              <el-radio-group v-model="form.ifTakeaway">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="使用情况" prop="useStatus">
              <el-select v-model="form.useStatus" placeholder="选择使用情况" clearable>
                <el-option v-for="use in useStatusList" :label="use.useStatusName" :value="use.useStatusId" :key="use.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="能否回收" prop="isRecycle">
              <el-radio-group v-model="form.isRecycle">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="回收件说明">
              <el-input placeholder="请输入回收件说明" v-model="form.useStatusRemark" class="bInput"></el-input>
            </el-form-item>
            <el-form-item class="submitCell">
              <el-button @click="onCancel">取消</el-button>
              <el-button class="submitBtn" type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        
        </div>

  </div>
</template>

<script>
import headerLast from "../header/headerLast"
import fetch from "../../utils/ajax.js"


export default {
  name: "addParts",

  components: {
      headerLast,
  },

  data () {
    return {
      declareTitle:"新增备件",
      form: {
        partsSource: "2",
        pnFru: "",
        SN: "",
        ifPackage: "",
        ifTakeaway: "",
        useStatus: "3",
        isRecycle: "",
        useStatusRemark: "",
        partsType: "",
        caseId: this.$route.query.caseId,
      },
      rules: {
        ifPackage: [
          { required: true, message: '请先选择是否包装', trigger: 'change' }
        ],
        ifTakeaway: [
          { required: true, message: '请先选择是否已带走', trigger: 'change' }
        ],
        useStatus: [
          { required: true, message: '请先选择使用情况', trigger: 'change' }
        ],
        isRecycle: [
          { required: true, message: '请先选择能否回收', trigger: 'change' }
        ],
      },
      partsTypeList: [],
      useStatus: "",
      useStatusList: [
        {"useStatusName": "已使用件", "useStatusId": "1"},
        {"useStatusName": "未使用件", "useStatusId": "2"},
        {"useStatusName": "坏件", "useStatusId": "3"},
        {"useStatusName": "DOA不可用", "useStatusId": "4"},
        {"useStatusName": "未到场", "useStatusId": "5"},
      ],
    };
  },
  created (){

    fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
      this.partsTypeList = res.DATA;
      console.log(this.partsTypeList)
    });
    
  },
  methods: {
    showMsg (msg){
      this.$notify({
        title: '警示信息',
        dangerouslyUseHTMLString: true,
        message: '<strong>'+msg+'</strong>',
      });
    },
    DATAParams (){
      let DATA = {};
      DATA.PARTS_SOURCE = this.form.partsSource;
      DATA.PN_FRU = this.form.pnFru;
      DATA.SN = this.form.SN;
      DATA.TYPE = this.form.partsType;
      DATA.USE_STATUS = this.form.useStatus;
      DATA.USE_STATUS_REMARK = this.form.useStatusRemark;
      DATA.IF_PACKAGE = this.form.ifPackage;
      DATA.IF_TAKEAWAY = this.form.ifTakeaway;
      DATA.IS_RECYCLE = this.form.isRecycle;
      DATA.CASE_ID = this.$route.query.caseId;
      return DATA;
    },

    onSubmit (formName) {
      let params=new URLSearchParams;
      let array = new Array;
      // console.log(this.ifData())
      array.push(this.DATAParams());
      array = JSON.stringify(array);
      params.append('DATA', array);
      params.append('UPDATE_DATE', this.getCurrentTime());
      params.append('CASE_ID', this.caseId);
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fetch.post("?action=/parts/updatePartsGathering", params).then(res=>{
            console.log("params", params)
            console.log(res)
            loading.close();
            if(res.STATUSCODE=="0"){
              this.$message({
                message:'提交成功',
                type: 'success',
                center: true,
                customClass: 'msgdefine'
                });

              this.$router.go(0);
              let data = {
                popBg: false
              };
              this.$emit('change', data)
            }
            else{
              this.$message({
                message:res.MESSAGE+"发生错误",
                type: 'error',
                center: true,
                customClass: 'msgdefine'
              });
              let data = {
                popBg: false
              }
              this.$emit('change', data)
            }
              
          });
        } else {
          loading.close();
          this.$message({
                  message:"请正确填写",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
          return false;
        }
      })
    },
    onCancel () {
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    },

    getCurrentTime () {
      let month = new Date().getMonth() + 1;
      let currentTime = (new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
      //console.log(yearArr)
      return currentTime
    },
  }


}
</script>

<style scoped>
  .addPartsView{width:100%;background: #ffffff;}
  .content{width:100%; margin-top: 0.5rem;background: #ffffff;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
  .content >>> .el-form-item__error{position: relative}
  .content >>> .el-input__inner{border: none; color: #333333; padding: 0px 0px}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
   

  .content >>> .submitCell{position: relative}
  .content >>> .submitCell .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .content >>> .submitCell .el-button:hover{background: #ffffff;}
  .content >>> .submitCell .searchBtnCell:hover{background: #2698d6;}
  .content >>> .submitCell .el-form-item__content{margin: 0!important; display: flex;}
  .content >>> .submitCell .submitBtn{background: #2698d6; color: #ffffff;}

  /* .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.41rem; position: relative; bottom: 0;} */

  .secondBoundaries{padding: 0 20px 0;margin: 20px 0;line-height: 10px;z-index: 999}
</style>