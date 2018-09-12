<!--工作台-PO信息-->
<template>
  <div class="workBenchPOinfoView">
    <header-last :title="workBenchPOinfoTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <el-tabs v-model="activeName">
        <template v-for="item in POinfoTab">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
            <el-table
              :data="item.tableData"
              v-loading="busy && !loadall"
              style="width: 100%; border: 0.01rem solid #e1e1e1">
              <template v-for="info in POinfotable">
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
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
  name: 'workBenchPOinfo',

  components: {
    headerLast
  },

  data () {
    return {
      workBenchPOinfoTit: 'PO信息',
      POinfoTab: [
        {
          name: 'first',
          label: '人员',
          tableData: []
        },
        {
          name: 'second',
          label: '备件',
          tableData: []
        }
      ],
      activeName: 'first',
      POinfotable: [
        {
          prop: 'YM',
          label: '年月',
          fixed: true,
          width: '34%'
        },
        {
          prop: 'TOTALAMOUNT',
          label: '总金额',
          fixed: true,
          width: '33%'
        },
        {
          prop: 'FAMOUNT',
          label: '已支付金额',
          fixed: true,
          width: '33%'
        }
      ],
      busy:true,
      loadall: false
    }
  },
  created () {
    fetch.get("?action=GetPoPerson",{}).then(res=>{
      this.POinfoTab[0].tableData = res.data;
    });
    fetch.get("?action=GetPoParts",{}).then(res=>{
      this.POinfoTab[1].tableData = res.data;
      this.busy= false;
      this.loadall = true;
    });
  },
  methods: {
  }
}
</script>

<style scoped>
  .workBenchPOinfoView{width: 100%;}
  .content{margin-top: 0.05rem; text-align: center; color: #666666; background: #ffffff;}
  .content >>> .el-table th{text-align: center; color: #333333; background: #f7f7f7}
  .content >>> .el-table tr:nth-child(2n){background: #f7f7f7}
  .content >>> .el-table td:nth-child(2){text-align: right}
  .content >>> .el-table td:nth-child(3){text-align: right}
  .content >>> .el-tabs__header{margin: 0;}
  .content >>> .el-tabs__nav{width: 100%}
  .content >>> .el-tabs__nav .el-tabs__item{width: 50%}
  .content >>> .el-tabs__nav .el-tabs__item.is-active{color: #2698d6}
  .content >>> .el-tabs__active-bar{background: #2698d6}
</style>
