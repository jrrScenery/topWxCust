<template>
    <div class="HROServiceView">
        <header-last :title="HROServiceTit"></header-last>

        <div class="HROServiceCell">
            <div class="content">
                <div class="HROServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">IT人力资源外包（Human Resources Outsourcing）是为客户提供IT相关的人力资源，以解决客户的IT人力资源编制的问题。它是一种IT专业领域的人力资源服务产品，是企业根据自身IT管理的需要将某一项或几项IT专业人力资源外包出去，由专业IT人才服务专业机构或企业进行管理，以实现其管理目的并能够实现效率最大化。</el-col>  
                    <el-col :span="24">神州信息是中国信息服务领域的领导企业，是专业的IT整合服务商；</el-col>
                    <el-col :span="24">ITSS标准制定领导企业，精通客户的IT整个生命周期的管理工作，理解并精通客户的IT专业人员的设置和标准；</el-col>
                    <el-col :span="24">全国覆盖全国的专业交付网络，上千名专业技术人才（交付资源池）、全国40余个城市人力资源服务响应体系；</el-col>
                    <el-col :span="24">有符合ITSS要求的IT专业人力能力标准和认证标准（WSCE/WSCP）</el-col>
                </el-row>   
                <div class="HROServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">将用人单位从繁琐的IT专业领域事务中解脱出来，将精力集中在业务与IT结合管理上来。</el-col>
                    <el-col :span="24">减少了用人单位在IT领域中的招聘、培训和日常管理等方面的成本；</el-col>
                    <el-col :span="24">专业HR相关管理工作均由神州信息办理，极大地减轻了用人单位的负担；</el-col>
                    <el-col :span="24">在IT领域人才流动性较高的情况下，IT HRO产品为用人单位在市场条件下机动灵活、便捷用工提供了可能。既保证合理合法用工、降低了用工风险，又达到了员工能进能出，合理流动的目的；</el-col>
                    <el-col :span="24">享有高效优质的专业化服务，降低了用人单位与员工直接发生劳动纠纷的几率</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'HROService',
    components:{
        headerLast
    },
    data(){
        return{
            HROServiceTit:'人员外包服务HRO'
        }
    }
}
</script>

<style scoped>
.HROServiceView{width: 100%;height: 100%;background: #ffffff}
.HROServiceCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.HROServiceCell .HROServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.HROServiceCell .HROServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.HROServiceCell .HROServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


