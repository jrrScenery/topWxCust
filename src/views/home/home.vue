<!--首页-->
<template>
  <div class="homeView">

    <div class="swiper">
      <el-carousel trigger="click" arrow="never" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in imgObj" :key="item.id">
          <img :src="item.imgSrc" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">
      <div class="event">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_1.png" alt="">
            <router-link :to="{name:'focusEventList'}">
              {{eventTitle+'('+eventTitleTotal+')'}}
            </router-link>
          </div>
          <router-link :to="{name:'focusEventList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="caseData" 
          v-loading="loadalls['caseData']['busy'] && !loadalls['caseData']['loadall']"
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in eventTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'CASEHEALTH'">
                  <span v-if="scope.row[item.prop] == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></span>
                  <span v-if="scope.row[item.prop] == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></span>
                  <span v-if="scope.row[item.prop] == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></span>
                  <span v-if="scope.row[item.prop] == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></span>
                  <span v-if="scope.row[item.prop] == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></span>
                </template>
                <router-link v-else :to="{name:'eventShow',query:{caseId:scope.row['CASEID']}}">
                  <span  class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="program">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_2.png" alt="">
            <router-link :to="{name:'programList'}">
            {{programTitle+'('+programTitleTotal+')'}}
            </router-link>
          </div>
          <router-link :to="{name:'programList'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <el-table
          :data="projData"
          v-loading="loadalls['projData']['busy'] && !loadalls['projData']['loadall']"
          style="width: 100%; border: 0.01rem solid #e1e1e1">
          <template v-for="item in programTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'NOW_COLOR'">
                <!-- 1 #ff0000 红，2 #ff9900 橙，3 #ffff00 黄，4 #009900 绿 -->                  
                <div>
                    <i v-if="scope.row[item.prop] == 0" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;"></i>
                    <i v-if="scope.row[item.prop] == 1" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff0000;"></i>
                    <i v-if="scope.row[item.prop] == 2" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ff9900;"></i>
                    <i v-if="scope.row[item.prop] == 3" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #ffff00;"></i>
                    <i v-if="scope.row[item.prop] == 4" style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #009900;"></i>
                  </div>
                </template>
                <router-link v-else :to="{name:'programShow',query:{projectId:scope.row['PROJECT_ID']}}">
                  <span class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="opinion">
        <div class="title">
          <div class="titleLeft">
            <img src="../../assets/images/index_3.png" alt="">
            <router-link :to="{name:'tabshowTest'}">
              {{opinionTitle}}
            </router-link>
          </div>
            <!--<div class="titleRight" v-on:click="showMore3">{{more}}</div>-->
          <router-link :to="{name:'tabshowTest'}">
            <div class="titleRight">{{more}}</div>
          </router-link>
        </div>
        <div class="opinionTab">
          <el-tabs v-model="activeName" type="card">
            <template v-for="(itemTab,ti) in opinionTab">
              <el-tab-pane :label="itemTab.label" :name="itemTab.name" v-bind:key="itemTab.name">
                  <el-table
                    :data="itemTab.data"
                    v-loading="loadalls['casopinionTabe'+ti]['busy'] && !loadalls['casopinionTabe'+ti]['loadall']"
                    style="width: 100%; border: 0.01rem solid #e1e1e1">
                    <template v-for="item in itemTab.table">
                      <el-table-column
                        :fixed="item.fixed"
                        :key="item.id"
                        :prop="item.prop"
                        :label="item.label"
                        :min-width="item.width">
                        <template slot-scope="scope">
                          <template v-if="itemTab.name == 'first'">
                            <router-link :to="{name:'mineFeedbackShow',query:{complantId:scope.row['COMPLANT_ID']}}">
                            <template v-if="item.prop == 'programName'">
                              <div style="display: flex;">
                                <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                                <span class="table_name" v-html="scope.row.programName"></span>
                              </div>
                            </template>
                            <template v-else-if="item.prop== 'TASK_TYPE'">
                              <div style="text-align:center">{{scope.row[item.prop]}}</div>
                            </template>
                            <template v-else-if="item.prop== 'CUST_NAME'">
                              <div style="text-align:left">{{scope.row[item.prop]}}</div>
                            </template>
                            <span v-else class="table_name" v-html="scope.row[item.prop]"></span>
                            </router-link>
                          </template>
                          <template v-else>
                            <template v-if="item.prop == 'programName'">
                              <div style="display: flex;">
                                <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                                <span class="table_name">{{scope.row.programName }}</span>
                              </div>
                            </template>
                            <span v-else class="table_name">{{scope.row[item.prop]}}</span>
                          </template>
                        </template>
                      </el-table-column>
                    </template>
                </el-table>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      imgObj: [
        {imgSrc: require('@/assets/images/swiper_1.jpg')},
        {imgSrc: require('@/assets/images/swiper_2.jpg')},
        {imgSrc: require('@/assets/images/swiper_3.jpg')},
        {imgSrc: require('@/assets/images/swiper_4.jpg')},
        {imgSrc: require('@/assets/images/swiper_5.jpg')}
      ],
      eventTitle: '需关注事件',
      programTitle: '需关注项目',
      opinionTitle: '意见和投诉',
      more: '更多>',
      ll:true,
      eventTitleTotal:0,
      programTitleTotal:0,
      caseData: [],
      eventTable:[
        {
          prop: 'CASEHEALTH',
          label: '',
          fixed: true,
          width: '5%'
        },
        {
          prop: 'CODE',
          label: '事件编号',
          fixed: true,
          width: '35px'
        },
        {
          prop: 'ITEM',
          label: '关注原因',
          fixed: true,
          width: '35%'
        },
        {
          prop: 'CUSTOM',
          label: '客户名称',
          fixed: true,
          width: '35%'
        }
      ],
      projData:[],
      programTable:[
        {
          prop: 'NOW_COLOR',
          label: '',
          fixed: true,
          width: '5%'
        },
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '45%'
        },
        {
          prop: 'START_DATE',
          label: '开始日期',
          fixed: true,
          width: '25%'
        },
        {
          prop: 'END_DATE',
          label: '结束日期',
          fixed: true,
          width: '25%'
        }
      ],
      opinionTab:[
        {
          name: 'first',
          label: '意见投诉',
          table:[
            // {
            //   prop: 'COMPLAINT_COMMENT',
            //   label: '意见内容',
            //   fixed: true,
            //   width: '75%'
            // },
            {
              prop: 'TASK_TYPE',
              label: '类型',
              fixed: true,
              width: '15%'
            },
            {
              prop: 'CUST_NAME',
              label: '客户',
              fixed: true,
              width: '50%'
            },
            {
              prop: 'CREATE_ON',
              label: '提交日期',
              fixed: true,
              width: '20%'
            },
            {
              prop: 'TASK_STATUS',
              label: '状态',
              fixed: true,
              width: '15%'
            }
          ],
          data:[]
        },
        {
          name: 'second',
          label: '项目满意度',
          table:[
            {
              prop: 'PROJECT_NAME',
              label: '项目名称',
              fixed: true,
              width: '45%'
            },
            {
              prop: 'TOTAL_SCORE',
              label: '分值',
              fixed: true,
              width: '14%'
            },
            {
              prop: 'EVALUATE_FROM_NAME',
              label: '评价人',
              fixed: true,
              width: '16%'
            },
            {
              prop: 'EVALUATE_TIME',
              label: '评价时间',
              fixed: true,
              width: '25%'
            }
          ],
          data:[]
        },
        {
          name: 'third',
          label: 'Case评价',
          table:[
            {
              prop: 'PROJECT_NAME',
              label: '项目名称',
              fixed: true,
              width: '50%'
            },
            {
              prop: 'CASE_CD',
              label: '事件编号',
              fixed: true,
              width: '36%'
            },
            {
              prop: 'TOTAL_SCORE',
              label: '分值',
              fixed: true,
              width: '14%'
            }
          ],
          data:[]
        }
      ],
      activeName: 'first',
      loadalls:{
        "caseData":{busy:true,loadall:false},
        "projData":{busy:true,loadall:false},
        "casopinionTabe0":{busy:true,loadall:false},
        "casopinionTabe1":{busy:true,loadall:false},
        "casopinionTabe2":{busy:true,loadall:false}
      }
      
    }
  },

  methods:{
    // showMore3:function (event) {
    //   if (this.activeName=='first') {
    //     this.$router.push({name:'complaintList',params:{}});
    //   }else if (this.activeName=='second') {
    //     this.$router.push({name:'projectEvaluateList',params:{}});
    //   }else if (this.activeName=='third') {
    //     this.$router.push({name:'caseEvaluateList',params:{}});
    //   }
    // }
    fetchData:function(){

      fetch.get("?action=GetFocusCase&PAGE_NUM=1&PAGE_TOTAL=3","").then(res=>{
        console.log(res.data);
        this.caseData = res.data;
        this.eventTitleTotal = res.total;
        this.loadalls.caseData = {"busy": false, loadall:true};
      });

      fetch.get("?action=GetFocusProject&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.projData = res.data;
        this.programTitleTotal = res.total;
        this.loadalls.projData = {"busy": false, loadall:true};
      });

      fetch.get("?action=GetCaseEvaluate&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.opinionTab[2].data = res.data;
        this.loadalls.casopinionTabe0 = {"busy": false, loadall:true};
      });

      fetch.get("?action=GetProjectEvaluate&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.opinionTab[1].data = res.data;
        this.loadalls.casopinionTabe1 = {"busy": false, loadall:true};
      });

      fetch.get("?action=GetComplaintsList&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        this.opinionTab[0].data = res.data;
        //console.log(res.data)
        var tmpar= res.data;
        tmpar = tmpar.map(function(item){
          item.COMPLAINT_COMMENT = item.COMPLAINT_COMMENT.replace(/\n/g, "<br/>");
          return item;
        })
        this.loadalls.casopinionTabe2 = {"busy": false, loadall:true};
      });
    }
  },
  beforeCreate:function(){
    this.$router.replace(location);
    
    history.pushState(null, null, document.url);
    window.onpopstate = () => {
      history.go(1)
    }
　　
  },
  mounted:function(){
    
　　
  },
  activated(){
    console.log(this.$route.meta.isUseCache);
    if(!this.$route.meta.isUseCache){
      this.caseData = [];
      this.projData = [];
      this.opinionTab[0].data=[];
      this.opinionTab[1].data=[];
      this.opinionTab[2].data=[];
      this.loadalls = {
        "caseData":{busy:true,loadall:false},
        "projData":{busy:true,loadall:false},
        "casopinionTabe0":{busy:true,loadall:false},
        "casopinionTabe1":{busy:true,loadall:false},
        "casopinionTabe2":{busy:true,loadall:false}
      }

      fetch.get("?action=checkSession",{}).then(res=>{
        this.fetchData();
      });
    }
    this.$route.meta.isUseCache = false;
  },
  deactivated(){
    console.log('移除');
    window.onpopstate = null
  }
}
</script>

<style scoped>
  .homeView{width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  .swiper img{width: 100%; height: 100%}
  .content{margin: 0 0.14rem; display: block;}
  .content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem; font-size: 0.14rem; color: #2698d6;}
  .content .title a{color: #2698d6;}
  .content .title .titleRight{font-size: 0.13rem; color: #999999;}
  .content .title img{width: 0.18rem; height: 0.18rem; vertical-align: text-bottom; margin-right: 0.08rem;}
  .content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; padding: 0; text-align: center}
  .content >>> .event .el-table td:nth-child(1) .cell{padding: 0}
  .content >>> .program .el-table td:nth-child(1) .cell{padding: 0}
  .content >>> .event .el-table td:nth-child(3){text-align: left}
  .content >>> .event .el-table td:nth-child(4){text-align: left}
  .content >>> .program .el-table td:nth-child(2){text-align: left}
  .content >>> .opinion .el-table td:nth-child(1){text-align: left}
  .content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  .content >>> .el-table td>.cell{color: #666666; padding: 0 0.02rem}
  .content >>> .el-table th>.cell{color: #333333; padding: 0 0.02rem;}
  .event .table_name{display: block; width: 100%; height: 0.3rem; line-height: 0.3rem; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
  .opinionTab >>> .el-tabs__item{width: 33%; padding: 0!important; text-align: center; border: 1px solid #f7f7f7!important; border-radius: 0.2rem;}
  .opinionTab >>> .el-tabs__item.is-active{color: #2698d6; background: #ffffff; border: 1px solid #e1e1e1!important; border-radius: 0.2rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header{border: none; margin-bottom: 0.1rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{display: flex; justify-content: space-around; border: none; width: 100%;}
  .opinionTab >>> .el-tabs__item{border: none; color: #999999; height: 0.24rem; line-height: 0.24rem;}
  a{color: #666666}
</style>

