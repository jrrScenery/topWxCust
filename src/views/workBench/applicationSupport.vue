<template>
    <div class="applicationSupportView">
        <header-last :title="applicationSupportTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <ul class="ul_application" v-for="items in applicationObj" :key="items.id">
            <template v-for="item in items.arr">
                <li class="li_application" :key="item.id">
                    <router-link :to="{name:item.href,params:item.params}" >
                    <img  :src="item.imgSrc" alt=""  >
                    </router-link>
                    <span>{{item.text}}</span>
                </li>               
            </template>
        </ul>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
    name: 'workBenchMyTask',
    components: {
        headerLast
    },
    data(){
        return{
            applicationSupportTit:"单次支持",
            applicationObj: [
                {arr: [
                    {imgSrc: require('@/assets/images/workBench_1.png'), text: '申报', href: 'application'},
                    {imgSrc: require('@/assets/images/workBench_2.png'), text: '报价', href: ''},
                    {imgSrc: require('@/assets/images/workBench_3.png'), text: '事件', href: ''}
                ]}
            ],
        }
    }
}
</script>


<style scoped>
.applicationSupportView{width:100%}
.applicationSupportView .ul_application{display: flex;flex-wrap: wrap; padding: 0.15rem 0.1rem; margin-top: 0.09rem; background: #ffffff;}
.applicationSupportView .ul_application:first-child .li_application:first-child span{width: 110%; margin-left: -5%;}
.applicationSupportView .ul_application .li_application{display: flex; flex-direction: column; align-content: space-around; justify-content: space-around; width: 25%; height: 0.55rem; text-align: center;}
.applicationSupportView .ul_application .li_application:nth-child(n+5){margin-top: 0.15rem;}
.applicationSupportView img{ width: 0.3rem; height: 0.3rem; margin: auto;}
</style>

