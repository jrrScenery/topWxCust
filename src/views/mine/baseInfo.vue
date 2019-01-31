<template>
    <div class="baseInfoView">
        <header-base-Info :title="baseInfoTit" backUrl='mine'></header-base-Info>
        <div style="height: 0.45rem;"></div>
        <div class="baseInfoContent">
            <div class="cell">
                <ul>
                    <li v-for="item in baseInfoObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headerBaseInfo from '../header/headerBaseInfo'
export default {
    name:'baseInfo',
    components:{
        headerBaseInfo
    },
    data(){
        return{
            baseInfoTit:'我的信息',
            baseInfoObj:[
                {leftTit: '姓名：', rightCon: ''},
                {leftTit: 'ID：', rightCon: ''},
                {leftTit: '手机：', rightCon: ''},
                {leftTit: '邮箱：', rightCon: ''},
                {leftTit: '单位名称：', rightCon: ''},
                {leftTit: '部门名称：', rightCon: ''},
                {leftTit: '注册时间：', rightCon: ''},
                {leftTit: '职务：', rightCon: ''}
            ]
        }
    },
    created(){
            
    }
}
</script>
<style scoped>
.baseInfoView{width: 100%;}
.baseInfoContent{width: 100%; margin-top: 0.05rem;bottom: 0.45rem; color: #999999; background: #ffffff;}
.baseInfoContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
.baseInfoContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
.baseInfoContent ul li{padding: 0 0.25rem;}
.baseInfoContent ul li{display: flex; line-height: 0.35rem;}
.baseInfoContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
.baseInfoContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
.baseInfoContent ul li p:nth-child(1){width: 0.91rem;}
.baseInfoContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;}
</style>

