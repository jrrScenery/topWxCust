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
      <div class="title">
        <div class="titleLeft">
          <img src="../../assets/images/index_1.png" alt="">
          <router-link :to="{name:'caseList'}">
            {{repaireTitle+'('+repaireTitleTotal+')'}}
          </router-link>
        </div>
        <router-link :to="{name:'caseList'}">
          <div class="titleRight">{{more}}</div>
        </router-link>
      </div>
      <div class="repaireCell" 
            v-for="item in caseData" 
            :key="item.CASE_ID"
            v-loading="loadalls['caseData']['busy'] && !loadalls['caseData']['loadall']">
        <router-link :to="{name:'casedetail',query:{caseId:item.CASE_ID,projectId:item.PROJECT_ID}}">
          <div class="cellTop">
            <el-row>
              <el-col :span="13">
                <span class="spheathcolor"></span>{{item.CASE_NO}}
              </el-col>
              <el-col :span="11">
                <div class="cellTopTime"><span>{{item.CREATE_DATE}}</span><span style="margin-left: 0.05rem;"></span></div>
              </el-col>
            </el-row>
          </div>
          <div class="cellContent">
            <el-row>
              <el-col :span="12"><span class="tit">状态：</span><span>{{item.DEAL_STATUS_NAME}}</span></el-col>
              <el-col :span="12"><span class="tit">类型：</span><span>{{item.CASE_TYPE}}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span class="tit">厂商：</span><span>{{item.FACTORY}}</span></el-col>
              <el-col :span="12"><span class="tit">设备名：</span><span>{{item.DEVICE}}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="tit">SN：</span><span>{{item.SN}}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span class="tit">故障说明：</span><span>{{item.PROBLEM_DETAIL}}</span></el-col>
            </el-row>
          </div>
        </router-link>
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
                <router-link :to="{name:'programShow',query:{projectId:scope.row['PROJECT_ID']}}">
                  <span class="table_name">{{scope.row[item.prop]}}</span>
                </router-link>
              </template>
            </el-table-column>
          </template>
        </el-table>
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
      repaireTitle: '我的报修',
      programTitle: '我的项目',
      more: '更多>',
      ll:true,
      repaireTitleTotal:0,
      programTitleTotal:0,
      caseData: [],
      repaireObj:{
        num: 'CS1608260014',
        time: '2016-08-26 09:24:57',
        state: '待管理人处理',
        type: '技术咨询',
        firm: 'IBM',
        model: '9117-570(P5 570)',
        SN:'TOPTEST071230',
        desc: '技术咨询事件创建。'
      },
      projData:[],
      programTable:[
        // {
        //   prop: 'NOW_COLOR',
        //   label: '',
        //   fixed: true,
        //   width: '5%'
        // },
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '50%'
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
      loadalls:{
        "caseData":{busy:true,loadall:false},
        "projData":{busy:true,loadall:false},
      }
      
    }
  },

  methods:{
    fetchData:function(){
      let params = {PAGE_NUM: 1, PAGE_TOTAL: 1}
      fetch.get("?action=GetCaseList&PAGE_NUM=1&PAGE_TOTAL=1",{}).then(res=>{
        console.log("2222222222");
        console.log(res);
        this.caseData = res.data;
        this.repaireTitleTotal = res.totalData.allNum;
        this.loadalls.caseData = {"busy": false, loadall:true};
      });

      fetch.get("?action=GetProjectList&PAGE_NUM=1&PAGE_TOTAL=4",{}).then(res=>{
        console.log("0000000");
        console.log(res);
        this.projData = res.data;
        this.programTitleTotal = res.total;
        this.loadalls.projData = {"busy": false, loadall:true};
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
      console.log();
      this.caseData = [];
      this.projData = [];
      this.loadalls = {
        "caseData":{busy:true,loadall:false},
        "projData":{busy:true,loadall:false},
      }
      // this.fetchData();
      fetch.get("?action=checkSession",{}).then(res=>{
        // console.log("55555555555");
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
  .repaireCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
  .repaireCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .repaireCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .repaireCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .repaireCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}

  .content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; padding: 0; text-align: center}
  .content >>> .program .el-table td:nth-child(1) .cell{padding: 0}
  .content >>> .program .el-table td:nth-child(2){text-align: left}
  .content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  .content >>> .el-table td>.cell{color: #666666; padding: 0 0.02rem}
  .content >>> .el-table th>.cell{color: #333333; padding: 0 0.02rem;}
  a{color: #666666}
</style>

