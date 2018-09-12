<!--首页-事件详情-服务评价编辑-->
<template>
  <div class="eventEvaluationEditorView">
    <header-last :title="eventEvaluationTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="editorView" v-for="items in editorArr" :key="items.id">
        <div class="star">
          <span class="starTit">{{items.tit}}</span>
          <el-rate
            v-model="items.value"
            disabled
            :colors="['#666666', '#999999', '#FF9900']">
          </el-rate>
        </div>
        <div class="improve">
          <span>待改进选项</span>
          <div class="improveCell">
            <el-checkbox-group v-model="items.checkList">
              <el-checkbox disabled v-for="item in items.label" :label="item.cell" :key="item.id"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <ul class="signature">
        <li>
          <span>客户签字</span>
          <div class="sign"></div>
        </li>
        <li>
          <span>工程师</span>
          <p>{{engineer}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'eventEvaluationEditor',

  components: {
    headerLast
  },

  data () {
    return {
      eventEvaluationTit: '服务评价',
      engineer: '梁瑛',
      editorArr: [
        {tit: '1.报障热线服务', value: '', checkList: [], label: [{cell: '受理不及时'}, {cell: '服务态度不好'}, {cell: '沟通互动不足'}]},
        {tit: '2.二线技术支持', value: '', checkList: [], label: [{cell: '响应不及时'}, {cell: '服务态度不好'}, {cell: '沟通互动不足'}, {cell: '技术能力不够'}]},
        {tit: '3.现场服务', value: '', checkList: [], label: [{cell: '方案沟通不足或实施准备不足'}, {cell: '技术能力不足'}, {cell: '现场操作不规范'}, {cell: '处理效率低'}]},
        {tit: '4.实施方案', value: '', checkList: [], label: [{cell: '实施前未沟通'}, {cell: '方案不严谨、不准确'}]},
        {tit: '5.备件提供', value: '', checkList: [], label: [{cell: '备件未按约定时间到场'}, {cell: '包装破损或包装物不规范不整洁'}, {cell: '备件成色或质量差'}]}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .content{margin-top: 0.05rem; background: #ffffff; color: #999999; padding: 0.1rem 0.25rem 0.15rem;}
  .editorView .star{display: flex;}
  .editorView .star .starTit{ display: inline-block; width: 1.2rem;}
  .editorView .improve span{line-height: 0.24rem}
  .editorView .improve >>> .el-checkbox{display: block; margin: 0; font-size: 0.13rem; color: #999999;}
  .signature li{display: flex; margin: 0; line-height: 0.35rem; color: #2698d6; border-bottom: 0.01rem solid #e1e1e1}
  .signature li:first-child{line-height: 0.8rem;}
  .signature li .sign{margin-left: 0.15rem; background: pink; width: 0.8rem}
  .signature li p{color: #333333; margin-left: 0.3rem}
</style>
