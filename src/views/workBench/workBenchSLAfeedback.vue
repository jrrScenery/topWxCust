<!--SLA反馈-->
<template>
  <div class="workBenchSLAfeedback">
    <header-last :title="SLAfeedbackTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
    <div class="tabheader">
      <el-row>
        <el-col :span="7" style="text-align:left"> 反馈项</el-col>
        <el-col :span="8">反馈时间</el-col>
        <el-col :span="6">说明</el-col>
        <el-col :span="3">状态</el-col>
      </el-row>
    </div>
    <div class="tabdetail">
      <el-row v-for="item in SLAObj" :key="item.slaTypeId"><!--这几条数据在一个json数组slaStatus中，workid相同。-->
        <el-col :span="7"><div style="text-align:left">{{item.slaType}}</div></el-col>
        <el-col :span="8"><div style="font-size:0.13rem;line-height:0.2rem;">{{item.operateDate}}</div></el-col>
        <el-col :span="6"><div style="font-size:0.13rem;padding-right:5px;line-height:0.2rem;">{{item.feedbackDescription}}</div></el-col><!--反馈说明-->
        <el-col :span="3" style="float:right;color:#2698d6" >
          <!-- <div v-if="item.slaTypeId==8||item.slaTypeId==10&&item.ifFeedback==0" @click="dialogVisible=true">反馈</div>
          <div v-else-if="item.ifFeedback!=0">已反馈</div>
          <div v-else @click="dialogVisible=true">反馈</div> -->
          <div v-if="item.ifFeedback==0" @click="dialogopen(item.slaTypeId)">反馈</div>
          <div v-if="item.ifFeedback!=0" style="color:#666666" >已反馈</div>
        </el-col>
      </el-row>
    </div>
    </div>
    <div class="SLAdialog">
    <el-dialog :visible.sync="dialogVisible0" width="70%" :show-close=false class="dialog">
              <el-form class="form1" style="color:#333333">
          <el-form-item label="反馈时间">
            <el-input class="input1" :value="date" style="font-size:6px" :disabled="true"></el-input>
          </el-form-item>
          <!-- <el-form-item :prop="item">
            <el-input class="input1" :value="item.slaTypeId"></el-input>
          </el-form-item> -->
          <el-form-item>
             <el-input v-if="typeid==6" type="textarea" :rows="4" placeholder="请简要描述所做操作及处理结果。例如，更换25盘柜上的13号硬盘后，存储状态恢复正常。" v-model="form.des1" style="font-size:6px"></el-input>
            <el-input v-else  type="textarea" placeholder="请填写说明" v-model="form.des1" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button @click="dialogVisible0 = false">取消</el-button>
          <el-button type="primary" class="onsubmit" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
        <!-- <div style="text-align:center">
          
        </div> -->
    </el-dialog>
    </div>
    <div class="SLAdialog">
    <el-dialog title="任务反馈" :visible.sync="dialogVisible1" width="70%">
        <el-form class="form1">
          <!-- <el-form-item></el-form-item> -->
          <el-form-item  label="原因">
            <el-radio-group v-model="form.des2" style="font-size:6px">
              <el-radio :label="1">故障定位不准确</el-radio><br>
              <el-radio :label="2">现场备件不可用</el-radio><br>
              <el-radio :label="3">操作失误</el-radio><br>
              <el-radio :label="4">客户取消任务</el-radio><br>
              <el-radio :label="5">实施时间不够</el-radio><br>
              <el-radio :label="6">其他</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="解决不成功原因">
            <el-input type="textarea" :rows="3" placeholder="请填写说明" v-model="form.des3" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item  class="submit">
            <el-button @click="dialogVisible1 = false" >取 消</el-button>
          <el-button type="primary"  class="onsubmit"  @click="onSubmit">提 交</el-button>
          </el-form-item>
        </el-form>
        <!-- <div style="text-align:center">
          
        </div> -->
    </el-dialog>
    </div>
  </div>
</template>

<script>
import headerLast from "../header/headerLast";
import global_ from "../../components/Global";
import fetch from "../../utils/ajax";
import loadingtmp from "@/components/load/loading";

export default {
  name: "workBenchSLAfeedback",
  components: {
    headerLast
  },
  data() {
    return {
      SLAfeedbackTit: "SLA反馈",
      dialogVisible0: false,
      dialogVisible1: false,
      radio: 0,
      typeid: "",
      // params:"",
      form:{
        des1:"",
        des2:"",
        des3:"",
        },
      date:"",
      status: "",

      SLAObj: [
      ],
    };
  },
  created: function() {
    fetch.get("?action=/work/getWorkInfo&WORK_ID="+this.$route.query.workId,{}).then(res => {
      console.log(res);
      // console.log("1111111")
      let baseInfo = res.DATA[0];
      this.SLAObj = baseInfo.slaStatus;
    });
  },
  
  methods: {
    getTime:function() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
      return currentdate;
    },
    dialogopen(slaTypeId) {
      this.date=this.$options.methods.getTime();
      this.typeid = slaTypeId;
      if (slaTypeId == 8 || slaTypeId == 10) {
        this.dialogVisible1 = true;
      } else {
        this.dialogVisible0 = true;
      }
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      let params="&REASON="+this.form.des2+"&EXPLAIN="+this.form.des1+this.form.des3;
      console.log(params);
      fetch.get("?action=/work/UpdateWorkSLAStatus&WORK_ID="+vm.$route.query.workId+
      "&SLA_TYPE="+vm.typeid+"&OPERATE_DATE="+vm.date+params).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                this.dialogVisible0=false;
                this.dialogVisible1=false;
                location.reload;
                
              }else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                });
              }
              
              console.log(res);
      });
      location. reload()
              // this.$router.go(0)
    }
  }

  
};
</script>

<style scoped>
.workBenchSLAfeedback {
  width: 100%;
  line-height: 0.3rem;
  color: #666666;
}
.tabheader {
  text-align: center;
  padding: 0.15rem 0.1rem 0 0.2rem;
  line-height: 0.36rem;
  /* background: #ffffff; */
  color: #333333;
  font-size: 0.14rem;
  font-weight: bold;
}
.tabdetail {
  text-align: center;
  padding-left: 0.2rem;
  padding-right: 0.1rem;
}
.tabdetail el-row el-col {
  height: 0.16rem;
}
.el-dailog {
  margin:10px;
  /* padding-top: 10px */
}
.SLAdialog .dialog>>> .el-dialog__header{padding-bottom: 0}
.SLAdialog .dialog>>> .el-dialog__body{padding:0px 20px 20px; color:#606266;font-size:14px;}
/* #el-title .el-dialog__title {color: red!important;} */
.SLAdialog>>>.el-form .el-form-item {
  font-size: 0.08rem;
}
.SLAdialog>>>.el-radio {
  margin-top: 5px;font-size:6px
}
/* .SLAdialog>>>.el-button{widows: 0.4rem;height: 0.4rem;} */
  .SLAdialog  .submit{position: absolute;left: 0; right: 0; height: 0.4rem;}
  .SLAdialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .SLAdialog >>> .submit .el-button:hover{background: #ffffff;}
  .SLAdialog >>> .submit .onsubmit:hover{background: #2698d6;}
  .SLAdialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
  .SLAdialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
