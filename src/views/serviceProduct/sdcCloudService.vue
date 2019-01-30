<template>
    <div class="sdcCloudServiceView">
        <header-last :title="sdcCloudServiceTit"></header-last>
        <div class="sdcCloudServiceCell">
            <div class="content">
                <div class="sdcCloudServiceAdv">优势：</div>
                <el-row>
                    <el-col :span="24">我们的私有云服务平台部署在电信运营商的IDC机房，具有高可靠性、高安全性、以及丰富的互联网带宽；</el-col>  
                    <el-col :span="24">安全、可靠、灵活、可扩展的私有云服务平台；</el-col>
                    <el-col :span="24">高水平的技术专家实施云规划、云部署与业务运维服务；</el-col>
                    <el-col :span="24">专业的服务运营与运维团队；</el-col> 
                </el-row>   
                <div class="sdcCloudServiceAdv">价值：</div>
                <el-row>
                    <el-col :span="24">云规划：按需规划、方案定制、容量合理；</el-col>
                    <el-col :span="24">云资源：按需分配、按量付费、聚焦业务；</el-col>
                    <el-col :span="24">云网络：按需创建、自动调整、安全可靠；</el-col>
                    <el-col :span="24">云部署：实时获取、快速部署、数据完整；</el-col>
                    <el-col :span="24">业务运维：简化运维、稳定运行、保证性能；</el-col>
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
    name:'sdcCloudService',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            sdcCloudServiceTit:'SDC云服务'
        }
    }
}
</script>

<style scoped>
.sdcCloudServiceView{width: 100%;height: 100%;background: #ffffff}
.sdcCloudServiceCell{overflow: scroll;margin-bottom: 0.45rem;margin-top: 0.45rem}
.sdcCloudServiceCell .sdcCloudServiceAdv{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.sdcCloudServiceCell .sdcCloudServiceAdv::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.sdcCloudServiceCell .sdcCloudServiceAdv::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{padding: 0 0.1rem 0.1rem; background: #ffffff; margin-top: 0.05rem;line-height: 0.25rem;font-size: 0.13rem;color: #666666;}
.content>>>.el-col{padding-top:0.05rem}
</style>


