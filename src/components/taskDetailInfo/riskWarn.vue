<template>
    <div class="riskWarnView">
        <div class="attention">{{attention}}</div>
        <div class="taskDetailCell">
            <div class="taskDetailTit">风险提示信息</div>
            <div class="content">
                <div class="risk">
                    <el-table
                    :data="riskData"
                    style="width: 100%; border: 0.01rem solid #e1e1e1">
                    <template v-for="item in riskTable">
                        <el-table-column
                            :fixed="item.fixed"
                            :key="item.id"
                            :prop="item.prop"
                            :label="item.label"
                            :min-width="item.width">                       
                        </el-table-column>
                    </template>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../utils/ajax'
export default {
    name: 'riskWarn',
    components: {
    }, 
    data(){
        return{
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,         
            attention:"实施过程中遇到技术问题反馈技术责任人，非技术问题反馈派工人，非工作时间请联系 400-610-6661",
            riskData:[],
            activeName:'third',
            riskTable:[               
                {
                    prop: 'riskType',
                    label: '风险类型',
                    fixed: true,
                    width: '25%'
                },
                {
                    prop: 'riskRemark',
                    label: '风险内容',
                    fixed: true,
                    width: '45%'
                },
                {
                    prop: 'docName',
                    label: '附件名称',
                    fixed: true,
                    width: '30%'
                }
            ],
        }
        
    },
    created:function(){
        fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res=>{     
            this.riskData = res.DATA[0].riskInfos;
        });
    },
    beforeRouteLeave( to, from,next){
        if (to.name == 'workBenchTaskList') {
            to.meta.isUseCache = true;    
        }        
        next();
    },

    methods: {
       
    
    }
}

</script>


<style scoped>
.riskWarnView{width:100%;background-color: #ffffff}
.attention{color: red;margin: 0.1rem;}
.taskDetailCell{overflow: scroll;margin-bottom: 0.5rem;}
.taskDetailCell .taskDetailTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.taskDetailCell .taskDetailTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.taskDetailCell .taskDetailTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
.content{margin: 0.2rem 0.14rem 0; display: block;}
.content>>> .el-table{z-index: 0;}
.content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; padding: 0; text-align: center;}
.content >>> .risk .el-table td:nth-child(1) .cell{padding: 0}
.content >>> .risk .el-table td:nth-child(2){text-align: left}
.content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
.content >>> .el-table td>.cell{color: #666666; padding: 0 0.02rem}
.content >>> .el-table th>.cell{color: #333333; padding: 0 0.02rem;}
.event .table_name{display: block; width: 100%; height: 0.3rem; line-height: 0.3rem; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
</style>


