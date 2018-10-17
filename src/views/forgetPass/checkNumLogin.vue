<!--暂时未用-->
<template>
    <div class="checkNumLoginView">
        <header-last :title="checkNumLoginTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="checkNumLoginContent">
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
                    <el-button @click="submitForm('formData')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
    name:'checkNumLogin',
    components:{
        headerLast
    },
    data(){
        return{
            checkNumLoginTit:'验证码登录',
            formData:{
                mobileNo:'',
                checkNum:''
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
                // this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
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
                this.dialogVisible = false;
                this.$axios.get(global_.Server+"/api/loginByCode?CODE="+this.formData.checkNum+"&MOBILE="+this.formData.mobileNo,'').then(res=>{
                    console.log("res:",res);
                    loading.close();            
                    if(res.status==500){
                    alert("连接服务超时或密码错");
                    return;
                    }
                    if(res.data.STATUSCODE=="0"){                       
                        global_.userInfo = res.data.userInfo;
                        global_.userPermission = res.data.userPermission;
                        global_.userRole = res.data.userRole;
                        global_.empId = res.data.userInfo[0].EMPID;

                        let token = res.data.token;
                        localStorage.setItem("token", token);

                        localStorage.setItem("empId", res.data.userInfo[0].EMPID);
                        localStorage.setItem("realName", res.data.userInfo[0].REALNAME);
                        localStorage.setItem("mobile", res.data.userInfo[0].MOBILE);
                        localStorage.setItem("email", res.data.userInfo[0].EMAIL);
                        localStorage.setItem("orgName", res.data.userInfo[0].ORGNAME);
                        localStorage.setItem("userPermission", JSON.stringify(res.data.userPermission));
                        this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
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
        beforeRouteLeave( to, from,next){
            console.log(1111);
            if (to.name == 'home') {
                to.meta.isUseCache = false;    
            }        
            next();
        }
    }
}
</script>

<style scoped>
.checkNumLoginView{width: 100%}
.checkNumLoginContent{margin-top: 0.05rem; background: #ffffff;}
.checkNumLoginContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.checkNumLoginContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left;}
.checkNumLoginContent >>> .el-input__inner{border: none; color: #333333;}
.checkNumLoginContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>


