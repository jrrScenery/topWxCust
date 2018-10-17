<template>
  <div class="loginView">
    <div class="loginBox">
      <el-form :model="ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
        <div class="userInfoBox">
          <el-form-item prop="userName">
            <el-input v-model.number="ruleForm.userName"></el-input>
            <img src="../../assets/images/login_1.png" alt="">
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            <img src="../../assets/images/login_2.png" alt="">
          </el-form-item>
        </div>
        <div class="operationInput">
          <el-form-item prop="pass" style="position: relative;">
            <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item prop="pass" style="position: relative;margin-left:0.2rem">
            <div @click="dialogVisible = true">忘记密码</div>
          </el-form-item> 
          <!-- <el-form-item prop="pass" style="position: relative;margin-left:0.2rem">
            <div @click="checkNumLogin">验证码登录</div>
          </el-form-item>  -->
          <el-form-item prop="pass" style="position: relative;margin-left:0.2rem">
            <div @click="dialogVisible1 = true">验证码登录</div>
          </el-form-item> 
        </div>   
        <div class="forgetPassdialog">
          <el-dialog
            title="重置密码"
            :visible.sync="dialogVisible"
            width="80%">
            <el-form-item label="手机号：" label-width="0.8rem">
              <el-input placeholder="请输入手机号" v-model="ruleForm.mobileNo"></el-input>
            </el-form-item>
            <div style="display:flex">
              <el-form-item label="验证码：" label-width="0.8rem">
                  <el-input v-model="ruleForm.checkNum" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" size="mini" round @click="fetchCheckNum">获取</el-button>
              </el-form-item>
          </div>
            <el-form-item class="submit">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" class="onsubmit" @click="resetPassWord('ruleForm')">重置</el-button>
            </el-form-item>
          </el-dialog>
        </div>  

        <div class="forgetPassdialog">
          <el-dialog
            title="验证码登录"
            :visible.sync="dialogVisible1"
            width="80%">
            <el-form-item label="手机号：" label-width="0.8rem">
              <el-input placeholder="请输入手机号" v-model="ruleForm.mobileNo"></el-input>
            </el-form-item>
            <div style="display:flex">
              <el-form-item label="验证码：" label-width="0.8rem">
                  <el-input v-model="ruleForm.checkNum" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" size="mini" round @click="fetchCheckNum">获取</el-button>
              </el-form-item>
          </div>
            <el-form-item class="submit">
              <el-button @click="dialogVisible1 = false">取消</el-button>
              <el-button type="primary" class="onsubmit" @click="chekNumLoginSubmit('ruleForm')">登录</el-button>
            </el-form-item>
          </el-dialog>
        </div> 

        <el-form-item class="loginButton">
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
        checked: true,
        mobileNo:'',
        checkNum:''
      },
      loginErr: false,
      dialogVisible:false,
      dialogVisible1:false,
      chekNumFlag:false,
      errMeg: ''
    }
  },
  created () {
    // this.ruleForm.userName = this.getCookie('username');
    if(this.ruleForm.checked){
      fetch.get("?action=checkSession","").then(res=>{
        console.log(res);
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
    fetchCheckNum(){
      const loading = this.$loading({
        lock: true,
        text: '获取中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      if(!this.checkMobile(loading)) return;
      console.log(this.ruleForm.mobileNo);
      this.$axios.get(global_.Server+"/api/sendIdCode?MOBILE="+this.ruleForm.mobileNo+"&TYPE=1",'').then(res=>{
        console.log("res:",res);
        loading.close();
      })
    },
    resetPassWord(formData){
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formData].validate((valid) => {
          if (valid) {
              if(!vm.check(loading)) return;
              this.$axios.get(global_.Server+"/api/resetPassword?idCode="+this.ruleForm.checkNum+"&mobileNo="+this.ruleForm.mobileNo,'').then(res=>{
                  console.log("res:",res);
                  loading.close();
                  if(res.data.STATUSCODE==0){
                    this.dialogVisible=false
                    this.$message({
                        message:res.data.MESSAGE,
                        type: 'success',
                        center: true,
                        customClass: 'msgdefine'
                    });
                  }else{
                      this.$message({
                          message:res.data.MESSAGE,
                          type: 'error',
                          center: true,
                          customClass: 'msgdefine'
                      });
                  }
              })
          }
      })
    },

    chekNumLoginSubmit(formData){
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formData].validate((valid) => {
          if (valid) {
          if(!vm.check(loading)) return;
          this.dialogVisible1 = false;
          this.$axios.get(global_.Server+"/api/loginByCode?CODE="+this.ruleForm.checkNum+"&MOBILE="+this.ruleForm.mobileNo,'').then(res=>{
              console.log("res:",res);
              loading.close();            
              if(res.status==500){
              alert("连接服务超时或密码错");
              return;
              }
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
                  localStorage.setItem("orgName", res.data.userInfo[0].ORGNAME);
                  localStorage.setItem("userPermission", JSON.stringify(res.data.userPermission));
                  this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});
              }else{
                  this.$message({
                      message:res.data.MESSAGE,
                      type: 'error',
                      center: true,
                      customClass: 'msgdefine'
                  });
              }
          })
          }
      })
    },
    onsubmitCheckLogin(formName){
      const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.3)'
      });
      let vm= this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!vm.check(loading)) return;
          this.dialogVisible = false;
          this.$axios.get(global_.Server+"/api/loginByCode?CODE="+this.ruleForm.checkNum+"&MOBILE="+this.ruleForm.mobileNo,'').then(res=>{
            console.log("res:",res);
            loading.close();            
            if(res.status==500){
              alert("连接服务超时或密码错");
              return;
            }
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
              localStorage.setItem("orgName", res.data.userInfo[0].ORGNAME);
              localStorage.setItem("userPermission", JSON.stringify(res.data.userPermission));
              
              let userPermission = res.data.userPermission;
              this.updateUserPermission(userPermission);
            }else{
              this.$message({
                  message:res.data.MESSAGE,
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
              });
            }
          })
        }
      })
    },
    check(loading){
      if(this.ruleForm.mobileNo==''){
        this.$message({
            message:'请输入手机号!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      if(this.ruleForm.checkNum==''){
        this.$message({
            message:'请输入验证码!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      return true
    },
    checkMobile(loading){
      if(this.ruleForm.mobileNo==''){
        this.$message({
            message:'请输入手机号!',
            type: 'warning',
            center: true,
            customClass:'msgdefine'
        });
        loading.close();
        return false
      }
      return true
    },
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
          this.$axios.post(global_.Server+"/api/login?ACCOUNT="+this.ruleForm.userName+"&PASSWORD="+this.getBasePass()).then(res=>{
            loading.close();
            console.log("adasdadada",res);
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
              localStorage.setItem("orgName", res.data.userInfo[0].ORGNAME);
              console.log(JSON.stringify(res.data.userPermission));
              localStorage.setItem("userPermission", JSON.stringify(res.data.userPermission));
              
              /*
              let ua = navigator.userAgent.toLowerCase();
              if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
                var info={action:"login",empId:localStorage.getItem('empId'),token:token}
                window.webkit.messageHandlers.ioshandle.postMessage({body: info});
              }else if(/(Android)/i.test(ua)){
                if(typeof(android)!="undefined"){
                  var value = "{action:login,empId:"+localStorage.getItem('empId')+",token:"+ token + "}";
                  android.getClient(value);                  
                }
              }*/

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
    // checkNumLogin(){
    //   this.$router.push({name: 'checkNumLogin', query: {}})
    // },
    //更新终端位置信息
    updateUserPermission(userPermission){
      /*
      var isGps = 0;
      if(userPermission.length>0){
        console.log("aaaaaaa");
        for(var i=0;i<userPermission.length;i++){
          if(userPermission[i].PRIVID=="topApp_GPS"){
            isGps = 1;
            break;
          }
        }
      }
      if(isGps==1){
        console.log("bbbbbb");
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
        });
      }else{
        console.log((new Date()).valueOf());
      }*/

      this.$router.push({name: 'home',query: { rancode: (new Date()).valueOf() }});

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
  .loginView .userInfoBox >>> .el-input__inner{padding: 0 0.4rem; border-radius: 0; border: none}
  .loginView .userInfoBox >>> .el-input__inner:focus{ border: none;}
  .loginView .userInfoBox >>> .el-form-item:nth-child(1){margin: 0}
  .loginView .userInfoBox >>> .el-form-item:nth-child(1) .el-input__inner{border-top-left-radius: 0.04rem;border-top-right-radius: 0.04rem; position: relative}
  .loginView .userInfoBox >>> .el-form-item:nth-child(1):after{position: absolute; left: 5%; width: 90%; height: 0.01rem; content: ''; background: #acacac;z-index: 999}
  .loginView .userInfoBox >>> .el-form-item:nth-child(2){margin-bottom: 0; color: #ffffff}

  .loginView >>> .operationInput{display:flex;color:#ffffff}
  .loginView .loginBox >>> .el-checkbox__input+.el-checkbox__label{ color: #ffffff}
  .loginView .loginBox >>> .el-checkbox__input.is-checked+.el-checkbox__label{ color: #ffffff}
  .loginView .loginBox >>> .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color: #4cc9ff; border-color: #4cc9ff;color: #ffffff}
  
  .loginView .userInfoBox >>> .el-form-item:nth-child(2) .el-input__inner{border-bottom-left-radius: 0.04rem;border-bottom-right-radius: 0.04rem;}
  .loginView .userInfoBox >>> .el-form-item__content{position: relative}
  .loginView .userInfoBox >>> .el-form-item img{width: 0.2rem; height: 0.2rem; position: absolute; z-index: 999; top: 0.1rem; left: 0.15rem;}
  .loginView .loginButton >>> .el-button{ width: 100%; background: #4cc9ff; color: #ffffff;}
  .loginView .loginButton >>> .el-button:focus, .el-button:hover{background: #4cc9ff; color: #ffffff}

  .forgetPassdialog >>>.el-form-item {border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .forgetPassdialog >>>.el-form-item__label {font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
  .forgetPassdialog >>> .el-input__inner{border: none; color: #333333;}
  .forgetPassdialog >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  
  .forgetPassdialog .submit{position: absolute;left: 0; right: 0; height: 0.4rem;margin-top: 0.2rem}
  .forgetPassdialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .forgetPassdialog >>> .submit .el-button:hover{background: #ffffff;}
  .forgetPassdialog >>> .submit .onsubmit:hover{background: #2698d6;}
  .forgetPassdialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
  .forgetPassdialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
