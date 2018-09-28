<!--我的-->
<template >
  <div class="mineView">
    <div class="mineBg" v-for="item in userData" :key="item.id">
      <img :src="item.imgSrc" alt="">
      <p><span>{{item.userName}}</span><span>{{item.phone}}</span><span>{{item.orgName}}</span></p>
    </div>
      <ul class="ul_mineView" >
        <li class="li_mineView" v-for="item in liObj" :key="item.id">
          <template v-if="item.action == 'logout'">
            <img :src="item.imgSrc" alt="">
            <span v-on:click="onLogout">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
           <template v-else-if="item.action == 'mineNotice'">
            <img :src="item.imgSrc" alt="">
            <span v-on:click="mineNotice">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
          <template v-else-if="item.action == 'Feedback'">
            <img :src="item.imgSrc" alt="">
            <span v-on:click="Feedback">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
          <template v-else>
            <img :src="item.imgSrc" alt="">
            <span>{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
        </li>
      </ul>
  </div>
</template>

<script>

import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'mine',

  components: {
  },

  data () {
    return {
      userData: [
        {imgSrc: require('@/assets/images/mine_bg.jpg'), userName:localStorage['realName'],orgName:localStorage['orgName'], phone:localStorage['mobile']}
      ],
      liObj: [
        {imgSrc: require('@/assets/images/mine_1.png'), text: '通知与待办',action:'mineNotice'},
        // {imgSrc: require('@/assets/images/mine_2.png'), text: '我的报修',action:''}, 暂时注释
        {imgSrc: require('@/assets/images/mine_3.png'), text: '我的意见反馈',action:'Feedback'},
        {imgSrc: require('@/assets/images/mine_4.png'), text: '退出当前账户',action:'logout'}
      ]
    }
  },
  mounted () {
    //this.inofr()
  },
  methods: {
    onLogout () {
      this.$confirm('确定退出当前账户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "?action=logOut";
        localStorage.removeItem("token");
        let ua = navigator.userAgent.toLowerCase();
        //let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断iPhone|iPad|iPod|iOS
        if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
          var info={action:"logout"}
          window.webkit.messageHandlers.ioshandle.postMessage({body: info});
        }else if(typeof(android)!="undefined"){
          var value = "{action:logout}";
          android.getClient(value);
        }

        // fetch.get(url,"").then(res=>{
          this.$router.push({name:'login',params:{}});
        // });
      }).catch(() => {

      });
    },
    mineNotice(){
       this.$router.push({name:'mineNotice',params:{}});
    },
    Feedback(){//:to="{name:'mineFeedbackShow',query:{complantId:scope.row['COMPLANT_ID'],myid:1}}"
       this.$router.push({name:'tabshowTest',query:{TYPE:'my'}});
    }
  }
}
</script>

<style scoped>
  .mineView{position: absolute; top: 0; width: 100%;}
  .mineBg{position: relative; width: 100%; height: 2.1rem;}
  .mineBg img{width: 100%; height: 100%}
  .mineBg p{position: absolute; bottom: 0; width: 100%; height: 0.5rem; line-height: 0.2rem; color: #ffffff; background: rgba(0,0,0,0.7); font-size: 0.15rem;}
  .mineBg p span{margin-left: 0.25rem;}
  .ul_mineView{}
  .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
  .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626}
</style>

<style>
.el-message-box__wrapper .el-message-box{ width: 80%;}
</style>

