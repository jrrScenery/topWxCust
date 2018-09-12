<!--工作台-供应商信息-->
<template>
  <div class="workBenchSupplierView">
    <header-last :title="workBenchSupplierTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        style="width: 100%">
        <el-table-column
          prop="AREANAME"
          label="城市"
          width="24%">
        </el-table-column>
        <el-table-column label="供应商类型">
          <el-table-column
            prop="COUNT1"
            label="人员"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="COUNT2"
            label="备件"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="COUNT3"
            label="物流"
            width="19%">
          </el-table-column>
          <el-table-column
            prop="COUNT4"
            label="分包"
            width="19%">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchSupplier',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchSupplierTit: '供应商信息',
      tableData: [],
      busy:true,
      loadall: false
    }
  },

  created () {
    fetch.get("?action=GetSupplierStat&EMPID="+global_.empId,{}).then(res=>{
      this.tableData = res.data
      this.busy= false;
      this.loadall = true;
      console.log(this.tableData)
    });
  },

  methods: {
  }
}
</script>

<style scoped>
  .workBenchSupplierView{width: 100%;}
  .content{margin-top: 0.05rem; color: #666666}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7; color: #333333}
  .content >>> .el-table td{border: none}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>
