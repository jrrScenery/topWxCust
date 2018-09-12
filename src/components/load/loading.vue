<template>
    <div>
    <div class="loadingtip" v-show="!loadall">
        <p>加载中...</p>
    </div>
    <div class="loadall" v-show="loadall">
        <p>已加载全部数据</p>
    </div>
    </div>
</template>

<script>
export default {
  name: 'loadingtmp',
  props:{
      busy:Boolean,
      loadall:Boolean
  }
}
</script>


<style scoped>
  .loadingtip{}
  .loadingtip p,.loadall p{ padding: 0.12rem 0; text-align: center; color: #666;}
</style>
