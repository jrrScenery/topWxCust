<template>
  <div class="CalendarView">
    <header-last :title="calendarTit" backUrl='home'></header-last>
	  <div style="height: 0.45rem;"></div>
	  <div class="ContextView">
        <full-calendar
          class="calendar"
          :options="options"
          :ref="events"
          :events="events"
          @changeMonth="changeMonth"
          @eventClick="emitEventClick">
        </full-calendar>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import { FullCalendar } from 'vue-fullcalendar'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
  name: 'projectCalendar',
  components: {
    'full-calendar': require('vue-fullcalendar'),
    headerLast,
    footerHome
  },
  data () {
    return {
      calendarTit: "报修日历",
      eventCaseShow: false,
      titles: {"caseDatas": "事件", "deliveryDatas": "项目交付", "proStartDatas": "项目起始", "proEndDatas": "项目终止", "inspectStartDatas": "巡检起始", "inspectEndDatas": "巡检终止", "communicateDatas": "例行沟通"},
      caselist: [],
      deliverylist: [],
      projectlist: [],
      inspectlist: [],
      communicatelist: [], 
      listall: [],
      options: {
        locale: 'zh',
        editable: true,
        selectable: true,
        allDaySlot: false,
        defaultView: 'agendaDay',
        eventResourceField: 'room'
      },
      events: [],
      // events: [{
      //   // id: 1,
      //   // room: 1,
      //   title: '巡检：某某某巡检公告',
      //   projectName: "TTTTTTEEEE",
      //   start: '2019-02-17 12:00',
      // }, {
      //   id: 2,
      //   room: 2,
      //   title: '测试：某某某测试公告',
      //   start: '2019-02-17 12:00',
      // }, {
      //   id: 3,
      //   room: 3,
      //   title: 'one测试',
      //   start: '2019-01-19 12:00',
      // },{
      //   id: 5,
      //   room: 5,
      //   title: 'five测试',
      //   start: '2019-03-05 12:00',
      // },{
      //   id: 4,
      //   room: 4,
      //   title: 'three测试',
      //   start: '2019-03-02 12:00',
      // },{
      //   id: 6,
      //   room: 6,
      //   title: 'six测试',
      //   start: '2019-02-28 12:00',
      // },{
      //   id: 7,
      //   room: 7,
      //   title: 'seven测试',
      //   start: '2019-02-02 12:00',
      // },{
      //   id: 8,
      //   room: 8,
      //   title: 'seven测试',
      //   start: '2019-02-09 12:00',
      // },{
      //   id: 9,
      //   room: 9,
      //   title: 'seven测试',
      //   start: '2019-02-20 12:00',
      // },{
      //   // id: 10,
      //   // room: 10,
      //   title: '测试：某某某测试公告',
      //   start: '2019-02-17 12:00',
      // },{
      //   id: 11,
      //   room: 11,
      //   title: '测试：某某某测试公告',
      //   start: '2019-02-17 12:00',
      // }]
    }
  },
  created: function () {
    const loading = this.$loading({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)'
    });
    let timeAroud = this.currentTimeAround()
    let currentT = timeAroud[0]
    let currentTMonth = timeAroud[1]
    console.log(currentT, currentTMonth)
    fetch.get("?action=/case/QueryCustomerCase&startTime=" + "&endTime=",{}).then(res=>{
      console.log(res)
      if (res.STATUSCODE=="1") {
        loading.close()
        this.$message({
          message: "加载成功",
          type: 'success',
          center: true,
          duration: 500,
          customClass: 'msgdefine'
        });
        var datas = res;
        console.log(datas)
        this.listall = []
        for (var key in datas){
          if (key == "caseDatas") {
            for (var item in datas[key]) {
              let cases = {}
              cases.caseCd = datas[key][item]["caseCd"]
              cases.projectName = datas[key][item]["projectName"]
              cases.start = datas[key][item]["faultTime"]
              cases.caseId = datas[key][item]["caseId"]
              cases.custId = datas[key][item]["custId"]
              cases.caseLevel = datas[key][item]["caseLevel"]
              cases.title = this.titles[key]
              this.listall.push(cases)
            }
          // }
          // else if (key == "communicateDatas") {
          //   for (var item in datas[key]) {
          //     let communitcates = {}
          //     communitcates.itemName = datas[key][item]["itemName"]
          //     communitcates.projectName = datas[key][item]["projectName"]
          //     communitcates.start = datas[key][item]["planStartDate"]
          //     communitcates.title = this.titles[key]
          //     this.listall.push(communitcates)
          //   }
          // }
          // else if (key == "deliveryDatas") {
          //   for (var item in datas[key]) {
          //     let deliverys = {}
          //     deliverys.projectName = datas[key][item]["projectName"]
          //     deliverys.start = datas[key][item]["projectStartDate"]
          //     deliverys.projectCode = datas[key][item]["projectCode"]
          //     deliverys.title = this.titles[key]
          //     this.listall.push(deliverys)
          //   }
          // }
          // else if (key == "inspectStartDatas") {
          //   for (var item in datas[key]) {
          //     let inspects = {}
          //     inspects.start = datas[key][item]["planStartDate"]
          //     inspects.projectName = datas[key][item]["projectName"]
          //     inspects.projectCode = datas[key][item]["projectCode"]
          //     inspects.title = this.titles[key]
          //     this.listall.push(inspects)
          //   }
          // }
          // else if (key == "inspectEndDatas") {
          //   for (var item in datas[key]) {
          //     let inspects = {}
          //     inspects.start = datas[key][item]["planEndDate"]
          //     inspects.projectName = datas[key][item]["projectName"]
          //     inspects.projectCode = datas[key][item]["projectCode"]
          //     inspects.title = this.titles[key]
          //     this.listall.push(inspects)
          //   }
          // }
          // else if (key == "proStartDatas") {
          //   for (var item in datas[key]) {
          //     let projects = {}
          //     projects.start = datas[key][item]["projectStartDate"]
          //     projects.projectCode = datas[key][item]["projectCode"]
          //     projects.projectName = datas[key][item]["projectName"]
          //     projects.title = this.titles[key]
          //     this.listall.push(projects)
          //   }
          // }
          // else if (key == "proEndDatas") {
          //   for (var item in datas[key]) {
          //     let projects = {}
          //     projects.start = datas[key][item]["projectEndDate"]
          //     projects.projectCode = datas[key][item]["projectCode"]
          //     projects.projectName = datas[key][item]["projectName"]
          //     projects.title = this.titles[key]
          //     this.listall.push(projects)
          //   }
          }
        }
        this.events = this.listall
        console.log("AAASSDDD", this.listall)
        // console.log("A", this.caselist)
        // console.log("B", this.communicatelist)
        // console.log("C", this.deliverylist)
        // console.log("D", this.inspectlist)
        // console.log("E", this.projectlist)
        // this.listall.concat(this.caselist)
        // console.log("AAA", this.listall)
        // this.listall.concat(this.communicatelist)
        // this.listall.concat(this.deliverylist)
        // this.listall.concat(this.inspectlist)
        // this.listall.concat(this.projectlist)
        // console.log("1111111111111", this.listall)
        // console.log(datas.get("caseDatas"))
        
      }
    });
  },
  watch: {
  },
  methods: {
    currentTimeAround (time){
      let date = new Date();
      let currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + "1";
      let year = date.getFullYear()
      let month = date.getMonth() + 2
     if (month > 12) {
        year = year + 1
        month = 1
      }
      let currentTimeNextMonth = year + '-' + month + '-' + "1";
      return [currentTime, currentTimeNextMonth];
    },
    emitEventClick (event, jsEvent, pos) {
      this.$router.push({name: 'casedetail', query: {caseId: event.caseId,route:'projectCalendar'}})
      // ,projectId:info.PROJECT_ID,ifClose:info.IF_CLOSE,ifEvaluate:info.IF_EVALUATE}})
      console.log("111111111111111111", event, jsEvent, pos)
    },
    // changeMonth (start, end, currentStart, current) {
    //   this.listall = []
    //   console.log("AAAAAAAAAAA", this.listall)
    //   if (this.listall.length){
    //     alert("11111")
    //   }
    //   const loading = this.$loading({
    //     lock: true,
    //     text: '加载中',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.3)'
    //   });
    //   let splitDate = currentStart.split("-")
    //   let year = parseInt(splitDate[0])
    //   let month = parseInt(splitDate[1]) + 1
    //   if (month > 12) {
    //     year = year + 1
    //     month = 1
    //   }
    //   let currentTNextMonth = year + "-" + month + "-" + splitDate[2]
    //   fetch.get("?action=/case/QueryCustomerCase&startTime="+ currentStart + " 00:00:00" + "&endTime=" + currentTNextMonth + " 00:00:00",{}).then(res=>{
    //     if (res.STATUSCODE=="1") {
    //       loading.close()
    //       this.$message({
    //         message: "加载成功",
    //         type: 'success',
    //         center: true,
    //         duration: 500,
    //         customClass: 'msgdefine'
    //       });
    //       var datas = res;
    //       for (var key in datas){
    //         if (key == "caseDatas") {
    //           for (var item in datas[key]) {
    //             let cases = {}
    //             cases.caseCd = datas[key][item]["caseCd"]
    //             cases.projectName = datas[key][item]["projectName"]
    //             cases.start = datas[key][item]["faultTime"]
    //             cases.caseId = datas[key][item]["caseId"]
    //             cases.custId = datas[key][item]["custId"]
    //             cases.caseLevel = datas[key][item]["caseLevel"]
    //             cases.title = this.titles[key]
    //             this.listall.push(cases)
    //           }
    //         }
    //       }
    //       this.events = this.listall
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>
/* .external-events {
  position: fixed;
  z-index: 2;
  top: 120px;
  left: 20px;
  width: 150px;
  padding: 0 10px;
  border: 1px solid #ccc;
  background: #eee;
}
.calendar-container {
  position: relative;
  z-index: 1;
  margin-left: 200px;
}
.calendar {
  max-width: 900px;
  margin: 20px auto;
} */

.CalendarView{width: 100%;overflow: scroll;}
.ContextView{ width: 100%; margin: 0 auto; bottom: 0.45rem}
.ContextView >>> .comp-full-calendar {padding: 12px 1px;}
.ContextView >>> .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-start {margin-left: 1px;}
.ContextView >>> .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {margin-right: 1px;}
.ContextView >>> .full-calendar-body .dates .week-row {height: 70px;}
.ContextView >>> .full-calendar-body .dates .week-row .day-cell {min-height: 1px;}
.ContextView >>> .full-calendar-body .dates .dates-events .events-week .events-day {min-height: 70px;}
.ContextView >>> .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {font-size: 13px;height: 13px;line-height: 13px;}
.ContextView >>> .full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link {font-size: 5px; padding-left: 5px;}
/* .el-message-box {width: 300px;} */

.ContextView .pop {
    background-color: #ffffff;
    height: 1rem;
    position: fixed;
    width: 40%;
    z-index: 1000;
    border: 1px solid #8EE5EE;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

</style>