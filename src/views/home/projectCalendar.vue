<template>
  <!-- <el-container> -->
    <!-- <el-header height="45px">
      <el-form :inline="true" class="demo-form-inline" size="small">
        <el-form-item>
          <el-button type="primary" @click="updateOptions">changeOptions</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeResources">changeResources</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeEvents">changeEvents</el-button>
        </el-form-item>
      </el-form>
    </el-header> -->
    <!-- <el-main> -->
  <div class="CalendarView">
    <header-last :title="calendarTit"></header-last>
	<div style="height: 0.45rem;"></div>
	<div class="ContextView">
        <full-calendar
          class="calendar"
          :options="options"
          :ref="events"
          :events="events"
          @eventClick="emitEventClick">
        </full-calendar>
        <div id="calendarId" class="pop" v-show="eventCaseShow" @click="showClose">  
        </div>
        <!-- @drop="handleDropIn" -->
        <!-- :resources="resources" -->
        <!-- @changeMonth="changeMonth"   
          @dayClick="dayClick"       
          @moreClick="moreClick" -->
    </div>
  </div>
      <!-- <div class="external-events">
        <h4>Draggable Events</h4>
        <vue-draggable class="fc-event" :event="{id: 4, title: 'My Event 1'}">My Event 1</vue-draggable>
        <vue-draggable class="fc-event" :event="{id: 5, title: 'My Event 2'}">My Event 2</vue-draggable>
        <vue-draggable class="fc-event" :event="{id: 6, title: 'My Event 3'}">My Event 3</vue-draggable>
        <vue-draggable class="fc-event" :event="{id: 7, title: 'My Event 4'}">My Event 4</vue-draggable>
        <vue-draggable class="fc-event" :event="{id: 8, title: 'My Event 5'}">My Event 5</vue-draggable>
      </div> -->
    <!-- </el-main> -->
  <!-- </el-container> -->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
import headerLast from '../header/headerLast'
import { FullCalendar } from 'vue-fullcalendar'
import fetch from '../../utils/ajax'
export default {
  name: 'projectCalendar',
  components: {
    'full-calendar': require('vue-fullcalendar'),
	headerLast
  },
  data () {
    return {
      calendarTit: "报修日历",
      eventCaseShow: false,
      options: {
        locale: 'zh',
        editable: true,
        selectable: true,
        allDaySlot: false,
        defaultView: 'agendaDay',
        eventResourceField: 'room'
      },
      // resources: [{
      //   id: 1,
      //   title: 'Room A'
      // }, {
      //   id: 2,
      //   title: 'Room B'
      // }],
      events: [{
        id: 1,
        room: 1,
        title: '巡检：某某某巡检公告',
        start: '2019-01-28 10:00'
      }, {
        id: 2,
        room: 2,
        title: '测试：某某某测试公告',
        start: '2019-01-28 12:00',
        end: '2019-01-29 08:00' 
      }, {
        id: 3,
        room: 3,
        title: 'one测试',
        start: '2019-01-28 12:00',
        end: '2019-01-29 08:00' 
      },{
        id: 5,
        room: 5,
        title: 'five测试',
        start: '2019-01-28 12:00',
        end: '2019-01-29 08:00' 
      },{
        id: 4,
        room: 4,
        title: 'three测试',
        start: '2019-01-28 12:00',
        end: '2019-01-29 08:00' 
      },{
        id: 6,
        room: 6,
        title: 'six测试',
        start: '2019-01-28 12:00',
        end: '2019-01-29 08:00' 
      },{
        id: 7,
        room: 7,
        title: 'seven测试',
        start: '2019-02-02 12:00',
        end: '2019-02-02 08:00' 
      },{
        id: 8,
        room: 8,
        title: 'seven测试',
        start: '2019-02-20 12:00',
        end: '2019-02-20 08:00' 
      },{
        id: 9,
        room: 9,
        title: 'seven测试',
        start: '2019-02-20 12:00',
        end: '2019-02-23 08:00' 
      }]
    }
  },
  created: function () {
  },
  watch: {
  },
  methods: {
    // updateOptions () {
    //   this.options = {
    //     locale: 'zh-cn',
    //     editable: true,
    //     selectable: false,
    //     droppable: true,
    //     handleWindowResize: true,
    //     slotEventOverlap: false,
    //     slotLabelFormat: 'HH:mm',
    //     header: false
    //   }
    // },
    // changeResources () {
    //   this.resources = [{
    //     id: 1,
    //     title: 'Room A'
    //   }, {
    //     id: 2,
    //     title: 'Room B'
    //   }, {
    //     id: 3,
    //     title: 'Room C'
    //   }, {
    //     id: 4,
    //     title: 'Room D'
    //   }]
    // },
    // changeEvents () {
    //   this.events = [{
    //     id: 1,
    //     room: 1,
    //     title: 'Meeting',
    //     start: '2018-06-28 10:00'
    //   }, {
    //     id: 2,
    //     room: 2,
    //     title: '测试',
    //     start: '2018-06-28 12:00'
    //   }, {
    //     id: 3,
    //     room: 3,
    //     title: '测试',
    //     start: '2018-06-28 08:00',
    //   }]
    // },
    // handleDropIn (date, jsEvent, ui, resourceId) {
    //   console.log(date)
    //   console.log(jsEvent)
    //   console.log(ui)
    //   console.log(resourceId)
    // },
    showClose (){
      this.eventCaseShow = false
    },
    emitEventClick (event, jsEvent, pos) {
    //   this.$emit('eventClick', event, jsEvent, pos)
	    // console.log("22222222222222", this, "3333", this.events[0].title)
      // console.log("11111111111111111111111", event)
      // console.log(jsEvent)
      // console.log(pos)
      window.screenWidth = document.body.clientWidth
      let eventCase = document.getElementById('calendarId')
      eventCase.style.left = jsEvent.clientX + 'px'
      eventCase.style.top = jsEvent.clientY + 'px'
      eventCase.style.zIndex = 3000
      this.eventCaseShow = true
      if (window.screenWidth*0.4 + jsEvent.clientX > window.screenWidth) {
        eventCase.style.left = jsEvent.clientX-window.screenWidth*0.4 + 'px'
      }
      // eventCase.style.width = window.innerWidth - 10  + 'px'

      // eventCase.style.cssText = "width: '100%', height: '0.5rem'"
      // eventCase.
      eventCase.innerHTML = event.title + "<br>" + event.start + "<br>" + event.end
      }

      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
        // center: true,
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
          // });
        // }
        
      // });
      // this.$message({
      //   showClose: true,
      //   message: this.events[0].start + "\t                " + this.events[0].title + "\n\n              " + this.events[0].end,
      //   center: true,
      //   duration:5000,
      //   customClass: 'msgdefine'
      // });
      // this.$notify({
      //   title: this.events[0].title,
      //   message: this.events[0].start + "\t" + this.events[0].title + "\n\n" + this.events[0].end,
      //   position: 'bottom-left'
      // });
    // }
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
.ContextView{ width: 100%; margin: 0 auto;}
.ContextView .full-calendar-body .dates .week-row .day-cell{ height: 1rem;}
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