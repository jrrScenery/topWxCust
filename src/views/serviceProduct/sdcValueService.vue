<template>
    <div class="sdcValueServiceView">
        <header-last :title="sdcValueServiceTit"></header-last>
        <div class="sdcValueServiceCell">
            <div class="content">
                <div class="sdcValueServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">通过在 IDC 服务商的机房部署运维工具软件+驻场人员+后台运维专家的交付方式。服务对象包括：小型机、服务器、存储设备、网络设备、操作系统、中间件、数据库、业务应用等；通过安全、高效、专业、快捷的服务，让您从繁重的 IT 基础设施维护工作中解放出来，享受到一站式周到完善的管家服务。</el-col>   
                </el-row>   
                <div class="sdcValueServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">保障客户软硬件设备的稳定运行，随时随地享受运营商和神州数码专业高效可靠的运维保障；</el-col>
                    <el-col :span="24">实现业务聚焦降低管理成本，通过将运维保障工作托管给金牌管家服务，实现客户聚焦自身核心业务需求，降低客户 IT 运维在人员、技术和管理方面的投入；</el-col>
                    <el-col :span="24">部署迅速，需求提出到服务可用最长不超过 5 个工作日，避免冗长沟通；</el-col>
                    <el-col :span="24">按需购买，最大程度方便客户，一台设备也可下单购买最专业的服务；</el-col>
                    <el-col :span="24">提供专属客户经理一对一处理您使用过程出现的任何疑难问题；</el-col>
                    <el-col :span="24">金牌管家中的 5 类服务涵盖 IT 维护工作的主要内容，还可按需单独购买；</el-col>
                    <el-col :span="24">金牌管家服务满足 ISO27001 审计要求，确保客户信息安全可靠；</el-col>
                    <el-col :span="24">金牌管家服务自带工具，客户无需额外采购，按月付费，随买随用；</el-col>
                    <el-col :span="24">金牌管家服务提供灵活多样的服务选择，包括多种优惠套餐和服务级别，满足多样需求；</el-col>
                    <el-col :span="24">>随时掌控全局，支持手机 App、电脑 WEB 等随时了解设备运行状况；</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'sdcValueService',
    components:{
        headerLast
    },
    data(){
        return{
            sdcValueServiceTit:'SDC运维增值服务'
        }
    }
}
</script>

<style scoped>
.sdcValueServiceView{width: 100%;height: 100%;background: #ffffff}
.sdcValueServiceCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.sdcValueServiceCell .sdcValueServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.sdcValueServiceCell .sdcValueServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.sdcValueServiceCell .sdcValueServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
.circle{}
</style>


