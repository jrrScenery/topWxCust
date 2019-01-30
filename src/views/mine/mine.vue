<!--我的-->
<template >
  <div class="mineView">
    <div class="mineBg" v-for="item in userData" :key="item.id">
      <img v-if="item.imgSrc" :src="item.imgSrc" alt="">
      <img v-else src="../../assets/images/photo.png" alt="">
      <span>{{item.userName}}</span>
    </div>
      <ul class="ul_mineView" >
        <li class="li_mineView" v-for="item in liObj" :key="item.id">
          <template v-if="item.action == 'baseInfo'">
            <span v-on:click="baseInfo">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
          <template v-if="item.action == 'Feedback'">
            <span v-on:click="Feedback">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
          <template v-if="item.action == 'ChangePd'">
            <span v-on:click="ChangePd">{{item.text}}</span>
            <i class="el-icon-arrow-right"></i>
          </template>
        </li>
      </ul>
      <div style="text-align:center;width:100%"><el-button class="btn" v-on:click="onLogout"><span>退出当前账户</span></el-button></div>
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
        {imgSrc: "", userName:localStorage['realName'], phone:localStorage['mobile']}
      ],
      liObj: [  
        {imgSrc: "", text: '基本信息',action:'baseInfo'},
        {imgSrc: "", text: '反馈建议',action:'Feedback'},
        {imgSrc:"", text: '修改密码',action:'ChangePd'}, 
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
        localStorage.clear();
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
    baseInfo(){
      this.$router.push({name:'baseInfo',params:{}});
    },
    ChangePd(){
       this.$router.push({name:'changePwd',params:{}});
    },
    Feedback(){
       this.$router.push({name:'mineAppFeedBack',query:{TYPE:'my'}});
    }
  }
}
</script>

<style scoped>
  .mineView{position: absolute; top: 0; width: 100%;}
  .mineBg{position: relative; width: 100%; height: 1.3rem;background-color: #ffffff;
  border-bottom:0.01rem solid #e5e5e5;margin-top:0.45rem}
  /* .mineBg img{width: 100%; height: 100%} */
  .mineBg img{width: 0.8rem; height: 0.8rem; border-radius: 50%; margin: 0.3rem 0.15rem 0.15rem 0.2rem;}
  .mineBg span{position: absolute; bottom: 0; width: 50%; height: 0.5rem; line-height: 0.5rem; font-size: 0.15rem;
  float: left;margin: 0.3rem 0.15rem 0.3rem 0.2rem;}
  /* .mineBg p span{margin-left: 0.25rem;} */
  /* .ul_mineView{} */
  .ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
  .ul_mineView .li_mineView:nth-child(4){margin-top: 0.1rem; border-top: 0.01rem solid #e5e5e5;}
  .ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
  .ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626;font-size:0.15rem}
  .mineView .btn{margin-top: 0.5rem;background-color:#199dff; color:#ffffff;float:center;border-radius: 5px;
  width:80%}
  .mineView .btn span{font-size:0.15rem}
</style>

<style>
.el-message-box__wrapper .el-message-box{ width: 80%;}
</style>

