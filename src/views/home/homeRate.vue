<template>
  <div class="homeRateView">
      <header-last :title="homeRateTit"></header-last>
      <div style="height: 0.45rem;"></div>
      <div class="homeRateContent">
        <el-form :model="formData" label-width="1.2rem" ref="formData">
            <el-form-item label="输入事件编号：">
                <el-input v-model="formData.caseId" placeholder="请输入事件编号进行评价"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
                <el-button @click="submitForm('formData')">确认</el-button>
            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name: 'homeRate',
    components: {
        headerLast
    },
    data () {
        return {
            homeRateTit: '客户评价',
            formData:{
                caseId:''
            }
        }
    },
    methods:{
        submitForm (formName) {
            const loading = this.$loading({
                lock: true,
                text: '查询中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(vm.formData.caseId == ""){
                        this.$message({
                            message:'请输入事件编号!',
                            type: 'warning',
                            center: true,
                            duration:1000,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return false
                    }else{
                        loading.close();
                        let params = "&CASE_ID="+ vm.formData.caseId;
                        setTimeout(function(){vm.$router.push({ name: 'caseEvaluateList',query:{caseId:vm.formData.caseId,route:'homeRate'}})},1000);
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
.homeRateView{width: 100%;position: relative;background: #ffffff;}
.homeRateContent{margin-top: 0.05rem; background: #ffffff;}
.homeRateContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.homeRateContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.1rem; text-align: left;}
.homeRateContent >>> .el-input__inner{border: none; color: #333333;}
.homeRateContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>


