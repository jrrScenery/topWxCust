<!--工作台-备件库存-->
<template>
  <div class="workBenchPartsView">
    <header-last :title="workBenchPartsTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
        stripe
        :data="tableData"
        v-loading="busy && !loadall"
        style="width: 100%">
        <el-table-column
          prop="PROVINCE_NAME"
          label="地点"
          width="16%">
        </el-table-column>
        <el-table-column label="自有">
          <el-table-column
            prop="ZY_PART_NUMBER"
            label="数量"
            width="15%">
          </el-table-column>
          <el-table-column
            prop="ZY_PART_AMOUNT"
            label="金额"
            width="27%">
          </el-table-column>
        </el-table-column>
        <el-table-column label="供应商">
          <el-table-column
            prop="GYS_PART_NUMBER"
            label="数量"
            width="15%">
          </el-table-column>
          <el-table-column
            prop="GYS_PART_AMOUNT"
            label="金额"
            width="27%">
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
  name: 'workBenchParts',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchPartsTit: '备件库存',
      tableData: [],
      busy:true,
      loadall: false
    }
  },
  created () {
    fetch.get("?action=GetPartStat",{}).then(res=>{
      this.tableData = res.data;
      this.busy= false;
      this.loadall = true;
      // console.log(this.tableData);
    });
  },
  methods: {
  }
}
</script>

<style scoped>
  .workBenchPartsView{width: 100%;}
  .content{margin-top: 0.05rem;}
  .content >>> .el-table__body{width: 100%!important}
  .content >>> .el-table__header{width: 100%!important}
  .content >>> .el-table{font-size: 0.13rem; text-align: center}
  .content >>> .el-table th{text-align: center; background: #f7f7f7}
  .content >>> .el-table td{border: none}
  .content >>> .el-table td:nth-child(3){text-align: right;}
  .content >>> .el-table td:nth-child(5){text-align: right; padding-right: 0.05rem}
  .content >>> .el-table .cell{padding: 0;}
  .content >>> .el-table__empty-block{position: initial}
</style>
