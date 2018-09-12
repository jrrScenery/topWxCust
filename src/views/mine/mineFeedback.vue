<!--我的-我的意见反馈-->
<template>
  <div class="mineFeedbackView">
    <header-last :title="mineFeedbackTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <ul>
        <li v-for="item in mineFeedbackObj" :key="item.id">
          <div class="title"><p>{{item.num}}</p><span>评分价值：{{item.score}}</span></div>
          <div class="desc">{{item.desc}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
export default {
  name: 'mineFeedback',
  components: {
    headerLast
  },

  data () {
    return {
      mineFeedbackTit: '我的意见反馈',
      mineFeedbackObj: [
        {num: 'CS1805140003', score: '3', desc: '国家外汇管理局2017年度小型机存储国家外汇管理局2017年度小型机存储…'},
        {num: 'CS1805140003', score: '4', desc: '国家外汇管理局2017年度小型机存储…'},
        {num: 'CS1805140003', score: '5', desc: '国家外汇管理局2017年度小型机存储…'},
        {num: 'CS1805140003', score: '600', desc: '国家外汇管理局2017年度小型机存储…'}
      ]
    }
  },

  methods: {

  }
}
</script>

<style scoped>
  .mineFeedbackView{ width: 100%;}
  .content{width: 100%; margin-top: 0.05rem; color: #999999}
  .content ul li{padding: 0 0.2rem; margin-bottom: 0.05rem; background: #ffffff;}
  .content ul li .title{display: flex; justify-content: space-between; line-height: 0.36rem;}
  .content ul li .title p{color: #2698d6; font-size: 0.14rem;}
  .content ul li .title span{display: inline-block; width: 0.9rem;}
  .content ul li .desc{font-size: 0.14rem; color: #333333; height: 0.3rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
</style>
