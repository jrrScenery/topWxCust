<!--暂时未用-->
<template>
    <div class="forgetPassView">
        <header-last :title="forgetPassTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="forgetPassContent">
            <el-form :model="formData" label-width="0.8rem" ref="formData">
                <el-form-item label="手机号：">
                    <el-input v-model="formData.mobileNo" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <div style="display:flex">
                    <el-form-item label="验证码：">
                        <el-input v-model="formData.checkNum" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" round @click="fetchCheckNum">获取</el-button>
                    </el-form-item>
                </div>
                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('formData')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
export default {
    name:'forgetPass',
    components:{
        headerLast
    },
    data(){
        return{
            forgetPassTit:'密码重置',
            formData:{
                mobileNo:'',
                checkNum:'',
                newPassWord:'',
                checkPassWord:''
            }
        }
    },
    methods:{
        fetchCheckNum(){
            const loading = this.$loading({
                lock: true,
                text: '获取中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            });
            if(!this.checkMobile(loading)) return;
            console.log(this.formData.mobileNo);
            this.$axios.get(global_.Server+"/api/sendIdCode?MOBILE="+this.formData.mobileNo+"&TYPE=1",'').then(res=>{
                console.log("res:",res);
                loading.close();
            })
        },
        submitForm(formData){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formData].validate((valid) => {
                if (valid) {
                    if(!vm.check(loading)) return;
                    this.$axios.get(global_.Server+"/api/resetPassword?idCode="+this.formData.checkNum+"&mobileNo="+this.formData.mobileNo,'').then(res=>{
                        console.log("res:",res);
                        loading.close();
                        if(res.data.STATUSCODE==0){
                            this.$message({
                                message:res.data.MESSAGE,
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                            });
                            setTimeout(function(){vm.$router.push({name: 'login',query:{}})},1000);
                        }else{
                            this.$message({
                                message:res.data.MESSAGE,
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                            });
                        }
                    })
                }
            })
        },
        checkMobile(loading){
            if(this.formData.mobileNo==''){
                this.$message({
                    message:'请输入手机号!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true
        },
        check(loading){
            if(this.formData.mobileNo==''){
                this.$message({
                    message:'请输入手机号!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.checkNum==''){
                this.$message({
                    message:'请输入验证码!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }            
            return true
        }
    }
}
</script>

<style scoped>
.forgetPassView{width: 100%}
.forgetPassContent{margin-top: 0.05rem; background: #ffffff;}
.forgetPassContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.forgetPassContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left;}
.forgetPassContent >>> .el-input__inner{border: none; color: #333333;}
.forgetPassContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>


