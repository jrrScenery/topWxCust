<!--首页-意见与反馈列表页-->
<template>
  <div class="opinionView">
    <header-base :title="opinionTit" :searchType="opinionSearchType" @searchPro="searchList"></header-base>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in POinfoTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <el-table
              :data="item.tableData"
              style="width: 100%; border: 0.01rem solid #e1e1e1">
              <template v-if="item.label ==='Case评价'" v-for="info in opinionTableOne">
                  <el-table-column
                    :fixed="info.fixed"
                    :key="info.id"
                    :prop="info.prop"
                    :label="info.label"
                    :min-width="info.width"
                    class="caseTable">
                    <template slot-scope="scope">
                      <span class="table_name">{{scope.row[info.prop]}}</span>
                    </template>
                  </el-table-column>
              </template>
              <template v-if="item.label ==='项目满意度'" v-for="info in opinionTableTwo">
                <el-table-column
                  :fixed="info.fixed"
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width">
                  <template slot-scope="scope">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                  </template>
                </el-table-column>
              </template>
              <template v-if="item.label ==='意见投诉'" v-for="info in opinionTableThree">
                <el-table-column
                  :fixed="info.fixed"
                  :key="info.id"
                  :prop="info.prop"
                  :label="info.label"
                  :min-width="info.width"
                  class="opinion">
                  <template slot-scope="scope">
                    <router-link :to="{name:'mineFeedbackShow',query:{complantId:scope.row['COMPLANT_ID']}}">
                    <span class="table_name">{{scope.row[info.prop]}}</span>
                    </router-link>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import headerBase from '../header/headerBase'
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'opinion',

  components: {
    headerBase
  },

  data () {
    return {
      opinionTit: '意见和投诉',
      opinionSearchType: 'opnion1',
      POinfoTab: [
        {
          name: 'first',
          label: '意见投诉',
          tableData: []
        },
        {
          name: 'second',
          label: '项目满意度',
          tableData: []
        },
        {
          name: 'third',
          label: 'Case评价',
          tableData: []
        }
      ],
      activeName: 'first',
      opinionTableOne: [
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '58%'
        },
        {
          prop: 'CASE_CD',
          label: '事件编号',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'TOTAL_SCORE',
          label: '分值',
          fixed: true,
          width: '12%'
        }
      ],
      opinionTableTwo: [
        {
          prop: 'PROJECT_NAME',
          label: '项目名称',
          fixed: true,
          width: '50%'
        },
        {
          prop: 'TOTAL_SCORE',
          label: '分值',
          fixed: true,
          width: '12%'
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
          width: '22%'
        }
      ],
      opinionTableThree: [
        {
          prop: 'COMPLAINT_COMMENT',
          label: '意见内容',
          fixed: true,
          width: '78%'
        },
        {
          prop: 'CREATE_ON',
          label: '提交日期',
          fixed: true,
          width: '22%'
        }
      ],
      busy:false,
      loadall: false,
      page:1,
      pageSize1:10,
      pageSize2:15,
      pageSize3:15,
      isSearch1:false,
      isSearch2:false,
      isSearch3:false,
      searchData1:{},
      searchData2:{},
      searchData3:{}
    }
  },

  methods: {
    getEventList(){
      var reqParams = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize1};
      if(this.isSearch1){
        params.INDUSTRY_NAME = this.searchData.industry.join(",");
        params.BUSINESS_TYPE = this.searchData.business.join(",");
        params.CUST_NAME = this.searchData.customer;
        params.PROJECT_NAME = this.searchData.proName;
        params.PM_NAME = this.searchData.PM;
        params.SALE_NAME = this.searchData.sale;
        params.START_TIME = this.searchData.startTime;
        params.END_TIME = this.searchData.endTime;
      }
      fetch.get("?action=GetComplaintsList",reqParams).then(res=>{
        this.POinfoTab[0].tableData = res.data
        var tmpar= res.data;
        tmpar = tmpar.map(function(item){
          item.COMPLAINT_COMMENT = item.COMPLAINT_COMMENT.replace(/\n/g, "<br/>");
          return item;
        })
      });

      var reqParams2 = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize2};
      fetch.get("?action=GetProjectEvaluate",reqParams2).then(res=>{
        this.POinfoTab[1].tableData = res.data
      });

      var reqParams3 = {PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize3};
      fetch.get("?action=GetCaseEvaluate",reqParams3).then(res=>{
        this.POinfoTab[2].tableData = res.data
      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.getEventList();
      }, 500);
    },
    searchList(formdata){
      console.log(formdata);
      if(this.opinionSearchType=="opnion1"){
        this.isSearch1 = true;
        this.searchData1 = formdata;
      }else if(this.opinionSearchType=="opnion2"){
        this.isSearch2 = true;
        this.searchData2 = formdata;
      }else if(this.opinionSearchType=="opnion3"){
        this.isSearch3 = true;
        this.searchData3 = formdata;
      }
    }
  },

  created () {
    this.getEventList();
  },

  watch : {
    'activeName':function(val) { //监听切换状态-计划单
        if(val=="first"){
          this.opinionSearchType = "opnion1";
        }else if(val=="second"){
          this.opinionSearchType = "opnion2";
        }else if(val=="third"){
          this.opinionSearchType = "opnion3";
        }
    },
  }
}
</script>

<style scoped>
  .opinionView{width: 100%;}
  .content{margin-top: 0.05rem; text-align: center; color: #666666; background: #ffffff; font-size: 0.13rem;}
  .content >>> .el-table th{text-align: center; padding: 0; line-height: 0.4rem; color: #333333; background: #f7f7f7}
  .content >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .content >>> .el-table td{padding: 0;}
  .content >>> .el-table td:nth-child(1){text-align: left}
  .content >>> .el-table .cell{padding: 0 0.02rem; font-size: 0.13rem;}
  .content >>> .el-table .cell .table_name{display: block; width: 100%; height: 0.35rem; line-height: 0.35rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .content #pane-first >>> .el-table .cell .table_name{height: 100%; min-height: 0.35rem!important; overflow: initial; text-overflow: initial; white-space: initial;}
  .content >>> .el-tabs__header{margin: 0;}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__nav .el-tabs__item{width: 33%}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .content >>> .el-tabs__active-bar{background: #2698d6}
</style>
