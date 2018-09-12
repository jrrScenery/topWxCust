<!--一级头部-->
<template>
  <header v-if="!(title ==='我的')" class="headerHomeView">
    <div class="headerLeft" @click="onSao" v-if="showSao">
      <img src="../../assets/images/header_sao.png" alt="">
      <p>{{headerLeft}}</p>
    </div>
    <div v-else class="headerLeft" @click="onSao" >
      <img src="../../assets/images/header_sao.png" alt="" style="display:none">
    </div>
    <h2>{{title}}</h2>
    <div class="headerRight">
      <router-link :to="{name:'mineNotice',params:{}}" >
        <img src="../../assets/images/header_info.png" alt="">
      </router-link>
    </div>
  </header>
</template>

<script>

export default {
  name: 'headerHome',

  data () {
    return {
      headerLeft: '扫码',
      title: 'list',
      showSao : false
    }
  },

  watch: {
    '$route': 'routerChange'
  },
  beforeCreate(){
    
    window.scanResult = function(str){
      
    }
      
    
  },
  created () {
    this.routerChange(this.$route)
  },
  mounted () {
    let permissions = JSON.parse(localStorage.getItem("userPermission"));
    for(let i=0;i<permissions.length;i++){
      if(permissions[i].PRIVID=='topApp_create_case'){
        this.showSao = true;
      }
    }
  },
  methods: {
    routerChange (e) {
      switch (e.name) {
        case 'home':
          this.title = '首页'
          break
        case 'approve':
          this.title = '待审批'
          break
        case 'workBench':
          this.title = '工作台'
          break
        case 'reportForm':
          this.title = '报表'
          break
        case 'mine':
          this.title = '我的'
          break
      }
    },
    onSao(){
      let ua = navigator.userAgent.toLowerCase();
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        var info={action:"scan",scantype:'declare',empId:localStorage.getItem('empId')}
        window.webkit.messageHandlers.ioshandle.postMessage({body: info});
      }else if(/(Android)/i.test(ua)){
        var value = "{action:scan,scantype:declare,empId:"+localStorage.getItem('empId')+"}";
        android.getClient(value);
      }
    }
  }
}
</script>

<style scoped>
  .headerHomeView{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem;}
  .headerLeft img,.headerRight img{width: 0.22rem; height: 0.22rem;}
  .headerRight a{display: block; width: 100%; text-align: center; line-height: 0.45}
  .headerLeft p{font-size: 0.1rem; line-height: 1; margin-top: 0.03rem}
</style>
