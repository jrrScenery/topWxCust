<template>
    <div class="ITSoftWareServiceView">
        <header-last :title="ITSoftWareServiceTit"></header-last>
        <div class="ITSoftWareServiceCell">
            <div class="content">
                <div>
                    软件运维服务：可为操作系统软件、数据库系统、中间件、邮件系统、HA高可用性软件、虚拟化软件、备份软件，
                    提供故障处置、健康检查、补丁升级、配置调整、技术咨询、服务档案维护、技术专题培训、重要时刻值守、性能分析与优化、专家现场评估等各类所需服务内容。
                </div>
                <div class="ITSoftWareServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">（1）单一服务提供商解决软件使用或维护问题，简化多厂商管理</el-col>  
                    <el-col :span="24">（2）拥有业界各品牌厂商的顶级专家，重大软硬件故障均可担当并解决各种软硬件疑难问题和故障</el-col>
                    <el-col :span="24">（3）快速、专业、安全地解决软件故障</el-col>
                    <el-col :span="24">（4）根据业务的需要，及时对系统软件进行有效、安全变更</el-col>
                    <el-col :span="24">（5）从业务和应用系统发展趋势和现状入手，对系统软件运行进行保障和调优</el-col>
                    <el-col :span="24">（6）企业IT人员可以将工作重心集中到更高一级的业务目标上</el-col>
                    <el-col :span="24">（7）神州信息的高效服务，可以降低客户软件运维成本</el-col>
                </el-row>   
                <div class="ITSoftWareServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">
                        覆盖客户IT系统内90%的系统软件技术方向，缩减客户方运维管理成本支出；
                        系统软件软件故障解决完成率高达95%，提升客户方IT系统稳定运行率；
                        100%IT系统支撑的标准、规范运维服务管理体系，提升高质量IT运维服务效率。
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'ITSoftWareService',
    components:{
        headerLast
    },
    data(){
        return{
            ITSoftWareServiceTit:'软件运维服务'
        }
    }
}
</script>

<style scoped>
.ITSoftWareServiceView{width: 100%;height: 100%;background: #ffffff}
.ITSoftWareServiceCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.ITSoftWareServiceCell .ITSoftWareServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.ITSoftWareServiceCell .ITSoftWareServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.ITSoftWareServiceCell .ITSoftWareServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


