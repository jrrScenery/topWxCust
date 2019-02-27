import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import infiniteScroll from 'vue-infinite-scroll'
import fullCalendar from 'vue-fullcalendar'

Vue.use(Router)
Vue.use(infiniteScroll)
Vue.component('full-calendar', fullCalendar)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: index,
      name: 'index',
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/views/home/home'], resolve),
          meta: {
            isUseCache: false,
            keepAlive: true
          }
        },   
        {
          path: '/event',
          name: 'event',
          component: resolve => require(['@/views/event/event'], resolve),
          meta: {
            isUseCache: false,
            keepAlive: true
          }
        },                  
        {
          path: '/mine',
          name: 'mine',
          component: resolve => require(['@/views/mine/mine'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },   
    // {
    //   path: '/forgetPass/forgetPass',
    //   name: 'forgetPass',
    //   component: resolve => require(['@/views/forgetPass/forgetPass'], resolve)
    // },    
    // {
    //   path: '/forgetPass/checkNumLogin',
    //   name: 'checkNumLogin',
    //   component: resolve => require(['@/views/forgetPass/checkNumLogin'], resolve)
    // }, 
    {
      path: '/home/casedetail',
      name: 'casedetail',
      component: resolve => require(['@/views//home/casedetail'], resolve)    
    },
    {
      path: '/home/serviceRate',
      name: 'serviceRate',
      component: resolve => require(['@/views//home/serviceRate'], resolve)
    },
    {
      path: '/home/eventFeedback',
      name: 'eventFeedback',
      component: resolve => require(['@/views/home/eventFeedback'], resolve)
    },
    {
      path: '/home/eventRepair',
      name: 'eventRepair',
      component: resolve => require(['@/views/home/eventRepair'], resolve)
    },
    {
      path: '/home/eventReplenish',
      name: 'eventReplenish',
      component: resolve => require(['@/views/home/eventReplenish'], resolve)
    },
    {
      path: '/home/eventEvaluation',
      name: 'eventEvaluation',
      component: resolve => require(['@/views/home/eventEvaluation'], resolve)
    },
    {
      path: '/home/eventPeople',
      name: 'eventPeople',
      component: resolve => require(['@/views/home/eventPeople'], resolve)
    },
    {
      path: '/home/eventSLAInfo',
      name: 'eventSLAInfo',
      component: resolve => require(['@/views/home/eventSLAInfo'], resolve)
    },
    {
      path: '/home/eventEvaluationShow',
      name: 'eventEvaluationShow',
      component: resolve => require(['@/views/home/eventEvaluationShow'], resolve)
    },
    {
      path: '/home/programList',
      name: 'programList',
      component: resolve => require(['@/views/home/programList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/home/programShow',
      name: 'programShow',
      component: resolve => require(['@/views/home/programShow'], resolve)
    },
    {
      path: '/home/tabshowTest',
      name: 'tabshowTest',
      component: resolve => require(['@/views/home/tabshowTest'], resolve)
    },
    {
      path: '/home/projectCalendar',
      name: 'projectCalendar',
      component: resolve => require(['@/views/home/projectCalendar'], resolve)
    },
    {
      path: '/home/opinion',
      name: 'opinion',
      component: resolve => require(['@/views/home/opinion'], resolve)
    },
    {
      path: '/repaire/onceRepaire',
      name: 'onceRepaire',
      component: resolve => require(['@/views/repaire/onceRepaire'], resolve)
    },
    {
      path: '/repaire/repaire',
      name: 'repaire',
      component: resolve => require(['@/views/repaire/repaire'], resolve)
    },
    {
      path: '/mine/mineNotice',
      name: 'mineNotice',
      component: resolve => require(['@/views/mine/mineNotice'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/mine/mineFeedback',
      name: 'mineFeedback',
      component: resolve => require(['@/views//mine/mineFeedback'], resolve)
    },
    {
      path: '/mine/mineFeedbackShow',
      name: 'mineFeedbackShow',
      component: resolve => require(['@/views//mine/mineFeedbackShow'], resolve)
    },
    {
      path: '/home/caseEvaluateList',
      name: 'caseEvaluateList',
      component: resolve => require(['@/views/home/caseEvaluateList'], resolve)
    },
    {
      path: '/home/complaintList',
      name: 'complaintList',
      component: resolve => require(['@/views/home/complaintList'], resolve)
    },
    {
      path: '/home/projectEvaluateList',
      name: 'projectEvaluateList',
      component: resolve => require(['@/views/home/projectEvaluateList'], resolve)
    },
    {
      path: '/serviceProduct',
      name: 'serviceProduct',
      component: resolve => require(['@/views/serviceProduct/serviceProduct'], resolve)
    },  
    {
      path: '/serviceProduct/sdcOperation',
      name: 'sdcOperation',
      component: resolve => require(['@/views/serviceProduct/sdcOperation'], resolve)
    }, 
    {
      path: '/serviceProduct/sdcValueService',
      name: 'sdcValueService',
      component: resolve => require(['@/views/serviceProduct/sdcValueService'], resolve)
    },
    {
      path: '/serviceProduct/sdcCloudService',
      name: 'sdcCloudService',
      component: resolve => require(['@/views/serviceProduct/sdcCloudService'], resolve)
    },
    {
      path: '/serviceProduct/sdcGuarantee',
      name: 'sdcGuarantee',
      component: resolve => require(['@/views/serviceProduct/sdcGuarantee'], resolve)
    },
    {
      path: '/serviceProduct/HROService',
      name: 'HROService',
      component: resolve => require(['@/views/serviceProduct/HROService'], resolve)
    },
    {
      path: '/serviceProduct/MSService',
      name: 'MSService',
      component: resolve => require(['@/views/serviceProduct/MSService'], resolve)
    },
    {
      path: '/serviceProduct/PSService',
      name: 'PSService',
      component: resolve => require(['@/views/serviceProduct/PSService'], resolve)
    },
    {
      path: '/serviceProduct/ITOService',
      name: 'ITOService',
      component: resolve => require(['@/views/serviceProduct/ITOService'], resolve)
    },
    {
      path: '/serviceProduct/ITBusinessOperation',
      name: 'ITBusinessOperation',
      component: resolve => require(['@/views/serviceProduct/ITBusinessOperation'], resolve)
    },
    {
      path: '/serviceProduct/ITProfessional',
      name: 'ITProfessional',
      component: resolve => require(['@/views/serviceProduct/ITProfessional'], resolve)
    },
    {
      path: '/serviceProduct/ITSoftWareService',
      name: 'ITSoftWareService',
      component: resolve => require(['@/views/serviceProduct/ITSoftWareService'], resolve)
    },
    {
      path: '/serviceProduct/ITBaseOperationService',
      name: 'ITBaseOperationService',
      component: resolve => require(['@/views/serviceProduct/ITBaseOperationService'], resolve)
    },
    {
      path: '/report',
      name: 'report',
      component: resolve => require(['@/views/report/report'], resolve)
    }, 
    {
      path: '/mine/baseInfo',
      name: 'baseInfo',
      component: resolve => require(['@/views//mine/baseInfo'], resolve)
    },
    {
      path: '/mine/baseInfoEdit',
      name: 'baseInfoEdit',
      component: resolve => require(['@/views//mine/baseInfoEdit'], resolve)
    },
    //设置-反馈建议（App）
    {
      path: '/mine/mineAppFeedBack',
      name: 'mineAppFeedBack',
      component: resolve => require(['@/views//mine/mineAppFeedBack'], resolve)
    },
    //设置-修改密码
    {
      path: '/mine/changePwd',
      name: 'changePwd',
      component: resolve => require(['@/views//mine/changePwd'], resolve)
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
