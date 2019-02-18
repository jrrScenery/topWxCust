<!--备件地图-->
<template>
  <div class="eventPartsView" id="content">
    <div id="partsAllMap"></div>
    <div class="partsinfo"  :class="{infoon: infoon}">
      <div class="infoh" @click="infoon=((partsData.length==0||isdetail)?infoon:(!infoon))">
        <b  @click.stop="backToParts" v-if="isdetail">返回</b>
        <span v-if="isdetail">备件物流</span>
        <span v-else>备件信息{{partsData.length==0?"：暂无数据":""}}</span>
        <i v-if="partsData.length>0 && !isdetail" ></i>
        <a class="ashowcpoint" @click.stop="showcpoint">故障点</a>
      </div>
      <div class="delivercon" v-if="isdetail">
        <dl class="uldetailtree">
          <dd v-for="item in detailDeliver" :key="item.id">
            {{item.time}}：{{item.context}}
          </dd>
        </dl>
      </div>
      <ul class="ulparts" v-else>
        <li v-for="(item,i) in partsData" :key="item.CASE_ID">
          <div class="imgbox" @click="showDetail(i)">
            <img src="../../assets/images/mapcar.png"  alt="">
            <div class="name">查看物流</div>
          </div>
          <div class="txtbox"  @click="localpart(i)">
            <p class="partno"><strong>申请单号：</strong>{{item.APPLY_CODE}}</p>
            <span class="statusname"><strong>备件状态：</strong>{{item.STATUS_NAME}}</span>
            <p class="partinfo"><strong>备件信息：</strong>{{item.PART_INFO}}</p>
            <p class="arrtime"><strong>要求到场时间：</strong>{{item.REQUEST_ARRIVED_TIME}}</p>
            <p class="sendinfo">
              <strong>发货人：</strong>{{item.SENDER_NAME}} 
              <a  @click="sendCall(item.SENDER_PHONE)" v-bind:href="'tel:'+item.SENDER_PHONE" style="color: #2698d6;"> {{item.phone}} </a>
            </p>
            <p class="sendtype">
              <strong>发货方式：</strong>{{item.SEND_TYPE_NAME}}{{item.DELIVERY_INFO}}
            </p>
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'
import BMap from 'BMap'
export default {
  name: 'eventParts',

  components: {

  },

  data () {
    return {
      form: {
        eventNum: '',
        place: ''
      },
      caseId:this.$route.query.caseId,
      detailData: {},
      partsData: [],
      bmap: null,
      cmarker: null,
      cpoint:null,
      nowcenter: null,
      infoon: false,
      partsheight : 0,
      partsmarks:[],
      actmarker:null,
      isdetail:false,
      detailIdx:-1,
      detailFromMarker:null,
      detailDeliver:[]
    }
  },
  mounted () {
    this.loadparts();
  },
  methods: {
    loadparts(){
      fetch.get("?action=GetMapPart",{CASE_ID: this.caseId}).then(res=>{
        console.log(res);
        if('0' == res.STATUSCODE){
          this.detailData = res.detailData
          this.partsData = res.partsData;
        }
        this.countarea();
        this.drawmap();
        this.drawcpoint();
        this.drawparts();
      });
    },
    countarea(){
      if(this.partsData.length==0){
        this.partsheight=30
      }
      else{
        this.partsheight=210
      }
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        let winHeight = document.documentElement.clientHeight
        let mapHeight = document.getElementById('partsAllMap')
        let contentHeight = document.querySelector(".eventPartsView")
        mapHeight.style.height = winHeight - 100- (this.infoon ?this.partsheight:0) + 'px'
        contentHeight.style.height = winHeight - 95 + 'px'
        console.log(mapHeight.style.height)
      }
    },
    drawmap(){
      let map = new BMap.Map('partsAllMap')
      this.bmap =map;

      let cpoint = this.detailData.LONGITUDE? new BMap.Point(this.detailData.LONGITUDE, this.detailData.LATITUDE): new BMap.Point(116.417, 39.909)
      this.cpoint = cpoint;
      if(this.nowcenter){
        this.bmap.centerAndZoom(this.nowcenter, 12)
      }
      else{
        this.bmap.centerAndZoom(cpoint, 12)
        this.nowcenter = cpoint;
      }

    },
    drawcpoint(){
      this.addMarker(this.cpoint, require("../../assets/images/maperror.png"),0,"cpoint")
    },
    drawparts(){
      this.partsData.forEach(element => {
        console.log(element.LONGITUDE2)
        if(element.LONGITUDE2){
          var point = new BMap.Point(element.LONGITUDE2, element.LATITUDE2);
          this.addMarker(point,require("../../assets/images/mapcar.png"),18,"part");
          console.log(point);
        }
        else{
          this.partsmarks.push(null);
        }
      });
    },
    showcpoint(){
      this.bmap.centerAndZoom(this.cmarker.getPosition(),this.bmap.getZoom());
      this.nowcenter = this.cpoint;
    },
    addMarker(point, imgurl,isize,pointtype,index){  // 创建图标对象
      var isize = isize|| 24
      var myIcon = new BMap.Icon(imgurl, new BMap.Size(isize, isize), {
        anchor: new BMap.Size(0, 0),
        imageOffset: new BMap.Size(0,0)
      });
      var marker = new BMap.Marker(point, {icon: myIcon});
      console.log(marker);
      marker.addEventListener("click",function(e){
        this.bmap.zoomTo(this.bmap.getZoom() + 1);
      })
      if("cpoint" == pointtype)
      {
        this.cmarker = marker;
      }
      else if("part" == pointtype){
        this.partsmarks.push(marker);
      }
      else if("detailfrom" == pointtype){
        this.detailFromMarker = marker;
      }
      
      this.bmap.addOverlay(marker);
    },
    localpart(i){
      if(this.actmarker){
        this.actmarker.setIcon(new BMap.Icon(this.actmarker.getIcon().imageUrl, new BMap.Size(18, 18),{anchor:new BMap.Size(0,0)}));
      }
      var marker = this.partsmarks[i];
      if(marker == null){
        this.$message({
          message:'暂无位置信息',
          type: 'error',
          center: true,
          customClass:'msgdefine'
        });
        this.actmarker=null;
      }
      else{
        marker.setIcon(new BMap.Icon(marker.getIcon().imageUrl, new BMap.Size(18, 18),{anchor:new BMap.Size(2,2)}));
        this.actmarker= marker;
        this.bmap.centerAndZoom(marker.getPosition(),this.bmap.getZoom());
        this.nowcenter = marker.getPosition();
      }
    },
    showDetail(idx){
      let nowpart = this.partsData[idx];
      console.log(nowpart,idx);
      var vm =this;
      this.detailIdx = idx;
      this.isdetail = true;
      this.partsmarks.forEach(function(v,i,ar){
        if(idx!=i){vm.partsmarks[i].hide()}
      })

      var frompoint = new BMap.Point(nowpart.LONGITUDE, nowpart.LATITUDE);
      this.addMarker(frompoint,require("../../assets/images/maphome.png"),0,'detailfrom')
      this.detailFromMarker.setLabel(new BMap.Label(""));
      console.log(this.detailFromMarker.getLabel());
      this.bmap.zoomTo(6);
      
      fetch.get("?action=GetPartsTransports",{SEND_NO: nowpart.SEND_NO,SUPPLIER_TRANSPORT_CODE:nowpart.SUPPLIER_TRANSPORT_CD}).then(res=>{
        if('0' == res.STATUSCODE){

          this.detailDeliver = JSON.parse(res.data);
        }
      });
    },
    backToParts(){
      this.isdetail = false
      this.detailDeliver=[]
      this.detailFromMarker =null
      this.detailIdx = -1
      
      var allOverlay = this.bmap.getOverlays();
      for (var i = 0; i < allOverlay.length -1; i++){
        if(allOverlay[i].toString() == "[object Marker]"){
          console.log(allOverlay[i].getLabel());
          if ( allOverlay[i].getLabel() ) {
              this.bmap.removeOverlay(allOverlay[i]);
              return false;
          }
          else{
            allOverlay[i].show();
            this.bmap.centerAndZoom(this.nowcenter, 12)
          }
        }
      } 

      
      
    }
    
  },
  watch:{
    infoon(curVal,oldVal){
      console.log(curVal,oldVal);
      this.countarea();
      this.drawmap();
      this.drawcpoint();
      this.drawparts();
    },
    isdetail(curVal,oldVal){
      if(curVal){
        
      }else{

      }
    }
  }
  
}
</script>

<style scoped>
  .content{overflow: hidden;}
  .eventPartsView{padding: 0 0.15rem}
  .searchBox{width: 100%; height: 0.5rem; background: #175a91}
  .searchBox >>> .el-form-item{margin: 0 -0.01rem; display: inline-block}
  .searchBox >>> .el-form-item:nth-child(2n){width: 15%}
  .searchBox >>> .el-form-item:nth-child(2n+1){width: 33%;}
  .searchBox >>> .el-input__inner{padding: 0;}
  .searchBox >>> .el-button{padding: 0;}
  #partsAllMap{}

  .partsinfo{position: absolute;   left: 0; right: 0; bottom:0;  height: 0.3rem; overflow: hidden;  background: #fff; transition: all 0.3s;}
  .infoon{ min-height:2.1rem; }
  .partsinfo  strong{font-weight: bold;}
  .partsinfo .infoh{ line-height: 0.3rem;text-align: center;background: #2698d6; color: #fff; position: relative; }
  .partsinfo  .infoh i { position: absolute;  content: " "; background: url(../../assets/images/rightarrwhite.png) no-repeat; 
  width: 0.29rem; height: 0.29rem; vertical-align: top; background-position: center; background-size: 16px; transition: all 0.3s;}
  .partsinfo  .infoh b{ left: 0.1rem;;  position: absolute;}
   .partsinfo  .infoh i{position: relative;display: inline-block; }
  .infoon .infoh i{ transform: rotate(90deg);}
  .partsinfo ul{max-height: 1.9rem; overflow: scroll;}
  .ashowcpoint{ position: absolute; right:0.1rem; bottom: 0; line-height: 0.3rem;color: #fff;}
  .ulparts{  }
  .ulparts li{ overflow: hidden; padding:0.1rem 0 0.1rem; color: #666; line-height: 0.18rem;border-bottom: 1px dashed #e2e2e2;}
  .ulparts li .imgbox{ width: 0.6rem; float: right; position: relative;}
  .ulparts li .imgbox img{ width: 0.4rem; display: block; margin: 0.2rem auto 0.05rem;}
  .ulparts li .imgbox i{ position: absolute; left: 6%; top: 0.1rem; font-style: normal;}
  .ulparts li .imgbox .name{ text-align: center;}
  .ulparts li .txtbox{ margin-right: 0.6rem; position: relative; margin-left: 0.08rem;}
  .ulparts li .txtbox p{}
  .ulparts li .txtbox .workstatus{ position: absolute; right: 0.1rem; top: 0.0rem; }
  .ulparts li .txtbox .workerstatus{ position: absolute; right: 0.1rem; top: 0.18rem; }
  .ulparts li .txtbox .orderid{ color: #2698d6; }
  .delivercon{ padding: 0.1rem 0.1rem 0.2rem; max-height: 1.6rem; overflow: scroll;}
  .uldetailtree{ position: relative; padding-left: 0.1rem; }
  .uldetailtree:before{ position: absolute;content:" "; width: 0.02rem; top: 0; bottom: 0; left: 0; background: #aaa;}
  .uldetailtree dd{ position: relative; margin-bottom: 0.1rem;}
  .uldetailtree dd:before{ position: absolute;content:" "; width: 0.08rem;height: 0.08rem; 
  top:0.05rem;left: -0.13rem; background: #aaa;border-radius: 50%;}
</style>
