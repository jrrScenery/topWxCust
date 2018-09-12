<!--质量-->
<template>
  <div class="qualityView">
    <header-last :title="echartsTit"></header-last>
    <div class="headtit">
      <el-row>
        <el-col :span=12><strong>部门：</strong><span>{{dept}}</span></el-col>
        <el-col :span=12><strong>分数：</strong><span>{{score}}</span></el-col>
      </el-row>

    </div>
    <div class="qualityTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <template v-for="item in qualityTableObj">
          <el-table-column
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width">
          </el-table-column>
        </template>
        
        <el-table-column label="" width="26" >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="bottom" width="100" class="ipop">
              <div class="pop_box">
                <strong>权重：</strong><span>{{scope.row["BMKHQZ"]}}</span><br>
                <strong>转化分值：</strong><span>{{scope.row["ZBZHFZ"]}}</span><br>
                <strong>扣分项（个）：</strong><span>{{scope.row["KFX"]}}</span>
              </div>
              <div slot="reference" class="i"></div>
            </el-popover>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>
import fetch from '../../utils/ajax'
import headerLast from '../header/headerLast'

export default {
  name: 'quality',
  components: {
    headerLast
  },
  data () {
    return {
      form: {
        time: '',
        industry: ''
      },
      optionTime: [
      ],
      dept: this.$route.query.dept,
      score: this.$route.query.score,
      batch:'',
      echartsTit: '部门指标排名',
      tableData: [
      ],
      qualityTableObj: [
        {prop: 'ZBX', label: '指标项', width: '35%'},
        {prop: 'FJMBZ', label: '分解目标值', width: '15%'},
        {prop: 'ZBDCQK', label: '达成情况', width: '20%'},
        {prop: 'KFX', label: '扣分项', width: '12%'},

        // {prop: 'FJMBZ', label: '分解目标值', width: '40%'},
        // {prop: 'KFX', label: '扣分项', width: '30%'},
       
      ],
    }
  },
  mounted () {
      console.log(this.$route.query.batchId);
      let params = {TARGET_ID:2,BATCH_ID:this.$route.query.batchId,DEPT_NAME:this.$route.query.dept}
      var url = "?action=GetQualityReleaseData";
      fetch.get(url,params).then(res=>{
        console.log(res.dataDetail);
        this.tableData=res.dataDetail;
      });
  },
  methods: {

  },
}
</script>

<style scoped>
  canvas{width: 100%!important;}
  .qualityView .headtit{ margin-top:0.45rem; background: #fff; padding: 0.08rem; color: #333;}
  .qualityView .headtit strong{font-weight:  bold;}
  .qualityView .headtit span{ margin-right: 0.1rem;}
  .qualityView .qualityTable{  }
  .qualityView{ color: #999999; width: 100%;; text-align: left;}
  .qualityView .qualityTop{display: flex; justify-content: space-between;}
  .qualityView .qualityTable  span{display: inline-block; height: 0.4rem; line-height: 0.4rem; margin-top: 0.15rem;}
  .qualityView >>> .el-form{display: flex; width: 80%; font-size: 0.13rem;}
  .qualityView >>> .el-form-item{margin: 0.15rem 0 0 0;}
  .qualityView >>> .el-input--suffix .el-input__inner{border: none;}
  .qualityEcharts{margin: 0.1rem 0;}
  .qualityEcharts .qualityTit{line-height: 0.3rem;}
  .qualityTable >>> th{color: #333333; padding: 0; height: 0.3rem; line-height: 0.3rem; background: #f7f7f7}
  .qualityTable >>> td{color: #666666; padding: 0; height: 0.3rem; line-height: 0.3rem;}
  .qualityTable >>> .cell{font-size: 0.13rem; text-align: center;}
  .qualityView .qualityTable .ipop{ display: inline-block; vertical-align: middle;}
  .qualityView .qualityTable .ipop .i{ width: 20px; height: 20px; background:url(../../assets/images/infoicon.png) no-repeat;
    background-size: 20px;}
</style>
<style>
  .qualityTable .el-table__row td:nth-of-type(1) .cell{ text-align: left;}
  .qualityTable .el-table__row td:last-of-type .cell{padding:0 3px;}
</style>

