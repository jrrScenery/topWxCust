<!--质量-->
<template>
  <div class="qualityView">
    <div class="qualityTop">
      <span>筛选条件</span>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-select v-model="form.time" @change="freshcharts" placeholder="时间段">
            <el-option
              v-for="item in optionTime"
              :key="item.BATCH_ID"
              :label="item.BATCH_NAME"
              :value="item.BATCH_ID">
            </el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
    </div>
    <div class="qualityEcharts">
      <div class="qualityTit">{{echartsTit}}</div>
      <div id="myChart" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="qualityTable">
      <el-table
        :data="tableData"
        @row-click="rowClick"
        border
        style="width: 100%">
        <template v-for="item in qualityTableObj">
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
  name: 'quality',
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [
      ],
      batch:'',
      optionType: [
        {value: '选项1', label: '部门指标排名'},
        /*{value: '选项2', label: '部门指标明细'},
        {value: '选项3',label: '岗位角色指标排名'}*/
      ],
      echartsTit: '部门指标排名',
      tableData: [
      ],
      qualityTableObj: [
        {fixed:true, prop: 'ranking', label: '排名序列', width: '30%'},
        {fixed:true, prop: 'department', label: '部门', width: '40%'},
        {fixed:true, prop: 'score', label: '综合分值', width: '30%'}
      ],
      data1:[],
      data1X:[]
    }
  },
  mounted () {
    fetch.get("?action=GetQualityReleaseBatch",{}).then(res=>{
      this.optionTime = res.data;
      this.form.time = res.data[0].BATCH_ID;
      this.freshcharts();
      
    }); 


  },
  methods: {
    
    freshcharts(){
      let params = {TARGET_ID:1,BATCH_ID:this.form.time}
      var url = "?action=GetQualityReleaseData";
      fetch.get(url,params).then(res=>{
        console.log(res);
        var reportData = res.dataSummary;
        var dataArray = [];
        var dataArrayX = [];
        let tempTableData = [];
        for(var i=0;i<reportData.length;i++){
          let reportDataIndex = reportData.length - i -1;
          dataArrayX[i] = reportData[reportDataIndex].DEPT_NAME;
          dataArray[i] = reportData[reportDataIndex].SCORE;
          tempTableData[i] = {};
          tempTableData[i].ranking= reportData[i].ROWNUM;
          tempTableData[i].department= reportData[i].DEPT_NAME;
          tempTableData[i].score= reportData[i].SCORE;
        }
        this.tableData=tempTableData;
        this.data1 = dataArray;
        this.data1X = dataArrayX;
        this.drawLine();
      });
    },
    drawLine () {
      let myChartBox = document.getElementById('myChart')
      this.myChart = echarts.init(myChartBox)
      this.myChart.setOption({
        grid: {
          top: '5%',
          left: '0',
          right: '6%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          barWidth: '30%',
          data: this.data1X
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: this.data1,
            itemStyle: {
              normal:{
                label:{
                  show:true,
                  formatter: '{c}'
                },
                labelLine:{
                  show:true
                }
              }
            }
          }
        ]
      })
    },
    rowClick (row) {
      this.$router.push({name: 'qualityDetailDept', query: {dept:row.department,batchId:this.form.time,score:row.score}})
    }
  },

}
</script>

<style scoped>
  canvas{width: 100%!important;}
  .qualityView{padding: 0 0.25rem 0.15rem; color: #999999}
  .qualityView .qualityTop{display: flex; justify-content: space-between;}
  .qualityView span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
  .qualityEcharts{margin: 0.1rem 0;}
  .qualityEcharts .qualityTit{line-height: 0.3rem;}
  .qualityTable >>> th{color: #333333; padding: 0rem; height: 0.3rem; line-height: 0.3rem; background: #f7f7f7}
  .qualityTable >>> td{padding: 0rem;height: 0.02rem; line-height: 0.3rem;}
  .qualityTable >>> td:nth-child(1){color: #666666;}
  .qualityTable >>> td:nth-child(2){color: #666666;}
  .qualityTable >>> td:nth-child(3){color:#2698d6}
  .qualityTable >>> .cell{font-size: 0.13rem; text-align: center;}
  .fontColor{color: #2698d6}
</style>
