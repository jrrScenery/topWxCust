<template>
    <div class="onceRepaireView">
        <header-last :title="onceRepaireTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="onceRepaireContent">
            <el-form>
                <div>       
                    <div id="scanId">
                    </div>          
                    <el-form-item class="submitBtn">
                        <el-button icon="iconscan-scanning" @click="scanRepaire()">扫码报修</el-button>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button icon="el-icon-phone-outline"  @click="telDialogVisible = true">电话报修</el-button>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button icon="el-icon-edit-outline" @click="onlineRepaire()">在线报修</el-button>
                    </el-form-item>
                </div>
                <div class="repaireDialog">
                    <el-dialog
                        title="提示"
                        :visible.sync="telDialogVisible"
                        width="80%">
                        <el-form-item>
                            <span>{{telRepaireContent}}</span>
                        </el-form-item>
                        <el-form-item class="submit">
                            <el-button @click="telDialogVisible = false">取消</el-button>
                            <el-button type="primary" class="onsubmit"><a @click="sendCall(telephone)" v-bind:href="'tel:'+telephone" style="color: #ffffff">确定</a></el-button>
                        </el-form-item>
                    </el-dialog>
                </div> 
            </el-form>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import footerHome from '../footer/footerHome'
import fetch from '../../utils/ajax'
import wx from 'weixin-js-sdk'
export default {
    name:'onceRepaire',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            onceRepaireTit:'一键报修',
            telephone:'400-610666',
            telDialogVisible:false,
            telRepaireContent:'确定拨打电话：400-610666吗?',
            isShow:true
        }
    },
    created(){
        
    },
    methods:{
        scanRepaire(){
            let vm= this;
            fetch.get("?action=weixinParam&url="+location.href).then(res=>{
                console.log(res)
                if(res.STATUSCODE=='0'){
                    wx.config({
                        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        debug: false,
                        // 必填，公众号的唯一标识
                        appId: res.data.appId,
                        // 必填，生成签名的时间戳
                        timestamp: "" + res.data.timestamp,
                        // 必填，生成签名的随机串
                        nonceStr: res.data.nonceStr,
                        // 必填，签名
                        signature: res.data.sign,
                        // 必填，需要使用的JS接口列表，所有JS接口列表
                        jsApiList: ['checkJsApi', 'scanQRCode']
                    });
                }
            });
            wx.error(function (res) {
                // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
            });
 
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: ['scanQRCode'],
                    success: function (res) {
                        console.log(res)
                    }
                });
    
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        let objtmp={};
                        let ar= []
                        var result =JSON.parse(res.resultStr) ; // 当needResult 为 1 时，扫码返回的结果 
                        const loading = vm.$loading({
                            lock: true,
                            text: '扫描中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(255, 255, 255, 0.3)'
                        });
                        fetch.get("?action=/case/GetEquipInfoBySn&SN="+result.SN+"&PROJECT_CODE="+result.prjCode,'').then(res=>{
                            console.log(res);
                            loading.close();
                            if(res.STATUSCODE=='1'){
                                let city = [];
                                let address = '';
                                if(res.address.length!=0){
                                    address = res.address[0].addressInfo
                                }
                                if(res.data!=null){
                                    city[0] = (String)(res.data.PROVINCE);
                                    city[1] = (String)(res.data.AREA);
                                    vm.$router.push({name:"repaire" , query:{num:res.data.SN,modelName:res.data.MODEL_NAME,modelId:res.data.MODEL_ID, factoryNm:res.data.FACTORY_SN,factoryId:res.data.FACTORY_ID, city:city,address: address}})
                                }else{
                                    vm.$message({
                                        message:"没有对应的序列号",
                                        type: 'warning',
                                        center: true,
                                        duration:2000,
                                        customClass: 'msgdefine'
                                    });
                                }
                            }else{
                                vm.$message({
                                    message:res.MESSAGE+"发生错误",
                                    type: 'error',
                                    center: true,
                                    duration:1000,
                                    customClass: 'msgdefine'
                                });
                            }
                        })
                        // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                    }
                });
    
            });
        },
        onlineRepaire(){
            this.$router.push({name:'repaire',params:{}});
        }
    },
    beforeRouteEnter (to, from, next) {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        // XXX: 修复iOS版微信HTML5 History兼容性问题
        if (isiOS && to.path !== location.pathname) {
            // 此处不可使用location.replace
            location.assign(to.fullPath)
        } else {
            next()
        }
    }
}
</script>
<style scoped>
.onceRepaireView{width: 100%}
.onceRepaireContent{width: 100%; position: absolute;text-align: center; top: 20%;overflow: scroll;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 50%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;}

.repaireDialog >>>.el-form-item {border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.repaireDialog >>>.el-form-item__label {font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
.repaireDialog .submit{position: absolute;left: 0; right: 0; height: 0.4rem;margin-top: 0.2rem}
.repaireDialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.repaireDialog >>> .submit .el-button:hover{background: #ffffff;}
.repaireDialog >>> .submit .onsubmit:hover{background: #2698d6;}
.repaireDialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.repaireDialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
