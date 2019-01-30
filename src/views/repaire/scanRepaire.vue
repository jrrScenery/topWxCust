<template>
    <div class="scanRepaireView">
        <header-last :title="scanRepaireTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="scanContent">
            <div id="scanId"></div>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
export default {
    name:'scanRepaire',
    components:{
        headerLast
    },
    data(){
        return{
            scanRepaireTit:'扫码报修'
        }
    },
    mounted(){
        this.startScan();
    },
    methods:{
        //开始扫描
        startScan() {
            console.log(!window.plus)
            if (!window.plus) return;
            this.startRecognize()//创建控件
            scan.start();
        },
        startRecognize(){

        }
    }
}
</script>
<style scoped>
.scanRepaireView{width: 100%}
</style>
