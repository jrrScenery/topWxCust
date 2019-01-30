<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="headerRight" @click.stop="popBg=!popBg">{{headerRight}}</div>
    </header>
    <template v-if="popBg">
      <div class="popBg">
        <search-notice @change="updatePopBg" @search="searchData"></search-notice>
      </div>
    </template>
  </div>
</template>

<script>
import searchNotice from '@/components/searchNotice'
export default {
  name: 'headerBaseSix',

  components: {
    searchNotice
  },

  data () {
    return {
      headerRight: '查询',
      popBg: false
    }
  },

  props: ['title'],

  watch: {
  },

  created () {
  },

  methods: {
    updatePopBg (data) {
      this.popBg = data.popBg
    },

    searchData (data) {
      this.$emit('searchNotice', data)
    },

    back: function (event) {
      // this.$router.push({name:'mine'});   
      this.$router.back(-1)
    }

  }
}
</script>

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;}
  .popBg{background: rgba(0,0,0,0.5); position: fixed; top: 0.45rem; bottom: 0; left: 0; right: 0; z-index: 999; padding: 0 0.25rem;}
</style>
