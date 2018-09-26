<template>
    <div class="ITProfessionalView">
        <header-last :title="ITProfessionalTit"></header-last>
        <div class="ITProfessionalCell">
            <div class="content">
                <div>专业服务：为客户各类IT系统提供搬迁服务（含数据迁移）、网络优化服务（含运营商IP宽带网及企业的IP网络）以及安全服务（安全咨询与规划、安全评估、安全加固、安全运维）等。</div>
                <div class="ITProfessionalAdv">优势：</div>
                <el-row>
                    <el-col :span="24">1、搬迁服务，可在业务不中断及数据安全可靠的前提下，实现：</el-col>  
                    <el-col :span="24">（1）根据需求，制定合理计划、降低搬迁风险，提高搬迁效率；</el-col>
                    <el-col :span="24">（2）梳理现有业务结构，降低管理风险，提出改进建议，降低后期维护成本；</el-col>
                    <el-col :span="24">（3）提供专业咨询管理团队，降低客户内外部资源的协调难度和沟通成本。</el-col>
                    <el-col :span="24">2、网络优化服务，可对用户现有网络与业务的评估分析，并进行有针对性的优化规划和实施，帮助客户实现：</el-col>
                    <el-col :span="24">（1）有效改善现有网络的运行状况，减少网络变更的风险，满足关键业务对网络性能的要求；</el-col>
                    <el-col :span="24">（2）提高网络基础架构的可用性，避免业务中断；</el-col>
                    <el-col :span="24">（3）降低网络安全事件发生的几率及对业务造成的影响；</el-col>
                    <el-col :span="24">（4）降低网络运营支出（OPEX），增加网络投资回报；</el-col>
                    <el-col :span="24">（5）网络与业务相结合，实现业务的可持续发展。</el-col>
                    <el-col :span="24">
                        3、安全服务，可从技术、运维、管理、策略等方面提供具有针对性的安全技术与管理咨询服务，
                        为企业、政府提供包括安全咨询、等级测评、风险评估、安全加固、运维管理等全面的信息安全解决方案的服务，
                        帮助企业、政府认识现状与差距、发现安全隐患，并可以协助客户制订、改进、实现规划，从而建立有效的信息安全体系。
                    </el-col>  
                </el-row>   
                <div class="ITProfessionalAdv">价值：</div>
                <el-row>
                    <el-col :span="24">
                        覆盖客户IT系统内90%的系统软件技术方向，缩减客户方运维管理成本支出；系统软件软件故障解决完成率高达95%，
                        提升客户方IT系统稳定运行率；100%IT系统支撑的标准、规范运维服务管理体系，提升高质量IT运维服务效率。
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'ITProfessional',
    components:{
        headerLast
    },
    data(){
        return{
            ITProfessionalTit:'专业服务'
        }
    }
}
</script>

<style scoped>
.ITProfessionalView{width: 100%;height: 100%;background: #ffffff}
.ITProfessionalCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.ITProfessionalCell .ITProfessionalAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.ITProfessionalCell .ITProfessionalAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.ITProfessionalCell .ITProfessionalAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


