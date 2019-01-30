<template>
    <div class="onceRepaireView">
        <header-last :title="onceRepaireTit"></header-last>
        <div style="height: 0.45rem;"></div>
        <div class="onceRepaireContent">
            <el-form>
                <div>       
                    <div id="scanId">
                    </div>          
                    <el-form-item class="submitBtn">
                        <el-button icon="iconscan-scanning" @click="scanRepaire()">扫码报修</el-button>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button icon="el-icon-phone-outline"  @click="telDialogVisible = true">电话报修</el-button>
                    </el-form-item>
                    <el-form-item class="submitBtn">
                        <el-button icon="el-icon-edit-outline" @click="onlineRepaire()">在线报修</el-button>
                    </el-form-item>
                </div>
                <div class="repaireDialog">
                    <el-dialog
                        title="提示"
                        :visible.sync="telDialogVisible"
                        width="80%">
                        <el-form-item>
                            <span>{{telRepaireContent}}</span>
                        </el-form-item>
                        <el-form-item class="submit">
                            <el-button @click="telDialogVisible = false">取消</el-button>
                            <el-button type="primary" class="onsubmit" @click="telRepaire()">确定</el-button>
                        </el-form-item>
                    </el-dialog>
                </div> 
            </el-form>
        </div>
        <footer-home></footer-home>
    </div>
</template>
<script>
import headerLast from '../header/headerLast'
import footerHome from '../footer/footerHome'
export default {
    name:'onceRepaire',
    components:{
        headerLast,
        footerHome
    },
    data(){
        return{
            onceRepaireTit:'一键报修',
            telephone:'400-610666',
            telDialogVisible:false,
            telRepaireContent:'确定拨打电话：400-610666吗?',
            isShow:true
        }
    },
    methods:{
        //开始扫描
        scanRepaire(){
            this.$router.push({name:'scanRepaire',params:{}});
        },
        telRepaire(){
            window.location.href = 'tel:${this.telephone}'           
        },
        onlineRepaire(){
            this.$router.push({name:'repaire',params:{}});
        }
    }
}
</script>
<style scoped>
.onceRepaireView{width: 100%}
.onceRepaireContent{width: 100%; position: absolute;text-align: center; top: 20%; bottom: 0.45rem;overflow: scroll;}
.submitBtn >>> .el-form-item__content{margin: 0!important;}
.submitBtn >>> .el-form-item__content .el-button{width: 50%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; bottom: 0;}

.repaireDialog >>>.el-form-item {border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
.repaireDialog >>>.el-form-item__label {font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.15rem; text-align: left}
.repaireDialog .submit{position: absolute;left: 0; right: 0; height: 0.4rem;margin-top: 0.2rem}
.repaireDialog >>> .submit .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
.repaireDialog >>> .submit .el-button:hover{background: #ffffff;}
.repaireDialog >>> .submit .onsubmit:hover{background: #2698d6;}
.repaireDialog >>> .submit .el-form-item__content{margin: 0!important; display: flex;}
.repaireDialog >>> .submit .onsubmit{background: #2698d6; color: #ffffff;}
</style>
