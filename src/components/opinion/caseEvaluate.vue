<!--项目评价-->
<template>
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
</template>

<script>
import global_ from '../../components/Global'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'

export default {
  name: 'proPlan',
  props:{
    proplanpage: Number
  },
  components: {
    loadingtmp
  },

  data () {
    return {
      tableData: [],
      table_arr: [
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '45%'
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
          width: '18%'
        },
        {
          prop: 'EVALUATE_TIME',
          label: '评价时间',
          fixed: true,
          width: '22%' 
        }
      ],

      page: 1,
      pageSize: 15,
      busy: false,
      loadall: false,
      tableHeight:400
    }
  },
  created () {
    this.getEventList()
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
      var reqParams = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize};
      fetch.get("?action=GetCaseEvaluate",reqParams).then(res=>{
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
      this.$router.push({name: 'eventEvaluationShow', query: {evaluateid: row.EVALUATE_ID,serviceId:row.SERVICE_ID,caseId:row.CASE_ID,serviceType:row.SERVICE_TYPE}})
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

