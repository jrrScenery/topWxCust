<!--工作台-在保项目信息明细-->
<template>
  <div class="workBenchInfoDetailView">
    <header-base-three :title="workBenchInfoDetailTit" :queryData="searchData" @searchPro="getSearParams"></header-base-three>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="programCell" v-for="item in programListArr" :key="item.id">
        <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}" >
          <div class="cellTop">
            <el-row>
              <el-col :span="12">
                <div class="cellTopNum">{{item.PROJECT_CODE}}</div>
              </el-col>
              <el-col :span="12">
                <div class="cellTopState">合同规模：<span>{{item.CONTRACT_AMOUNT}}</span></div>
              </el-col>
            </el-row>
          </div>
        </router-link>
        <router-link :to="{name:'programShow',query:{projectId:item.PROJECT_ID}}" >
        <div class="cellContent">
          <p>{{item.PROJECT_NAME}}</p>
          <el-row>
            <el-col :span="12"><span class="tit">行业：{{item.INDUSTRY}}</span></el-col>
            <el-col :span="12"><span class="tit">客户：{{item.CUST_NAME}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">服务开始：{{item.PROJECT_START_DATE}}</span></el-col>
            <el-col :span="12"><span class="tit">服务结束：{{item.PROJECT_END_DATE}}</span></el-col>
          </el-row>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import headerBaseThree from '../header/headerBaseThree'
import fetch from '../../utils/ajax'

export default {
  name: 'workBenchInfoDetail',

  components: {
    headerBaseThree
  },

  data () {
    return {
      workBenchInfoDetailTit: '在保项目情况明细',
      programListArr: [],
      searchData:{
        BUSINESS_TYPE: this.$route.query.business,
        INDUSTRY_NAME: this.$route.query.industry
      },
      isSearch:  this.$route.query.isSearch
    }
  },
  beforeCreate(){
    
  },
  created () {
    console.log(this.$route.query.business)
    this.loadList();
  },

  methods: {
    getSearParams (formData) {
      console.log(formData);
      this.searchData.BUSINESS_TYPE= formData.business.join(',');
      this.searchData.INDUSTRY_NAME = formData.industry.join(',');
      this.searchData.CUST_NAME= formData.customer;
      this.searchData.PROJECT_NAME= formData.proName;
      this.loadList();
    },
    loadList(){
      let url = "?action=GetProjectStatList";
      let tpmpara ={}
      if(this.isSearch){tpmpara = this.searchData};
      fetch.get(url,tpmpara).then(res => {
        console.log(res.data);
        this.programListArr = res.data
      })
    },
    // 搜索条件data
    searchProInfo (data) {
      this.isSearch = true;
      console.log(data)
      data.industry = data.industry.join(',')
      data.direction = data.direction.join(',')
      let url = "?action=GetProjectStatList";
      url +=  "&BUSINESS_TYPE=" +  this.business + "&INDUSTRY_NAME=" + this.industry + {BUSINESS_TYPE: data.direction, INDUSTRY_NAME: data.industry, CUST_NAME: data.customer, PROJECT_NAME: data.proName};
      fetch.get(url,{}).then(res => {
        console.log(res)
        this.programListArr = res.data
      })
    }
  }
}
</script>

<style scoped>
  .workBenchInfoDetailView{width: 100%;}
  .programCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-top: 0.05rem;}
  .programCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .programCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .programCell .cellTop .cellTopState{text-align: right; color: #999999;}
  .programCell .cellContent p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .programCell .cellContent .el-col{line-height: 0.25rem; color: #999999;}
</style>
