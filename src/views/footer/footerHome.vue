<!--一级底部-->
<template>
  <div class="footerSelect">
    <el-menu
      :default-active="defaultActive"
      :collapse="false"
      mode="horizontal"
      @select="select">
    <template v-for="item in footerArr">
      <el-menu-item :index="item.index" @click="routerPush(item.index)" :key="item.id">
        <img v-if="item.elType === 3" :src="item.imgSrc" class="workImg" />
        <i :class="item.className"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
    </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'footerHome',
  data: function () {
    return {
      footerArr: [
        {elType: 1, index: 'home', text: '首页', className: 'el-icon-footer_1'},
        {elType: 2, index: 'event', text: '事件', className: 'el-icon-bell'},
        {elType: 5, index: 'mine', text: '设置', className: 'el-icon-footer_5'}
      ],
      title: [],
      defaultActive: 'home'
    }
  },

  created () {
    this.routerChange(this.$route)
  },

  methods: {
    select (index, indexPath, e) {
      let footerSelectObj = localStorage.getItem('footerSelectObj') || JSON.stringify({})
      let footerArr = this.footerArr
      let dealAfterObj = JSON.parse(footerSelectObj)
      console.log(dealAfterObj[index])
      if (dealAfterObj[index]) return
      for (let i = 0; i < footerArr.length; i++) {
        if (index === footerArr[i].index) {
          dealAfterObj[index] = {path: footerArr[i].index, text: footerArr[i].text}
          localStorage.setItem('footerSelectObj', JSON.stringify(dealAfterObj))
          return
        }
      }
    },

    routerChange (e) {
      let path = e.path.split('/')[1]
      let footerArr = this.footerArr
      for (let i = 0; i < footerArr.length; i++) {
        if (footerArr[i].index === path) {
          this.defaultActive = path
          break
        }
        if (footerArr[i].arr) {
          for (let j = 0; j < footerArr[i].arr.length; j++) {
            if (footerArr[i].arr[j].index === path) {
              this.defaultActive = path
              break
            }
          }
        }
      }
    },

    routerPush (path) {
      if(path.length>0){
        this.$router.push({path: '/' + path})        
      }
    }
  },

  watch: {
    '$route': 'routerChange'
  }
}
</script>

<style>
  .footerSelect{display: flex;position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; width: 100%; height: 0.45rem; box-shadow: 0 -0.01rem 0.02rem 0 #d9d9d9}
  .footerSelect .el-menu-item, .el-submenu__title{height: 0.45rem!important;}
  .footerSelect .el-menu--horizontal{width: 100%; padding: 0 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; border: none;width: 33.3%; text-align: center; padding: 0; color: #8a8a8a!important; background: #ffffff!important; font-size: 0.1rem;}
  .footerSelect .el-menu--horizontal>.el-menu-item span{line-height: 0.2rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item.is-active{border: none; color: #2698d6!important; background: #ffffff!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item i{display: inline-block; width: 0.22rem; height: 0.22rem; margin: auto; font-size: 0.24rem!important;}
  .footerSelect .el-menu--horizontal>.el-menu-item .workImg{width: 0.57rem; height: 0.57rem; margin: auto; position: absolute; top: -0.3rem; left: 50%; margin-left: -0.285rem}
</style>
