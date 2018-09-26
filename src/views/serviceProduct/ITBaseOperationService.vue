<template>
    <div class="ITBaseOperationServiceView">
        <header-last :title="ITBaseOperationServiceTit"></header-last>
        <div class="ITBaseOperationServiceCell">
            <div class="content">
                <div>
                    基础设施运维服务：提供IT基础设施设备的故障解决、健康检查、重要事件及时刻的值守、应急方案设计与预演、系统加固、备份服务、系统性能调优、辅助故障定位、培训服务、项目管理等多样化的服务产品，
                    满足客户在基础设施运维过程中的各类问题。
                </div>
                <div class="ITBaseOperationServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">1、统一接口提供PC服务器、小型机、存储、网络等基础设施硬件设备的各类IT服务需求，简化多厂商管理；</el-col>  
                    <el-col :span="24">2、拥有业界各品牌顶级专家，重大故障可担当并解决各种软硬件疑难问题和故障；</el-col>
                    <el-col :span="24">3、快速、专业、安全地解决硬件设备故障；</el-col>
                    <el-col :span="24">4、企业IT人员可以将工作重心集中到更高一级的业务目标上；</el-col>
                    <el-col :span="24">5、优化IT产品和服务的使用情况，提高IT环境可用性；</el-col>
                    <el-col :span="24">6、神州信息的高效服务，可以降低客户基础设施运维成本。</el-col>
                </el-row>   
                <div class="ITBaseOperationServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">
                        覆盖客户IT系统内98%的基础设施技术方向，缩减客户方运维管理成本支出；
                        设备系统故障解决完成率高达95%，提升客户方IT系统稳定运行率；
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
    name:'ITBaseOperationService',
    components:{
        headerLast
    },
    data(){
        return{
            ITBaseOperationServiceTit:'基础运维服务'
        }
    }
}
</script>

<style scoped>
.ITBaseOperationServiceView{width: 100%;height: 100%;background: #ffffff}
.ITBaseOperationServiceCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.ITBaseOperationServiceCell .ITBaseOperationServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.ITBaseOperationServiceCell .ITBaseOperationServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.ITBaseOperationServiceCell .ITBaseOperationServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


