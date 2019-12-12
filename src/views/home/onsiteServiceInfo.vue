<template>
    <div class="onsiteServiceInfoView">
        <header-service v-if="serviceType==2" :title="onsiteServiceInfoTit"></header-service>
        <header-service v-else :title="onsiteServiceInfoTit1"></header-service>
        <div style="height: 0.45rem;"></div>
        <div class="eventShowTabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="实施前确认" name="first" lazy><before-work-confirm></before-work-confirm></el-tab-pane>
                <el-tab-pane label="完成后总结" name="second" lazy><end-summary></end-summary> </el-tab-pane>
                <el-tab-pane label="客户评价" name="third"><customer-edit-rate></customer-edit-rate> </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import beforeWorkConfirm from '../../components/service/beforeWorkConfirm'
import endSummary from '../../components/service/endSummary'
import customerEditRate from '../../components/service/customerEditRate'
import headerService from '../header/headerService'
export default {
    name: 'onsiteServiceInfo',
    components: {
        headerService,
        beforeWorkConfirm,
        endSummary,
        customerEditRate
    },

    data(){
        return{
            onsiteServiceInfoTit:'现场服务单',
            onsiteServiceInfoTit1:"故障处理服务单",
            activeName:'first',
            caseId:this.$route.params.caseId,
            workId:this.$route.params.workId,
            serviceId:this.$route.params.serviceId,
            serviceType:this.$route.params.serviceType,
            taskId:this.$route.params.taskId,
            evaluateId:this.$route.params.evaluateId
        }
    },
    created(){
        // console.log("caseId:",this.caseId);
        // console.log("serviceId:",this.serviceId);
        // console.log("serviceType:",this.serviceType);
        // console.log("evaluateId:",this.evaluateId);
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'serviceList') {
            to.meta.isUseCache = true;    
        }        
        next();
    },
}
</script>

<style scoped>
    .onsiteServiceInfoView{width: 100%}
    .eventShowTabs{margin: 0 0; background: #ffffff; position: relative;}
    .eventShowTabs >>> .el-tabs__header{margin: 0 0 0.1rem;}
    .eventShowTabs >>> .el-tabs__item.is-active{color: #2698d6;}
    .eventShowTabs >>> .el-tabs__active-bar{background: #2698d6;}
    .eventShowTabs >>> .el-tabs__nav{width: 100%; text-align: center;}
    .eventShowTabs >>> .el-tabs__item{width: 33%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>


