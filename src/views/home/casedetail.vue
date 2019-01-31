<!--首页- case详情-->
<template>
    <div class="casedetailView">
        <header-last :title="casedetailTit" backUrl='event'></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="casedetailTabs">
            <el-tabs v-model="activeName">
                <el-tab-pane label="事件信息" name="first"><case-base-info></case-base-info></el-tab-pane>
                <el-tab-pane label="进展情况" name="second"><case-progress></case-progress></el-tab-pane>
            </el-tabs>
        </div>
        <div class="caseShowFooter">
            <el-row> 
                <el-col :span="6">
                    <router-link :to="{name:'eventReplenish',query:{caseId:this.caseId}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_1.png" style="width: 0.11rem; height: 0.135rem;" alt="">
                            <span>补充说明</span>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="6">
                    <router-link v-if="this.ifClose=='Y' && this.ifEvaluate=='N'" :to="{name:'serviceRate',query:{caseId:this.caseId,messageId:this.messageId}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                            <span>服务评价</span>
                        </div>
                    </router-link>
                    <router-link v-if="this.ifClose=='Y' && this.ifEvaluate=='Y'" :to="{name:'caseEvaluateList',query:{caseId:this.caseId}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                            <span>服务评价</span>
                        </div>
                    </router-link>
                    <div v-else @click="clickService">
                        <img src="../../assets/images/eventBaseInfo_3.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                        <span>服务评价</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <router-link :to="{name:'eventFeedback',query:{caseId:this.caseId,projectId:this.projectId}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_2.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                            <span>意见反馈</span>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="6"> 
                    <router-link :to="{name:'eventRepair',query:{caseId:this.caseId}}">
                        <div>
                            <img src="../../assets/images/eventBaseInfo_5.png" style="width: 0.15rem; height: 0.135rem;" alt="">
                            <span>相关报修</span>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import caseBaseInfo from '../../components/case/caseBaseInfo'
import caseProgress from '../../components/case/caseProgress'
import fetch from '../../utils/ajax'
export default {
    name:'casedetail',
    components:{
        headerLast,
        caseBaseInfo,
        caseProgress
    },
    data(){
        return{
            casedetailTit:'报修详情',
            activeName: 'first',
            caseId: this.$route.query.caseId,
            projectId: this.$route.query.projectId,
            ifEvaluate: this.$route.query.ifEvaluate,
            ifClose: this.$route.query.ifClose,
            messageId:this.$route.query.messageId
        }
    },
    created(){
        let url = "?action=GetCaseInfo&CASE_ID="+this.$route.query.caseId;
        fetch.get(url,"").then(res=>{
            console.log("res:",res);
            this.ifClose = res.data.IF_CLOSE;
            this.ifEvaluate = res.data.IF_EVALUATE;
        })
    },
    methods:{
        clickService(){
            console.log(this.ifEvaluate);
            this.$message({
                message:'执行中状态不可评价！',
                type: 'warning',
                center: true,
                customClass: 'msgdefine'
            });
        },
    }
}
</script>
<style scoped>
.casedetailTabs{margin: 0 0; background: #ffffff; position: relative;}
.casedetailTabs >>> .el-tabs__header{margin: 0 0 0.1rem;}
.casedetailTabs >>> .el-tabs__item.is-active{color: #2698d6;}
.casedetailTabs >>> .el-tabs__active-bar{background: #2698d6;}
.casedetailTabs >>> .el-tabs__nav{width: 100%; text-align: center;}
.casedetailTabs >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;}

.caseShowFooter{position: absolute; left: 0; right: 0; bottom: 0; height: 0.5rem; background: #ffffff;}
.caseShowFooter .el-row{}
.caseShowFooter .el-row .el-col{line-height: 0.5rem; text-align: center; color: #000000;}
.caseShowFooter .el-row .el-col img{vertical-align: sub;}
.caseShowFooter .el-row .el-col .el-icon-more{width: 100%; line-height: 0.5rem; font-size: 0.16rem; color: #b9c5cf;}
</style>

