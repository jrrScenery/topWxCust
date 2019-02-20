<template>
    <div class="mineAppFeedBackView">
        <header-last :title="mineAppFeedBackTit" backUrl='mine'></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="mineAppFeedBackContent">
            <el-form :model="formData" label-width="0.8rem" ref="formData">
                <div class="article">{{title}}</div>
                <el-form-item class="text">
                    <el-input type="textarea" v-model="formData.article" placeholder="请输入反馈建议内容"></el-input>
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
    name:'mineAppFeedBack',
    components: {
        headerLast
    },
    data(){
        return{
            mineAppFeedBackTit:'意见反馈',
            title:'请留下您对APP的反馈意见',
            formData:{
                article:''
            }
        }
    },
    methods:{
        check(loading){
            if(this.formData.article == ""){
                this.$message({
                    message:'请输入内容!',
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
                    let params = "&EMP_NAME="+ localStorage.getItem("empId") +"&CONTENT="+window.encodeURI(this.formData.article);
                    fetch.get("?action=/system/insertSuggest"+params,"").then(res=>{
                        console.log("res",res);
                        loading.close();
                        if(res.STATUSCODE=="0"){
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
                            message:res.MESSAGE+"发生错误",
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
.mineAppFeedBackView{}
.mineAppFeedBackContent{margin-top: 0.05rem; background: #ffffff;}
.mineAppFeedBackContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.mineAppFeedBackContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
/* .mineAppFeedBackContent >>> .el-input__inner{border: none; color: #333333;}
.mineAppFeedBackContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.mineAppFeedBackContent >>> .el-input.is-disabled .el-input__inner{background: #ffffff} */
.article{line-height: 0.3rem; background: #f5f5f9; color: #acacac; padding-left: 0.25rem;}
.text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
.text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>


