<template>
    <div class="repaireView">
        <header-base-four :title="repaireTit"></header-base-four>
        <div class="repaireContent">
            <el-form :model="formData" label-width="0.9rem" ref="formData">
                <el-form-item label="序列号：">
                    <el-autocomplete class="el-input"
                              v-model="formData.num" 
                              :fetch-suggestions="querySearchSn"
                              placeholder="请输入序列号" 
                              :trigger-on-focus="false"
                              @select="getModelName">
                    </el-autocomplete>
                </el-form-item>
                <div v-if="snArray.length!=0">
                    <el-form-item label="型号：" class="formborder">
                        <el-input v-model="formData.modelName" :value="formData.devId" placeholder="输入型号" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="厂商：" class="formborder">
                        <el-input v-model="formData.factoryNm" :value="formData.factoryId" placeholder="通过型号自动带出" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在城市：">
                        <el-cascader
                            :options="options"
                            v-model="formData.city"
                            filterable
                            placeholder="请选择所在城市">
                        </el-cascader>            
                    </el-form-item>
                </div>
                <div v-else>
                    <!-- <el-form-item label="序列号：">
                        <el-input v-model="formData.num" placeholder="请输入序列号"></el-input>
                    </el-form-item> -->
                    <el-form-item label="型号：">
                        <el-autocomplete class="el-input"
                                v-model="formData.modelName" 
                                :value="formData.devId"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入型号" 
                                :trigger-on-focus="false"
                                @select="getDevName">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item label="厂商：" class="formborder">
                        <el-input v-model="formData.factoryNm" :value="formData.factoryId" placeholder="通过型号自动带出" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在城市：">
                        <el-cascader
                            :options="options"
                            v-model="formData.city"
                            filterable
                            placeholder="请选择所在城市">
                        </el-cascader>            
                    </el-form-item>
                </div>
                <!-- <el-form-item label="型号：">
                    <el-input v-model="formData.modelName" placeholder="请输入型号"></el-input>
                </el-form-item>
                <el-form-item label="厂商：">
                    <el-input v-model="formData.factoryNm" placeholder="请输入厂商"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="所在城市：">
                    <el-cascader
                        :options="options"
                        v-model="formData.city"
                        filterable
                        placeholder="请选择所在城市">
                    </el-cascader>            
                </el-form-item> -->
                <el-form-item label="影响程度：">
                    <el-select v-model="formData.degree" placeholder="请选择">
                        <el-option v-for="item in degree" :label="item.value" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="影响范围：">
                    <el-select v-model="formData.range" placeholder="请选择">
                        <el-option v-for="item in range" :label="item.value" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="repaireText textborder" label="故障现象：">
                    <el-input type="textarea" v-model="formData.desc" placeholder="请输入故障现象"></el-input>
                </el-form-item>
                <el-form-item class="repaireSubmitBtn">
                    <el-button @click="submitForm('formData')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerBaseFour from '../header/headerBaseFour'
import '../../utils/1.js'
// import func from './vue-temp/vue-editor-bridge';
import fetch from '../../utils/ajax'
export default {
    name:'repaire',
    components:{
        headerBaseFour
    },
    data(){
        return{
            repaireTit:'报修',
            formData:{
                num:'',
                modelName:'',
                factoryNm:'',
                city:[],
                degree:'',
                range:'',
                desc:''
            },
            options: areajson,
            degree:[
                {"id" : "1","value" : "有问题,但是没有明显影响"}, 
                {"id" : "2","value" : "性能受损,业务尚可运行"}, 
                {"id" : "3","value" : "严重性能下降"}, 
                {"id" : "4","value" : "业务已经中断"} 
            ],
            range:[
                {"id" : "1","value" : "极小范围或者个人"}, 
                {"id" : "2","value" : "部分业务范围"}, 
                {"id" : "3","value" : "整个业务范围"}
            ],
            snArray:[],
        }
    },
    created(){
        // fetch.get("?action=/system/checkSession",{}).then(res=>{
        //     if(res.STATUSCODE==0){

        //     }
        // })
    },
    methods:{
        getDevName(){
            if(this.formData.modelName){
                for(let i=0;i<this.deviceArray.length;i++){
                    if(this.deviceArray[i].modelName == this.formData.modelName){
                        this.formData.factoryNm = this.deviceArray[i].factoryNm;
                        this.formData.factoryId = this.deviceArray[i].factoryId;
                        this.formData.devId = this.deviceArray[i].modelId;
                    }
                } 
            }
        },
        getModelName(){
            if(this.formData.num){
                for(let i=0;i<this.snArray.length;i++){
                    if(this.snArray[i].SN_ID == this.formData.num){
                        this.formData.factoryNm = this.snArray[i].FACTORY_SN;
                        this.formData.factoryId = this.snArray[i].FACTORY_ID;
                        this.formData.devId = this.snArray[i].MODEL_ID;
                        this.formData.modelName = this.snArray[i].MODEL_NAME;
                        this.formData.city[0] = (String)(this.snArray[i].PROVINCE);
                        this.formData.city[1] = (String)(this.snArray[i].AREA);
                    }
                } 
                console.log("mmmmmmm");
                console.log(this.formData);
            }
        },
        querySearchSn(queryString, cb){
            console.log("111"+this.formData.num)
            fetch.get("?action=/system/QueryModelBySN&SN="+this.formData.num,'').then(res=>{
                console.log(res);
                this.snArray = res.data;
                if(res.data.length==0){
                    this.formData.city=[];
                    this.formData.modelName = '';
                    this.formData.factoryNm = '';
                    this.formData.factoryId = '';
                    this.formData.devId = '';
                }
                let snArray = [];
                for(let i=0;i<res.data.length;i++){
                    let city = [];
                    city[0] = res.data.PROVINCE;
                    city[1] = res.data.AREA;
                   snArray.push({'modelId':res.data[i].MODEL_ID,'modelName':res.data[i].MODEL_NAME,'factoryNm':res.data[i].FACTORY_SN,'value':res.data[i].SN_ID,'city':city})
                }
                
                let results = queryString ? snArray.filter(this.createStateFilter(queryString)) : snArray;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
        },
        querySearchAsync(queryString, cb) {
            fetch.get("?action=/system/queryPartsModelAuto&MODELNAME="+this.formData.modelName,'').then(res=>{
                this.deviceArray = res.datas;
                let deviceArray = [];
                for(let i=0;i<res.datas.length;i++){
                   deviceArray.push({'modelId':res.datas[i].modelId,'factoryNm':res.datas[i].factoryNm,'value':res.datas[i].modelName})
                }
                
                let results = queryString ? deviceArray.filter(this.createStateFilter(queryString)) : deviceArray;
        
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
            // let deviceArray = this.deviceArray;
        },
        createStateFilter(queryString) {
            console.log(queryString);
            return (devId) => {
                return (devId.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        submitForm(formName){
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            let vm= this;
            this.$refs[formName].validate((valid) => {
                console.log(valid);
                if (valid) {
                    console.log(vm.formData);
                    if(!vm.check(loading)) return;
                    let params ="&SN_ID="+vm.formData.num+"&SERVICE_SITE="+vm.formData.city[vm.formData.city.length - 1]+"&FACTORY_NAME="+vm.formData.factoryNm+"&MODEL_NAME="+vm.formData.modelName+"&IMPACT_DEGREE="+vm.formData.degree+"&IMPACT_SPHERE="+vm.formData.range+"&REMARK="+window.encodeURI(this.formData.desc);
                    console.log(params);
                    fetch.get("?action=DeclareCase"+params,"").then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.STATUSCODE == "0"){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine'
                            });
                            this.formData = {
                                num:'',
                                modelName:'',
                                factoryNm:'',
                                city:[],
                                degree:'',
                                range:'',
                                desc:''
                            }
                        }else{
                            this.$message({
                                message:res.MESSAGE+"发生错误",
                                type: 'error',
                                center: true,
                                customClass: 'msgdefine'
                            });
                        }
                    })
                }
            })
        },
        check(loading){
            if(this.formData.city.length==0){
                this.$message({
                    message:'请选择所在城市!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            if(this.formData.desc==''){
                this.$message({
                    message:'请输入概要说明!',
                    type: 'warning',
                    center: true,
                    customClass:'msgdefine'
                });
                loading.close();
                return false
            }
            return true
        }       
    }
}
</script>
<style scoped>
.repaireView{width: 100%}
.repaireContent{background: #ffffff; position: relative; margin-bottom: 0.2rem;}
.repaireContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.repaireContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.repaireContent >>> .el-input__inner{border: none; color: #333333;}
.repaireContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.repaireContent >>> .el-input.is-disabled .el-input__inner{background: #ffffff;color: #e5e5e5}
.repaireContent >>> .el-cascader{width: 85%;}
.repaireContent >>> .el-select{width: 85%;}
.repaireText{margin: 0!important;}
.repaireText >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
.repaireText >>> .el-textarea{border: 0.01rem solid #e5e5e5;width: 90%; margin:0 5%;}
.repaireText >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem; min-height: 1.5rem!important; color: #333333;}
.repaireText >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
.repaireContent>>>.textborder{border-bottom: 0rem solid #e5e5e5}
.repaireSubmitBtn>>>.el-button{margin-top: 0.2rem}
.repaireSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.repaireSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: relative; bottom: 0;}
</style>


