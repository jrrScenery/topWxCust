<!--填写搜索的tab数据，反馈数据给父组件(即表弹出)-->
<template> 
  <div class="reportSearchView">
    <el-form ref="form" :model="form" label-width="65px">
      <div class="projectItem">
        <el-form-item label="项目">
          <el-select v-model="form.program" placeholder="请选择项目" clearable>
            <el-option v-for="item in programArr" :label="item.PROJECT_NAME" :value="item.PROJECT_CODE" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="时间段">
        <el-col :span="11">
          <el-date-picker type="month"  @focus="noKeyword" placeholder="开始月份" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">~</el-col>
        <el-col :span="11">   
          <el-date-picker type="month"  @focus="noKeyword" placeholder="结束月份" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item class="searchBtn">
        <el-button @click="onCancel">取消</el-button>
        <el-button class="searchBtnCell" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import fetch from '../utils/ajax'
export default {
  name: 'reportSearchView',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        // custom: '',
        program: '',
        // industry: '',
        startTime: this.getFormerTime(1)[0],
        endTime: this.getCurrentTime(1)[0],
      },
      // industryType: []
      programArr:[]

    }
  },

  watch: {},


  created () {
    // fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
    //   console.log("1111", res);
    //   this.industryType = res.data;
    // });
    fetch.get("?action=/project/GetProjectList","").then(res=>{
      console.log("2222", res);
      this.programArr = res.data;
    });
    // this.form.custom = this.queryData.custom;
    this.form.program = this.queryData.program;
    // this.form.industry = this.queryData.industry;
  },

  methods: {
    onCancel () {
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    onSearch () {
      let form = this.form
      this.$emit('search', form)
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    },
    standardDate(join,...num){
      let arr = [];
      num.forEach((item)=>{
        item.toString().length<2?arr.push('0'+item):arr.push(item);
      });
      return arr.join('-')
    },
    getFormerTime (n) {
      let nowYear = new Date().getFullYear() - 1, yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      return yearArr
    },
    getCurrentTime (n) {
      let nowYear = new Date().getFullYear(), yearArr = []
      yearArr.unshift(this.standardDate('', nowYear, new Date().getMonth() + 1, new Date().getDate()))
      for(let i = 1;i<n;i++){
        yearArr.unshift(nowYear-i+'1231')
      }
      //console.log(yearArr)
      return yearArr
    }
  }
}
</script>


<style scoped>
  .reportSearchView{width:80%;background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
  .reportSearchView >>> .el-form-item{margin-bottom: 0.1rem;}
  .reportSearchView >>> .el-select{width: 80%;}
  .reportSearchView >>> .el-input__inner{padding: 0 0.05rem}
  .reportSearchView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .reportSearchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .reportSearchView >>> .bInput .el-input__inner{width: 80%;}
  .reportSearchView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .reportSearchView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .reportSearchView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .reportSearchView >>> .el-input__prefix{display: none;}
  .reportSearchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .reportSearchView >>> .el-col-2{text-align: center;}
  .reportSearchView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .reportSearchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .reportSearchView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .reportSearchView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .reportSearchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .reportSearchView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>
<style>
.el-select-dropdown{width: 100%}
</style>
