<template>
    <div class="caseBaseInfoView">
        <div class="caseDetailCell">
            <div class="caseDetailTit">基本信息</div>
            <div class="content">
                <ul class="tableTd">
                    <li>
                        <span>项目名称：</span>  
                        <span>{{caseBaseDetail.PROJECT_NAME}}</span>          
                    </li>
                    <li>                
                        <span>项目编号：</span>  
                        <span>{{caseBaseDetail.PROJECT_NO}}</span>   
                    </li>
                    <li>                
                        <span>事件编号：</span>
                        <span>{{caseBaseDetail.CASE_NO}}</span>
                    </li>
                    <li>                
                        <span>事件类型：</span>
                        <span>{{caseBaseDetail.CASE_TYPE}}</span>
                    </li>
                    <li>                
                        <span>事件级别：</span>
                        <span>{{caseBaseDetail.CASE_LEVEL}}</span>
                    </li>
                    <li>                
                        <span>厂商：</span>
                        <span>{{caseBaseDetail.FACTORY}}</span>
                    </li>
                    <li>                
                        <span>设备型号：</span>
                        <span>{{caseBaseDetail.DEVICE}}</span>
                    </li>
                    <li>                
                        <span>设备SN：</span>
                        <span>{{caseBaseDetail.SN}}</span>
                    </li>
                    <li>                
                        <span>故障说明：</span>
                        <span>{{caseBaseDetail.PROBLEM_DETAIL}}</span>
                    </li>             
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import fetch from '../../utils/ajax'
export default {
    name: 'caseBaseInfo',
    components: {},
    data(){
        return{
            caseBaseDetail:{}
        }
    },
    created(){
        let url = "?action=GetCaseInfo&CASE_ID="+this.$route.query.caseId;
        fetch.get(url,"").then(res=>{
            console.log("res:",res);
            this.caseBaseDetail = res.data;
        })
    }
}
</script>

<style scoped>
.caseBaseInfoView{width:100%;background: #ffffff;}
.caseDetailCell{overflow: scroll;margin-bottom: 0.5rem;}
.caseDetailCell .caseDetailTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
.caseDetailCell .caseDetailTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.caseDetailCell .caseDetailTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}

.tableTd li{display: flex; line-height: 0.25rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd a{width: 100%;text-align: left;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa} 
</style>


