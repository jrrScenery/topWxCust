<!--待审批-->
<template>
  <div class="approveView">
    <header>
      <el-row>
        <el-col :span="8"><div class="cell_tit">{{workType}}</div></el-col>
        <el-col :span="16"><div class="cell_tit">{{workTit}}</div></el-col>
      </el-row>
    </header>
    <div class="content">
      <el-row v-for="item in approveArr" :key="item.id">
        <el-col :span="8"><div class="cell_left">{{item.type}}</div></el-col>
        <el-col :span="16"><div class="cell_right">{{item.tit}}</div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'approve',

  components: {
  },

  data () {
    return {
      workType: '业务类型',
      workTit: '标题',
      approveArr: [
      /**
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'},
        {type: '确认工作量', tit: '钟宇飞于2018-05-15 08:51:45保存了时间C'}*/
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
/*e0002a*/
  .approveView{width: 100%; line-height: 0.3rem; color: #666666;}
  .approveView .content .el-row:nth-child(2n+1){background: #f7f7f7;}
  .approveView .content .el-row:nth-child(2n){background: #ffffff}
  header{text-align: center; line-height: 0.36rem; background: #ffffff; color: #333333; font-size: 0.14rem;}
  .cell_left{padding-left: 0.1rem;}
  .cell_right{padding-right: 0.1rem;}
</style>
