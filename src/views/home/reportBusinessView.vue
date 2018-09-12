<!--填写搜索的tab数据，反馈数据给父组件(即表弹出)-->
<template>
  <div class="searchView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业" clearable>
          <el-option v-for="item in industryType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户">
        <el-input v-model="form.custom" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-input v-model="form.program" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="销售">
        <el-input v-model="form.sale" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="PM">
        <el-input v-model="form.PM" class="bInput"></el-input>
      </el-form-item>
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
import fetch from '../../utils/ajax'
export default {
  name: 'reportBusinessView',

  components: {

  },
  props: ['queryData'],
  data () {
    return {
      form: {
        custom: '',
        program: '',
        sale: '',
        PM: '',
        startTime: this.getFormerTime(1)[0],
        endTime: this.getCurrentTime(1)[0],
        industry: ''
      },
      industryType: []

    }
  },

  watch: {},


  created () {
    fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
      // console.log("2222", res.data);
      this.industryType = res.data;
    });
    // fetch.get("?action=getDict&type=NT_CASE_TYPE","").then(res=>{
    //   // console.log(res.data);
    //   this.Type = res.data;
    // });


    this.form.industry = this.queryData.industry;
    this.form.custom = this.queryData.custom;
    this.form.sale = this.queryData.sale;
    this.form.PM = this.queryData.PM;
    this.form.program = this.queryData.program;
    // this.form.startTime = this.queryData.startTime;
    // this.form.endTime = this.queryData.endTime;
    // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", this.queryData, this.form);
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
      console.log("LLLLLLL", form)
      this.$emit('search', form)
      // console.log(this.form, '------------------')
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
  .searchView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
  .searchView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchView >>> .el-select{width: 80%;}
  .searchView >>> .el-input__inner{padding: 0 0.05rem}
  .searchView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchView >>> .el-checkbox-button__inner{padding: 0.09rem; border-radius: 0.15rem; margin-right: 0.03rem; background: #f6f6f6; color: #333333; font-size: 0.13rem;border: 0.01rem solid #f6f6f6;}
  .searchView >>> .el-checkbox-button.is-checked .el-checkbox-button__inner{border: 0.01rem solid #2698d6; background: #fef4f3; color: #2698d6; box-shadow: none;}
  .searchView >>> .bInput .el-input__inner{width: 80%;}
  .searchView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchView >>> .el-input__prefix{display: none;}
  .searchView >>> .el-input--prefix .el-input__inner{padding: 0; text-align: center;}
  .searchView >>> .el-col-2{text-align: center;}
  .searchView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>