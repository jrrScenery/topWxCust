<template>
    <div class="sparePartsSortOutSelectView">
        <div class="SelectListCell">
            <el-table :data="spareData.trans" style="width: 100%">
                <el-table-column prop="TRANSPORT_COMPANY" label="物流公司" width="50%"></el-table-column>
                <el-table-column prop="TRANSPORT_CODE" label="物流单号" width="50%"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sparePartsFlow',
  
    props: ["spareData"],
    data(){
        return{
            
        }
    }
}


</script>

<style scoped>
.sparePartsSortOutSelectView{width: 100%}
.SelectListCell{background: #ffffff}
.SelectListCell >>> .el-radio__label{font-size: 0px}
.SelectListCell >>> .el-table__body{width: 100%!important}
.SelectListCell >>> .el-table__header{width: 100%!important}
.SelectListCell >>> .el-table{font-size: 0.13rem; text-align: center}
.SelectListCell >>> .el-table th{text-align: center; background: #f7f7f7}
.SelectListCell >>> .el-table td{border: none}
.SelectListCell >>> .el-table td:nth-child(3){text-align: right;}
.SelectListCell >>> .el-table td:nth-child(5){text-align: right; padding-right: 0.05rem}
.SelectListCell >>> .el-table .cell{padding: 0;}
.SelectListCell >>> .el-table__empty-block{position: initial}

</style>