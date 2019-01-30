<!--首页-事件详情-服务评价-->
<template>
  <div class="eventEvaluationView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-table
              :data="tableData"
              v-loadmore="loadMore"
              :height="tableHeight"
              @row-click="rowjump"
              stripe
              ref="etable"
              style="width: 100%">
        <template v-for="item in table_arr">
          <router-link :to="{name:'eventEvaluationShow'}" :key="item.id">
            <el-table-column
                    :fixed="item.fixed"
                    :key="item.id"
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.width">
            </el-table-column>
          </router-link>
        </template>
      </el-table>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
  export default {
    name: 'eventEvaluation',

    components: {
      headerLast,
      footerHome
    },

    data () {
      return {
        eventEvaluationTit: '服务评价',
        tableData: [{
          EVALUATE_ID: '1277962',
          TYPE_NAME: '客户评价故障处理服务',
          STATUS_NAME: '已评论',
          TOTAL_SCORE: '3'
        }
        ],
        table_arr: [
          {
            prop: 'EVALUATE_ID',
            label: '评价ID',
            fixed: true,
            width: '23%'
          }, {
            prop: 'TYPE_NAME',
            label: '评价类型',
            width: '51%'
          }, {
            prop: 'STATUS_NAME',
            label: '状态',
            width: '20%'
          }, {
            prop: 'TOTAL_SCORE',
            label: '分值',
            width: '16%'
          }
        ],
        page:1,
        pageSize:30,
        busy:false,
        loadall: false,
        tableHeight:500,
        caseid:0
      }
    },

    methods: {
      getEventList(flag){
        fetch.get("?action=GetCaseEvaluateList",{CASE_ID:this.caseid,PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize}).then(res=>{
          console.log("qqqqqqqqqqqqq",res);
          if(flag){
            this.tableData = this.tableData.concat(res.data);
          }else{
            this.tableData = res.data;
          }
          if(0 == res.data.length || res.data.length<this.pageSize ){
            this.busy = true;
            this.loadall = true;
          }
          else{
            this.busy = false;
            this.page++
          }
        });
      },
      loadMore(){
        if(this.busy){return}
          this.busy = true;
          setTimeout(() => {
            this.getEventList(this.page>1);
        }, 500);
      },
      rowjump(row){
        this.$router.push({name: 'eventEvaluationShow', query: {evaluateid: row.EVALUATE_ID}});
      }
    },
    created:function(){
      this.caseid= this.$route.query.caseId;
    },
    mounted(){
      this.$nextTick(() => {
        let self = this;
        this.tableHeight = document.documentElement.clientHeight- this.$refs.etable.$el.offsetTop;
        // 通过捕获系统的onresize事件触发去改变原有的高度
        window.onresize = function() {
          self.tableHeight = document.documentElement.clientHeight- self.$refs.etable.$el.offsetTop;
        }
      })
      this.getEventList(false);
    }
  }
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff;bottom: 0.45rem}
  .content >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .content >>> .el-table th>.cell{line-height: 0.3rem; padding: 0}
  .content >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .content >>> .el-table td>.cell{line-height: 0.3rem; padding: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
</style>
