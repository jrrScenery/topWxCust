<template>
    <div class="casePersontEvaluateView">
        <header-last v-if="templateType==2" :title="casePartInfoTit"></header-last>
        <header-last v-if="templateType==1" :title="casePersonInfoTit"></header-last>
        <div style="height:0.45rem"></div>
        <div class="casePartContent">
            <div class="questionComment">{{questionComment}}</div>
            <el-form :model="formData" ref="formData">
                <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                    <el-form-item>
                        <div class="star"> 
                            <el-rate
                                v-model="item.scoreval">
                            </el-rate>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="improve" v-if="item.scoreval<4">
                            <span>{{item.question.questionComment2}}</span>
                            <div class="improveCell">
                                <el-checkbox-group v-model="item.aroptschked">
                                <el-checkbox v-for="itemoption in item.options" :label="itemoption.optionId" 
                                :key="itemoption.optionId">{{itemoption.optionComment}}</el-checkbox>
                                </el-checkbox-group>
                                <!-- <div v-for="i in item.options" > -->
                                <el-input type="textarea" placeholder="请填写待改进问题" v-model="otherResult"></el-input>
                                <!-- </div> -->
                            </div>
                        </div>
                        <!-- <div class="submitBtn"><el-button @click="submitForm">提交</el-button></div> -->
                    </el-form-item>
                </div>
                <el-form-item class="submitBtn1" >
                    <el-button v-if="submitFlg==1" @click="submitForm">提交</el-button>
                    <div v-if="submitFlg==0" style="margin-left:20px"><p>当前评价已提交或不可提交！</p></div>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import global_ from '../../components/Global'
import axios from 'axios'
// axios.defaults.headers.post['Content-Type']='application/json'
//axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import qs from 'qs'

export default {
    name: 'casePartEvaluate',
    components: {
        headerLast
    }, 
    data(){
        return{
            casePartInfoTit:'备件评价',
            casePersonInfoTit:'人员评价',
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            templateType:this.$route.query.templateType,
            bjflg:this.$route.query.bjflg,
            evaluateId:"",
            evaluateval:[],
            evaluateStatus:1,
            otherResult:"",
            EvaluateResult:[],
            evaluateIdReturn:'',
            submitFlg:'',
            questionComment:'',
            engineer: '梁瑛',
            formData: {
                name: '',
                phone: '',
                region: '',
                type: '',
                article: '',
                email : ''
            },
            
        }
    },
    mounted(){
        fetch.get("?action=/work/GetWorkEvaluateInfo",{CASE_ID:this.caseId,WORK_ID:this.workId,TEMPLATE_TYPE:this.templateType,BJ_FLG:this.bjflg}).then(res=>{
            console.log(res);
            this.submitFlg=res.SUBMIT_FLG;
            this.evaluateId=res.EVALUATE_ID_RETURN;
            if("0" == res.STATUSCODE){
                this.questionComment = res.QUESTION[0].questionComment;
                let jsonres= res;
                let tmpjsonval =[];
                jsonres.QUESTION.forEach(function(v,i,ar){
                let tmpobj = {};
                tmpobj.question= v;
                tmpobj.options = v.optionOption;
                tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
                tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
                tmpobj.scores = v.scoreOption;
                let index=0;
                tmpobj.scores.forEach(function(v,i,ar){
                    if(v.checkFlg==1){
                        index=i+1;
                    }
                });
                tmpobj.scoreval=index;
                tmpjsonval.push(tmpobj);
                })
                this.evaluateval = tmpjsonval;
                console.log(tmpjsonval);
            }
            
        })
    },
    scoreChange:function(e){
    },
    methods:{
        submitForm () {
            let result=new Array;
            let temp={};
            temp.evaluateId=this.evaluateId;
            temp.questionId=this.evaluateval[0].question.questionId;
            if(this.templateType==2){
            temp.optionId=this.evaluateval[0].scoreval+12;
            }else if(this.templateType==1){
            temp.optionId=this.evaluateval[0].scoreval;   
            }
            result.push(temp);

            if(this.evaluateval[0].scoreval<4){
            let optionIdList=this.evaluateval[0].aroptschked;
            let evaluateIdet=this.evaluateId;
            let questionidet=this.evaluateval[0].question.questionId;
            let otherResultet=this.otherResult;
            if(optionIdList.length!=0){     
                optionIdList.forEach(function(v,i,ar){
                let resultdetail={};
                resultdetail.evaluateId=evaluateIdet;
                resultdetail.questionId=questionidet;
                resultdetail.optionId=v;
                if(v==12){
                    resultdetail.otherResult=otherResultet;
                }
                // resultdetail=qs.stringify(resultdetail);
                result.push(resultdetail);
            });
            }
        }
        // console.log("{{{{{{{{{{{{"+result)
            result=JSON.stringify(result);
            let params=new URLSearchParams;
            params.append('totalScore',this.evaluateval[0].scoreval);
            params.append('failFlg',this.evaluateval[0].scoreval<3?1:0);
            params.append('EvaluateResult',result);
            params.append('workId',this.workId);
            params.append('evaluateId',this.evaluateId);
            params.append('evaluateStatus',2);
            const loading = this.$loading({
                lock: true,
                text: '提交中...',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.3)'
            });
            // console.log(params.get("evaluateId"));
            // console.log(qs.stringify({postData},{arrayFormat: 'brackets'}));
             fetch.post("?action=/work/SubmitWorkEvaluateInfo",params).then(res=>{
                // var token = localStorage.getItem("token");
                // this.$axios({
                //     method:'post',
                //     url:global_.proxyServer+"?action=/work/SubmitWorkEvaluateInfo",
                //     data:params,
                //       headers:{"token":token}
                // }).then(res=>{ 
            loading.close();           
              if(res.STATUSCODE=="0"){
                this.$message({
                  message:'提交成功',
                  type: 'success',
                  center: true,
                  customClass: 'msgdefine',
                  TimeRanges:'1000'
                });
                location.reload;
                
              }else{
                this.$message({
                  message:res.MESSAGE+"发生错误",
                  type: 'error',
                  center: true,
                  customClass: 'msgdefine'
                })
                }
            })
        },
    }
}
</script>


<style scoped>
.casePersontInfoView{width:100%;background: #ffffff;}
.casePartContent{background: #ffffff; color: #999999; font-size: 0.13rem;}
.casePartContent>>> .questionComment{font-size: 0.13rem;background: #ffffff;margin-bottom: 0.2rem;padding: 0.1rem 0.25rem 0;}
.casePartContent>>>.editorView{padding: 0.1rem 0.25rem 0;}
.casePartContent>>> .editorView .star{display: flex;margin-bottom: 0.2rem}
.editorView .star .starTit{ display: inline-block; width: 1.2rem;}
.casePartContent>>>.el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
/* .improve {position:relative} */
.improve span{line-height: 0.1rem;}
.improve >>> .el-checkbox{display: block; margin-left: 10px; font-size: 0.13rem; color: #999999;}
/* .submitBtn{width:100%;} */
/* .submitBtn >>> .el-form-item__content{margin: 0!important;} */
.submitBtn1 >>> .el-button{width:100% ;border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff;height: 0.5rem;}
/* .improveCell span{ font-size: 0.1rem} */
.improveCell{margin-left:5px;overflow: auto;}
</style>
