<template>
<div class="CalendarView">
    <header-last :title="calentTit"></header-last>
	<div style="height: 0.45rem;"></div>
	<div class="ContextView">
    <full-calendar :events="monthData" class="test-fc"
                    first-day='1' locale="en"
                    @changeMonth="changeMonth"  
                    @eventClick="eventClick"     
                    @dayClick="dayClick"         
					@moreClick="moreClick"></full-calendar>   
	</div>
</div>
</template>
<script>
import headerLast from '../header/headerLast'
import { FullCalendar } from 'vue-fullcalendar'
import fetch from '../../utils/ajax'
  export default {
	components: {
	  'full-calendar': require('vue-fullcalendar'),
	  headerLast
    },
    data() {
      return {
		calentTit: "报修日历",
        monthData: [
          {
            title : 'eeeeeeeee',  // 事件内容
            start : '2018-12-11', // 事件开始时间
          //   end : '2018-12-30',   // 事件结束时间
            cssClass: 'red'       // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
          },
          {
            title : 'sssss',
            start : '2018-12-25',
          //   end : '2018-12-30',
            cssClass: 'blue'  
          },
          {
            title : 'dddddddd',
            start : '2018-12-09',
          //   end : '2018-12-30',
            cssClass: 'blue'  
          },
          {
            title : 'cccccc',
            start : '2018-12-20',
          //   end : '2018-12-30',
            cssClass: 'red'  
          },
          {
            title : 'aaaaaa',
            start : '2018-12-01',
          //   end : '2018-12-30',
            cssClass: 'red'  
          },
          {
            title : 'bbbbbb',
            start : '2018-12-05',
          //   end : '2019-1-10',
            cssClass: 'blue'
          }
        ]
      }
  },
  created() {
	 
	  
  },
  methods: {
     // 选择月份
      changeMonth (start, end, current) {
	   console.log('changeMonth', start.format(), end.format(), current.format())
	   this.$dispatch('changeMonth', start, end);
      },
      // 点击事件
      eventClick (event, jsEvent, pos) {
		console.log('eventClick', event, jsEvent, pos)
		this.$dispatch('eventClick', day, jsEvent);
      },
      // 点击当天
      dayClick (day, jsEvent) {
		 console.log('dayClick', day, jsEvent);
		 
      },
      // 查看更多
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      },
    },
  }
</script>

<style scoped>
.CalendarView{width: 100%;overflow: scroll;}
.ContextView{ width: 96%; margin: 0 auto;}
.red {background: red;}
.blue {background: blue;}
</style>