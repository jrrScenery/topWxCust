<template>
    <div class="workBenchTaskDetailView">
        <header-last :title="workBenchTaskDetailTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="taskDetailView">
            <el-tabs v-model="activeName">
                <el-tab-pane label="任务信息" name="first"><task-detail :task-detail-info="taskDetailInfo"></task-detail></el-tab-pane>
                <el-tab-pane :label="secondTabTit+'('+specialNotes.length+')'" name="second" lazy><special-notes></special-notes></el-tab-pane>
                <el-tab-pane :label="thirdTabTit+'('+riskInfos.length+')'" name="third" lazy><risk-warn></risk-warn></el-tab-pane>
            </el-tabs>
        </div>
        <div class="eventShowFooter">
        <el-row>
            <el-col :span="7">
            <div @click="choiseUndertake">
            <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
            <span>承接反馈</span>
            </div>
            </el-col>
            <el-col :span="7">
            <router-link v-if="taskDetailInfo.workStatusId==6" :to="{name:'workBenchSLAfeedback',query:{workId:this.$route.query.workId}}">
                <div>
                    <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                    <span>SLA反馈</span>
                </div>
            </router-link>
            <div  v-else @click="SLAclickService">
                    <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                    <span>SLA反馈</span>
                </div>
            </el-col>
            <el-col :span="7" >
            <router-link v-if="taskDetailInfo.workStatusId!=5" :to="{name:'serviceList',query:{caseId:this.$route.query.caseId,workId:this.$route.query.workId,taskId:taskDetailInfo.taskId}}">
                <div>
                <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                <span>服务单</span>
                </div>
            </router-link>
            <div v-else @click="clickService">
                <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.145rem; height: 0.145rem;" alt="">
                <span>服务单</span>
            </div>
            </el-col>
            <el-col :span="3"><div class="el-icon-more" @click.stop="popBg=!popBg"></div></el-col>
        </el-row>
        </div>
        <div v-if="popBg" class="popBg" @click.stop="popBg=!popBg">
        <ul>
            <router-link :to="{name:'declareWorkLoad', query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,creatorRolename:this.taskDetailInfo.creatorRealname,expectStart:this.taskDetailInfo.expectStart,expectEnd:this.taskDetailInfo.expectEnd,standardWorkload:this.taskDetailInfo.standardWorkload}}">
            <li><img src="../../assets/images/eventBaseInfo_4.png" alt="">工作量申报</li>
            </router-link>
            <router-link :to="{name:'casePartEvaluate',query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,templateType:1,bjflg:0}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">人员评价</li>
            </router-link>
            <router-link :to="{name:'casePartEvaluate',query:{caseId:this.taskDetailInfo.caseId,workId:this.taskDetailInfo.workId,templateType:2,bjflg:1}}">
            <li class="slali"><img style="width:20px;height:16px;margin:0px" src="../../assets/images/sla.png" alt="">备件评价</li>
            </router-link>
            <router-link :to="{name: 'sparePartsSortOut',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">备件整理</li>
            </router-link>
            <router-link :to="{name:'workBenchPartRecycle',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">备件回收</li>
            </router-link>
            <router-link :to="{name:'eventReplenish',query:{caseId:this.$route.query.caseId,type:'process',workId:this.$route.query.workId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">过程记录</li>
            </router-link>
            <router-link :to="{name:'eventSLAInfo',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">SLA标准查看</li>
            </router-link>
            <router-link :to="{name:'eventPeople',query:{caseId:this.caseId}}">
            <li><img src="../../assets/images/eventBaseInfo_5.png" alt="">参与人员</li>
            </router-link>           
        </ul>
        </div>
        <div class="dialogUndertake">
            <el-dialog width="80%" :visible.sync="outerVisibleUndertake" :show-close="false">
                <div class="modalUndertake" slot="footer">
                <ul>
                    <li @click="onUndertake">
                        <el-button type="text">承接</el-button>
                    </li>
                    <li @click="innerVisibleUndertake = true">
                        <el-button type="text">拒绝</el-button>
                    </li>
                    <li @click="outerVisibleUndertake = false">
                        <el-button type="text">取消</el-button>
                    </li>
                </ul>
                </div>
            </el-dialog>
        </div>
        <div class="dialogRefuseReason">
        <el-dialog width="80%" style="margin-top: 15vh" :visible.sync="innerVisibleUndertake" :show-close="false">
            <div class="dialog-body">
            <el-form>
                <el-form-item>
                    <el-input type="textarea" v-model="taskDetailInfo.refuseReason" placeholder="请填写拒绝理由"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="text" @click="innerVisibleUndertake = false">取消</el-button>
                    <el-button type="text" @click="onRefuse">拒绝</el-button>
                </el-form-item> -->
            </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="innerVisibleUndertake = false">取 消</el-button>
                <el-button type="primary" @click="onRefuse">拒 绝</el-button>
            </div>
        </el-dialog>
        </div>
        <div class="dialogUndertake">
            <el-dialog :visible.sync="outerVisibleCool" :show-close="false">
                <div class="modalUndertake">
                <ul>
                    <li @click="onCool">
                        <el-button type="text">爽约</el-button>
                    </li>
                    <li @click="outerVisibleCool = false">
                        <el-button type="text">取消</el-button>
                    </li>
                </ul>    
                </div>
            </el-dialog>
        </div>
    </div>
</template>




<script>
import taskDetail from '../../components/taskDetailInfo/taskDetail'
import specialNotes from '../../components/taskDetailInfo/specialNotes'
import riskWarn from '../../components/taskDetailInfo/riskWarn'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchTaskDetailInfo',
    components: {
        headerLast,
        taskDetail,
        specialNotes,
        riskWarn
    }, 
    data(){
        return{
            workBenchTaskDetailTit:'任务',
            secondTabTit:"项目特殊提示",
            thirdTabTit:'风险提示',
            activeName: 'first',
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            taskId:this.$route.query.taskId,
            expectStart:this.$route.query.expectStart,
            expectEnd:this.$route.query.expectEnd,
            creatorRealname:this.$route.query.creatorRealname,
            taskDetailInfo:{},
            specialNotes:[],
            riskInfos:[],
            eng2partEvalid:'',
            popBg: false,
            popBgUndertake: false,
            popBgRefusal: false,
            refuseReason: '',
            showModal: false,
            outerVisibleUndertake: false,
            innerVisibleUndertake: false,
            outerVisibleCool: false,
        }
        
    },
    created:function(){
        fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
            console.log(res.DATA);   
            this.taskDetailInfo = res.DATA[0];
            this.taskDetailInfo.refuseReason = '';
            this.specialNotes = res.DATA[0].specialNotes;
            this.riskInfos = res.DATA[0].riskInfos;
        });
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'workBenchTaskList') {
            to.meta.isUseCache = true;    
        }        
        next();
    },
    methods: {
        clickService(){
            this.$message({
                message:'已爽约状态没有服务单！',
                type: 'warning',
                center: true,
                customClass: 'msgdefine'
            });
        },
        SLAclickService(){
            this.$message({
                message:'任务尚未承接，无法反馈！',
                type: 'warning',
                center: true,
                customClass: 'msgdefine'
            });
        },
        onCancel () {
            let data = {
            popBgUndertake: false
            } 
            // this.$emit('change', data)
        },
        onUndertake () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=2" + params,{}).then(res=>{
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.outerVisibleUndertake = false;
        },
        onIndependence () {
            this.$message({
                message:'当前环节不能承接反馈！',
                type: 'warning',
                center: true,
                customClass:'msgdefine'
            });
        },
        onCool () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=5" + params,{}).then(res=>{
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.outerVisibleCool = false;
        },
        onRefuse () {
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm = this;
            let params = "&CASE_ID="+this.taskDetailInfo.caseId+"&WORK_ID="+this.taskDetailInfo.workId+"&ACCEPT_DATE="+this.getCurrentTime()+"&REFUSE_REASON="+this.taskDetailInfo.refuseReason;
            fetch.get("?action=/work/UpdateWorkAcceptStatus"+"&ACCEPT_STATUS=3" + params,{}).then(res=>{
                loading.close();
                if(res.STATUSCODE=="0"){
                    this.$message({
                        message:'提交成功',
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    })
                    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
                        this.taskDetailInfo.workStatus = res.DATA[0].workStatus;
                    });
                }
                else{
                    this.$message({
                        message:res.MESSAGE+"发生错误",
                        type: 'error',
                        center: true,
                        customClass: 'msgdefine'
                    });
                    return false
                }
            });
            this.innerVisibleUndertake = false;
            this.outerVisibleUndertake = false;
            console.log(this.taskDetailInfo.refuseReason);
        },
        choiseUndertake () {
            if (this.taskDetailInfo.workStatusId == 0) 
            {
                this.outerVisibleUndertake = true;
            }
            else if (this.taskDetailInfo.workStatusId == 6)
            {
                this.outerVisibleCool = true;
            }
            else
            {
                this.onIndependence();
            } 
        },
        getCurrentTime () {
            let month = new Date().getMonth() + 1;
            let currentTime = (new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
            //console.log(yearArr)
            return currentTime
        },
        noKeyword () {
            document.activeElement.blur()
        },
    
    }

}

</script>


<style scoped>
.workBenchTaskDetailView{width:100%;background: #ffffff;}
.taskDetailView{margin: 0 0; background: #ffffff; position: relative;}
.taskDetailView >>> .el-tabs__header{margin: 0 0 0.1rem;}
.taskDetailView >>> .el-tabs__item.is-active{color: #2698d6;}
.taskDetailView >>> .el-tabs__active-bar{background: #2698d6;}
.taskDetailView >>> .el-tabs__nav{width: 100%; text-align: center;}
.taskDetailView >>> .el-tabs__item{width: 33%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}

.eventShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
.eventShowFooter .el-row{}
.eventShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
.eventShowFooter .el-row .el-col img{vertical-align: sub;}
.eventShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}

.popBg{background: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
.popBg ul{background: #f5f5f9; position: absolute; right: 0; bottom: 0.5rem; z-index: 2; line-height: 0.3rem}
.popBg li{padding: 0 0.15rem}
.popBg .slali{padding: 0 0.12rem}
.popBg li:nth-child(1){border-bottom: 0.01rem solid #e1e1e1;}
.popBg li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}

.modalUndertake{background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1}
.modalUndertake ul{background: #f5f5f9; position: absolute; bottom: 0.5rem; z-index: 2; line-height: 0.3rem; width: 100%;}
.modalUndertake li{padding: 0 0.15rem; border-bottom: 0.01rem solid #e1e1e1; text-align: center}
.modalUndertake .slali{padding: 0 0.12rem}
/* .modalUndertake li:nth-child(2){border-bottom: 0.01rem solid #e1e1e1;} */
.modalUndertake li img{width: 0.15rem; height: 0.15rem; vertical-align: sub}


/* .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 3rem!important; color: #333333;}
.text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;} */


.dialogUndertake >>> .el-dialog__body{padding: 0px 0px}
.dialogUndertake >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogUndertake >>> .el-dialog__footer{padding: 0px 0px 0px}

.dialogRefuseReason >>> .el-dialog__header{padding: 0px 0px 0px}
.dialogRefuseReason >>> .el-dialog__body{padding: 15px 5px}
.dialogRefuseReason >>> .el-dialog__footer{padding: 1px 5px 5px; text-align:center}

</style>


