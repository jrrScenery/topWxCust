<template>
    <div class="scanRepaireView">
        <header-last :title="scanRepaireTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="scanContent">
            <div id="bcid" class="bcidView">
                <p class="tip">...载入中...</p>
            </div>
            <!-- <div id="scanId"></div> -->
        </div>
        
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
let scan = null;
//点手机虚拟返回键
document.addEventListener("plusready", function() {
    // 注册返回按键事件
    plus.key.addEventListener('backbutton', function() {
        // 事件处理
        scan.close();//关闭条码识别控件
        window.history.back();
    }, false);
});
export default {
    name:'scanRepaire',
    components:{
        headerLast,
    },
    data(){
        return{
            scanRepaireTit:'扫码报修',
            codeUrl: ''
        }
    },
    mounted () {
        this.startScan()//进入页面就调取扫一扫
    },
    created(){
        this.startRecognize();
        this.startScan();
    },

    methods:{
        //创建扫描控件
        startRecognize(){
            let that = this;
        if (!window.plus) return;
        that.isShow=false;
        // 创建条码扫描识别控件
        scan = new plus.barcode.Barcode('bcid');
        // 条码识别成功
        scan.onmarked = onmarked;
        function onmarked(type, result, file) {
            switch (type) {
                case plus.barcode.QR:
                type = 'QR';
                break;
                case plus.barcode.EAN13:
                type = 'EAN13';
                break;
                case plus.barcode.EAN8:
                type = 'EAN8';
                break;
                default:
                type = '其它' + type;
                break;
            }
            result = result.replace(/\n/g, '');
            that.codeUrl = result;//扫描后返回值
            alert(result);
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
        }
        },
        //开始扫描
        startScan() {
            console.log("1111111111");
            console.log(!window.plus)
            if (!window.plus) return;
            this.startRecognize()//创建控件
            scan.start();
        },
        cancelScan(){
            this.isShow=true;
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
        }
    }
}
</script>
<style scoped>
.scanRepaireView{width: 100%}
.scanContent{}
.scanContent >>> .bcidView {
    width:50%;
    height: 50%;
    margin-left:25%;
    margin-top: 25%;
    text-align: center;
    color: #fff;
    background: #ccc;
}
.bcidView >>> .tip{
    height: 100%
}
</style>
