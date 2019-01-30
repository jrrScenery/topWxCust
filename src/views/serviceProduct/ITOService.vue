<template>
    <div class="ITOServiceView">
        <header-last :title="ITOServiceTit"></header-last>
        <div class="ITOServiceCell">
            <div class="content">
                <div class="ITOServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">
                        神州信息的外包产品线ITO服务产品是IT资源整体外包，
                        为客户提供全套的IT系统规划、采购、实施、运营转换、咨询、培训的全生命周期服务。
                    </el-col>  
                    <el-col :span="24">适合需要有IT基础业务整合外包需求的企业客户。</el-col>
                    <el-col :span="24">
                        以业务视觉，面向系统，对照过去一段时间系统/业务的运行状况、运行环境，从技术、管理、风险等方面全面进行分析，
                        了解目前系统可用性水平的现状，找出差距和不足，提出改进点进行优化，确保满足业务对可靠性的要求。</el-col>
                </el-row>   
                <div class="ITOServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">外包服务的ITO服务产品能够：</el-col>
                    <el-col :span="24">承诺业务或系统的可用性</el-col>
                    <el-col :span="24">在运维过程中对系统架构进行分析和优化并提高可用性</el-col>
                    <el-col :span="24">有效降低客户IT服务管理风险</el-col>
                    <el-col :span="24">有效节省客户基础IT维护成本</el-col>
                    <el-col :span="24">客户可以获取行业、业务和技术专家的帮助</el-col>
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
    name:'ITOService',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            ITOServiceTit:'IT整体外包ITO'
        }
    }
}
</script>

<style scoped>
.ITOServiceView{width: 100%;height: 100%;background: #ffffff}
.ITOServiceCell{overflow: scroll;margin-bottom: 0.45rem;margin-top: 0.45rem}
.ITOServiceCell .ITOServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.ITOServiceCell .ITOServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.ITOServiceCell .ITOServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


