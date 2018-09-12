<!--表弹出搜索-->
<template>
  <div>
    <!-- <div class="headerRight" @click.stop="popBg=!popBg">{{homeRight}}</div> -->
    <el-form label-width="2.5rem">
        <el-form-item :inline="true">
          <el-button  @click.stop="popBg=!popBg">{{homeRight}}</el-button>
        </el-form-item>
    </el-form>
    <template v-if="popBg">
      <div class="popBg">
        <template v-if="searchType=='opnion1'">
          <search-complaint-view @change="updatePopBg" @search="searchData"></search-complaint-view>
        </template>
        <template v-else-if="searchType=='opnion2'">
          <search-complaint-view @change="updatePopBg" @search="searchData"></search-complaint-view>
        </template>
        <template v-else-if="searchType=='opnion3'">
          <search-complaint-view @change="updatePopBg" @search="searchData"></search-complaint-view>
        </template>
        <template v-else-if="searchType=='focusEvent'">
          <focus-search-view @change="updatePopBg" @search="searchData" :queryData="queryData"></focus-search-view>
        </template>
        <report-business-view v-else @change="updatePopBg" @search="searchData"  :queryData="queryData"></report-business-view>
      </div>
    </template>
  </div>
</template>
        
<script>
import reportBusinessView from '../views/home/reportBusinessView'
import fetch from '../utils/ajax'

export default {
  name: 'searchReportFormView',

  components: {
    reportBusinessView,
  },

  data () {
    return {
      homeRight: '查询',
      popBg: false
    }
  },

  props: ['searchType','queryData'],

  methods: {

    updatePopBg (data) {
      console.log("test133333311111111111", data)
      this.popBg = data.popBg
      // console.log(this.popBg)
    },

    searchData (data) {
      console.log("test111111111111", data)
      this.$emit('searchPro', data)
    },

    

  },
}

</script>

<style scoped>
  /* .headerLeft,.headerRight{display: flex; flex-direction: column; justify-content: center; align-items: center; width: 0.45rem; height: 0.45rem; font-size: 0.14rem;}
  .headerLeft i{font-size: 0.2rem;} */
  .popBg{background: rgba(0,0,0,0.5); position: fixed; top: 0.45rem; bottom: 0; z-index: 999; padding: 0 0.25rem;}
</style>
>

</style>


      