<!--首页-事件详情-补充说明-->
<template>
  <div class="eventReplenishView">
    <header-last :title="eventReplenishTit" backUrl='casedetail' :date1="this.$route.query.caseId"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <ul>
        <li v-for="item in eventReplenishData" :key="item.id"><span>{{item.type}}</span>{{item.desc}}</li>
      </ul>
      <el-form ref="form" :model="form"> 
        <el-form-item class="text">
          <el-input type="textarea" v-model="form.desc" placeholder="补充说明"></el-input>
        </el-form-item>
        <!-- <div class="takePhoto" @click="takePhoto"><img src="../../assets/images/takephoto.png" alt=""></div> -->
        <el-form-item class="submitBtn">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <img id="showpic" :src="uploadres" ref="showpic">
    </div>

<!--     <el-upload
      list-type="picture-card"
      :action="upaction"
      :http-request="upload"
      :before-upload="beforeAvatarUpload">
      <i class="el-icon-plus"></i>
    </el-upload> -->

  </div>
</template>

<script>

import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'

var caseId ;

export default {
  name: 'eventReplenish',

  components: {
    headerLast
  },

  data () {
    return {
      eventReplenishTit: '补充说明',
      eventReplenishData: [
        {type: '项目编号：', desc: '51478'},
        {type: '项目名称：', desc: 'TOP系统测试项目-华东'},
        {type: '事件编号：', desc: '107961'}
      ],
      form: {
        desc: ''
      },
      caseid: this.$route.query.caseId,
      upaction: 'http://139.129.207.35:8084/api/upload',
      uploadres:''
      // upaction: 'http://localhost:8081/api/upload?EMPID=' + localStorage.getItem("empId")
    }
  },
  beforeCreate(){
    var vm = this;
    window.photoResult = function(str){
      if(str){
        
      }      
    }
    
  },
  mounted(){
  },
  created (){
  },
  methods: {
    uptest(){
      console.log('上传测试');
      fetch.post("?action=upload",{FILETYPE:'jpg'}).then(res=>{
        console.log('上传')
      });
    },
    onSubmit () {
      //alert('submit!');
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.3)'
      });
      var vm = this;
      fetch.get("?action=GetComplaintsList&EMPID="+global_.empId+"&PAGE_NUM=1&PAGE_TOTAL=3",{}).then(res=>{
        console.log("============");
        console.log(res.data);
        this.opinionTab[0].data = res.data;
      });


      fetch.get("?action=UpdateProcessInfo&CASE_ID="+this.caseid+"&REMARK="+this.form.desc,"").then(res=>{
        console.log("qqqqqq",res);
        if(res.STATUSCODE=="0"){
          this.$message({
            message:'提交成功',
            type: 'success',
            center: true,
            customClass:'msgdefine'
          });
          var nowcaseid = vm.caseid;        
          setTimeout(function(){vm.$router.push({ name: 'casedetail',query:{caseId:nowcaseid}})},1000);
        }
        else{
          this.$message({
            message:res.MESSAGE,
            type: 'error',
            center: true,
            duration:1000,
            customClass:'msgdefine'
          });
        }
        loading.close();
      }).catch(function(res){
        this.$message({
          message:res.MESSAGE,
          type: 'error',
          center: true,
          duration:1000,
          customClass:'msgdefine'
        });
      }) ;
    },
    takePhoto:function(){
      let ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        var info={action:"takePhoto"}
        window.webkit.messageHandlers.ioshandle.postMessage({body: info});
      }else if(/(Android)/i.test(ua) && /mobile/i.test(ua)){
        var value = "{action:takePhoto}";
        android.getClient(value);
      }
    },
    getPhotoUrl: function(photodata){
      alert(photodata);

      this.$refs.showpic.url = photodata;
    }
  },
  created:function(){
    // window.getPhotoUrl = this.getPhotoUrl;

    this.$parent.setComponent(this);
    fetch.get("?action=GetCaseInfo&CASE_ID="+this.caseid,{}).then(res=>{
      var baseInfo = res.data;
      this.eventReplenishData[0].desc = baseInfo.PROJECT_NO ;
      this.eventReplenishData[1].desc = baseInfo.PROJECT_NAME ;
      this.eventReplenishData[2].desc = baseInfo.CASE_NO ;
    });
  }
}

/*function getUserMedia(constrains,success,error){
    if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia){
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.mozGetUserMedia){
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
    }
}*/

/*var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");*/

//成功的回调函数
/*function success(stream){
    //兼容webkit内核浏览器
    var CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    video.src = CompatibleURL.createObjectURL(stream);
    //播放视频
    video.play();
}*/

//异常的回调函数
/*function error(error){
    console.log("访问用户媒体设备失败：",error.name,error.message);
}*/

/*if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
    //调用用户媒体设备，访问摄像头
    getUserMedia({
        video:{width:480,height:320}
    },success,error);
} else {
    alert("你的浏览器不支持访问用户媒体设备");
}*/

//注册拍照按钮的单击事件
/*document.getElementById("capture").addEventListener("click",function(){
    //绘制画面
    context.drawImage(video,0,0,480,320);
});*/

</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #fafafa; position: relative;}
  .content ul{padding: 0.1rem 0.25rem; color: #333333;}
  .content li{line-height: 0.17rem;}
  .text{margin: 0!important;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1.8rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
  .takePhoto{position: absolute; bottom: 0rem; left: 0.15rem; width: 0.5rem; height: 0.5rem;}
  .takePhoto img{width: 0.3rem; height: 0.3rem; margin: 0.1rem 0 0 0.1rem;}
</style>

