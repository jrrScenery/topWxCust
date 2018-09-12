<template>
    <div class="onsiteServiceInfoView">
        <header-last v-if="serviceType==2" :title="onsiteServiceInfoTit"></header-last>
        <header-last v-else :title="onsiteServiceInfoTit1"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="eventShowTabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="实施前确认" name="first"><before-work-confirm></before-work-confirm></el-tab-pane>
                <el-tab-pane label="完成后总结" name="second" lazy><end-summary></end-summary> </el-tab-pane>
                <el-tab-pane label="客户评价" name="third" lazy><customer-edit-rate></customer-edit-rate> </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import beforeWorkConfirm from '../../components/service/beforeWorkConfirm'
import endSummary from '../../components/service/endSummary'
import customerEditRate from '../../components/service/customerEditRate'
import HeaderLast from '../header/headerLast'
export default {
    name: 'onsiteServiceInfo',
    components: {
        HeaderLast,
        beforeWorkConfirm,
        endSummary,
        customerEditRate
    },

    data(){
        return{
            onsiteServiceInfoTit:'现场服务单',
            onsiteServiceInfoTit1:"故障处理服务单",
            activeName:'first',
            caseId:this.$route.query.caseId,
            workId:this.$route.query.workId,
            serviceId:this.$route.query.serviceId,
            serviceType:this.$route.query.serviceType,
            taskId:this.$route.query.taskId
        }
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'serviceList') {
            to.meta.isUseCache = false;    
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


