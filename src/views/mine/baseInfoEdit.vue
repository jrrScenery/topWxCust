<template>
    <div class="baseInfoView">
        <header-last :title="baseInfoTit" backUrl='baseInfo'></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="baseInfoContent">
            <el-form :model="formData" label-width="0.9rem" ref="formData">
                <el-form-item label="姓名：" >
                    <el-col :span="20">
                        <el-input size='mini' v-model="formData.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="ID：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.ID"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.phone"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮箱：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单位名称：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="部门名称：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="注册时间：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="职务：" label-width="0.9rem">
                    <el-col :span="20">
                        <el-input size="mini" v-model="formData.email"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item class="submitBtn">
                    <el-button @click="submitForm('formData')">保存</el-button>
                </el-form-item>
                <!-- <ul>
                    <li v-for="item in baseInfoObj" :key="item.id">
                        <p>{{item.leftTit}}</p><el-input v-model="item.rightCon"></el-input>
                    </li>
                </ul> -->
            </el-form>
        </div>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
export default {
    name:'baseInfo',
    components:{
        headerLast
    },
    data(){
        return{
            baseInfoTit:'我的信息',
            formData:{

            },           
        }
    },
    created(){
            
    },
    methods:{
        submitForm (formName) {
            let vm= this;
            this.$refs[formName].validate((valid) => {})
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

