<template>
  <div class="homeView">
    <div class="swiper">
      <el-carousel trigger="click" arrow="never" width="100%" height="1.2rem">
        <el-carousel-item v-for="item in 4" :key="item" style="background: black">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <content>
      <div class="event">
        <div class="title">
          <div class="titleLeft"><img src="../../assets/images/index_1.png" alt="">{{eventTitle}}</div>
          <div class="titleRight">{{more}}</div>
        </div>
        <el-table
          :data="tableDataOne"
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in eventTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'health'">
                  <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #e9c430;"></span>
                  <!-- <span style="display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem; background: #be330d;"></span> -->
                </template>
                <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="program">
        <div class="title">
          <div class="titleLeft"><img src="../../assets/images/index_2.png" alt="">{{programTitle}}</div>
          <div class="titleRight">{{more}}</div>
        </div>
        <el-table
          :data="tableDataTwo"
          style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
          <template v-for="item in programTable">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                <template v-if="item.prop == 'programName'">
                  <div style="display: flex;">
                    <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                    <span class="table_name">{{ scope.row.programName }}</span>
                  </div>
                </template>
                <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="opinion">
        <div class="title">
          <div class="titleLeft"><img src="../../assets/images/index_1.png" alt="">{{opinionTitle}}</div>
          <div class="titleRight">{{more}}</div>
        </div>
        <div class="opinionTab">
          <el-tabs v-model="activeName" type="card">
            <template v-for="item in opinionTab">

              <el-tab-pane :label="item.label" :name="item.name" :key="item.id">
                <el-table
                  :data="item.tableDataThree"
                  style="width: 100%; max-height:1.85rem; border: 0.01rem solid #e1e1e1">
                  <template v-for="item in programTable">
                    <el-table-column
                      :fixed="item.fixed"
                      :key="item.id"
                      :prop="item.prop"
                      :label="item.label"
                      :min-width="item.width">
                      <template slot-scope="scope">
                        <template v-if="item.prop == 'programName'">
                          <div style="display: flex;">
                            <i style="display: inline-block; margin: 0.11rem 0.05rem 0; width: 0.08rem; height: 0.08rem; border-radius: 50%; background: #ff0000;"></i>
                            <span class="table_name">{{ scope.row.programName }}</span>
                          </div>
                        </template>
                        <span v-else class="table_name">{{scope.row[item.prop]}}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </el-tab-pane>

            </template>
          </el-tabs>
        </div>
      </div>
    </content>
  </div>
</template>

<script>

export default {
  name: 'index',

  components: {
  },

  data () {
    return {
      eventTitle: '需要关注的事件',
      programTitle: '需要关注的项目',
      opinionTitle: '意见和投诉',
      more: '更多>',

      tableDataOne: [{
        health: '严重',
        eventNum: 'CS1805140003',
        alarm: 'CASE人员到场OLA超时',
        customName: '东风康明斯'
      }, {
        health: '严重',
        eventNum: 'CS1805140003',
        alarm: 'CASE人员到场OLA超时',
        customName: '东风康明斯'
      }, {
        health: '严重',
        eventNum: 'CS1805140003',
        alarm: 'CASE人员到场OLA超时',
        customName: '东风康明斯大方多少发多少'
      }],

      tableDataTwo: [{
        programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }, {
        programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }, {
        programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
        startTime: '2017-01-01',
        endTime: '2017-01-01'
      }],

      eventTable: [
        {
          prop: 'health',
          label: '健康度',
          fixed: true,
          width: '16%'
        },
        {
          prop: 'eventNum',
          label: '事件编号',
          fixed: true,
          width: '28%'
        },
        {
          prop: 'alarm',
          label: '告警项',
          fixed: true,
          width: '28%'
        },
        {
          prop: 'customName',
          label: '客户名称',
          fixed: true,
          width: '28%'
        }
      ],
      programTable: [
        {
          prop: 'programName',
          label: '项目名称',
          fixed: true,
          width: '38%'
        },
        {
          prop: 'startTime',
          label: '开始时间',
          fixed: true,
          width: '30%'
        },
        {
          prop: 'endTime',
          label: '结束时间',
          fixed: true,
          width: '30%'
        }
      ],
      opinionTab: [
        {
          name: 'first',
          label: 'Case评价',
          tableDataThree: [
            {
              programName: '1天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }
          ]
        },
        {
          name: 'second',
          label: '项目满意度',
          tableDataThree: [
            {
              programName: '2天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }
          ]
        },
        {
          name: 'third',
          label: '意见投诉',
          tableDataThree: [
            {
              programName: '3天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }, {
              programName: '天津电信2017年BSS系统中低fajsdkhfaejf',
              startTime: '2017-01-01',
              endTime: '2017-01-01'
            }
          ]
        }
      ],
      activeName: 'first'
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .homeView{width: 100%;}
  .swiper >>> .el-carousel__button{width: 0.08rem; height: 0.08rem; border-radius: 100%;}
  .swiper >>> .el-carousel__indicator.is-active button{background: #199dff}
  content{margin: 0 0.14rem; display: block;}
  content .title{display: flex; justify-content: space-between;height: 0.33rem; line-height: 0.33rem; font-size: 0.14rem; color: #2698d6;}
  content .title .titleRight{font-size: 0.13rem; color: #999999;}
  content .title img{width: 0.18rem; height: 0.18rem; vertical-align: text-bottom; margin-right: 0.08rem;}
  content >>> .el-table td{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  content >>> .el-table th{height: 0.3rem!important; box-sizing: border-box; margin: 0; text-align: center; padding: 0;}
  content >>> .el-table td>.cell{text-align: center; color: #666666; padding: 0}
  content >>> .el-table th>.cell{text-align: center; color: #333333; padding: 0;}
  .table_name{display: block; width: 100%; height: 0.3rem; line-height: 0.3rem; overflow: hidden; text-overflow: ellipsis;white-space: nowrap;}
  .opinionTab >>> .el-tabs__item.is-active{color: #2698d6; background: #ffffff; border: 1px solid #e1e1e1; border-radius: 0.2rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header{border: none; margin-bottom: 0.1rem;}
  .opinionTab >>> .el-tabs--card>.el-tabs__header .el-tabs__nav{display: flex; justify-content: space-around; border: none; width: 100%;}
  .opinionTab >>> .el-tabs__item{border: none; color: #999999; height: 0.24rem; line-height: 0.24rem;}
</style>
