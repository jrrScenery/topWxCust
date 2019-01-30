<template>
    <div class="sdcOperationView">
        <header-last :title="sdcOperationTit"></header-last>
        <div class="sdcOperationCell">
            <div class="content">
                <div class="sdcOperationAdv">优势：</div>
                <el-row>
                    <el-col :span="24">完整纳管数据中心6级服务资源，实现服务内容和服务管理的双重保障，让客户工作得心应手，运维高枕无忧；</el-col>  
                    <el-col :span="24">通过数据中心一体化监控，智能化、自动化操作，资源管理、能耗管理等14个管理模块提升数据中心可用性，提高运维效率，降低运营成本；</el-col>
                    <el-col :span="24">移动终端APP无缝支持，实现在线、离线的灵活工作模式，及时的任务提醒与远程配置，提供便捷安全的用户体验；</el-col>
                    <el-col :span="24">一站式管家服务，多层次专业人员提供咨询、培训、维修、值守等多样业务需求的数据中心运维与管理服务。</el-col>
                </el-row>   
                <div class="sdcOperationAdv">价值：</div>
                <el-row>
                    <el-col :span="24">
                        显著提升数据中心运维效率和管理水平，
                        降低运营成本：通过自动化运维、流程化管理、快速故障定位以及专家支持，将快速提升客户的业务服务水平，
                        提高其内部客户满意度，降低IT运维成本；
                    </el-col>
                    <el-col :span="24">
                        有效增强企业竞争力和品牌形象：向IDC/DC客户提供从工具到人员，从规划设计到维护升级的全套端到端、一体化服务，
                        内容灵活扩展，支持专业化定制化服务，满足持续增长的业务需求，增强行业竞争力，
                        为企业树立高效率工作、科学化管理的形象。
                    </el-col>
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
    name:'sdcOperation',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            sdcOperationTit:'基础运维服务'
        }
    }
}
</script>

<style scoped>
.sdcOperationView{width: 100%;height: 100%;background: #ffffff}
.sdcOperationCell{overflow: scroll;margin-bottom: 0.45rem;margin-top: 0.45rem}
.sdcOperationCell .sdcOperationAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.sdcOperationCell .sdcOperationAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.sdcOperationCell .sdcOperationAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


