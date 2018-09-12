<!--分析报表-->
<template>
  <div class="proReportView">
    <div class="proReportTop">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-date-picker type="month"  @focus="noKeyword"  placeholder="请输入时间段" v-model="form.startTime" style="width: 100%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="month" @focus="noKeyword" placeholder="请输入时间段" v-model="form.endTime" style="width: 100%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="proReportBtm">
      <charts ref="charts" :startMonth="form.startTime" :endMonth="form.endTime"></charts>
    </div>
  </div>
</template>

<script>
import charts from '../reportEcharts'
import global_ from '../../components/Global'
export default {
  name: 'proReport',
  components: {
    charts
  },

  data () {
    return {
      form: {
        startTime: new Date(this.getFormerTime(1)),
        endTime: new Date()
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < this.value1 || time.getTime() > Date.now();
        }
      },
    }
  },

  mounted () {
  },

  created () {
    
  },

  methods: {
    onSubmit () {
      this.$refs.charts.reFetchAll()
    },
    noKeyword () {
      document.activeElement.blur()
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
    }
  }
}
</script>

<style scoped>
  .proReportView{}
  .proReportTop{padding: 0.05rem 0.15rem;}
  .proReportTop >>> .el-form--inline .el-form-item{margin: -0.01rem; width: 40%;}
  .proReportTop >>> .el-form--inline .el-form-item:last-child{width: 18%;}
  .proReportTop >>> .el-form--inline .el-form-item .el-input__inner{height: 0.25rem!important; padding: 0 0.05rem; font-size: 0.13rem;}
  .proReportTop >>> .el-form--inline .el-form-item .el-input__inner::placeholder{font-size: 0.13rem;}
  .proReportTop >>> .el-input__icon{display: none}
  .proReportTop >>> .el-button{padding: 0 0.1rem; height: 0.25rem; background: #2698d6; color: #ffffff; font-size: 0.13rem;}
  .proReportTop .el-form-item__content i{ display: block;}
</style>
<style>
  .proReportTop .el-input__inner{ line-height:normal;}
  .proReportTop .el-form-item__content{ line-height:normal;}
</style>
