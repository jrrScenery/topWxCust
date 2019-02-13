<!--相关报修-->
<template>
  <div class="proRepairView">
    <header-last :title="eventRepairTit" backUrl='casedetail' :date1="this.$route.query.caseId"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >

      <div class="eventCell" v-for="info in proRepairObj" :key="info.CASE_ID">
        <router-link :to="{name:'casedetail',query: {caseId:info.CASE_ID}}">
        <div class="cellTop">
          <el-row>
            <el-col :span="11">
              <div class="cellTopNum">
                <span class="speventlevel" :class="'speventlevelcolor'+info.CASE_LEVEL" >{{info.CASE_LEVEL}}</span>{{info.CASE_NO}}
              </div>
            </el-col>
            <el-col :span="1">
              <span class="spheathcolor" :class="'spheathcolor'+info.CASE_NO" ></span>
            </el-col>
            <el-col :span="12">
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
            <el-col :span="24"><span class="tit">说明：</span><span v-html="info.REMARK"></span></el-col>
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
import HeaderLast from '../header/headerLast'
let caseId ,projectId;

export default {
  name: 'proRepair',

  components: {
    loadingtmp,
    HeaderLast
  },

  data () {
    return {
      eventRepairTit: '相关报修',
      proRepairObj: [],

      page: 1,
      pageSize: 10,
      total: 0,
      busy: false,
      loadall: false,
      caseId : this.$route.query.caseId
    }
  },
  created () {

  },
  methods: {
    getEventList(flag){
      fetch.get("?action=GetRelateCase",{CASE_ID:this.caseId,PAGE_NUM:this.page,PAGE_TOTAL:this.pageSize}).then(res=>{
        console.log(res);
        var tmpar= res.data;
        tmpar = tmpar.map(function(item){
          if(item.REMARK){
            item.REMARK = item.REMARK.replace(/\n/g, "<br/>");
          }
          return item;
        })
        // console.log(tmpar);
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
          this.page++
        }


      });
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.getEventList(this.page>1);
      }, 500);
    },
    sear(){
      this.page=1
      this.busy=false
      this.loadall=false
      this.loadMore()
    }
  },

  mounted () {


  }
}
</script>

<style scoped>
  .content{position: absolute; left: 0; right: 0; top: 0.45rem; bottom: 0; overflow: scroll;}
  .proRepairView{padding: 0 0.15rem;}
  .eventCell{padding: 0 0.2rem 0.1rem; background: #ffffff; margin-bottom: 0.05rem;}
  .eventCell .cellTop{border-bottom: 0.01rem solid #dbdbdb; line-height: 0.37rem;}
  .eventCell .cellTop .cellTopNum{font-size: 0.14rem; color: #2698d6;}
  .eventCell .cellTop .cellTopNum span{display: inline-block; height: 0.19rem; width: 0.19rem; border-radius: 50%; vertical-align: text-top; margin-right: 0.08rem; color: #ffffff; text-align: center; line-height: 0.2rem;}
  .eventCell .cellTop .cellTopColor{width: 0.15rem; height: 0.08rem; border-radius: 0.04rem; margin: 0.15rem 0; text-align: right}
  .eventCell .cellTop .cellTopTime{text-align: right; color: #999999;}
  .eventCell .cellContent .el-col{line-height: 0.25rem; color: #333333;}
  .eventCell .cellContent .el-col .tit{line-height: 0.25rem; color: #999999;}
  .speventlevel{}
  .speventlevelcolor1{ background:#ff0000; }
  .speventlevelcolor2{ background:#ff0000; }
  .speventlevelcolor3{ background:#ff9900;  }
  .speventlevelcolor4{ background:#ffff00;}
  .speventlevelcolor5{ background:#009900; }
  .eventCell .cellTop .spheathcolor{display: inline-block; width: 0.14rem; height: 0.07rem; border-radius: 0.035rem;}
  .spheathcolor1{background: #009900;}
  .spheathcolor2{background: #ffff00;}
  .spheathcolor3{background: #ff9900;}
  .spheathcolor4{background: #ff0000;}
</style>
<style>
  .proRepairView  .el-input__inner{height: 0.4rem; line-height:0.4rem;}
</style>

