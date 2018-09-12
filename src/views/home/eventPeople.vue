<!--首页-事件详情-相关人员-->
<template>
  <div class="eventPeopleView">
    <header-last :title="eventPeopleTit"></header-last>
    <div style="height: 0.45rem;"></div>
    <div class="content">
      <div class="eventPeopleCell" v-for="item in eventPeopleData" :key="item.id" >
        <div class="cellLeft">
          <img v-if="!item.imgSrc" src="../../assets/images/photo.png" alt="">
          <img v-else :src="item.imgSrc" alt="">
        </div>
        <div class="cellRight">
          <p>{{item.SUPPORTOR_REALNAME}}</p>
          <ul>
            <li><span>角色：</span>{{item.ROLE}}</li>
            <li><span>电话：</span><a  @click="sendCall(item.TEL)" v-bind:href="'tel:'+item.TEL" >{{item.TEL}}</a></li>
            <li><span>手机：</span><a  @click="sendCall(item.MOBILE)" v-bind:href="'tel:'+item.MOBILE" >{{item.MOBILE}}</a></li>
            <li><span>部门：</span>{{item.ORGNAME}}</li>
            <li><span>邮箱：</span>{{item.EMAIL}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="popBg" class="popBg" @click="popBg = !popBg">
      <div class="popBox">
        <a v-show="chkPeople.TEL"  @click="sendCall(chkPeople.TEL)" v-bind:href="'tel:'+chkPeople.TEL" ><span>电话</span>{{chkPeople.TEL}}</a>
        <a v-show="chkPeople.MOBILE"  @click="sendCall(chkPeople.MOBILE)" v-bind:href="'tel:'+chkPeople.MOBILE" ><span>手机</span>{{chkPeople.MOBILE}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import headerLast from '../header/headerLast'
import fetch from '../../utils/ajax'
let caseId;
export default {
  name: 'eventPeople',

  components: {
    headerLast
  },

  data () {
    return {
      eventPeopleTit: '相关人员',
      popBg: false,
      eventPeopleData: [],
      caseid: this.$route.query.caseId,
      chkPeople:{}
    }
  },

  methods: {
    ringUp (people) {
      console.log(people);
      this.chkPeople = people;
      this.popBg = !this.popBg
    }
  },
  created:function(){

    fetch.get("?action=GetSupportorList&CASE_ID="+this.caseid,{}).then(res=>{
      let eventPeopleData = []
      this.eventPeopleData = res.data;
      console.log(res.data)
    });
  }
}
</script>

<style scoped>
  .eventPeopleView{ width: 100%; height: 100%; position: relative}
  .content{margin-top: 0.05rem; background: #ffffff;}
  .eventPeopleCell{display: flex; margin: 0 0.25rem; padding: 0.15rem 0; border-bottom: 0.01rem solid #cccccc}
  .eventPeopleCell:last-child{border-bottom: none}
  .eventPeopleCell .cellLeft{width: 0.75rem; height: 0.75rem; margin-right: 0.25rem;}
  .eventPeopleCell .cellLeft img{width: 0.75rem; height: 0.75rem; border-radius: 50%;}
  .eventPeopleCell .cellRight p{font-size: 0.15rem; color: #262626; margin-bottom: 0.1rem;}
  .eventPeopleCell .cellRight li{color: #666666; font-size: 0.12rem; line-height: 0.18rem;}
  .eventPeopleCell .cellRight li span{margin-right: 0.15rem;}

  .popBg{position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);}
  .popBg .popBox{position: absolute; top: 50%; left: 50%; margin: -0.45rem 0 0 -1.15rem; width: 2.3rem; height: 0.9rem; border-radius: 0.04rem; background: #000000; color: #ffffff;}
  .popBg .popBox a{display: block; height: 0.45rem; line-height: 0.45rem; padding: 0 0.15rem; font-size: 0.14rem; color: #ffffff}
  .popBg .popBox a span{display: inline-block; margin-right: 0.1rem;}
  .popBg .popBox a:nth-child(1){position: relative;}
  .popBg .popBox a:nth-child(1):after{position: absolute; bottom: 0; left: 5%; width: 90%; height: 0.01rem; content: ''; background: #818181}
</style>
