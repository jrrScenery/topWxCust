<template>
    <div class="serviceRateView">  
        <header-last :title="serviceRateTit"></header-last>
        <div style="height: 0.45rem;"></div>  
        <div class="serviceInfoCell">
            <div class="serviceContent">
                <el-form :model="formData" ref="formData">
                    <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                        <el-form-item>
                            <div class="star">
                                <span class="starTit">{{i+1}}.{{item.question.questionComment}}</span>
                                <el-rate v-if="item.question.questionComment2"
                                        v-model="item.scoreval"
                                        :colors="['#666666', '#999999', '#FF9900']">
                                </el-rate>
                            </div>
                        </el-form-item>
                        <div class="improve" v-if="item.scoreval<4&&item.question.questionComment2">
                            <span>{{item.question.questionComment2}}</span>
                            <div class="improveCell">
                                <el-form-item>
                                    <el-checkbox-group v-model="item.aroptschked">
                                        <el-checkbox v-for="itemoption in item.options" :key="itemoption.optionId" :label="itemoption.optionId" >{{itemoption.optionComment}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item v-else-if="item.question.questionComment2==null">
                            <el-input type="textarea" v-model="formData.otherResult" placeholder="请输入其他想法和建议"></el-input>
                        </el-form-item>
                    </div>
                    <div style="margin:0.1rem">客户签名</div>
                    <div v-if="formData.imgStr">
                        <img style="height:1.5rem;" v-bind:src="formData.imgStr" alt="">
                    </div>
                    <div v-else><img style="height:0.5rem;" src="" alt=""></div>
                    <add-signature :title="addSignatureTit" :queryData="searchData" @searchPro="signature"></add-signature>
                    <ul class="signature">
                        <el-form-item label="工程师">
                            <div>{{formData.engineername}}</div>
                        </el-form-item>
                    </ul>
                    <div style="height: 0.6rem;"></div>
                    <el-form-item class="serviceSubmitBtn">
                        <el-button @click="submitForm('formData')">提交</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
import addSignature from '../../components/addSignature'
export default {
    name:'serviceRate',
    components:{
        headerLast,
        addSignature
    },
    data(){
        return{
            serviceRateTit:'服务评价',
            addSignatureTit:'添加签名',
            searchData:[],
            formData:{
                optionOption:[],
                question:[],
                scoreOption:[],
                imgStr:'',
                aroptschked:[],
                otherResult:'',
                engineername:''
            },
            // data:[],
            score:[],
            evaluateval:[],
            scoreOption:[],
            signImg:"",
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            serviceId:this.$route.query.serviceId,
            taskId:this.$route.query.taskId,
            evaluateId:'',
            messageId:'',
        }
    },
    created:function(){
        console.log(this.$route.query.messageId);
        if(this.$route.query.messageId!=undefined){
            this.messageId = this.$route.query.messageId
        }
        let vm= this;    
        var reqParams = {PAGE_NUM:1,PAGE_TOTAL:3}; 
        fetch.get("?action=/case/ServiceEvaluate&CASE_ID="+this.caseId,reqParams).then(res=>{
            console.log("res:",res);
            if(res.STATUSCODE==0){
                this.data = res.data;
                this.evaluateId = res.evaluateId;
                this.scoreOption = res.scoreOption;
                this.scoreOption = res.scoreOption;
                let jsonres= res;
                let tmpjsonval =[];
                jsonres.question.forEach(function(v,i,ar){
                let tmpobj = {};
                tmpobj.question= v;
                tmpobj.options = jsonres.optionOption.filter(function(item){return v.questionId == item.questionId})
                tmpobj.chkedopts = tmpobj.options.filter(function(item){return item.checkFlg})
                tmpobj.aroptschked = tmpobj.chkedopts.map(function(v,i,ar){ return v.optionId});
                tmpobj.scoreval = vm.getScore(jsonres.scoreOption,v.questionId);
                tmpjsonval.push(tmpobj);
                })
                this.evaluateval = tmpjsonval;
                console.log(this.evaluateval);         
            }else{
                this.$message({
                message:res.MESSAGE+"发生错误",
                type: 'error',
                center: true,
                customClass: 'msgdefine'
                });
            }
        })         
    },
    methods:{           
        signature(imgStr){
            this.formData.imgStr = imgStr;
        },
        getScore(scoreOption,questionId){
            var score = 0;
            scoreOption.forEach(function(v,i,ar){
                if(v.questionId == questionId){
                    if(v.checkFlg==1){
                        if(score<v.optionScore)
                        score = v.optionScore;
                    }
                }
            })
            console.log("score:"+score);
            return score;
        },
        getScoreOpinionId(scoreOption,questionId,scoreval){
            console.log("questionId:"+questionId);
            console.log("scoreval："+scoreval)
            let optionId;
            scoreOption.forEach(function(v,i,ar){
                if(v.questionId == questionId&&v.optionScore==scoreval){
                    optionId = v.optionId;
                    return false;
                }
            })
            console.log("optionId:"+optionId);
            return optionId;
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
                if(valid){
                    let detailArray = new Array();
                    var totalScore = 0;
                    var failFlg = 0;
                    var countScore = 0;
                    var returnFlg = 0;
                    vm.evaluateval.forEach(function(v,i,ar){
                        let options = v.options;
                        
                        if(v.question.questionComment2){
                            if(v.scoreval>0){
                                totalScore+=v.scoreval;
                                countScore += 1;
                                if(v.scoreval<3) failFlg = 1;
                                var scoreOptionId = vm.getScoreOpinionId(vm.scoreOption,v.question.questionId,v.scoreval);
                                    var temp1 = {};     
                                        temp1.evaluateId=vm.evaluateId;
                                        temp1.questionId=v.question.questionId;
                                        temp1.optionId=scoreOptionId;   
                                        detailArray.push(temp1);
                            }else{
                                returnFlg = 1;
                                vm.$message({
                                    message:'请给相关项打分',
                                    type: 'warning',
                                    center: true,
                                    customClass:'msgdefine'
                                });
                                loading.close();
                                return false;
                            }
                        }                
                        v.aroptschked.forEach(function(item,i,ar){
                            options.forEach(function(items,i,ar){
                                if(items.optionId == item){
                                    let temp2 = {};
                                    temp2.evaluateId = vm.evaluateId;
                                    temp2.questionId = items.questionId;
                                    temp2.optionId = item;
                                    detailArray.push(temp2);
                                }
                            }) 
                        })      
                        if(vm.formData.otherResult){
                            if(v.question.questionComment2==null){
                                var temp3={};
                                temp3.evaluateId = vm.evaluateId;
                                temp3.questionId = v.question.questionId;
                                temp3.otherResult=vm.formData.otherResult;
                                detailArray.push(temp3);
                            }
                        }
                    })
                    if(returnFlg){
                        loading.close();
                        return;
                    }
                    if(!vm.formData.imgStr){
                        vm.$message({
                            message:'请签名',
                            type: 'warning',
                            center: true,
                            customClass:'msgdefine'
                        });
                        loading.close();
                        return;
                    }
                    let avgScore = totalScore/countScore;
                    let postData = new URLSearchParams;
                    postData.append('evaluateStatus',2);
                    postData.append('evaluateId',vm.evaluateId);
                    postData.append('caseId',vm.caseId);
                    postData.append('messageId',vm.messageId);
                    postData.append('totalScore',avgScore);
                    postData.append('EvaluateResult',JSON.stringify(detailArray));
                    postData.append('failFlg',failFlg);
                    postData.append('imgStr',this.formData.imgStr);
                    console.log("222222222",vm.evaluateId);
                    console.log("messageId:",vm.messageId);
                    fetch.post("?action=/case/SubmitClientReview",postData).then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.STATUSCODE=="0"){
                            let nowcaseId = vm.caseId;
                            setTimeout(function(){vm.$router.push({name: 'casedetail',query:{caseId:nowcaseId}})},500);
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
    } 
}
</script>

<style scoped>
.serviceRateView{width: 100%; position: relative;background-color: #ffffff;margin-top:0.05rem}
.serviceContent{background: #ffffff; color: #999999; padding: 0.05rem 0 0.1rem;}
.serviceContent>>> .el-form-item{padding: 0 0.1rem}
.improve>>> span{padding: 0 0.05rem}
.editorView .star{display: flex;line-height: 0.2rem}
.editorView .star .starTit{ display: inline-block; width: 1.5rem;font-size: 0.14rem}
.editorView .improve span{line-height: 0.02rem;font-size: 0.13rem}
.editorView .improve >>> .el-checkbox{display: block; margin: 0;line-height: 0.1rem; font-size: 0.13rem; color: #999999;}

.improveCell span{ color: #666;word-wrap: break-word}
.el-checkbox__input.is-disabled+span.el-checkbox__label{color: #666!important;}

.signature .el-form-item{overflow: hidden;zoom:1; margin: 0; color: #2698d6; border-top: 0.01rem solid #e1e1e1;border-bottom: 0.01rem solid #e1e1e1}
.signature .el-form-item div{color: #333333; margin-left: 0.6rem;}
.signature .el-form-item .sign{}
.signature .el-form-item .sign img{width: 100%; display: block; flex-grow: 1;}
.serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>


