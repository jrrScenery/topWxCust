<!--人员地图-->
<template>
  <div class="eventPeopleView" id="content">

    <div id="peopleAllMap"></div>

    <div class="peopleinfo" :class="{infoon: infoon}">
      <div class="infoh" @click="infoon=(workerData.length==0?infoon:(!infoon))">
        参与工程师信息{{workerData.length==0?"：暂无数据":""}}
        <i v-if="workerData.length>0"></i>
        <a class="ashowcpoint" @click.stop="showcpoint">故障点</a>
      </div>
      <ul class="ulpeoinfo">
        <li v-for="(item,i) in workerData" :key="item.WORK_ID" @click="showworker(i)">
          <div class="imgbox">
            <img src="../../assets/images/mapworker_else.png" v-if="item.RESOURCE_TYPE=='W'" alt="">
            <img src="../../assets/images/mapworker_self.png" v-else alt="">
            <div class="name">{{item.WORKER_NAME}}</div>
          </div>
          <div class="txtbox">
            <p class="orderid">{{item.WORK_CD}}</p>
            <p class="pname">

              <span class="tel"><strong>电话：</strong>{{item.PHONE}}</span>

            </p>
            <p class="addr"><strong>地点：</strong>{{item.ADDRESS}}</p>
            <p class="time"><strong>预计开始时间：</strong>{{item.BEGIN_TIME}}</p>
            <p class="desc">
              <strong>工作要求：</strong>{{item.WORK_REQUIRE}}
            </p>
            <span class="workstatus"><strong>状态：</strong>{{item.WORK_STATUS}}</span>
            <span class="workerstatus"><strong>忙闲：</strong>{{item.BUSY_STATUS}}</span>
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
  name: 'eventPeople',

  components: {

  },
  data () {
    return {
      form: {
        eventNum: '',
        orderNum: '',
        place: ''
      },
      infoon: false,
      detailData:{},
      workerData:[],
      bmapmarks:[],
      bmap:{},
      actmarker:null,
      peoheight:0,
      centerpoint:null,
      cmarker:null
    }
  },

  mounted () {
    this.loadpoint();
  },
  methods: {
    loadpoint(){
      var vm=this;
      fetch.get("?action=/case/GetMapEngineer&EMPID="+global_.empId,{CASE_ID:+this.$route.query.caseId}).then(res=>{
        console.log("wwwwwwwwww",res);
        if("1"== res.STATUSCODE){
          this.detailData = res.detailData;
          var workerArr = res.workerData;
          this.workerData = workerArr.filter(function(item){
            return  1==item.LOCATION_TYPE ;
          });
          if(workerArr.length==0){
            this.peoheight=30
          }
          else if(workerArr.length==1){
            this.peoheight=140
          }
          else{
            this.peoheight=210
          }
          this.drawmap();
        }
      });
    },
    showcpoint(){
      var vm =this;
      this.bmap.centerAndZoom(this.cmarker.getPosition(),this.bmap.getZoom());
    },
    drawmap(){
      var vm=this;
      this.peoheight= this.peoheight
      console.log(document.querySelector(".peopleinfo").clientHeight);
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            let winHeight = document.documentElement.clientHeight
            let mapHeight = document.getElementById('peopleAllMap')
            let contentHeight = document.getElementById('content')
            mapHeight.style.height = winHeight - 95- (this.infoon ?this.peoheight:0) + 'px'
            contentHeight.style.height = winHeight - 95 + 'px'
            console.log(mapHeight.style.height)
          }

          let map = new BMap.Map('peopleAllMap')
          this.bmap =map;
          let cpoint = new BMap.Point(this.detailData.LONGITUDE, this.detailData.LATITUDE)
          if(this.centerpoint){
            map.centerAndZoom(this.centerpoint, 12)
          }
          else{
            map.centerAndZoom(cpoint, 12)
            this.centerpoint = cpoint;
          }
          addMarker(cpoint,require("../../assets/images/maperror.png"),24,1);

          this.workerData.forEach(element => {
            if(element.LONGITUDE){
              var point = new BMap.Point(element.LONGITUDE, element.LATITUDE);
              var imgosrc= "../../assets/images/mapworker_"+(element.RESOURCE_TYPE=="W"?"else":"self")+".png";
              if(element.RESOURCE_TYPE=="W"){
                addMarker(point,require("../../assets/images/mapworker_else.png"),18);
              }
              else{
                addMarker(point,require("../../assets/images/mapworker_self.png"),18);
              }
            }
            else{
              vm.bmapmarks.push(null);
            }
          });


          function addMarker(point, imgurl,isize,isthing,index){  // 创建图标对象
           var isize = isize|| 24
            var myIcon = new BMap.Icon(imgurl, new BMap.Size(isize, isize), {
              anchor: new BMap.Size(0, 0),
              imageOffset: new BMap.Size(0,0)
            });
            var marker = new BMap.Marker(point, {icon: myIcon});

            marker.addEventListener("click",function(e){
              console.log(e);
              map.zoomTo(map.getZoom() + 1);
            })
            if(isthing){
              vm.cmarker = marker;
              vm.centerpoint = marker.getPosition();
            }
            vm.bmapmarks.push(marker);
            map.addOverlay(marker);
          }
    },
    showworker(i){
      if(this.actmarker){
        this.actmarker.setIcon(new BMap.Icon(this.actmarker.getIcon().imageUrl, new BMap.Size(18, 18),{anchor:new BMap.Size(0,0)}));
      }
      var marker = this.bmapmarks[i+1];
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

        marker.setIcon(new BMap.Icon(marker.getIcon().imageUrl, new BMap.Size(24, 24),{anchor:new BMap.Size(2,2)}));
        this.actmarker= marker;
        this.bmap.centerAndZoom(marker.getPosition(),this.bmap.getZoom());
        this.centerpoint = marker.getPosition();
      }
    }
  },
  watch:{
    infoon(curVal,oldVal){
      this.drawmap();
    }
  }

}
</script>

<style scoped>
  .ashowcpoint{ position: absolute; right:0.1rem; bottom: 0; line-height: 0.45rem;color: #fff;}
  .eventPeopleView{padding: 0 0.15rem;}
  .searchBox{width: 100%; height: 0.5rem; background: #175a91}
  .searchBox >>> .el-form-item{margin: 0 -0.01rem; display: inline-block}
  .searchBox >>> .el-form-item:nth-child(2n){width: 10%}
  .searchBox >>> .el-form-item:nth-child(2n+1){width: 22%;}
  .searchBox >>> .el-input{line-height: 0.5rem}
  .searchBox >>> .el-input__inner{padding: 0; background: #376fa0; height: 0.3rem; line-height: 0.3rem}
  .searchBox >>> .el-button{padding: 0; background: #169ad6}
  #peopleAllMap{}

  .peopleinfo{position: absolute;   left: 0; right: 0; bottom:0;  max-height: 0.45rem; overflow: hidden;  background: #fff; transition: all 0.3s;}
  .infoon{ min-height:3rem; }
  .peopleinfo  strong{font-weight: bold;}
  .peopleinfo .infoh{ line-height: 0.45rem;text-align: center;background: #2698d6; color: #fff; position: relative; }
  .peopleinfo  .infoh i{ position: relative; display: inline-block; content: " "; background: url(../../assets/images/rightarrwhite.png) no-repeat;
  width: 0.29rem; height: 0.29rem; vertical-align: top; background-position: center; background-size: 16px; transition: all 0.3s;}
  .infoon .infoh i{ transform: rotate(90deg);}
  .peopleinfo ul{max-height: 2.6rem; overflow: scroll;}
  .ulpeoinfo{  }
  .ulpeoinfo li{ overflow: hidden; padding:0.1rem 0 0.1rem; color: #666; line-height: 0.18rem;border-bottom: 1px solid #e2e2e2;}
  .ulpeoinfo li .imgbox{ width: 0.6rem; float: left; position: relative;}
  .ulpeoinfo li .imgbox img{ width: 0.4rem; display: block; margin: 0.2rem auto 0.05rem;}
  .ulpeoinfo li .imgbox i{ position: absolute; left: 6%; top: 0.1rem; font-style: normal;}
  .ulpeoinfo li .imgbox .name{ text-align: center;}
  .ulpeoinfo li .txtbox{ margin-left: 0.6rem; position: relative;}
  .ulpeoinfo li .txtbox p{}
  .ulpeoinfo li .txtbox .workstatus{ position: absolute; right: 0.1rem; top: 0.0rem; }
  .ulpeoinfo li .txtbox .workerstatus{ position: absolute; right: 0.1rem; top: 0.18rem; }
  .ulpeoinfo li .txtbox .orderid{ color: #2698d6; }
  .noworkers{ text-align: center; padding: 3px 0; color: #888;}

</style>
