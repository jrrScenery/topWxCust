<!--投诉和意见-->
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
        :height = "tableHeight"
        @row-click="rowClick"
        style="width: 100%">
        <template v-for="item in table_arr">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
            <template slot-scope="scope">
              <template v-if="item.prop == 'COMPLAINT_COMMENT'">
                <span v-html="scope.row.COMPLAINT_COMMENT"></span>
              </template>
              <span v-else v-html="scope.row[item.prop]"></span>
            </template>
          </el-table-column>
        </template>
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
              prop: 'TASK_TYPE',
              label: '类型',
              fixed: true,
              width: '15%'
            },
            {
              prop: 'CUST_NAME',
              label: '客户',
              fixed: true,
              width: '40%'
            },
            {
              prop: 'CREATE_ON',
              label: '提交日期',
              fixed: true,
              width: '25%'
            },
            {
              prop: 'TASK_STATUS',
              label: '状态',
              fixed: true,
              width: '20%'
            }
      ],

      page: 1,
      pageSize: 15,
      busy: false,
      loadall: false,
      tableHeight:400,
      type: this.$route.query.TYPE
    }
  },

  created () {
    this.getEventList()
  },
  mounted(){
    this.$nextTick(() => {
      let self = this;
      // console.log(document.documentElement.clientHeight);
      // console.log(this.$refs.etable.$el.offsetTop);
      this.tableHeight = document.documentElement.clientHeight- ("my"== this.type?45:90);
      window.onresize = function() {
        self.tableHeight = document.documentElement.clientHeight- ("my"== this.type?45:90);
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

      var reqParams = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize,TYPE: this.type};
      fetch.get("?action=GetComplaintsList",reqParams).then(res=>{
        console.log(res);
        var tmpar= res.data;
        tmpar = tmpar.map(function(item){
          item.COMPLAINT_COMMENT = item.COMPLAINT_COMMENT.replace(/\n/g, "<br/>");
          return item;
        })
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
            duration:3000,
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
      this.$router.push({name: 'mineFeedbackShow', query: {complantId: row.COMPLANT_ID}})
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


