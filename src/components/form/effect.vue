<!--效能-->
<template>
  <div class="effectView">
    <div class="effectForm">
      <el-form ref="form" :model="form">
        <el-form-item label="筛选条件">
          <el-select v-model="form.condition" placeholder="请选择">
            <el-option label="2018-03" value=""></el-option>
            <el-option label="2018-05" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="effectContent" v-for="item in effectObj" :key="item.id">
      <div class="title">{{item.tit}}</div>
      <el-table
        :data="item.tableData"
        style="width: 100%; border: 0.01rem solid #e1e1e1">
        <template v-for="info in item.TableObj">
          <el-table-column
            :fixed="info.fixed"
            :key="info.id"
            :prop="info.prop"
            :label="info.label"
            :min-width="info.width">
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'effect',
  data () {
    return {
      form: {
        condition: ''
      },
      effectObj: [
        {
          tit: '项目损益',
          tableData: [
            {industry: '移动', signNum: '782372', loss: '3234'},
            {industry: '电信', signNum: '782372', loss: '3234'},
            {industry: '联通', signNum: '782372', loss: '3234'},
            {industry: '金融', signNum: '782372', loss: '3234'},
            {industry: '政府', signNum: '782372', loss: '3234'},
            {industry: '企事业', signNum: '782372', loss: '3234'},
            {industry: '其他', signNum: '782372', loss: '3234'}
          ],
          TableObj: [
            {prop: 'industry', label: '行业', width: '40%'},
            {prop: 'signNum', label: '签约额', width: '30%'},
            {prop: 'loss', label: '交付损益', width: '30%'}
          ]
        },
        {
          tit: '综合分数',
          tableData: [
            {range: '人工损益', north1: '0', north2: '0', east: '0', south: '106', percent: '55%'},
            {range: '备件损益', north1: '0', north2: '0', east: '0', south: '106', percent: '5%'},
            {range: '饱和度', north1: '0', north2: '0', east: '0', south: '106', percent: '15%'},
            {range: '复用度', north1: '0', north2: '0', east: '0', south: '106', percent: '10%'},
            {range: '外援下降', north1: '0', north2: '0', east: '0', south: '106', percent: '15%'},
            {range: '最总分数', north1: '0', north2: '0', east: '0', south: '106', percent: ''}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'},
            {prop: 'percent', label: '指标占比', width: '40%'}
          ]
        },
        {
          tit: '人工损益',
          tableData: [
            {range: '损益指标', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '分数', north1: '0', north2: '0', east: '0', south: '106'}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'}
          ]
        },
        {
          tit: '备件损益',
          tableData: [
            {range: '损益指标', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '分数', north1: '0', north2: '0', east: '0', south: '106'}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'}
          ]
        },
        {
          tit: '饱和度',
          tableData: [
            {range: '1月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '2月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '3月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '4月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '月平均', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '分数', north1: '100.00%', north2: '0', east: '0', south: '106'}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'}
          ]
        },
        {
          tit: '复用度',
          tableData: [
            {range: '1月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '2月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '3月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '4月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '月平均', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '分数', north1: '100.00%', north2: '0', east: '0', south: '106'}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'}
          ]
        },
        {
          tit: '外援',
          tableData: [
            {range: '1月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '2月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '3月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '4月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '截至4月', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: 'FY17', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '下降比例', north1: '89.90%', north2: '0', east: '0', south: '106'},
            {range: '分数', north1: '100.00%', north2: '0', east: '0', south: '106'}
          ],
          TableObj: [
            {prop: 'range', label: '区域', width: '40%'},
            {prop: 'north1', label: '北区一', width: '30%'},
            {prop: 'north2', label: '北区二', width: '30%'},
            {prop: 'east', label: '东区', width: '30%'},
            {prop: 'south', label: '南区', width: '30%'}
          ]
        },
        {
          tit: '单case成本'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .effectView{padding: 0 0.15rem 0.15rem;}
  .effectForm >>> .el-form-item{margin: 0.15rem 0}
  .effectForm >>> .el-input__inner{border: none;}
  .effectForm >>> .el-select>.el-input{width: 80%}
  .effectContent .title{line-height: 0.35rem; color: #999999}
  .effectContent >>> th{padding: 0; background: #f7f7f7; line-height: 0.3rem}
  .effectContent >>> td{padding: 0}
  .effectContent >>> td .cell{text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0; height: 0.3rem; line-height: 0.3rem}
  .effectContent >>> .cell{padding: 0 0.05rem; font-size: 0.13rem; text-align: center}
</style>
