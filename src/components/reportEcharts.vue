<!--分析报表-->
<template>
  <div class="echartsView">
    <div class="chartOne">
      <div class="BtmTit">{{chartOneTit}}</div>
      <div id="myChartOne" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartTwo">
      <div class="BtmTit">{{chartTwoTit}}</div>
      <div id="myChartTwo" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartThree">
      <div class="BtmTit">{{chartThreeTit}}</div>
      <div id="myChartThree" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartFour">
      <div class="BtmTit">{{chartFourTit}}</div>
      <div id="myChartFour" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartFive">
      <div class="BtmTit">{{chartFiveTit}}</div>
      <div id="myChartFive" :style="{width: '100%', height: '2rem'}"></div>
    </div>
    <div class="chartSix">
      <div class="BtmTit">{{chartSixTit}}</div>
      <div id="myChartSix" :style="{width: '100%', height: '2rem'}"></div>
    </div>
  </div>
</template>

<script>
import fetch from '../utils/ajax'

// let echarts = require('echarts/lib/echarts')
export default {
  name: 'reportEcharts',
  props:['startMonth','endMonth'],
  components: {

  },

  data () {
    return {
      chartOneTit: '月度报修数量统计',
      chartTwoTit: '厂商报修数统计',
      chartThreeTit: '报障级别统计',
      chartFourTit: '设备型号报修数统计',
      chartFiveTit: '技术方向报修数统计',
      chartSixTit: '备件更换量统计',
      oneDataX: [],
      oneData:  [],
      sixDataX:[],
      sixData:[],
      factoryData:[],
      factoryDataX:[],
      deviceTypeData:[],
      deviceModelXData:[],
      deviceModelYData:[],
      caseLevelData:[]
    }
  },

  mounted () {
    this.drawLine()
  },

  created () {
    this.reFetchAll()
  },

  methods: {
    onSubmit () {
      //console.log('submit')
    },
    crtTimeFtt(val) {
      if (val != null) {
        var date = new Date(val);
        var month = date.getMonth() + 1;
        if(month<10){
          month = "0" + month;
        }
        return date.getFullYear() + '-' + month ;//+ '-' + date.getDate()
      }
    },
    reFetchAll(){
      this.fetchAll(this.crtTimeFtt(this.startMonth),this.crtTimeFtt(this.endMonth));
    },
    fetchAll(startDay,endDay){
      var projectId = this.$route.query.projectId;
      
      var url = "?action=GetStatisticsCaseData&dimensionType=date&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        //console.log(reportData);
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
          dataArray[i] = reportData[i].NUMS;
        }
        this.oneData = dataArray;
        this.oneDataX = dataArrayX;
        this.drawLineOne();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=factory&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
        }
        this.factoryData = dataArray;
        this.factoryDataX = dataArrayX;
        this.drawLineTwo();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=deviceType&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        for(var i=0;i<reportData.length;i++){
          dataArray[i] = {};
          dataArray[i].name = reportData[i].DIMENSIONTYPE;
          dataArray[i].value = reportData[i].NUMS;
        }
        this.deviceTypeData = dataArray;
        this.drawLineFive();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=deviceModel&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var xData = [] ,yData = [];
        for(var i=0;i<reportData.length;i++){
          xData[i] = reportData[i].DIMENSIONTYPE;
          yData[i] = reportData[i].NUMS;
        }
        this.deviceModelXData = xData;
        this.deviceModelYData = yData;
        this.drawLineFour();
      });

      url = "?action=GetStatisticsCaseData&dimensionType=caseLevel&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        var dataArray = [];
        if(typeof(reportData)!='undefined'){
          for(var i=0;i<reportData.length;i++){
            dataArray[i] = {};
            dataArray[i].name = reportData[i].DIMENSIONTYPE;
            dataArray[i].value = reportData[i].NUMS;
          }
          this.caseLevelData = dataArray;
          this.drawLineThree();          
        }
      });

      var url = "?action=GetStatisticsCaseData&dimensionType=partUse&timeRangeType=month&projectId="+projectId+"&timeStart="+startDay+"&timeEnd="+endDay;
      fetch.get(url,{}).then(res=>{
        var reportData = res.DATA;
        //console.log(reportData);
        var dataArray = [];
        var dataArrayX = [];
        for(var i=0;i<reportData.length;i++){
          dataArrayX[i] = reportData[i].DIMENSIONTYPE;
          dataArray[i] = reportData[i].NUMS;
        }
        this.sixData = dataArray;
        this.sixDataX = dataArrayX;
        this.drawLineSix();
      });
    },

    drawLineOne () {
      if ( this.oneData.length != 0 ) {
        let myChartBox = document.getElementById('myChartOne')
        myChartBox.removeAttribute('_echarts_instance_');
        myChartBox.style.width = window.innerWidth - 30  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartOne = echarts.init(myChartBox)
        this.myChartOne.setOption({
          color: ['#3398DB'],
          grid: {
            top: '5%',
            left: '0',
            right: '0',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.oneDataX,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              boundaryGap: [1,4]
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '50%',
              data: this.oneData,
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              }
            }
          ]
        })
      }
      else {
        let myChartBox = document.getElementById('myChartOne')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLineTwo () {
      if ( this.factoryData.length == 1 && this.factoryData[0].name == "其他" && this.factoryData[0].value == null ) {
        let myChartBox = document.getElementById('myChartTwo')
        myChartBox.textContent = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
      else if ( this.factoryData.length != 0 ) {
        let myChartBox = document.getElementById('myChartTwo')
        myChartBox.removeAttribute('_echarts_instance_');
        myChartBox.style.width = window.innerWidth - 10  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartTwo = echarts.init(myChartBox)
        this.myChartTwo.setOption({
          legend: {
              orient: 'vertical',
              data: this.factoryDataX
          },
          series: [
            {
              name: '访问来源1',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.factoryData,
              labelLine: {
                normal: {
                  show: true
                }
              },
              itemStyle: {
                normal:{
                  label:{
                    show:true,
                    formatter: '{b} : {c} \n ({d}%)'
                  },
                  labelLine:{
                    show:true
                  }
                }
              }
            }
          ]
        })
      } 
      else {
        let myChartBox = document.getElementById('myChartTwo')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLineFive () {
      if ( this.deviceTypeData.length == 1 && this.deviceTypeData[0].name == "其他" && this.deviceTypeData[0].value == null ) {
        let myChartBox = document.getElementById('myChartFive')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
      else if ( this.deviceTypeData.length != 0 ) {
        let myChartBox = document.getElementById('myChartFive')
        myChartBox.removeAttribute('_echarts_instance_');
        myChartBox.style.width = window.innerWidth - 30  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartFive = echarts.init(myChartBox)
        this.myChartFive.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.deviceTypeData,
              labelLine: {
                normal: {
                  show: true
                }
              },
              itemStyle: {
                normal:{
                  label:{
                    show:true,
                    formatter: '{b} : {c} \n ({d}%)'
                  },
                  labelLine:{
                    show:true
                  }
                }
              }
            }
          ]
        })
      }
      else{
        let myChartBox = document.getElementById('myChartFive')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLineFour () {
      if ( this.deviceModelXData.length == 1 && this.deviceModelXData[0] == "其他" ) {
        let myChartBox = document.getElementById('myChartFour')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
      else if ( this.deviceModelXData.length != 0 ){
        let myChartBox = document.getElementById('myChartFour')
        myChartBox.removeAttribute('_echarts_instance_'); 
        myChartBox.style.width = window.innerWidth - 30  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartFour = echarts.init(myChartBox)
        this.myChartFour.setOption({
          grid: {
            top: '5%',
            left: '0',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [1,4]
          },
          yAxis: {
            type: 'category',
            data: this.deviceModelXData
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: this.deviceModelYData,
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
            },
          ]
        })
      }
      else {
        let myChartBox = document.getElementById('myChartFour')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLineThree () {
      if ( this.caseLevelData.length != 0 ){
        let myChartBox = document.getElementById('myChartThree')
        myChartBox.removeAttribute('_echarts_instance_');
        myChartBox.style.width = window.innerWidth - 30  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartThree = echarts.init(myChartBox)
        this.myChartThree.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: this.caseLevelData,
              itemStyle: {
                normal:{
                  label:{
                    show:true,
                    formatter: '{b} : {c} \n ({d}%)'
                  },
                  labelLine:{
                    show:true
                  },
                  position: 'top'
                }
              }
            }
          ]
        })
      }
      else {
        let myChartBox = document.getElementById('myChartThree')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLineSix () {
      if ( this.sixData.length != 0 ) {
        let myChartBox = document.getElementById('myChartSix')
        myChartBox.removeAttribute('_echarts_instance_');
        myChartBox.style.width = window.innerWidth - 30  + 'px'
        myChartBox.style.height = window.innerWidth/2 +50  + 'px'
        this.myChartSix = echarts.init(myChartBox)
        this.myChartSix.setOption({
          color: ['red'],
          grid: {
            top: '5%',
            left: '0',
            right: '0',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.sixDataX,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              boundaryGap: [1,4]
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '50%',
              data: this.sixData,
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              }
            }
          ]
        })
      }
      else {
        let myChartBox = document.getElementById('myChartSix')
        myChartBox.innerText = "当前时间段内无项目记录"
        myChartBox.style.cssText = "width: '100%', height: '0.5rem'"
      }
    },
    drawLine () {
      //this.drawLineOne()
      //this.drawLineTwo()
      //this.drawLineThree()
      //this.drawLineFour()
      //this.drawLineFive()
      //this.drawLineSix()
    }
  }
}
</script>

<style scoped>
  .echartsView{padding: 0 0.15rem;}
  .echartsView .BtmTit{ line-height: 0.3rem;}
  .BtmTit{margin-top: 15px;position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.16rem; color: #2698d6;}
  .BtmTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
  .BtmTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
</style>
