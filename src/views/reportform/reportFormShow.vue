<!--报表-->
<template>
  <div class="reportFormShowView">
    <header-last :title="reportFormShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="formShowScore">综合得分：{{score}}</div>
    <div class="formShowTable">
      <el-table
        :data="tableData"
        style="width: 100%;">
        <template v-for="item in reportFormShowObj">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
            <template  slot-scope="scope">
              <template v-if="item.prop == 'desc'">
                <div @click.stop="popBg=!popBg" class="el-icon-question" style="width: 100%; height: 100%; line-height: 0.3rem; color: #ffc236;"></div>
              </template>
              <span v-else class="table_name">{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="popBg" v-if="popBg">
        <ul>
          <li v-for="info in popBgObj" :key="info.id">{{info.tit}}：{{info.content}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'reportFormShow',

  components: {
    headerLast
  },

  data () {
    return {
      reportFormShowTit: '总控中心',
      score: '82.74',
      tableData: [
        {target: 'CASE处理时长（CMO/三线）', situation: '2.77', num: '12.99', score: '421', desc: ''},
        {target: 'CASE处理时长（CMO/三线）', situation: '3', num: '100', score: '412', desc: ''}
      ],
      reportFormShowObj: [
        {prop: 'target', label: '指标项', width: '35%'},
        {prop: 'situation', label: '达成情况', width: '20%'},
        {prop: 'num', label: '转化分值', width: '20%'},
        {prop: 'score', label: '扣分项', width: '15%'},
        {prop: 'desc', label: '说明', width: '10%'}
      ],
      popBg: false,
      popBgObj: [
        {tit: '分解目标值', content: '2.7天'},
        {tit: '岗位/部门权重', content: '0.13'},
        {tit: '岗位/部门考核扣分项', content: '低分项目从总分扣5分'}
      ]
    }
  },

  methods: {
  }
}
</script>

<style scoped>
  .reportFormShowView .formShowScore{margin-top: 0.05rem;line-height: 0.4rem; background: #ffffff; padding: 0 0.25rem; color: #2698d6; font-size: 0.15rem;}
  .reportFormShowView >>> th{padding: 0; background: #f7f7f7}
  .reportFormShowView >>> tr:nth-child(2n){background: #f7f7f7}
  .reportFormShowView >>> td{padding: 0}
  .reportFormShowView >>> td .cell{text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0; height: 0.3rem; line-height: 0.3rem}
  .reportFormShowView >>> .cell{padding: 0 0.05rem; font-size: 0.13rem; text-align: center}
  .reportFormShowView .formShowTable{position: relative; background: #ffffff;}
  .reportFormShowView .formShowTable .popBg{position: absolute;left: 0; right: 0; background: #999999; color: #ffffff;}
  .reportFormShowView .formShowTable .popBg ul{padding: 0.05rem 0.25rem; line-height: 0.2rem;}
</style>
