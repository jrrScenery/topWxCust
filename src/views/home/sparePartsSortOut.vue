<template>
    <div class="sparePartsSortOutSelectView">
        <header-base-eight :title="sparePartsSortOutTit"></header-base-eight>
        <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <div class="SelectListCell">
            <el-table :data="sparePartsSortOutSelectArr" style="width: 100%">

                <el-table-column prop="date" label="修改" width="8%">
                    <template slot-scope="scope">
                    <div class="contentPopover">
                        <el-popover placement="bottom" width="340" trigger="click">
                        
                            <el-button @click="ifChoiseUsed(scope.row)" slot="reference" class="el-icon-edit-outline"></el-button>
                            <div class="contentParts">
                                <el-form label-width="1rem">
                                    <el-form-item label="备件来源">
                                        <el-radio-group v-model="scope.row.partsSource" disabled>
                                            <el-radio label="1">供货件</el-radio>
                                            <el-radio label="2">换下件</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="PN/FRU">
                                        <el-input v-model="scope.row.pnFru" placeholder="请输入PN/FRU" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="序列号">
                                        <el-input v-model="scope.row.sn" placeholder="请输入序列号" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="备件类型">
                                        <el-select v-model="scope.row.typeName" placeholder="请选择备件类型" clearable>
                                            <el-option v-for="itemParts in partsTypeList" :label="itemParts.partsTypeName" :value="itemParts.partsTypeId" :key="itemParts.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="是否有包装">
                                        <el-radio-group v-model="scope.row.ifPackage">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="是否已带走">
                                        <el-radio-group v-model="scope.row.ifTakeaway">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="使用情况">
                                        <el-select v-model="scope.row.useStatus" placeholder="选择使用情况" @change="ifChoiseUsed(scope.row)" clearable>
                                            <el-option v-for="use in useStatusList" :label="use.useStatusName" :value="use.useStatusId" :key="use.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="换下件SN" v-show="isShow">
                                        <el-input placeholder="请输入换下件SN" v-model="scope.row.takeDownSN" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="能否回收">
                                        <el-radio-group v-model="scope.row.isRecycle">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                            <el-radio label="3">暂缓</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="回收件说明">
                                        <el-input placeholder="请输入回收件说明" v-model="scope.row.useStatusRemark" class="bInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="物流信息">
                                        <el-form-item label="物流公司">
                                        <p style="color: green; height: 30px">{{scope.row.deliveryInfo}}</p>
                                        </el-form-item>
                                        <el-form-item label="物流单号">
                                        <p style="color: green; height: 30px">{{scope.row.transcode}}</p>
                                        </el-form-item>
                                    </el-form-item>

                                    <el-form-item class="submitBtnSpare">
                                        <el-button type="primary" @click="onSubmit(scope.row)">提交</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
        
                        </el-popover>
                    </div>
                    </template>
                </el-table-column>
                <el-table-column prop="ifArrangeName" label="已整理" width="12%"></el-table-column>
                <el-table-column prop="dealStatus" label="处理状态" width="14%"></el-table-column>
                <el-table-column prop="partsSourceName" label="来源" width="14%"></el-table-column>
                <el-table-column prop="pnFru" label="PN/FRU" width="18%"></el-table-column>
                <el-table-column prop="typeName" label="备件类型" width="14%"></el-table-column>
                <el-table-column prop="sn" label="SN" width="20%"></el-table-column>
                        

            </el-table>
            </div>

            <loadingtmp :busy="busy" :loadall="loadall"></loadingtmp>
        </div>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import headerBaseEight from '../header/headerBaseEight'
import loadingtmp from '@/components/load/loading'
import fetch from '../../utils/ajax'
export default {
    name: 'sparePartsSortOut',
    components: {
        headerBaseEight,
        loadingtmp
    }, 
    data(){
        return{
            // form: {
            //     partsSource: "2",
            //     partsId: "",
            //     pnFru: "",
            //     SN: "",
            //     ifPackage: "",
            //     ifTakeaway: "",
            //     useStatus: "3",
            //     isRecycle: "",
            //     useStatusRemark: "",
            // },
            isShow: false,
            partsTypeList: [],
            sparePartsSortOutTit:"事件备件列表",
            caseId:this.$route.query.caseId,
            searchData:[],
            sparePartsSortOutSelectArr:[],
            busy:false,
            loadall: false,
            isSearch:false,
            searchData:{
                caseLevel:[]
            },
            radioParts: "",
            useStatus: "",
            useStatusList: [
                {"useStatusName": "已使用件", "useStatusId": "1"},
                {"useStatusName": "未使用件", "useStatusId": "2"},
                {"useStatusName": "坏件", "useStatusId": "3"},
                {"useStatusName": "DOA不可用", "useStatusId": "4"},
                {"useStatusName": "未到场", "useStatusId": "5"},
                ],
        };
    },

    methods:{
        getSparePart(){
            fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId, {}).then(res=>{
                this.sparePartsSortOutSelectArr = res.DATA;
                console.log("spare", res)
                this.busy = false;
                this.loadall = true;

            });
            fetch.get("?action=/parts/GetPartsTypeList",{}).then(res=>{
                this.partsTypeList = res.DATA;
            });
        },

        showMsg (msg){
            this.$message(msg);
        },
        changePartsParams (formUpdateParts){
            let changeParts = {};
            changeParts.PARTS_ID = formUpdateParts.partsId;
            changeParts.PARTS_SOURCE = formUpdateParts.partsSource;
            changeParts.PN_FRU = formUpdateParts.pnFru;
            changeParts.SN = formUpdateParts.sn;
            changeParts.TYPE = formUpdateParts.type;
            changeParts.USE_STATUS = formUpdateParts.useStatus;
            changeParts.USE_STATUS_REMARK = formUpdateParts.useStatusRemark;
            changeParts.IF_PACKAGE = formUpdateParts.ifPackage;
            changeParts.IF_TAKEAWAY = formUpdateParts.ifTakeaway;
            changeParts.IS_RECYCLE = formUpdateParts.isRecycle;
            changeParts.CASE_ID = this.$route.query.caseId;
            return changeParts;
        },

        supplyPartsParams (){
            
        },

        takeDownParts(formUpdateParts) {
            let takedown = {};
            takedown.PARTS_ID = "";
            takedown.PARTS_SOURCE = 2;
            takedown.SN = formUpdateParts.takeDownSN;
            takedown.IS_RECYCLE = 1;
            takedown.USE_STATUS_REMARK = "";
            takedown.MODEL_NAE = formUpdateParts.modelName;
            takedown.COMEFROM_SN = formUpdateParts.sn;
            takedown.COMEFROM_PARTS_ID = formUpdateParts.partsId;
            takedown.CASE_ID = formUpdateParts.caseId;
            takedown.PN_FRU = formUpdateParts.pnFru;
            takedown.TYPE = formUpdateParts.type;
            takedown.IF_PACKAGE = formUpdateParts.ifPackage;
            takedown.IF_TAKEAWAY = formUpdateParts.ifTakeaway;
            return takedown;
        },
        
        ifOperation (formUpdateParts) {
            if (formUpdateParts.ifPackage==null) {
                this.warning("请选择是否包装")
                return;
            };
            if (formUpdateParts.ifTakeaway==null) {
                this.warning("请选择是否带走")
                return;
            };
            if (formUpdateParts.useStatus==null) {
                this.warning("请确认选择使用情况")
                return;
            };
            if (formUpdateParts.isRecycle==null) {
                this.warning("请选择是否回收")
                return;
            };
            return true;
        },

        onArray (formUpdateParts){
            let params = new URLSearchParams;
            let array = new Array;
            let list = [];
            let params_dict = {};
            let ifJudge = this.ifOperation(formUpdateParts);
            console.log(formUpdateParts)
            if (ifJudge==true){
                console.log("wewewe", formUpdateParts.takeDownSN);
                if (formUpdateParts.takeDownSN!=undefined&&formUpdateParts.partsSource=="1"&&formUpdateParts.useStatus=="1") {
                    let chageArray = this.changePartsParams(formUpdateParts);
                    let takeArray = this.takeDownParts(formUpdateParts);
                    array.push(chageArray);
                    array.push(takeArray);
                }
                else if (formUpdateParts.takeDownSN==undefined&&formUpdateParts.partsSource=="1"&&formUpdateParts.useStatus=="1") {
                    // console.log("kkkk")
                    array = "";
                }
                else if (formUpdateParts.takeDownSN==undefined&&formUpdateParts.partsSource=="2") {
                    let chageArray = this.changePartsParams(formUpdateParts)
                    // console.log("DDDDD", chageArray)
                    array.push(chageArray);
                }
                else{
                    let chageArray = this.changePartsParams(formUpdateParts)
                    // console.log("DDDDD", chageArray)
                    array.push(chageArray);
                }
                array = JSON.stringify(array);
                params.append('DATA', array);
                params.append('UPDATE_DATE', this.getCurrentTime());
                params.append('CASE_ID', this.caseId);
                console.log("qweasd", params, eval(params.get('DATA')).length, eval(params.get('DATA')))
                // params_dict.DATA = list;
                return params
            }
            array = "judge_no";
            array = JSON.stringify(array);
            params.append("DATA", array);
            return params
        },
        
        warning (msg){
            this.$message({
                message: msg,
                type: 'warning',
                center: true,
                customClass:'msgdefine'
                });
        },
         
        onSubmit (formUpdateParts) {
            let params = this.onArray(formUpdateParts);
            let params_DATA = eval(params.get('DATA'));
            if (params_DATA=="judge_no") {
                console.log(params_DATA);
            }
            else{
                // console.log("FFFF", typeof(params_DATA), params_DATA)
                const loading = this.$loading({
                    lock: true,
                    text: '提交中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.3)'
                });
                if (params_DATA.length==0&&params_DATA=="") {
                    loading.close();
                    this.$message({
                        message:'请输入：换下件SN',
                        type: 'warning',
                        center: true,
                        customClass:'msgdefine'
                    });
                    this.isShow = true;
                }else{
                    fetch.post("?action=/parts/updatePartsGathering", params).then(res=>{
                        // console.log("update", res)
                        loading.close();
                        if(res.STATUSCODE=="0"){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                            });
                         
                            fetch.get("?action=/parts/GetCasePartsInfo" + "&CASE_ID=" + this.caseId, {}).then(res=>{
                                this.sparePartsSortOutSelectArr = res.DATA;
                                this.busy = false;
                                this.loadall = true;
        
                            });
                            this.isShow = false;
        
                        }
                        else{
                            this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                            });
                        }
                    });
    
                }
            }
        },
        getSearParams (searchData) {

        },

        onPartsArrange(){
            console.log("ASSSSSSSSSSSSSSS")
        },

        loadMore(){
            if(this.busy || this.loadall)
                return;
            this.busy = true;
            setTimeout(() => {
                this.getSparePart();
            }, 500);
        },

        getCurrentTime () {
            let month = new Date().getMonth() + 1;
            let currentTime = (new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());

            return currentTime
        },

        ifChoiseUsed (choiseForm){
            if (choiseForm.useStatus=="1"&&choiseForm.partsSource=="1"){
                this.isShow = true;
            }
            else{
                this.isShow = false;
            }
        },
    },
    created:function(){
    },
}
</script>


<style scoped>
.sparePartsSortOutSelectView{width: 100%}
.content{width: 100%; position: absolute; top: 0.45rem; bottom: 0;margin-top: 0.05rem; overflow: scroll;}
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
.content:nth-child(2n+1){background: #fafafa}
.content >>> .el-col {border-radius: 4px;}
.content >>> .bg-purple-dark {background: #99a9bf;}
.content >>> .bg-purple {background: #d3dce6;}
.content >>> .bg-purple-light {background: #e5e9f2;}
.content >>> .grid-content {border-radius: 4px;min-height: 24px; text-align: center; line-height: 2}
.content >>> .row-bg {padding: 10px 0;background-color: #f9fafc;}
.content >>> .el-message-box{width: 70%}

  /* .content{margin-top: 0.05rem;background: #ffffff;} */
/* .contentParts{background-color:#00FFFF;height:100px;width:100px;overflow:scroll} */
.contentParts >>> .el-form-item{height: 30px; border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.contentParts >>> .el-form-item__label{height: 30px;font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
.contentParts >>> .el-form-item__content{height: 30px;}

.contentParts >>> .el-input{height: 30px;}
.contentParts >>> .el-input__inner{height: 18px; border: none; color: #333333; padding: 0px 0px; position: relative;}

.contentParts >>> .el-input__icon{line-height: 30px}
.contentParts >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.contentParts >>> .el-input.is-disabled .el-input__inner{background: #ffffff}

.contentPopover >>> .el-button{padding: 0px 0px}
.contentPopover >>> .el-icon-edit-outline:before{color: green}

.submitBtnSpare >>> .el-form-item__content{margin: 0!important;}
.submitBtnSpare >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.4rem; line-height: 10px; bottom: 0;}


</style>