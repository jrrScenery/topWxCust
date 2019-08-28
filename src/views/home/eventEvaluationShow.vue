<!--首页-事件详情-服务评价编辑-->
<template>
    <div class="serviceRateView">  
        <header-last :title="serviceRateTit" backUrl='caseEvaluateList' :date1='this.$route.query.caseId' :date2='this.$route.query.route'></header-last>
        <div style="height: 0.45rem;"></div>  
        <div class="serviceInfoCell">
            <div class="serviceContent">
                <el-form>
                    <div class="editorView" v-for="(item,i) in evaluateval" :key="i">
                        <el-form-item>
                            <div class="star">
                                <span class="starTit">{{i+1}}.{{item.question.questionComment}}</span>
                                <el-rate v-if="item.question.questionComment2"
                                        v-model="item.scoreval"
                                        disabled
                                        :colors="['#666666', '#999999', '#FF9900']">
                                </el-rate>
                            </div>
                        </el-form-item>
                        <div class="improve" v-if="item.scoreval<4&&item.question.questionComment2">
                            <span>{{item.question.questionComment2}}</span>
                            <div class="improveCell">
                                <el-form-item>
                                    <el-checkbox-group v-model="item.aroptschked">
                                        <el-checkbox disabled v-for="itemoption in item.options" :key="itemoption.optionId" :label="itemoption.optionId" >{{itemoption.optionComment}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <ul class="signature">
                        <li class="lisign">
                            <span>客户签字</span>
                            <div class="sign">
                                <img :src="imgStr">
                            </div>
                        </li>
                        <li>
                            <span>工程师</span>
                            <div>{{engineername}}</div>
                        </li>
                    </ul>                  
                </el-form>
                
            </div>
        </div>
    </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
export default {
    name:'serviceRate',
    components:{
        headerLast,
    },
    data(){
        return{
            serviceRateTit:'服务评价',
            evaluateval:[],
            imgStr:"",
            engineername:'',
            workId:this.$route.query.workId,
            caseId:this.$route.query.caseId,
            evaluateId:this.$route.query.evaluateid,
            route:this.$route.query.route
        }
    },
    created:function(){
      console.log(this.$route.query.evaluateId);
        let vm= this;    
        fetch.get("?action=GetCaseEvaluateInfo&EVALUATE_ID=" + this.evaluateId).then(res=>{
            console.log(res);
            if(res.imgObject!=null){
                this.imgStr = res.imgObject.imgStr;
            }
            if(res.STATUSCODE==0){
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
            return score;
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

.signature li{overflow: hidden;zoom:1; margin: 0; padding: 0.1rem 0;  color: #999999; border-bottom: 0.01rem solid #e1e1e1}
.signature li span{ width: 0.6rem; float: left;}
.signature li div{color: #333333; margin-left: 0.6rem;}
.signature li .sign{ }
.signature li .sign img{width: 100%; display: block; flex-grow: 1;}

.serviceSubmitBtn >>> .el-form-item__content{margin: 0!important;}
.serviceSubmitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: absolute; bottom: 0;}
</style>
<style>
  .eventEvaluationEditorView span{ color: #666;}
  .improveCell .el-checkbox__input.is-disabled+span.el-checkbox__label{color: #888}
  .improveCell .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color: #666}
</style>

