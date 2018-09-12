<template>
  <div class="container"
    element-loading-text="导入中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <header-home></header-home>
    <div class="containerHeaderView">
      <div style="height: 0.45rem;"></div>
      <router-view></router-view>
      <div style="height: 0.75rem;"></div>
    </div>
    <footer-home></footer-home>
  </div>
</template>

<script>
import headerHome from './header/headerHome'
import footerHome from './footer/footerHome'
export default {
  name: 'index',

  components: {
    headerHome,
    footerHome
  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  created () {
  },

  methods: {}
}
</script>

<style scoped>
  .container{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .containerHeaderView{

  }
</style>
