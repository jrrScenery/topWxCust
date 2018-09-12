<template>
    <div class="applicationView">
        <header-last :title="applicationTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="application">
            <el-tabs v-model="activeName">
                <el-tab-pane label="故障类" name="first"><case-application></case-application></el-tab-pane>
                <el-tab-pane label="非故障类" name="second" lazy></el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import caseApplication from '../../components/applications/caseApplication'
export default {
     name: 'application',
    components: {
        headerLast,
        caseApplication
    },
    data(){
        return{
            applicationTit:"单次支持申报",
            activeName:"first"
        }
    }
}
</script>

<style scoped>
.applicationView{width: 100%}
.application{margin: 0 0; background: #ffffff; position: relative;}
.application >>> .el-tabs__header{margin: 0 0 0.1rem;}
.application >>> .el-tabs__item.is-active{color: #2698d6;}
.application >>> .el-tabs__active-bar{background: #2698d6;}
.application >>> .el-tabs__nav{width: 100%; text-align: center;}
.application >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>


