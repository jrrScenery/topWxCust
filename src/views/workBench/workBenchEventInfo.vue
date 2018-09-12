<!--工作台-事件信息-->
<template>
  <div class="workBenchEventInfoView">
    <header-last :title="workBenchEventInfoTit" :backUrl="backUrl"></header-last>
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
          show-summary
          max-height="437"
          v-loading="busy && !loadall"
          @row-click="rowClick"
          style="width: 100%;">
          <template v-for="item in workBenchEventInfoObj">
            <el-table-column
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
            </el-table-column>
          </template>
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
  name: 'workBenchEventInfo',

  components: {
    headerLast
  },
  data () {
    return {
      workBenchEventInfoTit: '事件信息',
      form: {
        date1: this.getFormerTime(1)[0],
        date2: this.getCurrentTime(1)[0]
      },
      tableData: [],
      workBenchEventInfoObj: [
        {prop: 'INDUSTRY', label: '行业', width: '25%'},
        {prop: 'FAULT_NUM', label: '故障类', width: '25%'},
        {prop: 'NON_FAULT_NUM', label: '非故障类', width: '25%'},
        {prop: 'total', label: '总计', width: '25%'}
      ],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        }
      },
      backUrl : 'workBench',
      busy:true,
      loadall: false
    }
  },
  created () {
    
    if(undefined!=this.$route.query.date1){
      this.form.date1 = this.$route.query.date1;
      this.form.date2 = this.$route.query.date2;
    }

    this.returnList()
    //console.log(this.form)
  },
  methods: {
    returnList () {
      fetch.get("?action=GetCaseStat",{START_TIME: this.form.date1, END_TIME: this.form.date2}).then(res=>{
        this.tableData = res.data
        console.log(res.data)
        let _this = this
        for (let i = 0; i < this.tableData.length; i++) {
          let totalNum = this.tableData[i].FAULT_NUM + this.tableData[i].NON_FAULT_NUM
          _this.tableData[i] = {
            INDUSTRY: _this.tableData[i].INDUSTRY,
            INDUSTRY_ID: _this.tableData[i].INDUSTRY_ID,
            FAULT_NUM: _this.tableData[i].FAULT_NUM,
            NON_FAULT_NUM: _this.tableData[i].NON_FAULT_NUM,
            total: totalNum
          }
        }

        this.busy= false;
        this.loadall = true;
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
    // 跳转链接
    rowClick (row) {
      this.$router.push({name: 'workBenchEventInfoShow', query: {complantId: row.COMPLANT_ID,industry: row.INDUSTRY_ID,industryName: row.INDUSTRY,date1:this.form.date1,date2:this.form.date2}})
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
      //console.log(yearArr)
      return yearArr
    },
    getCurrentTime (n) {
      let nowYear = new Date().getFullYear(), yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    },
    noKeyword () {
      document.activeElement.blur()
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
</style>
