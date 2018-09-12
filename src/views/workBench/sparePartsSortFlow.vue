<template>
    <div class="sparePartsSortOutSelectView">
        <header-base-eight :title="sparePartsSortFlowTit"></header-base-eight>
        <div style="height:0.45rem"></div>
        <div class="sortFlowView">
            <el-tabs v-model="activeName">
                <el-tab-pane label="备件列表" name="first"><spare-parts-sort :spare-data="sparePartsSortOutSelectArr" :partst-list="partsTypeList" v-on:CallBack="updateData"></spare-parts-sort></el-tab-pane>
                <el-tab-pane label="物流列表" name="second" lazy><spare-parts-flow :spare-data="sparePartsSortOutSelectArr"></spare-parts-flow></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBaseEight from '../header/headerBaseEight'
import loadingtmp from '@/components/load/loading'
import sparePartsSort from '../home/sparePartsSort'
import sparePartsFlow from '../home/sparePartsFlow'
import fetch from '../../utils/ajax'

export default {
    name: 'sparePartsSortFlow',
    components: {
        headerBaseEight,
        sparePartsSort,
        sparePartsFlow
    },
    data(){
        return{
            sparePartsSortFlowTit:"事件备件列表",
            activeName: "first",
            sparePartsSortOutSelectArr: [],
            partsTypeList: [],
            caseId:this.$route.query.caseId,
        }
    },
    created (){
        fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId, {}).then(res=>{
            this.sparePartsSortOutSelectArr = res;
            // this.sparePartsSortOutSelectArr.takeDownSN = "";
            // console.log("sortflow", res)
        });
        fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
            this.partsTypeList = res.DATA;
        });
    },


    methods: {
        updateData (res){
            this.sparePartsSortOutSelectArr = res;
        }
    }
    
}
</script>

<style scoped>
.sortFlowView{margin: 0 0; background: #ffffff; position: relative;}
.sortFlowView >>> .el-tabs__header{margin: 0 0 0.1rem;}
.sortFlowView >>> .el-tabs__item.is-active{color: #2698d6;}
.sortFlowView >>> .el-tabs__active-bar{background: #2698d6;}
.sortFlowView >>> .el-tabs__nav{width: 100%; text-align: center;}
.sortFlowView >>> .el-tabs__item{width: 50%; padding: 0; font-size: 0.14rem; color: #666666;text-align: center}
</style>


        