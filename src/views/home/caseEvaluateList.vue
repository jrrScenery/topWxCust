<!--项目评价-->
<template>
  <div class="eventEvaluationView">
    <div v-if="route=='homeRate'">
            <header-last :title="eventEvaluationTit" backUrl='home' :date1="this.$route.query.caseId"></header-last>
    </div>
    <div v-else>
      <header-last :title="eventEvaluationTit" backUrl='casedetail' :date1="this.$route.query.caseId"></header-last>
    </div>
    <div style="height: 0.45rem;"></div> 
    <div class="content">
      <div class="proPlanCell">
        <el-table
          :data="tableData"
          stripe
          v-loading="busy && !loadall"
          element-loading-text="正在加载下一页"
          v-loadmore="loadMore"
          ref="etable"
          @row-click="rowClick"
          :height = "tableHeight"
          style="width: 100%">
          <template v-for="item in table_arr">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'TOTAL_SCORE'">
                  <div>
                    <i v-if="scope.row[item.prop] <= 3" style="color:#ff0000">{{scope.row[item.prop]}}</i>
                    <i v-else>{{scope.row[item.prop]}}</i>
                  </div>
                </template>
                <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </template>
          <template>1211</template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
import headerLast from '../header/headerLast'

export default {
  name: 'caseEvaluateList',
  props:{
    proplanpage: Number
  },
  components: {
    headerLast,
    loadingtmp
  },

  data () {
    return {
      eventEvaluationTit:'评价列表',
      tableData: [],
      table_arr: [
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '40%'
        },
        {
          prop: 'TOTAL_SCORE',
          label: '分值',
          fixed: true,
          width: '15%'
        },
        {
          prop: 'EVALUATE_FROM_NAME',
          label: '评价人',
          fixed: true,
          width: '20%'
        },
        {
          prop: 'EVALUATE_TIME',
          label: '评价时间',
          fixed: true,
          width: '25%' 
        }
      ],

      page: 1,
      pageSize: 15,
      busy: false,
      loadall: false,
      tableHeight:400,
      route:this.$route.query.route
    }
  },
  created () {
    this.getEventList();
    console.log(this.$route.query.route);
  },
  mounted(){
    this.$nextTick(() => {
      let self = this;
      console.log(document.documentElement.clientHeight);
      console.log(this.$refs.etable.$el.offsetTop);
      this.tableHeight = document.documentElement.clientHeight- 90;
      window.onresize = function() {
        self.tableHeight = document.documentElement.clientHeight- 90;
      }
    })
  },
  methods: {
    loadMore () {
      if(this.busy){return false}
      this.busy = true;
      setTimeout(() => {
        this.getEventList();
      }, 1000); 
    },
    getEventList () {
      var flag = this.page>1;
      console.log("caseId",this.$route.query.caseId);
      var reqParams = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
      fetch.get("?action=/case/ServiceEvaluate&CASE_CD="+this.$route.query.caseId,reqParams).then(res=>{
        console.log("00000000000");
        console.log(res)
        if(flag){
          this.tableData = this.tableData.concat(res.data);
        }else{
          this.tableData = res.data;
        }
        console.log(this.tableData)
        if(0 == res.data.length || res.data.length<this.pageSize ){
          this.busy = true;
          this.loadall = true;
          this.$message({
            message:'已加载全部数据',
            type: 'success',
            center: true,
            duration:1000,
            customClass:'msgdefine'
          });
        }
        else{
          this.busy = false;
          this.page++
        }
      })
    },
    rowClick (row) {
      console.log(row);
      if(this.route == 'homeRate'){
        this.$router.push({name: 'customerRate', query: {evaluateid: row.EVALUATE_ID,caseId:row.CASE_CD,route:this.route}})
      }else{
        this.$router.push({name: 'eventEvaluationShow', query: {evaluateid: row.EVALUATE_ID,caseId:row.CASE_CD,route:this.route}})
      }
      // this.$router.push({name: 'eventEvaluationShow', query: {evaluateid: row.EVALUATE_ID,caseId:row.CASE_ID}})
    },
  }
}
</script>

<style scoped>
  .content{}
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem; padding: 0 0.05rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: left; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>

