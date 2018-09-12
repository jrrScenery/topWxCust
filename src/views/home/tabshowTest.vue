<!--首页-项目详情-->
<template>
  <div class="programShowView">
    <header-last :title="programShowTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content" >
      <div class="programTable">
        <el-tabs v-model="activeName" :class="type=='my'?'hidetab':''"  @tab-click="chtab">
          <el-tab-pane label="意见投诉" name="complaintList"><complaint-list></complaint-list></el-tab-pane>
          <el-tab-pane label="项目满意度" name="proSatisfy"  lazy><pro-satisfy  ></pro-satisfy></el-tab-pane>
          <el-tab-pane label="case评价" name="caseEvaluate" lazy><case-evaluate  ></case-evaluate></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import complaintList from '../../components/opinion/complaintList'
import proSatisfy from '../../components/opinion/proSatisfy'
import caseEvaluate from '../../components/opinion/caseEvaluate'
import fetch from '../../utils/ajax'
export default {
  name: 'programShow',

  components: {
    headerLast,
    complaintList,
    proSatisfy,
    caseEvaluate
  },

  data () {
    return {
      programShowTit: '意见和投诉',
      programListArr: [
        {

        }
      ],
      projectInfo:{},
      activeName: 'complaintList',
      page:1,
      pageSize:10,
      busy:false,
      loadall: false,
      proplanpage:0,
      promachinepage:0,
      needpage:{ promachine:"promachinepage", proplan:"proplanpage" },
      prohealthpage:1,
      type: this.$route.query.TYPE
    }
  },
  created () {
    // fetch.get("?action=GetProjectInfo&EMPID="+global_.empId+"&PROJECT_ID="+this.$route.query.projectId,{}).then(res=>{
    //   let baseInfo = res.data;
    //   this.projectInfo = baseInfo;
    // });
  },

  mounted () {
    // window.addEventListener('scroll', this.handleScroll,true)
  },

  methods: {
    chtab(){
      this[this.activeName+"page"] = 1;
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let headerTop = document.querySelector('.el-tabs__header')
      let bijiaoHeight = document.querySelector('.programTable').offsetTop - 45
      if (scrollTop >= bijiaoHeight) {
        headerTop.classList.add('moveTop')
        headerTop.style.top = (Number(scrollTop) / 100) - (bijiaoHeight / 100) + 'rem'
      } else {
        headerTop.classList.remove('moveTop')
        headerTop.style.top = 0 + 'rem'
      }
    },
    getEventList(flag){
      fetch.get("?action=GetFocusCase&EMPID="+global_.empId,{params:{PAGE_NUM:this.page, TYPE:this.type ,PAGE_TOTAL:this.pageSize}}).then(res=>{
            //console.log(this.eventListArr);
            if(flag){
              this.eventListArr = this.eventListArr.concat(res.data);
            }else{
              this.eventListArr = res.data;
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
      console.log("到底了");
      if(this.needpage[this.activeName]){
        this.busy = true;
          setTimeout(() => {
            this[this.activeName+"page"]++;
        }, 500);
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll,true)
  },
  beforeRouteLeave( to, from,next){
    if (to.name == 'home') {
        to.meta.isUseCache = true;    
    }        
    next();
  }
}
</script>

<style scoped>
  .programShowView{ height: 100%;}
  .programShowView >>> .el-tabs__item{font-size: 0.14rem; color: #666666; width: 33%; text-align: center; padding: 0;}
  .programShowView >>> .el-tabs__active-bar{ background-color: #2698d6}
  .programShowView >>> .el-tabs__item.is-active{color: #2698d6;}
  .programShowView >>> .el-tabs__header{padding: 0 0.1rem; margin: 0}
  .programShowView >>> .el-tabs__nav{width: 100%;}
  .programShowView >>> .el-tabs__header .el-tabs__nav-prev{font-size: 0.2rem}
  .programShowView >>> .el-tabs__header .el-tabs__nav-next{font-size: 0.2rem}
  .programTable{background: #ffffff; }
  .programShowView >>> .moveTop{z-index: 999; background: #ffffff; -webkit-transform: translateZ(0)}

</style>
<style>
  .hidetab  .el-tabs__header{display: none;}
</style>

