<template>
    <div class="serviceProductView">
        <header-repaire :title="serviceProductTit"></header-repaire>
        <div style="height:0.45rem"></div>
        <div class="prodContent">
            <div class="prodCell">
                <div class="cellLeft">
                    <img src="../../assets/images/svice_img1.jpg" alt="">
                </div>
                <div class="cellRight">
                    <p>智慧数据中心服务</p>
                    <ul>
                        <router-link :to="{name:'sdcOperation'}">
                            <li><span>SDC运维运营平台服务</span></li>
                        </router-link>
                        <router-link :to="{name:'sdcValueService'}">
                            <li><span>SDC运维增值服务</span></li>
                        </router-link>
                        <router-link :to="{name:'sdcCloudService'}">
                            <li><span>SDC云服务</span></li>
                        </router-link>
                        <router-link :to="{name:'sdcGuarantee'}">
                            <li><span>SDC运维保障服务</span></li>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="prodCell">
                <div class="ITcellLeft">
                    <p>IT外包服务</p>
                    <ul>
                        <router-link :to="{name:'HROService'}">
                            <li><span>人员外包服务HRO</span></li>
                        </router-link>
                        <router-link :to="{name:'MSService'}">
                            <li><span>管理外包服务MS</span></li>
                        </router-link>
                        <router-link :to="{name:'PSService'}">
                            <li><span>IT专业服务PS</span></li>
                        </router-link>
                        <router-link :to="{name:'ITOService'}">
                            <li><span>IT整体外包ITO</span></li>
                        </router-link>
                    </ul>
                </div>
                <div class="ITcellRight">
                    <img src="../../assets/images/svice_img2.jpg" alt="">
                </div>
            </div>
            <div class="prodCell">
                <div class="ITcellLeft2">
                    <img src="../../assets/images/svice_img3.jpg" alt="">
                </div>
                <div class="ITcellRight2" style="display:flex">
                    <div>
                        <p>IT运维服务</p>
                        <ul>
                            <li><span style="color:#666666">My DC</span></li>
                            <li><span  style="color:#666666">云运维</span></li>
                            <router-link :to="{name:'ITBusinessOperation'}">
                                <li><span>业务运维服务</span></li>
                            </router-link>
                            <router-link :to="{name:'ITProfessional'}">
                                <li><span>专业服务</span></li>
                            </router-link>
                        </ul>
                    </div>
                    <div style="margin-top:0.3rem">
                        <ul>
                            <router-link :to="{name:'ITSoftWareService'}">
                                <li><span>软件运维服务</span></li>
                            </router-link>
                            <router-link :to="{name:'ITBaseOperationService'}">
                                <li><span>基础运维服务</span></li>
                            </router-link>
                            <li><span style="color:#666666">维修服务业务</span></li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="ITcellLeft2">
                    <img src="../../assets/images/svice_img3.jpg" alt="">
                </div> -->
            </div>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerRepaire from '../header/headerRepaire'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name:'serviceProduct',
    components:{
        headerRepaire,
        footerHome
    },
    data(){
        return{
            serviceProductTit:'服务产品'
        }
    },
    created(){
        fetch.get("?action=checkSession",{}).then(res=>{
            if(res.STATUSCODE != 0){
                this.$router.push({name: 'login',query: { rancode: (new Date()).valueOf() }});
            }
        })
    }
    
}
</script>
<style scoped>
.serviceProductView{width: 100%}
.prodContent{background: #ffffff;}
.prodCell{display: flex; margin: 0.1rem 0rem;}
.prodCell .cellLeft{width: 50%;}
.prodCell .cellLeft img{width: 100%; height: 100%;}
.prodCell .cellRight{margin-left: 0.15rem;}
.prodCell .cellRight p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
.prodCell .cellRight li{color: #666666; font-size: 0.12rem; line-height: 0.2rem;}
.prodCell .cellRight li span{margin-right: 0.1rem;color: #2698d6}

.prodCell .ITcellLeft{padding-left: 0.15rem;width: 35%;background-color:#2698d6;}
.prodCell .ITcellLeft p{font-size: 0.15rem; color: #ffffff; margin-bottom: 0.1rem;}
.prodCell .ITcellLeft li{color: #ffffff; font-size: 0.12rem; line-height: 0.2rem;}
.prodCell .ITcellLeft li span{margin-right: 0.1rem;color: #ffffff}
.prodCell .ITcellRight{width: 65%;}
.prodCell .ITcellRight img{width: 100%; height: 100%;}

.prodCell .ITcellRight2{margin-left: 0.15rem;width: 50%}
.prodCell .ITcellRight2 p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
.prodCell .ITcellRight2 li{color: #666666; font-size: 0.12rem; line-height: 0.2rem;}
.prodCell .ITcellRight2 li span{margin-right: 0.1rem;color: #2698d6}
.prodCell .ITcellLeft2{width: 50%;}
.prodCell .ITcellLeft2 img{width: 100%; height: 100%;}
</style>


