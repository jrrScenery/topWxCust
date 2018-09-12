<template>
  <div class="loginView">
    <div class="loginBox">
      <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input v-model.number="ruleForm.userName"></el-input>
          <img src="../../assets/images/login_1.png" alt="">
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          <img src="../../assets/images/login_2.png" alt="">
        </el-form-item>
        <el-form-item prop="pass" style="position: relative">
          <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <p v-if="loginErr" style="position:absolute; text-align: center; top: 0.91rem; width: 100%; color: #ff0000">{{errMeg}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        pass: '',//smits123
        userName: '',//duxinc
        intervale: 20,
        checked: true
      },
      loginErr: false,
      errMeg: ''
    }
  },
  created () {
    // this.ruleForm.userName = this.getCookie('username');
    if(this.ruleForm.checked){
      fetch.get("?action=checkSession","").then(res=>{

        var token = localStorage.getItem("token");

        fetch.get("?action=getUserPermission",{}).then(res=>{

          localStorage.setItem("userPermission", JSON.stringify(res.userPermission));

          this.updateUserPermission(res.userPermission);

        });

        //this.$router.push({name:'home',params:{}});
      });
    }
  },
  mounted () {
    this.getCookie();
  },
  methods: {
    submitForm (formName) {
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      const self = this;
      // 判断复选框是否被勾选 勾选则调用配置cookie方法
      if (self.ruleForm.checked == true) {
        // console.log("checked == true");
        self.setCookie(self.ruleForm.userName, self.ruleForm.pass, 7);
      } else {
        // console.log("清空Cookie");
        // 清空Cookie
        self.clearCookie();
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(global_.Server+"/api/login","ACCOUNT="+this.ruleForm.userName+"&PASSWORD="+this.getBasePass()).then(res=>{
            loading.close();
            if(res.status==500){
              alert("连接服务超时或密码错");
              return;
            }
            //console.log(res.data);
            if(res.data.STATUSCODE=="0"){


              global_.userInfo = res.data.userInfo;
              global_.userPermission = res.data.userPermission;
              global_.userRole = res.data.userRole;
              global_.empId = res.data.userInfo[0].EMPID;

              let token = res.data.token;
              localStorage.setItem("token", token);

              localStorage.setItem("empId", res.data.userInfo[0].EMPID);
              localStorage.setItem("realName", res.data.userInfo[0].REALNAME);
              localStorage.setItem("mobile", res.data.userInfo[0].MOBILE);
              localStorage.setItem("email", res.data.userInfo[0].EMAIL);
              console.log(JSON.stringify(res.data.userPermission));
              localStorage.setItem("userPermission", JSON.stringify(res.data.userPermission));

              
              let ua = navigator.userAgent.toLowerCase();
              if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
                var info={action:"login",empId:localStorage.getItem('empId'),token:token}
                window.webkit.messageHandlers.ioshandle.postMessage({body: info});
              }else if(/(Android)/i.test(ua)){
                if(typeof(android)!="undefined"){
                  var value = "{action:login,empId:"+localStorage.getItem('empId')+",token:"+ token + "}";
                  android.getClient(value);                  
                }
              }

              let userPermission = res.data.userPermission;
              this.updateUserPermission(userPermission);

              this.loginErr = false
            }else{
              this.loginErr = true
              this.errMeg = res.data.MESSAGE
              // console.log(res.data);
              // alert(res.data.mESSAGE);
            }
          });
          //alert('submit!');
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },

    updateUserPermission(userPermission){

      var isGps = 0;
      if(userPermission.length>0){
        for(var i=0;i<userPermission.length;i++){
          if(userPermission[i].PRIVID=="topApp_GPS"){
            isGps = 1;
            break;
          }
        }
      }
      if(isGps==1){
        fetch.get("?action=getDict&type=GPS_UPDATE_INTERVAL",{}).then(res=>{
          //console.log(res);
          this.interval = res.data[0].name;
          
          let ua = navigator.userAgent.toLowerCase();
          //let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断iPhone|iPad|iPod|iOS
          if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
            var info={action:"location",empId:localStorage.getItem('empId'),interval:this.interval}
            window.webkit.messageHandlers.ioshandle.postMessage({body: info});
          }else if(typeof(android)!="undefined"){
            var value = "{action:location,empId:"+localStorage.getItem('empId')+",interval:"+this.interval+"}";
            android.getClient(value);
          }
          this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
        });
      }else{
        this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
      }
    },
    // 设置cookie
    setCookie (c_name, c_pwd, exdays) {
      // console.log(c_name, c_pwd, exdays)
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      document.cookie = 'userName' + '=' + c_name + '; path=/; expires=' + exdate.toGMTString()
      document.cookie = 'userPwd' + '=' + c_pwd + '; path=/; expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; ')
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          // console.log(arr2[0])
          // 判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.ruleForm.userName = arr2[1]
          } else if (arr2[0] == 'userPwd') {
            this.ruleForm.pass = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1)
    },
    getBasePass(){
      let Base64 = require("js-base64").Base64//还是require
      let pw = Base64.encode(this.ruleForm.pass)//还是那些操作
      return pw;
    },
    beforeRouteLeave( to, from,next){
      console.log(1111);
      if (to.name == 'home') {
          to.meta.isUseCache = false;    
      }        
      next();
    }
  }

}
</script>

<style scoped>
  .loginView{background: url("../../assets/images/login.jpg") 0 0 no-repeat; width: 100%; height: 100%; background-size: 100% 100%; position: relative}
  .loginView .loginBox{position: absolute; top: 2rem; left: 0.17rem; right: 0.17rem;}
  .loginView .loginBox >>> .el-input__inner{padding: 0 0.4rem; border-radius: 0; border: none}
  .loginView .loginBox >>> .el-input__inner:focus{ border: none;}
  .loginView .loginBox >>> .el-form-item:nth-child(1){margin: 0}
  .loginView .loginBox >>> .el-form-item:nth-child(1) .el-input__inner{border-top-left-radius: 0.04rem;border-top-right-radius: 0.04rem; position: relative}
  .loginView .loginBox >>> .el-form-item:nth-child(1):after{position: absolute; left: 5%; width: 90%; height: 0.01rem; content: ''; background: #acacac;z-index: 999}
  .loginView .loginBox >>> .el-form-item:nth-child(2){margin-bottom: 0; color: #ffffff}
  .loginView .loginBox >>> .el-checkbox__input+.el-checkbox__label{ color: #ffffff}
  .loginView .loginBox >>> .el-checkbox__input.is-checked+.el-checkbox__label{ color: #ffffff}
  .loginView .loginBox >>> .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #4cc9ff; border-color: #4cc9ff;}
  .loginView .loginBox >>> .el-form-item:nth-child(2) .el-input__inner{border-bottom-left-radius: 0.04rem;border-bottom-right-radius: 0.04rem;}
  .loginView .loginBox >>> .el-form-item__content{position: relative}
  .loginView .loginBox >>> .el-form-item img{width: 0.2rem; height: 0.2rem; position: absolute; z-index: 999; top: 0.1rem; left: 0.15rem;}
  .loginView .loginBox >>> .el-button{ width: 100%; background: #4cc9ff; color: #ffffff;}
  .loginView .loginBox >>> .el-button:focus, .el-button:hover{background: #4cc9ff; color: #ffffff}
</style>
