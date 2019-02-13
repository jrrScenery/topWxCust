<template>
    <div class="changePwdView">
        <header-last :title="changePwdTit" backUrl='mine'></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="changePwdContent">
            <el-form :model="formData" label-width="0.9rem" ref="formData">
                <el-form-item label="输入旧密码：">
                    <el-input v-model="formData.oldPwd" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="输入新密码：">
                    <el-input v-model="formData.newPwd" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码：">
                    <el-input v-model="formData.confirmNewPwd" placeholder="请输入"></el-input>
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
import fetch from '../../utils/ajax'
export default {
    name:'changePwd',
    components: {
        headerLast
    },
     data(){
        return{
            changePwdTit:'修改密码',
            formData:{
                oldPwd:'',
                newPwd:'',
                confirmNewPwd:''
            }
        }
    },

    methods:{
        check(loading){
            if(this.formData.oldPwd == ""){
                this.$message({
                    message:'请输入旧密码!',
                    type: 'warning',
                    center: true,
                    duration:1000,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.newPwd == ""){
                this.$message({
                    message:'请输入新密码!',
                    type: 'warning',
                    center: true,
                    duration:1000,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.confirmNewPwd == ""){
                this.$message({
                    message:'请输入确认密码!',
                    type: 'warning',
                    center: true,
                    duration:1000,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.confirmNewPwd != this.formData.newPwd){
                this.$message({
                    message:'输入新密码不一致!',
                    type: 'warning',
                    center: true,
                    duration:1000,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true;
        },
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
                    if(!vm.check(loading)) return;
                    let params = "&PASSWORD="+ this.formData.oldPwd +"&NEW_PASSWORD="+this.formData.newPwd;
                    console.log(params);
                    fetch.get("?action=/system/modifyPassword"+params,"").then(res=>{
                        console.log("res",res)
                        loading.close();
                        if(res.STATUSCODE=="1"){
                            this.$message({
                            message:'提交成功',
                            type: 'success',
                            center: true,
                            duration:1000,
                            customClass: 'msgdefine'
                            });
                            setTimeout(function(){vm.$router.push({ name: 'mine',query:{}})},1000);
                        }
                        else{
                            this.$message({
                            message:res.MESSAGE,
                            type: 'error',
                            center: true,
                            duration:1000,
                            customClass: 'msgdefine'
                            });
                        }
                        
                    });
                } else {
                    this.$message({
                        message:"请正确填写",
                        type: 'error',
                        center: true,
                        duration:1000,
                        customClass: 'msgdefine'
                        });
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
.changePwdView{}
.changePwdContent{margin-top: 0.05rem; background: #ffffff;}
.changePwdContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.changePwdContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.1rem; text-align: left;}
.changePwdContent >>> .el-input__inner{border: none; color: #333333;}
.changePwdContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
