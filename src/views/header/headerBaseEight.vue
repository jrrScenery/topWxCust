<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
    <header>
      <div class="headerLeft"  v-on:click="back"><i class="el-icon-arrow-left"></i></div>
      <h2>{{title}}</h2>
      <div class="el-icon-plus" @click.stop="popBg=!popBg"></div>
    </header>
    <div class="popBg" v-if="popBg">
      <add-parts @change="updatePopBg" @search="searchData"></add-parts>
    </div>
  </div>
</template>

<script>
import addParts from '@/views/home/addParts'
export default {
  name: 'headerBaseEight',

  components: {
    addParts
  },

  data () {
    return {
      popBg: false,
    }
  },

  props:['title'],

  watch: {
  },

  created () {
  },

  methods: {
    updatePopBg (data) {
      this.popBg = data.popBg
    },

    searchData (data) {
      this.$emit('searchPro', data)
      console.log("11111111111111112222",data)
    },

    onAddParts () {
      this.$router.push({name:"addParts",query:{caseId: this.$route.query.caseId}});
    },

    back: function (event) {
      this.$router.back(-1)
    }

  }
}
</script>

<style scoped>
  header{position:fixed; top: 0; left: 0; right: 0; z-index: 9999;display: flex; justify-content: space-between; background: #2698d6; height: 0.45rem; line-height: 0.45rem; padding: 0 0.1rem; color: #ffffff}
  h2{display: flex; background: #2698d6;font-size: 0.16rem;}
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.2rem;}
  .headerLeft i{font-size: 0.2rem;}
  .el-icon-plus{font-weight: 900; line-height: 0.48rem;}
  .popBg{background: rgba(0,0,0,0.5); position: fixed; bottom: 0; z-index: 999; padding: 1.6rem 0.76rem;}
</style>