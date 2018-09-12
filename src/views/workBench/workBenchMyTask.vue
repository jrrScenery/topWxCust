<template>
    <div class="workBenchMyTaskView">
        <header-last :title="workBenchMyTaskTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <ul class="ul_mineView"  v-for="item in liObj" :key="item.id">
            <router-link :to="{name:'workBenchTaskList',query:{workStatus:item.workStatus}}">
                <li class="li_mineView">
                        <template>
                            <img :src="require('@/assets/images/mine_1.png')" alt="">
                            <span>{{item.workStatusName+'('+item.workNum+')'}}</span>
                            <i class="el-icon-arrow-right"></i>
                        </template>
                </li>
            </router-link>
        </ul>
        <footer-home></footer-home>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import footerHome from '../footer/footerHome'
export default {
    name: 'workBenchMyTask',
    components: {
        headerLast,
        footerHome
    },
    data(){
        return{
            workBenchMyTaskTit:"任务",
            liObj: []
        }
    },
    methods:{
 
    },
    created:function(){
        fetch.get("?action=/work/GetWorkStatusList",{}).then(res=>{ 
            console.log(res);       
          this.liObj = res.DATA;
        });
    },
}
</script>


<style scoped>
.workBenchMyTaskView{width: 100%}
.ul_mineView{}
.ul_mineView .li_mineView{display: flex; justify-content: space-between; align-items: center;height: 0.5rem; background: #ffffff; border-bottom: 0.01rem solid #e5e5e5; font-size: 0.14rem; line-height: 0.5rem; padding: 0 0.2rem;}
.ul_mineView .li_mineView img{width: 0.24rem; height: 0.24rem; margin-right: 0.15rem;}
.ul_mineView .li_mineView span{width: 100%; text-align: left; color: #262626}
</style>


