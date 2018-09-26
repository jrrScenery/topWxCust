<!--相关报修-->
<template>
  <div class="proRepairView">
    <el-input placeholder="编号，厂商，型号，序列号，描述……" v-model="value">
    <el-button @click="sear" slot="append" icon="el-icon-search"></el-button>
  </el-input>
    <div class="content" >
      <div class="eventCell" v-for="info in proRepairObj" :key="info.CASE_ID">
        <router-link :to="{name:'casedetail',query: {caseId:info.CASE_ID}}">
        <div class="cellTop">
          <el-row> 
            <el-col :span="13">
              <span class="spheathcolor"></span>{{info.CASE_NO}}
              <!-- <span class="spheathcolor" :class="'spheathcolor'+info.CASE_TYPEID" ></span>{{info.CASE_NO}} -->
            </el-col>            
            <el-col :span="11">
              <div class="cellTopTime"><span>{{info.CREATE_DATE}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="cellContent">
          <el-row>
            <el-col :span="12"><span class="tit">状态：</span><span>{{info.CASE_STATUS}}</span></el-col>
            <el-col :span="12"><span class="tit">类型：</span><span>{{info.CASE_TYPE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span class="tit">厂商：</span><span>{{info.FACTORY}}</span></el-col>
            <el-col :span="12"><span class="tit">型号：</span><span>{{info.DEVICE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">序列号：</span><span>{{info.SN}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><span class="tit">说明：</span><span v-html="info.PROBLEM_DETAIL"></span></el-col>
          </el-row>
        </div>
        </router-link>
      </div>
      <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'

export default {
  name: 'proRepair',
  props:{
    prorepairpage: Number
  },
  components: {
    loadingtmp
  },

  data () {
    return {
      value: '',
      proRepairObj: [],
      pageSize: 5,
      busy:false,
      loadall: false,
      projectId: this.$route.query.projectId
    }
  },
  created () {
  },
  methods: {

    loadrepair(flag){
      let url = "?action=GetRelateCaseOfProject&PROJECT_ID="+this.projectId;
     //url += "&PAGE_NUM="+this.page+"&PAGE_TOTAL="+this.pageSize;
      let param = {PAGE_NUM:this.prorepairpage,PAGE_TOTAL:this.pageSize,KEYWORD:this.value};
      console.log("111",param);
      fetch.get(url,param).then(res=>{
        console.log(res.data);
        var tmpar= res.data;
        tmpar = tmpar.map(function(item){
          if(item.PROBLEM_DETAIL){
            item.PROBLEM_DETAIL = item.PROBLEM_DETAIL.replace(/\n/g, "<br/>");
          }
          return item;
        })
        if("0" === res.STATUSCODE){
          if(flag){
            this.proRepairObj = this.proRepairObj.concat(res.data);
          }else{
            this.proRepairObj = res.data;
          }
          if(0 == res.data.length || res.data.length<this.pageSize ){
            this.busy = true;
            this.loadall = true;
          }
          else{
            this.busy = false;
          }
        }
        else{
          this.busy= false;
        }
        this.$emit('emitbusy', {busy:false,loadall:this.loadall});
      });
    },
    sear(){
      this.$emit("repairpagechange",1);
      this.proRepairObj=[];
      this.busy=false
      this.loadall=false
      this.loadrepair(0)
    }
  },
  mounted () {

  },
  watch:{
    prorepairpage(curVal,oldVal){
      console.log(curVal+"||"+oldVal);
      this.loadrepair(this.prorepairpage>1);
    }
  }
}
</script>

<style scoped>
  .content{ width: 100%; }
  .proRepairView{padding: 0 0.15rem;}
  .proRepairView >>> .el-input{padding: 0.1rem 0; border-bottom: 0.01rem solid #e1e1e1}
  .proRepairView >>> .el-input__icon{width: 0.4rem;font-size: 0.2rem}
  .proRepairView >>> .el-input__inner{border-color: #e1e1e1;  background: #f5f5f9}
  .eventCell{padding: 0 0rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .speventlevel{}
  .speventlevelcolor1{ color:#ffffff; }
  .speventlevelcolor2{ color:#1ca2a5; }
  .speventlevelcolor3{ color:#ffff00; }
  .speventlevelcolor4{ color:#ff9900; }
  .speventlevelcolor5{ color:#ff0000; }
  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .spheathcolor1{background: #009900;}
  .spheathcolor2{background: #ffff00;}
  .spheathcolor3{background: #ff9900;}
  .spheathcolor4{background: #ff0000;}
</style>
