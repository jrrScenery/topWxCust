<!--首页-case评价列表-->
<template>
  <div class="eventEvaluationView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <template v-for="item in table_arr" >
          <router-link :to="{name:'eventEvaluationEditor'}"  v-bind:key="item.id">
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
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
export default {
  name: 'caseEvaluateList',

  components: {
    headerLast
  },

  data () {
    return {
      eventEvaluationTit: 'Case评价',
      tableData: [],
      table_arr: [
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '50%'
        },
        {
          prop: 'CASE_CD',
          label: '事件编号',
          fixed: true,
          width: '36%'
        },
        {
          prop: 'TOTAL_SCORE',
          label: '分值',
          fixed: true,
          width: '14%'
        }
      ]
    }
  },

  methods: {

  },
  created:function(){
    let url = global_.proxyServer+"?action=GetCaseEvaluate&PAGE_NUM=1&PAGE_TOTAL=10";
    console.log(url);
    fetch.get(url,{}).then(res=>{
      this.tableData = res.data;
      console.log(this.tableData);
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
