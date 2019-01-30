<template>
    <div class="PSServiceView">
        <header-last :title="PSServiceTit"></header-last>
        <div class="PSServiceCell">
            <div class="content">
                <div class="PSServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">
                        IT专业服务PS（Professional Service）是为客户提供短期的、一次性的IT相关的外包服务，
                        包括不局限于IT管理相关的咨询、优化、升级类的运营服务，
                        它是一种IT与我们运营服务有着密切关联的服务产品。通过短期的服务集中解决客户在IT管理领域的痛点。
                    </el-col>  
                </el-row>   
                <div class="PSServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">对于客户临时的大规模、广覆盖、时间短、影响大的项目是很好的外部支撑；</el-col>
                    <el-col :span="24">能够快速响应客户全国范围内（省会城市、一线城市）的支持需求；</el-col>
                    <el-col :span="24">能够有专业的团队提供项目管理，很好的实现项目的时间、成本和范围的需求；</el-col>
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
    name:'PSService',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            PSServiceTit:'IT专业服务PS'
        }
    }
}
</script>

<style scoped>
.PSServiceView{width: 100%;height: 100%;background: #ffffff}
.PSServiceCell{overflow: scroll;margin-bottom: 0.45rem;margin-top: 0.45rem}
.PSServiceCell .PSServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.PSServiceCell .PSServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.PSServiceCell .PSServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


