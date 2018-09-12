<template>
    <div class="endSummaryView">
        <div class="serviceInfoCell">
            <div class="serviceInfoTit">用户及项目信息</div>
            <div class="serviceContent">
                <el-form :model="formData" ref="formData">
                    <ul class="tableTd">
                        <li>
                            <span>服务单号</span>
                            <span>{{formData.userAndPrjItem.serviceCd}}</span>
                        </li>
                        <li>
                            <span>项目编号</span>
                            <span>{{formData.userAndPrjItem.projectCode}}</span>
                        </li>
                        <li>
                            <span>项目名称</span>
                            <span>{{formData.userAndPrjItem.projectName}}</span>
                        </li>
                        <li>
                            <span>用户单位</span>
                            <span>{{formData.userAndPrjItem.customerName}}</span>
                        </li>
                        <li>
                            <span>联系人</span>
                            <span>{{formData.userAndPrjItem.realname}}</span>
                        </li>
                        <li>
                            <span>联系电话</span>
                            <span>{{formData.userAndPrjItem.contactMobile}}</span>
                        </li>
                        <li>
                            <span>事件编号</span>
                            <span>{{formData.userAndPrjItem.caseCd}}</span>
                        </li>
                        <li v-if="serviceType==2">
                            <span>工程师姓名</span>
                            <span>{{formData.userAndPrjItem.enginnername}}</span>
                        </li>
                    </ul>
                    <el-form-item v-if="serviceType==2" label="服务类型">
                        <el-col :span="15">
                            <el-select clearable placeholder="请选择服务类型" v-model="formData.serviceType" style="width:100%">
                                <el-option v-for="item in serviceTypeArr" :label="item.DICTNAME" :value="item.DICTID" :key="item.value">
                            </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="到场时间">
                        <el-col :span="15">
                            <el-date-picker
                            v-model="formData.userAndPrjItem.arriveTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="离场时间">
                        <el-col :span="15">
                            <el-date-picker
                            v-model="formData.userAndPrjItem.leaveTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择时间"
                            style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <div v-if="serviceType==2">
                        <el-form-item label="实际实用工时">
                            <el-col :span="12">
                            <el-input v-model="formData.userAndPrjItem.realWork" placeholder="请输入使用工时" style="width:100%"></el-input>
                            </el-col>
                        </el-form-item>
                        <div class="article">{{content}}</div>
                        <el-form-item>
                            <el-input type="textarea" v-model="formData.userAndPrjItem.workContent" placeholder="请输入工作内容"></el-input>
                        </el-form-item>
                        <div class="article">{{result}}</div>
                        <el-form-item>
                            <el-radio-group v-for="item in workResultArr" :key="item.id" v-model="formData.workResult">
                                <el-radio :label="item.DICTID" style="width:100%;margin-left:0.25rem">{{item.DICTNAME}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="textarea" v-model="formData.userAndPrjItem.problemPlan" placeholder="若存在问题及下一步计划：若顺利完成，则此项填无"></el-input>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="故障现象">
                            <el-input v-model="formData.userAndPrjItem.faultDesc" placeholder="请输入故障现象"></el-input>
                        </el-form-item>
                        <el-form-item label="分析诊断">
                            <el-input v-model="formData.userAndPrjItem.analysis" placeholder="请输入分析诊断"></el-input>
                        </el-form-item>
                        <el-form-item label="实施结果">
                            <el-input v-model="formData.userAndPrjItem.implementResult" placeholder="请输入实施结果"></el-input>
                        </el-form-item>
                        <el-form-item label="遗留问题及建议">
                            <el-input v-model="formData.userAndPrjItem.problemSuggest" placeholder="请输入遗留问题及建议"></el-input>
                        </el-form-item>
                    </div>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="serviceSubmitBtn" v-if="!workResultInfo">
                        <el-button @click="submitForm('formData')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
    name: 'endSummaryView',

    components: {
    },
    data(){
        return{
            formData:{
                userAndPrjItem:'',
                serviceType:"",
                workResult:""
            },
            workResultInfo:'',
            workResultArr:[],
            serviceTypeArr:[],
            content:"工作内容",
            result:"工作结果",
            activeName:'second',
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            taskId:this.$route.query.taskId,
            serviceId:this.$route.query.serviceId,
            serviceType:this.$route.query.serviceType
        }
    },
    created:function(){
        if(this.serviceType==2){
            fetch.get("?action=/work/GetOnsiteServiceFormInfo&CASE_ID="+this.$route.query.caseId+"&SERVICE_ID="+this.$route.query.serviceId).then(res=>{
                console.log(res);
                this.formData.userAndPrjItem = res.DATA[0];
                this.workResultInfo = res.DATA[0].workResult;
            })
            fetch.get("?action=/system/getDict2&DICT_TYPE=NT_SERVICE_TYPE","").then(res=>{
                console.log(res);
                this.serviceTypeArr = res.data;
            })
            fetch.get("?action=/system/getDict2&DICT_TYPE=NT_CASE_WORK_RESULT","").then(res=>{
                console.log(res);
                this.workResultArr = res.data;
            })
        }else{
            fetch.get("?action=/work/GetCaseroubleShootingServiceFormInfo&CASE_ID="+this.$route.query.caseId+"&SERVICE_ID="+this.$route.query.serviceId).then(res=>{
                console.log(res);
                this.formData.userAndPrjItem = res.DATA[0];
                this.workResultInfo = res.DATA[0].implementResult;
            })
        }
    },
    methods:{      
        check(loading){
            console.log(this.formData.serviceType);
            if(this.formData.serviceType==null&&this.serviceType==2){
                this.$message({
                    message:'请选择服务类型!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.arriveTime==null){
                this.$message({
                    message:'请填写到场时间!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.leaveTime==null){
                this.$message({
                    message:'请填写离场时间!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.realWork==null&&this.serviceType==2){
                this.$message({
                    message:'请填写实际工时!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.workResult==null&&this.serviceType==2){
                this.$message({
                    message:'请填写工作结果!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            
            if(this.formData.userAndPrjItem.workContent==null&&this.serviceType==2){
                this.$message({
                    message:'请填写工作内容!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.problemPlan==null&&this.serviceType==2){
                this.$message({
                    message:'请填写存在问题!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.faultDesc==null&&this.serviceType==1){
                this.$message({
                    message:'请选择工作结果!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.analysis==null&&this.serviceType==1){
                this.$message({
                    message:'请填写分析诊断!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.implementResult==null&&this.serviceType==1){
                this.$message({
                    message:'请填写实施结果!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.userAndPrjItem.problemSuggest==null&&this.serviceType==1){
                this.$message({
                    message:'请填写遗留问题及建议!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true;
        },
        submitForm(formName){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(!vm.check(loading)) return;
                    var data=new URLSearchParams;
                    data.append('serviceId',this.formData.userAndPrjItem.serviceId);
                    data.append('opFlg',1);
                    data.append('customerId',this.formData.userAndPrjItem.customerId);
                    var temp = {};
                    temp.serviceId = this.formData.userAndPrjItem.serviceId;
                    temp.caseId=this.caseId;
                    if(vm.serviceType==2){
                        temp.serviceType = this.formData.serviceType;
                        temp.realWork = this.formData.userAndPrjItem.realWork;
                        temp.workContent = this.formData.userAndPrjItem.workContent;
                        temp.workResult = this.formData.workResult;
                        temp.problemPlan = this.formData.userAndPrjItem.problemPlan;
                    }else{
                        temp.faultDesc = this.formData.userAndPrjItem.faultDesc;
                        temp.analysis = this.formData.userAndPrjItem.analysis;
                        temp.implementResult = this.formData.userAndPrjItem.implementResult;
                        temp.problemSuggest = this.formData.userAndPrjItem.problemSuggest;
                    }
                    temp.arriveTime = this.formData.userAndPrjItem.arriveTime;
                    temp.leaveTime = this.formData.userAndPrjItem.leaveTime;
                    console.log(temp);
                    data.append('data',JSON.stringify(temp));
                    console.log(data);
                    let nowWorkId = vm.workId;
                    let nowCaseId = vm.caseId;
                    let nowtaskId = vm.taskId;
                    if(vm.serviceType==2){
                        fetch.post("?action=/work/UpdateSceneServiceFormInfo",data).then(res=>{
                            console.log(res);    
                            loading.close();
                            if(res.STATUSCODE=="0"){
                                this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                                });
                                setTimeout(function(){vm.$router.push({ name: 'serviceList',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}})},1000);
                            }else{
                                this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                                });
                            }
                        })
                    }else{
                        fetch.post("?action=/work/UpdateCaseTroubleShootingServiceFormInfo",data).then(res=>{
                            console.log(res);    
                            loading.close();
                            if(res.STATUSCODE=="0"){
                                this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                                });
                                setTimeout(function(){vm.$router.push({ name: 'serviceList',query:{caseId:nowCaseId,workId:nowWorkId,taskId:nowtaskId}})},1000);
                            }else{
                                this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                                });
                            }       
                        })                     
                    }
                }
            })
        }
    }

}
</script>


<style scoped>
    .endSummaryView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.1rem}
    .serviceInfoCell{white-space:normal}
    .serviceInfoCell .serviceInfoTit{position: relative; line-height: 0.2rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
    .serviceInfoCell .serviceInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
    .serviceInfoCell .serviceInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
    /* .summaryView{margin:0.1rem;line-height: 0.2rem} */
    .serviceContent{background: #ffffff; color: #999999; padding: 0.1rem 0.05rem 0.15rem;}
    .serviceContent >>> .el-form-item{border-bottom: 0.01rem; margin: 0.03rem 0;}
    .serviceContent >>> .el-form-item__label{font-size: 0.13rem; padding: 0 0.2rem 0 0.2rem; text-align: left}
    .article{line-height: 0.3rem; padding: 0 0.2rem 0 0.2rem;}
    .tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
    .serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;}

</style>

