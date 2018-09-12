<template>
    <div class="caseApplicationView">
        <div class="attention">
            {{attention1}}
            <a @click="sendCall(attentioncall1)" v-bind:href="'tel:'+attentioncall1" style="color: #2698d6;"> {{attentioncall1}}， </a>
            <a @click="sendCall(attentioncall2)" v-bind:href="'tel:'+attentioncall2" style="color: #2698d6;"> {{attentioncall2}} </a>
            {{attention2}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'caseApplication',
    components: {
    }, 
    data(){
        return{
            attention1:"您好！神州信息微信端单次支持5*9（9:00-18:00），非工作时间请拨打服务热线报障：",
            attentioncall1:"400-6106661",
            attentioncall2:"800-8106661",
            attention2:"（密码：7653），感谢您的支持！"
        }
    }
}
</script>


<style scoped>
.caseApplicationView{width: 100%}
.attention{color: red;margin: 0.1rem;}
</style>
