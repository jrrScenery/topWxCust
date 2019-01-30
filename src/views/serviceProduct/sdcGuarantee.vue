<template>
    <div class="sdcGuaranteeView">
        <header-last :title="sdcGuaranteeTit"></header-last>
        <div class="sdcGuaranteeCell">
            <div class="content">
                <div class="sdcGuaranteeAdv">优势：</div>
                <el-row>
                    <el-col :span="24">为运营商客户提供专业的运维服务，通过SDC其他产品为客户提供更优化的增值服务，如：DCIM监控、系统监控、网络监控、云服务等。完善运营商的运维产品，完全保证运营商对终端客户的SLA承诺。</el-col>  
                    <el-col :span="24">针对非运营商客户，SDC交付部为他们量身定制专业化的运维服务，保证客户用最少的费用实现最优的服务感受。</el-col>
                </el-row>   
                <div class="sdcGuaranteeAdv">价值：</div>
                <el-row>
                    <el-col :span="24">提供国内各大运营商数据中心运维/托管/一站式服务，同时依托神州数码诸如强大的二、三线专家技术能力；</el-col>
                    <el-col :span="24">ISO9000/ISO20000/ISO270001/IOS14001/ITIL等专业能力，为客户提供专业的管理、安全、质量服务。依靠在运营商中经验，SDC交付部也在开拓越来越多的EDC客户，并带给EDC客户更多更先进的管理、服务理念。帮助和指导EDC客户建立更加完善数据中心工作流程体系。</el-col>
                </el-row>
            </div>
        </div>
        <footer-home></footer-home>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import footerHome from '../footer/footerHome'
export default {
    name:'sdcGuarantee',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            sdcGuaranteeTit:'SDC运维保障服务'
        }
    }
}
</script>

<style scoped>
.sdcGuaranteeView{width: 100%;height: 100%;background: #ffffff}
.sdcGuaranteeCell{overflow: scroll;margin-bottom: 0.45rem;margin-top: 0.45rem}
.sdcGuaranteeCell .sdcGuaranteeAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.sdcGuaranteeCell .sdcGuaranteeAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.sdcGuaranteeCell .sdcGuaranteeAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


