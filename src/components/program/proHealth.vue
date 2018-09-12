<!--健康度-->
<template>
  <div class="proHealthView">

    <div class="proHealthCell" v-for="groupItem in dataArray" :key="groupItem[0].GROUP_NAME">
      <div class="proHealthTit">{{groupItem[0].GROUP_NAME}}</div>
      <div class="content">
        <ul class="tableTh">
          <li style="background: #fafafa!important;">
            <span>检查项</span>
            <span>数量</span>
            <span>加减分</span></li>
        </ul>
      </div>
      <div class="content" v-for="item in groupItem" :key="item.ITEM_NAME">
        <ul v-if="item.IF_PARENT == 1" class="tableTh"><li>{{item.ITEM_NAME}}</li></ul>
        <ul v-if="item.IF_PARENT != 1" class="tableTd">
          <li>
            <span>{{item.ITEM_NAME}}</span>
            <span>{{item.ITEM_RESULT}}</span>
            <span>{{item.ITEM_SCORE}}</span>
          </li>
        </ul>
      </div>
    </div>
    <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import loadingtmp from '@/components/load/loading'
export default {
  name: 'proHealth',
  props:{
    prohealthpage:Number
  },
  components: {
    loadingtmp
  },

  data () {
    return {
      dataArray: [],
      situationArr: [],
      evaluateArr: [],
      riskArr: [],
      busy: true,
      loadall:false
    }
  },
  created () {
    fetch.get( '?action=GetProjectHealthList&PROJECT_ID=' + this.$route.query.projectId, {}).then(res => {
      let k =-1,m=0;
      let groupName = '';
      let groupArray = [];
      for (let i = 0; i < res.data.length; i++) {
        let item = res.data[i];
        if(groupName!=item.GROUP_NAME){
          groupName = item.GROUP_NAME;
          k++;
          groupArray[k] = [];
          m = 0;
        }else{
          m++;
        }
        groupArray[k][m] = item;
      }
      this.dataArray = groupArray;
      this.busy= false;
      this.loadall = true;
    })
  },

  methods: {

  },
  watch:{
    prohealthpage(curVal,oldVal){
      console.log(curVal,oldVal);
    },
  }

}
</script>

<style scoped>
  .proHealthCell{}
  .proHealthCell .proHealthTit{position: relative; line-height: 0.35rem; margin-left: 0.15rem; font-size: 0.14rem; color: #2698d6;}
  .proHealthCell .proHealthTit::before{position: absolute; top: 0.1rem; left: -0.1rem; width: 0.05rem; height: 0.15rem; content: ''; background: #2698d6;}
  .proHealthCell .proHealthTit::after{position: absolute; bottom: 0.1rem; right: 0; width: 80%; height: 0.01rem; content: ''; background: #e5e5e5;}
  .tableTh li{display: flex; line-height: 0.3rem; font-size: 0.14rem; padding: 0 0.2rem; color: #000000; background: #ffffff!important;}
  .tableTh span{width: 15%; text-align: center;}
  .tableTh span:nth-child(1){width: 52%}
  .tableTh span:nth-child(2){width: 33%}
  .tableTd li{display: flex; line-height: 0.3rem; padding: 0 0.2rem; color: #666666;}
  .tableTd span{width: 15%; text-align: center;}
  .tableTd span:nth-child(1){width: 52%; text-align: left;}
  .tableTd span:nth-child(2){width: 33%;}
  /*.tableTd li:nth-child(2n+1){background: #fafafa}*/
  .content:nth-child(2n+1){background: #fafafa}
</style>
