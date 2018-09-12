<!--我的项目、所有项目查询-->
<template>
  <div class="searchView">
    <el-form ref="form" :model="form" label-width="65px">
      <el-form-item label="行业">
        <el-select v-model="form.industry" placeholder="请选择行业" multiple>
          <el-option v-for="item in industryType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务方向">
        <el-select v-model="form.business" placeholder="请选择业务方向">
          <el-option v-for="item in businessType" :label="item.name" :value="item.value" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="评价时间" style="margin-bottom: 0.3rem">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.startTime" style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">～</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="结束时间" v-model="form.endTime" style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
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
  name: 'searchMyProView',

  components: {

  },

  data () {
    return {
      form: {
        business: '',
        industry: '',
        customer: '',
        proName: '',
        sale: '',
        PM: '',
        startTime:'',
        endTime:''
      },
      businessType: [],
      industryType: []
    }
  },

  watch: {},

  created () {
    fetch.get("?action=getDict&type=PRO_BUSINESS_TYPE","").then(res=>{
      this.businessType = res.data;
    });
    fetch.get("?action=getDict&type=NT_CUSTOMER_INDUSTRY","").then(res=>{
      this.industryType = res.data;
    });
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
      // console.log(this.form, '------------------')
      let data = {
        popBg: false
      }
      this.$emit('change', data)
    }
  }
}
</script>

<style scoped>
  .searchView{background: #ffffff; padding: 0.15rem 0.2rem 0.5rem; position: relative;}
  .searchView >>> .el-form-item{margin-bottom: 0.1rem;}
  .searchView >>> .el-select{width: 80%;}
  .searchView >>> .el-select .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-form-item__label{text-align: left; color: #999999; font-size: 0.13rem;}
  .searchView >>> .bInput .el-input__inner{width: 80%;}
  .searchView >>> .bInput .el-input__inner:focus{border-color: #dcdfe6;}
  .searchView >>> .el-select-dropdown__item.selected{color: #2698d6;}
  .searchView >>> .el-select-dropdown__item span{color: #2698d6!important;}
  .searchView >>> .searchBtn{position: absolute; bottom: -0.15rem; left: 0; right: 0; height: 0.4rem;}
  .searchView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .searchView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .searchView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .searchView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .searchView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
</style>
