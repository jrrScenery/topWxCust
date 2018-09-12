<template>
  <div class="workBenchPartRecycle">
    <header-last :title="workBenchPartRecycleTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="partRecycleContent">
        <el-form label-width="100px" label-position="left">
            <p>基本信息</p>
            <el-form-item label="回收申请人：">
                <el-input v-model="maininput.empname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申请时间:">
                <el-col :span="24" >
                <!-- <el-input v-model="currentdate"></el-input> -->
                <el-date-picker type="datetime" placeholder="请选择可回收时间" style="width: 100%;"  v-model="currentdate" :disabled="true"></el-date-picker>
                </el-col>
                 <!-- <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="currentdate" style="width: 100%;"></el-time-picker>
                 </el-col> -->
            </el-form-item>
            <el-form-item label="回收联系人：">
                <el-input v-model="maininput.customerLinkman" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机:">
                <el-input v-model="maininput.customerTel" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回收地点:">
                <el-input v-model="maininput.customerAddress" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="客户交接地址:">
                <el-input v-model="maininput.customerAddress" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="可回收时间:">
                <el-col :span="24"  >
                <!-- <el-input v-model="currentdate"></el-input> -->
                <el-date-picker type="datetime" placeholder="请选择可回收时间" style="width: 100%;"  v-model="canRecycleTime"></el-date-picker>
                </el-col>
                 <!-- <el-col class="line" :span="1">-</el-col>
                <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="currentdate" style="width: 100%;"></el-time-picker>
                 </el-col> -->
            </el-form-item>
            <el-form-item label="回收单要求:" >
                <el-input type="textarea" placeholder="选填，请填写回收单要求" :rows="3" v-model="maininput.remark" :disabled="true"></el-input>
            </el-form-item>
                <p>温馨提示：通过第三方物流陆运方式发货，运费到付。推荐顺丰物流 客服电话 <a @click="sendCall" v-bind:href="'tel:95338'"  style="font-size: 0.13em; color: #2698d6;">95338</a>。</p>
                <p>回收安排信息</p>
            <el-form-item label="回收件收货人:">
                <el-input v-model="recycleInfoinput.recyclePerson" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回收件收货人联系方式:" label-width="40%">
                <el-input v-model="recycleInfoinput.recycleContact" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="回收件收货地址:">
                <el-input v-model="recycleInfoinput.recycleAddr" :rows="0.5" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="物流公司:">
                <el-select v-model="transportCompany">
                    <el-option v-for="item in supplier"  :key="item.key" :label="item.supplierName"  :value="item.supplierId">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="物流单号:">
                <el-input placeholder="请填写物流单号:" v-model="transportCode"></el-input>
            </el-form-item>
            <el-form-item label="回收物流类型">
                <el-select v-model="transportCompanytype">
                    <el-option  :key="1" label="第三方物流"  :value="1">
                    </el-option>
                    <el-option  :key="5" label="供应商回收自取"  :value="5">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="回寄说明:">
                <el-input type="textarea" placeholder="请填写回寄说明" :rows="3" v-model="remark"></el-input>
            </el-form-item>
            </el-form>
            <div class="buttons">
            <el-button type="primary" @click="sender">我要寄件</el-button>
                <el-button type="primary" @click="onSubmit2(2)" >暂存</el-button>
                <el-button type="primary" @click="onSubmit2(1)">提交</el-button>
                <router-link :to="{name:'workBenchPartRecycle',query:{caseId:'126511'}}">
                <el-button type="primary" >关闭</el-button>
                </router-link>
            </div>
            </div>
            <div class="partRecDialog">
    <el-dialog :visible.sync="dialogVisible" width="80%">
        <el-form class="form1" style="color:#333333" label-width="80px">
            <p>发件人信息</p>
          <el-form-item label="发货人">
            <el-input class="input1" v-model="maininput.empname" :disabled="true" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item label="发货人手机">
            <el-input v-model="maininput.recyclePhone" :disabled="true"></el-input>
          </el-form-item>
        <el-form-item label="发货城市">
            <el-input class="input1" v-model="senderArea.fullName" :disabled="true" style="font-size:6px width:20px"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="maininput.customerAddress" :disabled="true"></el-input>
          </el-form-item>
        <p>收货人信息</p>
          <el-form-item label="收货人">
            <el-input class="input1" v-model="recycleInfoinput.recyclePerson" :disabled="true" style="font-size:6px"></el-input>
          </el-form-item>
          <el-form-item label="收货人手机">
            <el-input v-model="recycleInfoinput.recycleContact" :disabled="true"></el-input>
          </el-form-item>
        <el-form-item label="收货人城市">
            <el-input class="input1" v-model="recycleInfoinput.recycleCity" style="font-size:6px width:20px"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="recycleInfoinput.recycleAddr"></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="dialogVisible = false" >取消</el-button>
          <el-button type="primary"  class="onsubmit"  @click="innerVisible=true" >顺丰下单</el-button>
          </el-form-item>
        </el-form>
        <!-- <div style="algin-text:center">
          
        </div> -->
    </el-dialog>
    <el-dialog :visible.sync="innerVisible"  width="60%">
      <el-form class="form1" style="color:#333333" label-width="80px">
        <!-- <div style="height"> -->
            <p style="line-height:60px"><span>确定预约寄件？</span></p>
        <!-- </div> -->
          <el-form-item class="submit">
            <el-button type="primary" @click="innerVisible = false" >取消</el-button>
          <el-button type="primary" class="onsubmit"  @click="onSubmit1" >确定</el-button>
          </el-form-item>
      </el-form>
        <!-- <div style="text-align:center"></div>
        <div style="algin-text:center;margin-top:10px">
          <el-button type="primary" @click="innerVisible = false" >取消</el-button>
          <el-button type="primary" @click="onSubmit1" >确定</el-button>
        </div> -->
    </el-dialog>
    </div>
 </div>
</template>
<script>
// import eventBaseInfo from '../../components/event/eventBaseInfo'
// import eventProgress from '../../components/event/eventProgress'
// import eventPeople from '../../components/event/eventPeople'
import eventParts from "../../components/event/eventParts";
import HeaderLast from "../header/headerLast";
import fetch from "../../utils/ajax";
import qs from 'qs';

export default {
  components: {
    HeaderLast
  },
  data() {
    return {
      workBenchPartRecycleTit: "备件回收",
      activeName: "first",
      caseId: this.$route.params.caseId,
      transportCompany: "",
      transportCode: "",
      transportCompanytype: "",
      dialogVisible:false,
      innerVisible:false,
      remark:"",
      maininput: [],
      parts:[],
      recycleInfoinput:[],
      supplier: {},
      currentdate: "",
      canRecycleTime:"",
      senderArea:[],
      // applicant:"张三",
      // apTime:"2018-08-15 09:50:24",
      // contactor:"张三",
      // apPhone:"11111111",
      // region:"北京市朝阳区",
      // haAddress:"北京市朝阳区办公楼",
      // reTime:"2018-08-20",
      // require:"没有要求",
      // receiver:"李四",
      // rePhone:"444444444444",
      // reAdress:"北京市东城区",
      // delivery:"顺丰",
      // cardNum:"SF8888665",
      // goBack:"是",
      // description:"这是回寄说明",
      //   },
    };
  },

  created: function() {
    this.currentdate = new Date();
      this.parts=this.$route.params.parts;
      console.log("========="+this.caseId);
      console.log(this.parts)
      console.log("=======")
    fetch.get("?action=/parts/getPartsCanRecycle&CASE_ID="+this.caseId).then(res => {
      console.log(res);
      //   let remain=;
      //   let rr=res.;
      this.maininput = res.main[0];
      this.recycleInfoinput = res.recycleInfo[0];
      this.supplier = res.supplier;
      // console.log("111111111")
      // console.log(this.parts);
      // console.log(this.maininput);
      // console.log(this.recycleInfoinput);
    });
  },
  // mounted:function(){
    
  // },
  methods: {
    sender(){
      console.log(this.transportCompany)
      if(this.transportCompany=="1000047"){
      this.dialogVisible=true;
      fetch.get("?action=/parts/queryArea&areaCode="+this.maininput.areaId).then(res => {
      console.log(res);
      this.senderArea=res.DATA[0];
    })
    }else{
      alert("物流公司不是顺丰物流，无法选择此功能")
      return false;
    }
    },
      onSubmit1(){
        const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
        let kd={};
        kd.ShipperCode="SF";
        kd.OrderCode=new Date().getTime();
        kd.PayType=1;
        kd.ExpType=1;
        var sender = {};
        sender.Name=this.maininput.empname;
        sender.Mobile=this.maininput.recyclePhone;
        sender.CityName=this.senderArea.areaName;
        sender.ProvinceName=this.senderArea.provinceName;
        sender.Address=this.maininput.customerAddress;
        kd.Sender=sender;
        var receiver ={};
        receiver.Name=this.recycleInfoinput.recyclePerson;
        receiver.Mobile=this.recycleInfoinput.recycleContact;
        receiver.ProvinceName=this.recycleInfoinput.recycyleProvince;
        receiver.CityName=this.recycleInfoinput.recycleCity;
        receiver.Address=this.recycleInfoinput.recycleAddr;
        kd.Receiver=receiver
        var commodity=[];
        var c={};
        c.GoodsName="电子产品",
        commodity.push(c);
        kd.Commodity=commodity;
        kd.Remark=this.remark;
        let params = JSON.stringify(kd);
        // let params=new URLSearchParams;
        // params.append('kd',JSON.stringify(kd));
        // params.append('ShipperCode',"SF");
        // params.append('ShipperCode',"SF");
        // params.append('ShipperCode',"SF");
        // params.append('Sender',JSON.stringify(sender));
        // params.append('Receiver',JSON.stringify(kd.Receiver));
        // params.append('Remark',this.remark);
        // params.append('Commodity',commodity);?action=/parts/getSFSendCode?action=/parts/getSFSendCode
        console.log(params);
        fetch.get("?action=/parts/getSFSendCode&kd="+params).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                innerVisible=false;
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
        

      },
    onSubmit2(type) {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      let details=[]
      this.parts.forEach(function(v,i,ar){
          let detailpa={};
          detailpa.gOrB=v.gOrB;
          detailpa.length=v.length;
          detailpa.pkid=v.pkid;
          detailpa.supplyTyle=v.supplyTyle;
          detailpa.useState=v.useState;    
           details.push(detailpa);
      });

      let main={};
      main.recycleBy=vm.maininput.applyBy;
      main.recycleOn=vm.currentdate;
      main.customerLinkman=vm.maininput.customerLinkman;
      main.customerTel=vm.maininput.customerTel;
      main.customerAddress=vm.maininput.customerAddress;
      main.canRecycleTime=vm.canRecycleTime;
      main.remark=vm.maininput.remark;
      main.caseId=vm.maininput.caseId;
      main.areaId=vm.maininput.areaId;

      let recycleInfo={};
      recycleInfo.recyclePerson=vm.recycleInfoinput.recyclePerson;
      recycleInfo.recycleContact=vm.recycleInfoinput.recycleContact;
      recycleInfo.recycleAddr=vm.recycleInfoinput.recycleAddr;
      recycleInfo.areaCode=vm.recycleInfoinput.areaCode;
      recycleInfo.transportCompany=vm.transportCompany;
      recycleInfo.transportCode=vm.transportCode;
      recycleInfo.dcitsRecyclePerson=vm.recycleInfoinput.dcitsRecyclePerson;
      recycleInfo.dcitsRecycleContact=vm.recycleInfoinput.dcitsRecycleContact;
      recycleInfo.remark=vm.remark;
      recycleInfo.sendType1=vm.transportCompanytype;
     
      console.log("1111111");
      console.log(details);
      console.log(main);
      console.log(recycleInfo);
      for(var i=0;i<details.length;i++){
        if(details[i].recycleMId==null||details.recycleMId==""){
          main.ifSave=1;
          break;
        }
      }
      let postData=new URLSearchParams;
      postData.append('main',JSON.stringify(main)),
      postData.append('details',JSON.stringify(details));
      postData.append('recycleInfo',JSON.stringify(recycleInfo));

      // let params="&main="+this.main+"&parts="+this.parts+"&recycleInfo"+this.recycleInfo;
      console.log(postData.get("main"));
      console.log(postData.get("details"));
      console.log(postData.get("recycleInfo"));
      if(type==1){
        if(recycleInfo.transportCode==""){
          loading.close();
          alert("请填写物流单号！");
          return false;
        }else{
      fetch.post("?action=/parts/insertRecycleApply",postData).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
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
        }
      }
      if(type==2){
        fetch.post("?action=/parts/submitPartsRecycle",postData).then(res=>{
        loading.close();
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'保存成功',
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
      }
    }
  }
};
</script>
<style>
.partRecycleContent {
  margin: 0.1rem 0.2rem 0.2rem 0.2rem;
}
.partRecycleContent .el-form .el-form-item {
  margin: 0.04rem 0 0 0rem;
}
.partRecycleContent .el-form .el-form-item label {
  font-size: 10px;
}
.partRecycleContent .el-form .el-form-item .el-input {
  border: none;
}
.partRecycleContent .el-form p {
  font-size: 10px;
  font-weight: bold;
  display: block;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
}
.buttons{
  margin:0.07rem;
  text-align: center;
}
.buttons .el-button {
  margin-left: 0.07rem;
  padding: 0.08rem 0.08rem;
  color: #ffffff;
  background: #2698d6;
  /* border: red solid 1px  */
}
.partRecDialog .el-form .el-form-item {
  margin: 0.04rem 0 0 0rem;
}
.partRecDialog .el-form .el-form-item label {
  font-size: 10px;
}
.partRecDialog .el-dialog .el-roe .el-col .el-input{font-size: 6px}
  .partRecDialog  .submit{position: absolute;left: 0; right: 0; height: 0.4rem;}
  .partRecDialog  .submit .el-button{background: #ffffff;width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .partRecDialog  .submit .el-button:hover{background: #ffffff;}
  .partRecDialog  .submit .onsubmit:hover{background: #2698d6;}
  .partRecDialog  .submit .el-form-item__content{margin: 0!important; display: flex;}
  .partRecDialog  .submit .onsubmit{background: #2698d6; color: #ffffff;}

  .partRecDialog .el-dialog .el-dialog__header{padding-bottom: 10px}
.partRecDialog .el-dialog .el-dialog__body{padding:0px 20px 40px; color:#606266;font-size:14px;}
</style>
