<!--工作台-备件回收-->
<template>
  <div class="workBenchPartRecycle">
    <header-last :title="workBenchPartRecycleTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="partRecycleTabs">
      <el-tabs v-model="activeName" >
        <template v-for="item in workBenchPartRecycle">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.id">  
            <div style="overflow:auto">
              <div class="partsContent" v-for="info in item.partsListArr" :key="info.id"  @select-change="handleSelectionChange">
                <div class="partsDetail">
                  <el-row>
                    <el-col :span="6"><span class="tit">备件来源</span></el-col>
                    <el-col :span="16">
                      <span v-if="info.supplyType==3" class="tit">换下件</span>
                      <span v-else class="tit">供货件</span>
                      </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">厂商</span></el-col>
                    <el-col :span="16"><span class="tit">{{info.factoryName}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">备件编号</span></el-col>
                    <el-col :span="16"><span class="tit"> {{info.pkid}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">备件类型</span></el-col>
                    <el-col :span="15" style="postion:fixed"><span class="tit">{{info.equipType}}</span></el-col>
                    <el-col :span="3" v-if="info.workerStatus==2" style="float:right"><input type="checkbox" :value="info" v-model="multipleSelection"/></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">PN/FUR</span></el-col>
                    <el-col :span="18"><span class="tit">{{info.partPn}}</span></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">备件使用状况</span></el-col>
                    <el-col :span="16">
                      <span v-if="info.useState==1" class="tit">已使用件</span>
                      <span v-if="info.useState==2"  class="tit">未使用件</span>
                      <span v-if="info.useState==3"  class="tit">坏件</span>
                      <span v-if="info.useState==4"  class="tit">备件不可用</span>
                      <span v-if="info.useState==5"  class="tit">未到场</span>
                      </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6"><span class="tit">序列号</span></el-col>
                    <el-col :span="16"><span class="tit">{{info.singlepartSortnum}}</span></el-col>
                  </el-row>
                </div>
              </div>
            </div>
            
          </el-tab-pane>
          
          <!-- <router-view v-bind:parts="parts"></router-view> -->
        </template>
        <router-link v-if="this.multipleSelection.length>0" :to="{name:'partRecycles',params:{parts:this.parts,caseId:this.caseId}}">
          <div style="width:100%;text-algin:center">
            <!-- <part_recycle :parts="parts"></part_recycle> -->             
            <el-button  @click="handleSelectionChange">备件回收</el-button>            
          </div>  
        </router-link>
        <div v-else style="width:100%;text-algin:center">
            <!-- <part_recycle :parts="parts"></part_recycle> -->             
          <el-button  @click="handleSelectionChangeerr">备件回收</el-button>            
        </div>  
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import eventBaseInfo from '../../components/event/eventBaseInfo'
// import eventProgress from '../../components/event/eventProgress'
// import part_recycle from './part_recycle'
import eventParts from "../../components/event/eventParts";
import HeaderLast from "../header/headerLast";
import fetch from "../../utils/ajax";

export default {

  components: {
    HeaderLast,
  },

  data() {
    return {
      workBenchPartRecycleTit: "备件回收",
      activeName: "first",
      multipleSelection:[],
      parts:[],
      workBenchPartRecycle: [
        {
          id:1,
          name: 'first',
          label: '未回收安排',
          partsListArr: [],
        },
        {
          id:2,
          name: 'second',
          label: '已回收安排',
          partsListArr: [],
        },
      ],
      checked:false,
      popBg: false,
      caseId: this.$route.query.caseId,
      // projectId: this.$route.query.projectId,
      slaLevel: "",
      caseLevel: "",
      createDate: ""
    };
  },

  methods: {
    handleSelectionChange(){
        let part = [];
        part.pkid=this.multipleSelection[0].pkid;
        part.useState=this.multipleSelection[0].useState;
        part.supplyType=this.multipleSelection[0].supplyType;
        if(this.multipleSelection[0].recycleMId!=null&&this.multipleSelection[0].recycleMId!="null"){
        part.recycleMId=this.multipleSelection[0].recycleMId;
        }
        if(this.multipleSelection[0].arrangeMId!=null&&this.multipleSelection[0].arrangeMId!="null"){
        part.arrangeMId=this.multipleSelection[0].arrangeMId;
        }
        if(this.multipleSelection[0].sendId!=null&&this.multipleSelection[0].sendId!="null"){
        part.sendId=this.multipleSelection[0].sendId;
        }
        if(this.multipleSelection[0].recycleDId!=null&&this.multipleSelection[0].recycleDId!="null"){
        part.recycleDId=this.multipleSelection[0].recycleDId;
        }
        if(this.multipleSelection[0].useState==3){
        part.gOrB=2;
        }else if(this.multipleSelection[0].useState==2){
          part.gOrB=1;
        }else{
          part.gOrB=null;
        }
        this.parts.push(part);
        // console.log("222222222");
        // console.log(this.parts);
        
    },
    handleSelectionChangeerr(){
      alert("请选择至少一个备件！")
      return false;
    }
  },
  created: function() {
    fetch.get("?action=/parts/queryPartsArrangeList&caseId="+this.caseId).then(res => {
      console.log(res);
      let baseinfo=res.DATA;
      for(var items in baseinfo){
        if(baseinfo[items].workerStatus==2){
          this.workBenchPartRecycle[0].partsListArr.push(baseinfo[items]);
        }
        else{
          this.workBenchPartRecycle[1].partsListArr.push(baseinfo[items]);
        }
      }
      console.log(this.workBenchPartRecycle);
      
    });
  },
};
</script>

<style scoped>
.partRecycleTabs {
  /* margin: 0 0; */
  /* position: relative; */
}
.partRecycleTabs >>> .el-tabs__header {
  margin: 0 0 0.1rem;
}
.partRecycleTabs >>> .el-tabs__item.is-active {
  color: #2698d6;
}
.partRecycleTabs >>> .el-tabs__active-bar {
  background: #2698d6;
}
.partRecycleTabs >>> .el-tabs__nav {
  width: 100%;
  text-align: center;
}
.partRecycleTabs >>> .el-tabs__item {
  width: 50%;
  font-size: 0.14rem;
  color: #666666;
}
  .partsContent{padding: 0 0.1rem}
  .partsContent .partsDetail{background: #ffffff; margin-bottom: 0.05rem;}
  .partsContent .partsDetail p{line-height: 0.3rem; color: #333333; font-size: 0.15rem;}
  .partsContent .partsDetail .el-col{line-height: 0.25rem; color: #999999;}
 .partsContent .partsDetail input{background: #ffffff;border: #333333;}
 .partRecycleTabs>>>.el-button {width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;}
</style>
