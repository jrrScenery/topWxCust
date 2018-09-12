<!--首页-事件详情头部-带搜索-->
<template>
  <div class="headerView">
      <div class="headerRight" @click.stop="popBg=!popBg">{{headerRight}}</div>
    <template v-if="popBg">
      <div class="popBg">
        <canvasa @change="updatePopBg" @search="searchData" :queryData="queryData"></canvasa>
      </div>
    </template>
  </div>
</template>

<script>
import canvasa from '../components/service/canvas'
export default {
  name: 'addSignature',

  components: {
    canvasa
  },

  data () {
    return {
      headerRight: '添加签名',
      popBg: false
    }
  },

  props:['queryData'],

  watch: {
  },

  created () {
  },

  methods: {
    updatePopBg (data) {
      this.popBg = data.popBg
    },

    searchData (data) {
      // console.log("========");
      // console.log(data);
      this.$emit('searchPro', data)
    },

    back: function (event) {
      this.$router.back(-1)
    }

  }
}
</script>

<style scoped>
  .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.6rem; height: 0.45rem; font-size: 0.14rem;margin-left: 0.1rem}
  .headerLeft i{font-size: 0.2rem;}
  .popBg{background: rgba(0,0,0,0.5); position: fixed;width: 100%; top: 0.45rem; bottom: 0; z-index: 999; padding: 0 5%;}
</style>
