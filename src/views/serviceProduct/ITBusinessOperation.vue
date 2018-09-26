<template>
    <div class="ITBusinessOperationView">
        <header-last :title="ITBusinessOperationTit"></header-last>
        <div class="ITBusinessOperationCell">
            <div class="content">
                <div class="ITBusinessOperationAdv">优势：</div>
                <el-row>
                    <el-col :span="24">
                        业务运维服务，是以使用业务的最终用户体验为目的，对业务系统的业务质量、可用性、软硬件设备性能等几个方面进行保障，
                        通过对业务、应用、软硬件层面的监控，主动评估优化，问题与故障实时解决恢复，
                        对业务指标SLA进行可量化的管理保障，从而保障业务质量达到对我们客户的承诺，保障最终用户对业务使用的满意度。
                    </el-col>  
                    <el-col :span="24">（1）业务系统的业务质量、应用性能、基础架构的实时监控；</el-col>
                    <el-col :span="24">（2）定期全面评估及优化系统性能；</el-col>
                    <el-col :span="24">（3）快速定位及恢复业务系统问题与故障。</el-col>
                </el-row>   
                <div class="ITBusinessOperationAdv">价值：</div>
                <el-row>
                    <el-col :span="24">1，多厂商管理模式 ，降低客户的管理成本，提高运维效率</el-col>
                    <el-col :span="24">2，保障业务系统用户使用体验</el-col>
                    <el-col :span="24">3，快速定界定位业务系统故障及问题并恢复</el-col>
                    <el-col :span="24">4，充分发挥企业IT部门的商业决策价值</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name:'ITBusinessOperation',
    components:{
        headerLast
    },
    data(){
        return{
            ITBusinessOperationTit:'业务运维服务'
        }
    }
}
</script>

<style scoped>
.ITBusinessOperationView{width: 100%;height: 100%;background: #ffffff}
.ITBusinessOperationCell{overflow: scroll;margin-bottom: 0.1rem;margin-top: 0.45rem}
.ITBusinessOperationCell .ITBusinessOperationAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.ITBusinessOperationCell .ITBusinessOperationAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.ITBusinessOperationCell .ITBusinessOperationAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


