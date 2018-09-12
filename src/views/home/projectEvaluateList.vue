<!--首页-项目满意度列表-->
<template>
  <div class="projectEvaluationView">
    <header-last :title="projectEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <template v-for="item in table_arr">
          <router-link :to="{name:'eventEvaluationEditor'}" :key="item.id">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
          </router-link>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
  name: 'projectEvaluateList',

  components: {
    headerLast
  },

  data () {
    return {
      projectEvaluationTit: '项目满意度',
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
          width: '14%'
        },
        {
          prop: 'EVALUATE_FROM_NAME',
          label: '评价人',
          fixed: true,
          width: '16%'
        },
        {
          prop: 'EVALUATE_TIME',
          label: '评价时间',
          fixed: true,
          width: '25%'
        }
      ]
    }
  },

  methods: {

  },

  created:function(){
    let url = "?action=GetProjectEvaluate&PAGE_NUM=1&PAGE_TOTAL=10";
    fetch.get(url,"").then(res=>{
      console.log(res.data);
      this.tableData = res.data;
    });
  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff;}
  .content >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .content >>> .el-table th>.cell{line-height: 0.3rem; padding: 0}
  .content >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .content >>> .el-table td>.cell{line-height: 0.3rem; padding: 0}
</style>
