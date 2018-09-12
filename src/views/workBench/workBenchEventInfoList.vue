<!--工作台-事件信息列表-->
<template>
  <div class="workBenchEventInfoView">
    <header-last :title="workBenchEventInfoTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="searchView">
        <el-form>
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width: 90%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">~</el-col>
          <el-col :span="8">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date2" style="width: 90%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button>搜索</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="tableView">
        <el-table
          :data="tableData"
          :summary-method="getSummaries"
          max-height="440"
          show-summary
          style="width: 100%;">
          <el-table-column label="金融">
            <template v-for="item in workBenchEventInfoObj">
              <el-table-column
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width">
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import global_ from '../../components/Global'
export default {
  name: 'workBenchEventInfoList',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchEventInfoTit: '事件信息',
      form: {
        date1: '',
        date2: ''
      },
      tableData: [],
      workBenchEventInfoObj: [
        {prop: 'CUST_NAME', label: '客户', width: ''},
        {prop: 'FAULT_NUM', label: '故障类', width: ''},
        {prop: 'NON_FAULT_NUM', label: '非故障类', width: ''},
        {prop: 'total', label: '总计', width: ''}
      ]
    }
  },
  created () {
    this.$axios.get(global_.proxyServer+"?action=GetCaseStatList&EMPID="+global_.empId,{}).then(res=>{
      this.tableData = res.data.data
      let _this = this
      for (let i = 0; i < this.tableData.length; i++) {
        let totalNum = this.tableData[i].FAULT_NUM + this.tableData[i].NON_FAULT_NUM
        _this.tableData[i] = {INDUSTRY: _this.tableData[i].INDUSTRY, FAULT_NUM: _this.tableData[i].FAULT_NUM, NON_FAULT_NUM: _this.tableData[i].NON_FAULT_NUM, total: totalNum}
      }
      console.log(this.tableData)
    })
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>

<style scoped>
  .workBenchEventInfoView{width: 100%; text-align: center;}
  .workBenchEventInfoView .content{margin-top: 0.05rem; background: #ffffff;}
  .searchView{padding: 0.15rem 0.25rem;}
  .searchView >>> .el-form{height: 0.4rem;}
  .searchView >>> .el-input__icon{display: none}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col-1{text-align: center; line-height: 0.4rem}
  .searchView >>> .el-form .line{text-align: center; line-height: 0.4rem}
  .tableView >>> .el-table th{border-top: 0.01rem solid #e1e1e1; line-height: 0.25rem; color: #333333;}
  .tableView >>> .el-table .cell{text-align: center; padding: 0}
  .tableView >>> .el-table tr{line-height: 0.25rem; color: #666666}
  .tableView >>> .el-table tr:nth-child(2n+1){background: #f7f7f7;}
  .tableView >>> .el-table tr:nth-child(2n){background: #ffffff;}
  .tableView >>> .el-table--border, .el-table--group{border: none}
</style>
