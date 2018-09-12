import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Router)
Vue.use(infiniteScroll)

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
          path: '/approve',
          name: 'approve',
          component: resolve => require(['@/views/approve/approve'], resolve)
        },
        {
          path: '/workBench',
          name: 'workBench',
          component: resolve => require(['@/views/workBench/workBench'], resolve)
        },
        {
          path: '/reportform',
          name: 'reportForm',
          component: resolve => require(['@/views/reportform/reportForm'], resolve)
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
    {
      path: '/home/eventList',
      name: 'focusEventList',
      component: resolve => require(['@/views/home/eventList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/home/eventShow',
      name: 'eventShow',
      component: resolve => require(['@/views//home/eventShow'], resolve)
    },
    {
      path: '/home/eventFeedback',
      name: 'eventFeedback',
      component: resolve => require(['@/views/home/eventFeedback'], resolve)
    },
    {
      path: '/home/eventPeople',
      name: 'eventPeople',
      component: resolve => require(['@/views/home/eventPeople'], resolve)
    },
    {
      path: '/home/eventRepair',
      name: 'eventRepair',
      component: resolve => require(['@/views/home/eventRepair'], resolve)
    },
    {
      path: '/home/eventSLAInfo',
      name: 'eventSLAInfo',
      component: resolve => require(['@/views/home/eventSLAInfo'], resolve)
    },
    {
      path: '/home/declareWorkLoad',
      name: 'declareWorkLoad',
      component: resolve => require(['@/views/home/declareWorkLoad'], resolve)
    },
    {
      path: '/workBench/sparePartsSortOut',
      name: 'sparePartsSortOut',
      component: resolve => require(['@/views/workBench/sparePartsSortOut'], resolve)
    },
    // {
    //   path: '/home/sparePartsSortBak',
    //   name: 'sparePartsSortBak',
    //   component: resolve => require(['@/views/home/sparePartsSortBak'], resolve)
    // },
    {
      path: '/home/addParts',
      name: 'addParts',
      component: resolve => require(['@/views/home/addParts'], resolve)
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
      path: '/home/eventEvaluationEditor',
      name: 'eventEvaluationEditor',
      component: resolve => require(['@/views/home/eventEvaluationEditor'], resolve)
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
      path: '/home/opinion',
      name: 'opinion',
      component: resolve => require(['@/views/home/opinion'], resolve)
    },
    {
      path: '/workBench/workBenchInfo',
      name: 'workBenchInfo',
      component: resolve => require(['@/views/workBench/workBenchInfo'], resolve)
    },
    {
      path: '/workBench/workBenchInfoDetail',
      name: 'workBenchInfoDetail',
      component: resolve => require(['@/views/workBench/workBenchInfoDetail'], resolve)
    },
    {
      path: '/workBench/workBenchEventInfo',
      name: 'workBenchEventInfo',
      component: resolve => require(['@/views/workBench/workBenchEventInfo'], resolve)
    },
    {
      path: '/workBench/workBenchEventInfoShow',
      name: 'workBenchEventInfoShow',
      component: resolve => require(['@/views/workBench/workBenchEventInfoShow'], resolve)
    },
    {
      path: '/workBench/workBenchPeopleInfo',
      name: 'workBenchPeopleInfo',
      component: resolve => require(['@/views/workBench/workBenchPeopleInfo'], resolve)
    },
    {
      path: '/workBench/workBenchParts',
      name: 'workBenchParts',
      component: resolve => require(['@/views/workBench/workBenchParts'], resolve)
    },
    {
      path: '/workBench/workBenchSupplier',
      name: 'workBenchSupplier',
      component: resolve => require(['@/views/workBench/workBenchSupplier'], resolve)
    },
    {
      path: '/workBench/workBenchPOinfo',
      name: 'workBenchPOinfo',
      component: resolve => require(['@/views/workBench/workBenchPOinfo'], resolve)
    },
    {
      path: '/workBench/workBenchMyEvent',
      name: 'workBenchMyEvent',
      component: resolve => require(['@/views/workBench/workBenchMyEvent'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyEventAll',
      name: 'workBenchMyEventAll',
      component: resolve => require(['@/views/workBench/workBenchMyEventAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyPro',
      name: 'workBenchMyPro',
      component: resolve => require(['@/views/workBench/workBenchMyPro'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchMyProAll',
      name: 'workBenchMyProAll',
      component: resolve => require(['@/views/workBench/workBenchMyProAll'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchDeclare',
      name: 'workBenchDeclare',
      component: resolve => require(['@/views/workBench/workBenchDeclare'], resolve)
    },
    {
      path: '/workBench/workBenchMyTask',
      name: 'workBenchMyTask',
      component: resolve => require(['@/views/workBench/workBenchMyTask'], resolve),
    },
    {
      path: '/workBench/workBenchTaskList',
      name: 'workBenchTaskList',
      component: resolve => require(['@/views/workBench/workBenchTaskList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/workBenchTaskDetailInfo', 
      name: 'workBenchTaskDetailInfo',
      component: resolve => require(['@/views/workBench/workBenchTaskDetailInfo'], resolve),
    },
    {
      path: '/workBench/workBenchSLAfeedback', 
      name: 'workBenchSLAfeedback',
      component: resolve => require(['@/views/workBench/workBenchSLAfeedback'], resolve)
    }, 
    {
      path: '/workBench/casePartEvaluate',
      name: 'casePartEvaluate',
      component: resolve => require(['@/views/workBench/casePartEvaluate'], resolve)
    },
    {
      path: '/workBench/workBenchPartRecycle',
      name: 'workBenchPartRecycle',
      component: resolve => require(['@/views/workBench/workBenchPartRecycle'], resolve)
    },
    {
      path: '/workBench/part_recycles',
      name: 'partRecycles',
      component: resolve => require(['@/views/workBench/part_recycle'], resolve)
    },
    {
      path: '/workBench/serviceList',
      name: 'serviceList',
      component: resolve => require(['@/views/workBench/serviceList'], resolve),
      meta: {
        isUseCache: false,
        keepAlive: true
      }
    },
    {
      path: '/workBench/onsiteServiceInfo',
      name: 'onsiteServiceInfo',
      component: resolve => require(['@/views/workBench/onsiteServiceInfo'], resolve)
    },
    {
      path: '/workBench/applicationSupport',
      name: 'applicationSupport',
      component: resolve => require(['@/views/workBench/applicationSupport'], resolve),
    },
    {
      path: '/workBench/application',
      name: 'application',
      component: resolve => require(['@/views/workBench/application'], resolve),
    },
    {
      path: '/reportform/reportFormShow',
      name: 'reportFormShow',
      component: resolve => require(['@/views/reportform/reportFormShow'], resolve)
    },
    {
      path: '/mine/mineNotice',
      name: 'mineNotice',
      component: resolve => require(['@/views/mine/mineNotice'], resolve)
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
      path: '/reportform/qualityDetailDept',
      name: 'qualityDetailDept',
      component: resolve => require(['@/views/reportform/qualityDetailDept'], resolve)
    }
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
