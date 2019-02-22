<template>
    <div class="baseInfoView">
        <header-base-info-edit :title="baseInfoTit" backUrl='baseInfo'></header-base-info-edit>
        <div style="height: 0.45rem;"></div>
        <div class="baseInfoContent">
            <el-form :model="formData" label-width="0.9rem" ref="formData">
                <el-form-item label="姓名：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.realName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="ID：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" :disabled="true" v-model="formData.userId"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.mobile"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位名称：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.orgName" :value="formData.orgName" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="部门名称：" label-width="0.9rem">
                    <!-- <el-col :span="20">
                        <el-autocomplete class="el-input"
                                size="mini"
                                disabled="true"
                                v-model="formData.departName" 
                                :value="formData.departName"
                                :fetch-suggestions="queryOrgNameSearch"
                                placeholder="请输入部门名称" 
                                :trigger-on-focus="false"
                                @select="getOrgName">
                        </el-autocomplete>
                    </el-col> -->
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.departName" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="注册时间：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" :disabled="true" v-model="formData.inDate"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="职务：" style="border-top: 0.01rem solid #e5e5e5; margin: 0;">
                    <!-- <el-col :span="20">
                        <el-autocomplete class="el-input"
                                size="mini"
                                disabled="true"
                                v-model="formData.empPositionNm" 
                                :value="formData.empPositionNm"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入职务" 
                                :trigger-on-focus="false"
                                @select="getEmpPositionNm">
                        </el-autocomplete>
                    </el-col> -->
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.empPositionNm" disabled></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('formData')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import headerBaseInfoEdit from '../header/headerBaseInfoEdit'
import fetch from '../../utils/ajax'
export default {
    name:'baseInfo',
    components:{
        headerBaseInfoEdit
    },
    data(){
        return{
            baseInfoTit:'我的信息',
            formData:{
                realName:'',
                userId:'',
                mobile:'',
                email:'',
                orgName:'',
                departName:'',
                departNameId:'',
                inDate:'',
                empPositionNm:'',
                empPositionId:''
            }, 
            // positionArray:[],
            // empOrgArray:[]  
        }
    },
    created(){
        fetch.get("?action=/system/getUserinfo",{}).then(res=>{
            console.log(res);
            if(res.STATUSCODE=="1"){
                console.log("success");
                if(res.user.length!=0){
                    this.formData.realName = res.user[0].REALNAME;
                    this.formData.userId = res.user[0].USERID;
                    this.formData.mobile = res.user[0].MOBILENO;
                    this.formData.email = res.user[0].OEMAIL;
                    this.formData.orgName = res.user[0].ORGNAME;
                    this.formData.departName = res.user[0].DEPTNAME;
                    this.formData.departNameId = res.user[0].ORGID;
                    this.formData.inDate = res.user[0].INDATE;
                    this.formData.empPositionNm = res.user[0].EMP_POSITION_NM;
                    // this.formData.empPositionId = res.user[0].EMP_POSITION_ID;
                }
            }
        })
    },
    methods:{
        queryOrgNameSearch(queryString, cb){
            fetch.get("?action=/system/queryEmpOrg&name="+this.formData.departName,'').then(res=>{
                console.log("queryEmpOrg",res)
                this.empOrgArray = res.data;
                let empOrgArray = [];
                for(let i=0;i<this.empOrgArray.length;i++){
                   empOrgArray.push({'departNameId':this.empOrgArray[i].ORGID,'orgName':this.empOrgArray[i].COMPANY,'value':this.empOrgArray[i].ORGNAME})
                }
                var results = queryString ? empOrgArray.filter(this.createFilter(queryString)) : empOrgArray;
                console.log("results",results);
                // // 调用 callback 返回建议列表的数据
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
        },
        getOrgName(){
            if(this.formData.departName){
                for(let i=0;i<this.empOrgArray.length;i++){
                    if(this.empOrgArray[i].ORGNAME == this.formData.departName){
                        this.formData.departName = this.empOrgArray[i].ORGNAME;
                        this.formData.departNameId = this.empOrgArray[i].ORGID;
                        this.formData.orgName = this.empOrgArray[i].COMPANY;
                    }
                } 
            }
        },
        querySearch(queryString, cb){
            fetch.get("?action=/system/queryEmpPosition&name="+this.formData.empPositionNm,'').then(res=>{
                console.log(res)
                this.positionArray = res.map;
                let positionArray = [];
                for(let i=0;i<this.positionArray.length;i++){
                   positionArray.push({'value':this.positionArray[i].empPositionNm})
                }
                var results = queryString ? positionArray.filter(this.createFilter(queryString)) : positionArray;
                console.log("results",results);
                // 调用 callback 返回建议列表的数据
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            })
        },
        getEmpPositionNm(){
            if(this.formData.empPositionNm){
                for(let i=0;i<this.positionArray.length;i++){
                    if(this.positionArray[i].empPositionNm == this.formData.empPositionNm){
                        this.formData.empPositionNm = this.positionArray[i].empPositionNm;
                        // this.formData.empPositionId = this.positionArray[i].empPositionId;
                    }
                } 
            }
        },
        createFilter(queryString) {
            return (position) => {
                return (position.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        submitForm (formName) {
            let vm= this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let REALNAME = this.formData.realName;
                    let MOBILENO = this.formData.mobile;
                    let OEMAIL = this.formData.email;
                    let ORGNAME = this.formData.departNameId?this.formData.departNameId:'';
                    // if(this.formData.departNameId!=null){
                    //     ORGNAME = this.formData.departNameId;
                    // }
                    // let POSITION = this.formData.empPositionId?this.formData.empPositionId:'';
                    // if(this.formData.empPositionId!=null){
                    //     POSITION = this.formData.empPositionId;
                    // }
                    let POSITION = this.formData.empPositionNm?this.formData.empPositionNm:'';
                    let params = "&NAME="+REALNAME+"&MOBILE="+MOBILENO+"&EMAIL="+OEMAIL+"&ORG="+ORGNAME+"&POSITION="+POSITION;
                    console.log(params);
                    fetch.get("?action=/system/updateUserinfo"+params,"").then(res=>{
                        console.log(res);
                        if(res.STATUSCODE=='1'){
                            this.$message({
                                message:'提交成功',
                                type: 'success',
                                center: true,
                                customClass: 'msgdefine',
                                duration:1000
                            });
                            setTimeout(function(){vm.$router.push({ name: 'baseInfo',query:{}})},1000);
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
            })
        }
    }
}
</script>
<style scoped>
.baseInfoView{width: 100%;}
.baseInfoContent{width: 100%; margin-top: 0.05rem;bottom: 0.45rem; color: #999999; background: #ffffff;}
.baseInfoContent .title{line-height: 0.35rem; color: #2698d6; padding-left: 0.25rem; position: relative;}
.baseInfoContent .title:before{width: 0.05rem; height: 0.12rem; content: ''; position: absolute; left: 0.1rem; top: 0.11rem; background: #2698d6;}
.baseInfoContent >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.baseInfoContent >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
.baseInfoContent >>> .el-input__inner{border: 0.01rem solid #e5e5e5; color: #333333;}
.baseInfoContent >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
.baseInfoContent >>> .el-form-item:nth-child(2n+1){color: #999999;background: #ffffff;}
.baseInfoContent >>> .el-form-item:nth-child(2n){color: #999999;background: #f7f7f7;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
/* .baseInfoContent ul li{padding: 0 0.25rem;}
.baseInfoContent ul li{display: flex; line-height: 0.35rem;}
.baseInfoContent ul li:nth-child(2n+1){color: #999999;background: #ffffff;}
.baseInfoContent ul li:nth-child(2n){color: #999999;background: #f7f7f7;}
.baseInfoContent ul li p:nth-child(1){width: 0.91rem;}
.baseInfoContent ul li p:nth-child(2){width: 66%;word-wrap: break-word;} */
</style>

