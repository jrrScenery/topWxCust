<template>
    <div class="baseInfoView">
        <header-base-Info :title="baseInfoTit" backUrl='mine'></header-base-Info>
        <div style="height: 0.45rem;"></div>
        <div class="baseInfoContent">
            <div class="cell" v-if="flag">
                <ul>
                    <li v-for="item in baseInfoObj" :key="item.id">
                        <p>{{item.leftTit}}</p><p v-html="item.rightCon"></p>
                    </li>
                </ul>
            </div>
            <div style="text-align:center;font-size:0.13rem;padding:0.15rem 0" v-else>暂无基本信息</div>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerBaseInfo from '../header/headerBaseInfo'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name:'baseInfo',
    components:{
        headerBaseInfo,
        footerHome
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
            ],
            flag:false
        }
    },
    created(){
        fetch.get("?action=/system/getUserinfo",{}).then(res=>{
            console.log(res);
            if(res.STATUSCODE=="1"){
                if(res.user.length!=0){
                    this.flag = true
                    this.baseInfoObj[0].rightCon = res.user[0].REALNAME;
                    this.baseInfoObj[1].rightCon = res.user[0].USERID;
                    this.baseInfoObj[2].rightCon = res.user[0].MOBILENO;
                    this.baseInfoObj[3].rightCon = res.user[0].OEMAIL;
                    this.baseInfoObj[4].rightCon = res.user[0].ORGNAME;
                    this.baseInfoObj[5].rightCon = res.user[0].DEPTNAME;
                    this.baseInfoObj[6].rightCon = res.user[0].INDATE;
                    this.baseInfoObj[7].rightCon = res.user[0].EMP_POSITION_NM;
                }
            }else{
                this.$message({
                    message:res.MESSAGE+"发生错误",
                    type: 'error',
                    center: true,
                    duration:1000,
                    customClass: 'msgdefine'
                });
            }
        })
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

