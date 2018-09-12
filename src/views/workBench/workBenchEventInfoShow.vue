<!--工作台-事件明细-->
<template>
  <div class="workBenchEventInfoView">
    <header-last :title="workBenchEventInfoTit" :backUrl="backUrl" :date1="form.date1" :date2="form.date2"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="searchView">
        <el-form>
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date1" style="width: 90%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">~</el-col>
          <el-col :span="8">
            <el-form-item prop="date2">
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date2" style="width: 90%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button @click="searchInfo">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="tableView">
        <el-table
          :data="tableData"
          :summary-method="getSummaries"
          max-height="440"
          @cell-click="tdClick"
          show-summary
          style="width: 100%;">
          <el-table-column :label="this.$route.query.industryName">
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
import fetch from '../../utils/ajax'

export default {
  name: 'workBenchEventInfoShow',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchEventInfoTit: '事件信息',
      backUrl : 'workBenchEventInfo',
      queryParams : '',
      form: {
        date1: new Date(this.getFormerTime(1)),
        date2: new Date()
      },
      tableData: [],
      workBenchEventInfoObj: [
        {prop: 'CUST_NAME', label: '客户', width: ''},
        {prop: 'FAULT_NUM', label: '故障类', width: ''},
        {prop: 'NON_FAULT_NUM', label: '非故障类', width: ''},
        {prop: 'total', label: '总计', width: ''}
      ],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < this.value1 || time.getTime() > Date.now();
        }
      }
    }
  },
  created () {
    if(undefined!=this.$route.query.date1){
      this.form.date1 = this.$route.query.date1;
      this.form.date2 = this.$route.query.date2;
    }

    this.backUrl = "workBenchEventInfo";
    this.queryParams = {date1:this.form.date1,date2:this.form.date2};
    this.returnList()
  },
  methods: {
    returnList () {
      fetch.get("?action=GetCaseStatList",{START_TIME:this.form.date1, END_TIME: this.form.date2, INDUSTRY_NAME: this.$route.query.industry}).then(res=>{
        this.tableData = res.data
        console.log(res.data)
        let _this = this
        for (let i = 0; i < this.tableData.length; i++) {
          let totalNum = this.tableData[i].FAULT_NUM + this.tableData[i].NON_FAULT_NUM
          _this.tableData[i] = {CUST_NAME: _this.tableData[i].CUST_NAME,CUSTOMER_ID: _this.tableData[i].CUSTOMER_ID, FAULT_NUM: _this.tableData[i].FAULT_NUM, NON_FAULT_NUM: _this.tableData[i].NON_FAULT_NUM, total: totalNum}
        }
      })
    },
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
    },
    searchInfo () {
      this.returnList()
    },
    standardDate(join,...num){
      let arr = [];
      num.forEach((item)=>{
        item.toString().length<2?arr.push('0'+item):arr.push(item);
      });
      return arr.join('-')
    },
    getFormerTime (n) {
      let nowYear = new Date().getFullYear() - 1, yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      return yearArr
    },
    noKeyword () {
      document.activeElement.blur()
    },
    // 点击单元格时
    tdClick (row, column, cell, event) {
      let type = '3,5'
      if (column.label == '故障类') {
        type = '1,2,4'
      }
      console.log(row);
      this.$router.push({name: 'workBenchMyEventAll', query: {custid: row.CUSTOMER_ID,isSearch:1, type: type, industry:this.$route.query.industry,startDate:this.form.date1,endDate:this.form.date2}})
    }
  }
}
</script>

<style scoped>
  .workBenchEventInfoView{width: 100%; text-align: center;}
  .workBenchEventInfoView .content{background: #ffffff;}
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
