<!--工作台-事件申报-->
<template>
  <div class="workBenchDeclareView">
    <header-base-four :title="workBenchDeclareTit"></header-base-four>
    <div class="content">
      <div class="attention">
        {{attentionhello}}<br>
        {{attentioninfo1}}
        <a @click="sendCall(attentioncall1)" v-bind:href="'tel:'+attentioncall1" style="color: #2698d6;"> {{attentioncall1}} </a>,
        <a @click="sendCall(attentioncall2)" v-bind:href="'tel:'+attentioncall2" style="color: #2698d6;"> {{attentioncall2}} </a>
        {{attentioninfo2}}
      </div>
      <el-form :model="formData" label-width="0.9rem" ref="formData">
        <el-form-item label="序列号：">
          <el-input v-model="formData.num" placeholder="请输入序列号"></el-input>
        </el-form-item>
        <el-form-item label="型号：">
          <el-input v-model="formData.type" placeholder="请输入型号"></el-input>
        </el-form-item>
        <el-form-item label="厂商：">
          <el-input v-model="formData.firm" placeholder="请输入厂商"></el-input>
        </el-form-item>
        <el-form-item label="所在城市：">
          <el-cascader
            :options="options"
            v-model="formData.city"
            filterable
            placeholder="请选择所在城市">
          </el-cascader>
          <!--<el-input v-model="formData.city" @focus="cityFocus" placeholder="请选择所在城市"></el-input>-->
        </el-form-item>
        <el-form-item label="影响程度：">
          <el-select v-model="formData.degree" placeholder="请选择">
            <el-option v-for="item in degree" :label="item.name" :value="item.value" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="影响范围：">
          <el-select v-model="formData.range" placeholder="请选择">
            <el-option v-for="item in range" :label="item.name" :value="item.value" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="text">
          <el-input type="textarea" v-model="formData.desc" placeholder="请输入事件描述"></el-input>
        </el-form-item>
        <div class="takePhoto"><span>上传照片（可选）</span><img src="../../assets/images/takephoto.png" alt=""></div>
        <el-form-item class="submitBtn">
          <el-button @click="submitForm('formData')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<template v-if="popBg">-->
      <!--<el-collapse-transition>-->
        <!--<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>-->
      <!--</el-collapse-transition>-->
    <!--</template>-->
  </div>
</template>

<script>
import headerBaseFour from '../header/headerBaseFour'
import fetch from '../../utils/ajax'
// import '../../utils/city.js'
import '../../utils/1.js'
export default {
  name: 'workBenchDeclare',

  components: {
    headerBaseFour
  },

  data () {
    return {
      workBenchDeclareTit: '事件申报',
      formData: {
        num: '',
        type: '',
        firm: '',
        city: [],
        degree: '',
        range: '',
        desc: ''
      },
      imgSrc: '',
      options: areajson,
      // popBg: false,
      degree: '',
      range: '',
      attentionhello: "尊敬的客户您好！",
      attentioncall1: "400-6106661",
      attentioncall2: "800-8106661",
      attentioninfo1: "神州信息Web/APP报障方式支持5*9（9:00-18:00），非工作时间请拨打服务热线报障：",
      attentioninfo2: "（密码：7653），感谢您的支持！",
    }
  },

  methods: {
    submitForm (formName) {
      // console.log(this.formData.city[this.formData.city.length - 1])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.formData)
          let declareForm = {SN_ID: this.formData.num, MODEL_NAME: this.formData.type, FACTORY_NAME: this.formData.firm, SERVICE_SITE: this.formData.city[this.formData.city.length - 1], IMPACT_DEGREE: this.formData.degree, IMPACT_SPHERE: this.formData.range, REMARK: this.formData.desc, DOC_ID: this.imgSrc};
          // console.log(declareForm)
          fetch.get("?action=DeclareCase",declareForm).then(res=>{
            // console.log(res)
            this.$message({
              message: '提交成功',
              type: 'success',
              center: true,
              customClass:'msgdefine'
            });
            if (res.STATUSCODE == 0) {
              setTimeout(() => {
                this.$router.push({name: 'workBench'})
              }, 1000);
            } else {
              console.log(res)
              this.$message({
                message: res.MESSAGE,
                type: 'error',
                center: true,
                customClass:'msgdefine'
              });
            }
          })
        } else {
          alert('err')
          return false
        }
      })
    },
    // cityFocus (event) {
    //   this.popBg = true
    // },
    // onSelected (data) {
    //   this.formData.city = data.area.value
    //   this.popBg = false
    // }
  },
  created () {
    if(this.$route.query.result){
      let array = this.$route.query.result.split(",");
      this.formData.num = array[2];
      this.formData.type = array[1];
      this.formData.firm = array[0];
      this.formData.city = array[3];
    }
    fetch.get("?action=getDict&type=NT_IMPACT_DEGREE","").then(res=>{
      this.degree = res.data;
      console.log(this.degree);
    })
    fetch.get("?action=getDict&type=NT_IMPACT_SPHERE","").then(res=>{
      this.range = res.data;
      console.log(this.range);
    })
  },
}
</script>

<style scoped>
  .workBenchDeclareView{width: 100%;}
  .attention{color: red;margin: 0.1rem;}
  .content{background: #ffffff; position: relative; padding-bottom: 0.5rem; margin-bottom: 0.5rem; top: 0.5rem;}
  .content >>> .el-form-item{border-bottom: 0.01rem solid #e5e5e5; margin: 0;}
  .content >>> .el-form-item__label{font-size: 0.13rem; color: #acacac; padding: 0 0 0 0.25rem; text-align: left}
  .content >>> .el-input__inner{border: none; color: #333333;}
  .content >>> .el-input__inner::placeholder{font-size: 0.13rem; color: #acacac}
  .content >>> .el-input.is-disabled .el-input__inner{background: #ffffff}
  .content >>> .el-cascader{width: 85%;}
  .content >>> .el-select{width: 85%;}
  .text{margin: 0!important;}
  .text >>> .el-form-item__content{margin: 0!important; line-height: 0.3rem;}
  .text >>> .el-textarea__inner{border: none; padding: 0 0.25rem; line-height: 0.3rem;    min-height: 1.8rem!important; color: #333333;}
  .text >>> .el-textarea__inner::placeholder{font-size: 0.13rem; color: #acacac;}
  .takePhoto{position: absolute; bottom: 0; left: 0.15rem; right: 0.15rem; line-height: 0.5rem; display: flex; justify-content: space-between; color: #999999}
  .takePhoto img{width: 0.3rem; height: 0.3rem; margin: 0.1rem 0 0 0.1rem;}
  .submitBtn >>> .el-form-item__content{margin: 0!important;}
  .submitBtn >>> .el-form-item__content .el-button{width: 100%; border: 0.01rem solid #2698d6; background: #2698d6; border-radius: 0; font-size: 0.16rem; color: #ffffff; height: 0.5rem; position: fixed; bottom: 0;}
</style>
<style>
  .el-cascader-menu{width: 110px!important; min-width: 0!important; padding-left: 0.1rem!important;}
  /*.distpicker-address-wrapper{width: 90%; position: absolute; top: 2.13rem; left: 5%; border: 0.01rem solid #ddd;}*/
  /*.distpicker-address-wrapper .address-container{max-height: 1.76rem; overflow: scroll}*/
</style>
