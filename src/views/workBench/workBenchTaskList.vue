<template>
    <div class="workBenchTaskListView">
        <header-base-seven :title="workBenchTaskListTit" :queryData="searchData" @searchPro="searchList"></header-base-seven>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="taskListCell" v-for="item in workBenchTaskListArr" :key="item.id">
                <router-link :to="{name:'workBenchTaskDetailInfo',query:{workId:item.workId,caseId:item.caseId}}">
                    <ul class="tableTd">
                        <li>
                            <span>派工单号：</span>  
                            <span style="color:#2698d6">{{item.workNo}}</span>
                        </li>
                        <li>
                            <span>状态：</span>  
                            <span>{{item.workStatusName}}</span>
                        </li>
                        <li>
                            <span>派工类型：</span>  
                            <span>{{item.workType}}</span>
                        </li>
                        <li>
                            <span>事件编号：</span>  
                            <span>{{item.caseNo}}</span>
                        </li>
                        <li>
                            <span>事件类型：</span>  
                            <span>{{item.caseType}}</span>
                        </li>
                        <li>
                            <span>项目名称：</span>  
                            <span>{{item.projectName}}</span>
                        </li>
                        <li>
                            <span>工作要求：</span>  
                            <span>{{item.workRequire}}</span>
                        </li>
                        <li>
                            <span>设备类型：</span>  
                            <span>{{item.deviceName}}</span>
                        </li>
                        <li>
                            <span>序列号：</span>  
                            <span>{{item.sn}}</span>
                        </li>
                    </ul>
                </router-link>
            </div>
            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBaseSeven from '../header/headerBaseSeven'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'workBenchTaskList',
    components: {
        headerBaseSeven,
        loadingtmp
    }, 
    data(){
        return{
            workBenchTaskListTit:"任务列表",
            workStatus:this.$route.query.workStatus,
            searchData:[],
            workBenchTaskListArr:[],
            page:1,
            pageSize:10,
            busy:false,
            loadall: false,
            isSearch:false,
            searchData:{
                caseLevel:[]
            },
        }
    },
    activated(){
        console.log(this.$route.meta.isUseCache);
        if(!this.$route.meta.isUseCache){
        this.workBenchTaskListArr = [];
        this.busy= false;
        this.loadall= false;
        this.page =1;
        this.loadMore();
        }
        this.$route.meta.isUseCache = false;
    },
    methods:{
        getEventList(){
            var params = {PAGENUM:this.page,PAGETOTAL:this.pageSize};
            if(this.isSearch){
                params.PROJECT_NO = this.searchData.projectNo;
                params.PROJECT_NAME = this.searchData.projectName;
                params.CASE_NO = this.searchData.caseNo;
                params.CASE_LEVEL = this.searchData.caseLevel.join(",");
                params.CREATE_REALNAME = this.searchData.creatorRealname;
                params.START_DATA_BEGIN = this.searchData.expectStart;
                params.START_DATA_END = this.searchData.expectEnd;
                params.WORK_REQUIRE = this.searchData.workRequire;
            }
            var flag = this.page>1;
            fetch.get("?action=/work/getWorkList&WORK_STATUS="+this.$route.query.workStatus,params).then(res=>{
                console.log(res);
                if(flag){
                    this.workBenchTaskListArr = this.workBenchTaskListArr.concat(res.DATA);
                }else{
                    this.workBenchTaskListArr = res.DATA;
                }
                if(0 == res.DATA.length || res.DATA.length<this.pageSize ){
                this.busy = false;
                this.loadall = true;
                }
                else{
                this.busy = false;
                this.page++
                }
            })
        },
        getSearParams (searchData) {

        },
        loadMore(){
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getEventList();
            }, 500);
        },
        searchList(formData){
            this.searchData = formData;
            this.workBenchTaskListArr=[];
            this.isSearch = true;
            this.page = 1;
            this.loadall= false;
            this.loadMore();
        }
      
    },
    created:function(){
    },
}
</script>


<style scoped>
.workBenchTaskList{width: 100%}
.content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;margin-top: 0.05rem; overflow: scroll;}
.taskListCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
.tableTd li{display: flex; line-height: 0.2rem; padding: 0 0.2rem; color: #666666;}
.tableTd span{text-align: center;}
.tableTd span:nth-child(1){width: 100%; text-align: left;}
.tableTd span:nth-child(2){width: 100%;text-align: left}
.content:nth-child(2n+1){background: #fafafa}
</style>
