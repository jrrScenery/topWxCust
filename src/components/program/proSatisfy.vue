<!--满意度-->
<template>
  <div class="proPlanView">
    <div class="proPlanCell">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <template v-for="item in table_arr">
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
</template>

<script>
import fetch from '../../utils/ajax'
export default {
  name: 'proPlan',

  components: {

  },

  data () {
    return {
      tableData: [],
      table_arr: [
        {
          prop: 'EVALUATE_FROM_NAME',
          label: '评价人',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'EVALUATE_TIME',
          label: '评价时间',
          fixed: true,
          width: '40%'
        },
        {
          prop: 'TOTAL_SCORE',
          label: '得分',
          fixed: true,
          width: '30%'
        }
      ]
    }
  },
  created () {
    fetch.get("?action=GetProjectEvaluate&PROJECT_ID="+this.$route.query.projectId,{}).then(res=>{
      this.tableData = res.data;
      //console.log(res);
    });
  },
  methods: {

  }
}
</script>

<style scoped>
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem; padding: 0 0.05rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>
