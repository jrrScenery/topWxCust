<template>
    <div class="proSLAInfoView">
        <header-last :title="eventSLAInfoTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="paramHead">
            <div style="width:50%">交付级别：{{slaLevel}}</div>
            <div style="width:50%">Case级别：{{caseLevel}}</div>
        </div>
        <div class="paramHead">事件创建时间：{{createDate}}</div>
        <div class="proSLAInfoCell" v-for="item in eventInfoArray" :key="item.SLA_TYPE">
            <div class="proSLAInfoTit">{{item.SLA_TYPE}}</div>
            <div class="content">
                <ul class="tableTd">
                    <li>
                        <span>交付要求:</span>  
                        <span>{{item.SLA_REQUEST}}</span>          
                    </li>
                    <li>                
                        <span>SLA截至时间（含等待）：</span>  
                        <span>{{item.END_TIME}}</span>   
                    </li>
                    <li>                
                        <span>实际达成时间：</span>
                        <span>{{item.REACH_TIME}}</span>
                    </li>
                    <li>                
                        <span>是否达成：</span>
                        <span v-if="item.IF_REACH=='未达成'" style="color:red">{{item.IF_REACH}}</span>
                        <span v-else>{{item.IF_REACH}}</span>
                    </li>
                    <li>                
                        <span v-if="item.IF_REACH=='未达成'&&item.FAIL_REASON">未达成原因：</span>
                        <span v-if="item.IF_REACH=='未达成'&&item.FAIL_REASON">{{item.FAIL_REASON}}</span>
                    </li>
                </ul>
            </div>
        </div>

        <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
let caseId;
let slaLevel;
let caseLevel;
let createDate;
export default {
    name: 'eventSLAInfo',
    components: {
        headerLast,
        loadingtmp
    },
    data(){
        return{
            eventSLAInfoTit:'SLA信息',
            caseId:this.$route.query.caseId,
            slaLevel:this.$route.query.slaLevel,
            caseLevel:this.$route.query.caseLevel,
            createDate:this.$route.query.createDate,
            eventInfoArray:[],
            busy: true,
            loadall:false
        }
    },
    mounted(){
        fetch.get('?action=/case/GetCaseSLA&CASE_ID=' + this.$route.query.caseId, {}).then(res => {
            console.log(res);
        if("0"== res.STATUSCODE){
            this.eventInfoArray = res.data;                  
        }
        this.busy = false;
        this.loadall = true;

        })
    },
}
</script>


<style scoped>
    .proSLAInfoView{width: 100%; position: relative;background-color: #ffffff}
    .proSLAInfoCell{}
    .proSLAInfoCell .proSLAInfoTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
    .proSLAInfoCell .proSLAInfoTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
    .proSLAInfoCell .proSLAInfoTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
    .paramHead{display:flex;margin-top:10px;margin-left:20px}
    .tableTd li{display: flex; line-height: 0.3rem; padding: 0 0.2rem; color: #666666;}
    .tableTd span{text-align: center;}
    .tableTd span:nth-child(1){width: 100%; text-align: left;}
    .tableTd span:nth-child(2){width: 100%;text-align: left}
    .content:nth-child(2n+1){background: #fafafa}

</style>

