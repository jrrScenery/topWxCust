<template>
    <div class="reportView">
        <header-base :title="reportTit" :searchType="searchType" :queryData="searchData"  @searchPro="getSearParams"></header-base>
        <!-- <div class="searchInput">
            <el-input placeholder="搜索">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div> -->
        <div class="echartsView">
            <div class="chartOne">
                <div class="BtmTit">{{chartOneTit}}</div>
                <div id="myChartOne" :style="{width: '100%', height: '2rem'}"></div>
            </div>
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
import headerBase from '../header/headerBase'
import fetch from '../../utils/ajax'
export default {
    name:'report',
    components:{
        headerBase
    },
    data(){
        return{
            reportTit:'报表',
            searchType: 'report',
            form: {
                // custom: '',
                program: '',
                sale: '',
                pm: '',
                startTime: this.getFormerTime(1)[0],
                endTime: this.getCurrentTime(1)[0],
                // industry: ''
            },
            isSearch:false,
            searchData:[],
            oneData:[],
            oneDataX: [],
            factoryData:[],
            factoryDataX:[],
            // startTime: this.getFormerTime(1)[0],
            // endTime: this.getCurrentTime(1)[0],
            chartOneTit:'月度报修数量统计',
            chartTwoTit: '厂商报修数统计',
            chartThreeTit: '报障级别统计',
            chartFourTit: '设备型号报修数统计',
            chartFiveTit: '技术方向报修数统计',
            chartSixTit: '备件更换量统计',
            searchData:{
                program:[]
                // industry:[],
            },
        }
    },
    created(){
        // fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
        //     this.industryType = res.data;
        //     // console.log(this.industryType)
        // });
        this.firstFreshCharts();
    },
    methods:{
        freshCharts(params){
            this.fetch1(params);
            this.fetch2(params);
            this.fetch3(params);
            this.fetch4(params);
            this.fetch5(params);
            this.fetch6(params);
        },
        firstFreshCharts(){
            let params = {timeStart:this.form.startTime,timeEnd:this.form.endTime,PROJECT_CODE:this.form.program}
            console.log(params)
            this.fetch1(params);
            this.fetch2(params);
            this.fetch3(params);
            this.fetch4(params);
            this.fetch5(params);
            this.fetch6(params);
        },
        fetch1(params){
            var url = "?action=/report/GetStatisticsCaseData&dimensionType=date&timeRangeType=month";
            fetch.get(url,params).then(res=>{
                console.log("qqqqqqqqqq");
                console.log(res);
                var reportData = res.DATA;
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
        },
        fetch2(params){
            let url = "?action=/report/GetStatisticsCaseData&dimensionType=factory&timeRangeType=month";
            fetch.get(url,params).then(res=>{
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
        },
        fetch3(params){
            let url = "?action=/report/GetStatisticsCaseData&dimensionType=caseLevel&timeRangeType=month";
            fetch.get(url,params).then(res=>{
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
        },
        fetch4(params){
            let url = "?action=/report/GetStatisticsCaseData&dimensionType=deviceModel&timeRangeType=month";
            fetch.get(url,params).then(res=>{
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
        },
        fetch5(params){
            let url = "?action=/report/GetStatisticsCaseData&dimensionType=deviceType&timeRangeType=month";
            fetch.get(url,params).then(res=>{
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
        },
        fetch6(params){
            var url = "?action=/report/GetStatisticsCaseData&dimensionType=partUse&timeRangeType=month";
            fetch.get(url,params).then(res=>{
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
            let myChartBox = document.getElementById('myChartOne')
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
                    type: 'value'
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
        },
        drawLineTwo () {
            console.log(this.factoryDataX)
            let myChartBox = document.getElementById('myChartTwo')
            this.myChartTwo = echarts.init(myChartBox)       
            this.myChartTwo.setOption({
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: this.factoryDataX
                },
                series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    label: {
                    emphasis: {
                        show: true,
                        textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                        }
                    }
                    },
                    data: this.factoryData,
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
        },
        drawLineThree () {
            let myChartBox = document.getElementById('myChartThree')
            // myChartBox.style.width = window.innerWidth - 30  + 'px'
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
                        fontSize: '15',
                        fontWeight: 'bold'
                        }
                    }
                    },
                    startAngle:0,
                    minAngle:10,
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
                        formatter: '{b} : {c}  ({d}%)'
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
        },
        drawLineFour () {
            let myChartBox = document.getElementById('myChartFour')
            // myChartBox.style.width = window.innerWidth - 30  + 'px'
            myChartBox.style.height = '300px'
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
                boundaryGap: [0, 0.01]
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
                        formatter: '{c}',
                        position:'right'
                        },
                        labelLine:{
                        show:true
                        }
                    }
                    }
                },
                ]
            })
        },
        drawLineFive () {
            let myChartBox = document.getElementById('myChartFive')
            // myChartBox.style.width = window.innerWidth - 30  + 'px'
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
                    label: {
                    emphasis: {
                        show: true,
                        textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                        }
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
        },
        drawLineSix () {
            let myChartBox = document.getElementById('myChartSix')
            // myChartBox.style.width = window.innerWidth - 30  + 'px'
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
                    type: 'value'
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
        },
        getSearParams (formData) {
            this.searchData = formData;
            this.getChartData();
        },
        getChartData(){
            let params = {};
            params.PROJECT_CODE = this.searchData.program;
            // params.INDUSTRY = this.searchData.industry;
            // params.CUST_NAME = this.searchData.custom;
            params.timeStart = this.searchData.startTime;
            params.timeEnd = this.searchData.endTime;
            this.freshCharts(params)
        },
        standardDate(join,...num){
            let arr = [];
            num.forEach((item)=>{
                item.toString().length<2?arr.push('0'+item):arr.push(item);
            });
            arr.pop()
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
        getCurrentTime (n) {
            let nowYear = new Date().getFullYear(), yearArr = []
            yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
            for(let i = 1;i<n;i++){
                yearArr.unshift(nowYear-i+'1231')
            }
            //console.log(yearArr)
            return yearArr
        }
    }
    
}
</script>
<style scoped>
.reportView{width: 100%;overflow: scroll;}
/* .searchInput >>> .el-input{padding: 0.1rem 0; border-bottom: 0.01rem solid #e1e1e1}
.searchInput >>> .el-input__icon{width: 0.4rem;font-size: 0.2rem}
.searchInput >>> .el-input__inner{border-color: #e1e1e1;  background: #f5f5f9} */
.echartsView{ width: 96%; margin: 0 auto;}
.BtmTit{margin-top: 15px;position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.16rem; color: #2698d6;}
.BtmTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
.BtmTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
</style>


