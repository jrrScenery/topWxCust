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
          :resources="resources"
          :events="events"
          @drop="handleDropIn"
          @eventClick="handleClickEvent">
        </full-calendar>
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
      options: {
        locale: 'zh',
        editable: true,
        selectable: true,
        allDaySlot: false,
        defaultView: 'agendaDay',
        eventResourceField: 'room'
      },
      resources: [{
        id: 1,
        title: 'Room A'
      }, {
        id: 2,
        title: 'Room B'
      }],
      events: [{
        id: 1,
        room: 1,
        title: 'Meeting',
        start: '2019-01-28 10:00'
      }, {
        id: 2,
        room: 2,
        title: '测试',
        start: '2019-01-28 12:00'
      }]
    }
  },
  created: function () {
  },
  watch: {
  },
  methods: {
    updateOptions () {
      this.options = {
        locale: 'zh-cn',
        editable: true,
        selectable: false,
        droppable: true,
        handleWindowResize: true,
        slotEventOverlap: false,
        slotLabelFormat: 'HH:mm',
        header: false
      }
    },
    changeResources () {
      this.resources = [{
        id: 1,
        title: 'Room A'
      }, {
        id: 2,
        title: 'Room B'
      }, {
        id: 3,
        title: 'Room C'
      }, {
        id: 4,
        title: 'Room D'
      }]
    },
    changeEvents () {
      this.events = [{
        id: 1,
        room: 1,
        title: 'Meeting',
        start: '2018-06-28 10:00'
      }, {
        id: 2,
        room: 2,
        title: '测试',
        start: '2018-06-28 12:00'
      }, {
        id: 3,
        room: 3,
        title: '测试',
        start: '2018-06-28 08:00'
      }]
    },
    handleDropIn (date, jsEvent, ui, resourceId) {
      console.log(date)
      console.log(jsEvent)
      console.log(ui)
      console.log(resourceId)
    },
    handleClickEvent (calEvent, jsEvent, view) {
	    console.log("22222222222222", this, "3333", this.events[0].title)
      console.log("11111111111111111111111", calEvent)
      console.log(jsEvent)
      console.log(view)
    }
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
.ContextView{ width: 96%; margin: 0 auto;}
.ContextView .full-calendar-body .dates .week-row .day-cell{ height: 1rem;}


</style>