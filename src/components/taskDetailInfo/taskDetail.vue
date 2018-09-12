<template>
    <div class="workBenchTaskDetailView">
        <div class="attention">{{attention}}</div>
        <div class="taskDetailCell">
            <div class="taskDetailTit">任务信息</div>
            <div class="content" ref="taskDetailInfo" :model="taskDetailInfo">
                <ul class="tableTd">
                    <li>
                        <span>派工单号：</span>  
                        <span>{{taskDetailInfo.workNo}}</span>          
                    </li>
                    <li>                
                        <span>执行状态：</span>  
                        <span>{{taskDetailInfo.workStatus}}</span>   
                    </li>
                    <li>                
                        <span>工作类型：</span>
                        <span>{{taskDetailInfo.workType}}</span>
                    </li>
                    <li>                
                        <span>客户联系人：</span>
                        <span>{{taskDetailInfo.customerContactor}}</span>
                    </li>
                    <li>                
                        <span>座机：</span>
                        <a @click="sendCall(taskDetailInfo.customerCellnumber)" v-bind:href="'tel:'+taskDetailInfo.customerCellnumber" style="font-size: 0.14rem; color: #2698d6;"> {{taskDetailInfo.customerCellnumber}} </a>
                    </li>
                    <li>                
                        <span>手机：</span>
                        <a @click="sendCall(taskDetailInfo.customerCellnumber)" v-bind:href="'tel:'+taskDetailInfo.customerCellnumber" style="font-size: 0.14rem; color: #2698d6;"> {{taskDetailInfo.customerCellnumber}} </a>
                    </li>
                    <li>                
                        <span>客户地址：</span>
                        <span>{{taskDetailInfo.customerAddress}}</span>
                    </li>
                    <li>                
                        <span>预计开始时间：</span>
                        <span>{{taskDetailInfo.expectStart}}</span>
                    </li>
                    <li>                
                        <span>预计结束时间：</span>
                        <span>{{taskDetailInfo.expectEnd}}</span>
                    </li>
                    <li>                
                        <span>标准工作量：</span>
                        <span>{{taskDetailInfo.standardWorkload}}</span>
                    </li>
                    <li>                
                        <span>路途工作量：</span>
                        <span>{{taskDetailInfo.wayWorkload}}</span>
                    </li>
                    <li>                
                        <span>要求到场时间：</span>
                        <span>{{taskDetailInfo.requireArriveTime}}</span>
                    </li>
                    <li>                
                        <span>设备型号：</span>
                        <span>{{taskDetailInfo.modelName}}</span>
                    </li>
                    <li>                
                        <span>序列号：</span>
                        <span>{{taskDetailInfo.sn}}</span>
                    </li>
                    <li>                
                        <span>工作要求：</span>
                        <span>{{taskDetailInfo.workRequire}}</span>
                    </li>
                    <li>                
                        <span>创建人：</span>
                        <span>{{taskDetailInfo.creatorRealname}}</span>
                    </li>
                    <li>                
                        <span>派工人：</span>   
                        <span>{{taskDetailInfo.creatorRealname}}</span>
                    </li>
                    <li>                
                        <span>派工人电话：</span>
                        <a @click="sendCall(taskDetailInfo.workManagerMobile)" v-bind:href="'tel:'+taskDetailInfo.workManagerMobile" style="font-size: 0.14rem; color: #2698d6;"> {{taskDetailInfo.workManagerMobile}} </a>
                    </li>
                    <li>                
                        <span>技术责任人：</span>
                        <span>{{taskDetailInfo.techManager}}</span>
                    </li>
                    <li>                
                        <span>技术责任人电话：</span>
                        <a @click="sendCall(taskDetailInfo.techManagerMobile)" v-bind:href="'tel:'+taskDetailInfo.techManagerMobile" style="font-size: 0.14rem; color: #2698d6;"> {{taskDetailInfo.techManagerMobile}} </a>
                    </li>
                    <li>                
                        <span>事件编号：</span>
                        <span>{{taskDetailInfo.caseNo}}</span>
                    </li>
                    <li>                
                        <span>创建时间：</span>
                        <span>{{taskDetailInfo.createDate}}</span>
                    </li>
                    <li>                
                        <span>事件级别：</span>
                        <span>{{taskDetailInfo.caseLevel}}</span>
                    </li>
                    <li>                
                        <span>事件类型：</span>
                        <span>{{taskDetailInfo.caseType}}</span>
                    </li>
                    <li>                
                        <span>项目ID：</span>
                        <span>{{taskDetailInfo.projectId}}</span>
                    </li>
                    <li>                
                        <span>项目编号：</span>
                        <span>{{taskDetailInfo.projectNo}}</span>
                    </li>
                    <li>                
                        <span>项目名称：</span>
                        <span>{{taskDetailInfo.projectName}}</span>
                    </li>
                    <li>                
                        <span>人员评价状态：</span>
                        <span>{{taskDetailInfo.eng2mgrEvalstatusName}}</span>
                    </li>
                    <li>                
                        <span>备件评价状态：</span>
                        <span>{{taskDetailInfo.eng2partEvalstatusName}}</span>
                    </li>
                </ul>
            </div>
        </div>

        
    </div>
</template>




<script>
// import headerLast from '../header/headerLast'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'taskDetail',
    components: {
        loadingtmp
    }, 
    props: ["taskDetailInfo"],
    data(){
        return{
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,      
            attention:"实施过程中遇到技术问题反馈技术责任人，非技术问题反馈派工人，非工作时间请联系 400-610-6661",
        }
        
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'workBenchTaskList') {
            to.meta.isUseCache = true;    
        }        
        next();
    },
   
}

</script>


<style scoped>
.workBenchTaskDetailView{width:100%;background: #ffffff;}
.attention{color: red;margin: 0.1rem;}
.taskDetailCell{overflow: scroll;margin-bottom: 0.5rem;}
.taskDetailCell .taskDetailTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.taskDetailCell .taskDetailTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.taskDetailCell .taskDetailTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}

.tableTd li{display: flex; line-height: 0.25rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd a{width: 100%;text-align: left;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa}  



</style>


