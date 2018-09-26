<template>
    <div class="MSServiceView">
        <header-last :title="MSServiceTit"></header-last>
        <div class="MSServiceCell">
            <div class="content">
                <div class="MSServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">
                        IT管理服务外包（Managed Service）一种IT专业领域的管理服务产品，是企业根据自身IT管理的需要将某些模块化的服务单独切分出来，
                        让专业的IT服务供应商来承接，从而实现服务的专业性和成本的优化。它是一种管理服务，关注服务的过程管控与目标的达成，
                        包含我们的人员（资源）、管理流程和管理工具，最终为客户达成我们承诺的服务级别（SLA）。
                    </el-col>  
                    <el-col :span="24">神州信息是中国信息服务领域的领导企业，是专业的IT整合服务商；</el-col>
                    <el-col :span="24">ITSS标准制定领导企业，精通客户的IT整个生命周期的管理工作；</el-col>
                    <el-col :span="24">全国覆盖面广，1-4线城市都能覆盖；</el-col>
                    <el-col :span="24">响应速度快，最快2小时内可以上门；</el-col>
                    <el-col :span="24">通过神州信息的行业服务经验，客户可以轻松跨越IT成熟度；</el-col>
                    <el-col :span="24">技术能力和服务资质齐全，性价比高；</el-col>
                    <el-col :span="24">完善的项目管理和追踪，管理的项目的过程和结果。</el-col>
                </el-row>   
                <div class="MSServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">客户不需要自己投入大量的IT资源，便于专注于核心业务；</el-col>
                    <el-col :span="24">客户能得到量化的服务；</el-col>
                    <el-col :span="24">IT架构可以灵活的随着业务调整而快速改变；</el-col>
                    <el-col :span="24">通过规范化的服务提供，让客户实现IT管理的过程可见，管理的结果可控；</el-col>
                    <el-col :span="24">IT的投入更加透明可控，不再是IT黑洞。</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'MSService',
    components:{
        headerLast
    },
    data(){
        return{
            MSServiceTit:'管理外包服务MS'
        }
    }
}
</script>

<style scoped>
.MSServiceView{width: 100%;height: 100%;background: #ffffff}
.MSServiceCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.MSServiceCell .MSServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.MSServiceCell .MSServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.MSServiceCell .MSServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


