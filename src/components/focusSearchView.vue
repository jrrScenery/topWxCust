<!--事件详情搜索&意见和投诉查询&我的事件、所有事件查询-->
<template>
  <div class="searchView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业" multiple>
          <el-option v-for="item in industryType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
<!--       <el-form-item label="事件类型" style="position: relative">
        <template>
          <div style="position: absolute; top: 0.25rem; left: -0.65rem; color: #999999; font-size: 0.1rem">可多选</div>
          <el-checkbox-group v-model="form.type" size="small">
            <el-checkbox-button v-for="item in Type" :label="item.value" name="type" :key="item.id">{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </template>
      </el-form-item> -->
      <el-form-item label="客户">
        <el-input v-model="form.customer" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.proName" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="销售">
        <el-input v-model="form.sale" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="PM">
        <el-input v-model="form.PM" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="事件编号">
        <el-input v-model="form.eventNum" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.keyWord" class="bInput"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" style="margin-bottom: 0.3rem">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">～</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;" value-format="yyyy-MM-dd" @focus="noKeyword"></el-date-picker>
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
  name: 'searchView',

  components: {

  },

  data () {
    return {
      form: {
        industry: '',
        type: [],
        customer: '',
        proName: '',
        sale: '',
        PM: '',
        eventNum: '',
        keyWord: '',
        startTime: '',
        endTime: ''
      },
      industryType: [],
      Type: []
    }
  },

  watch: {},

  props: ['queryData'],

  created () {
    console.log("focus serach view");
    console.log(this.queryData);
    fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
      console.log(res.data);
      this.industryType = res.data;
    });
/*    fetch.get("?action=getDict&type=NT_CASE_TYPE","").then(res=>{
      // console.log(res.data);
      this.Type = res.data;
    });*/
    this.form.industry = this.queryData.industry;
    this.form.customer = this.queryData.customer;
    this.form.proName = this.queryData.proName;
    this.form.sale = this.queryData.sale;
    this.form.PM = this.queryData.PM;
    this.form.eventNum = this.queryData.eventNum;
    this.form.keyWord = this.queryData.keyWord;
    this.form.industry = this.queryData.industry;
    this.form.startTime = this.queryData.startTime;
    this.form.endTime = this.queryData.endTime;
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
