<template>
  <div class="helloView">
<!--touchstart,touchmove,touchend,touchcancel 这-->
    <el-form ref="form" :model="form" style="height:100%">
        <div ref="elememt" style="width:100%;height:100%;text-align:center">
            <canvas id="canvas" width="250" height="400">Canvas画板</canvas>
        </div>
        <el-form-item class="searchBtn">
            <el-button @click="clear">取消</el-button>
            <el-button class="searchBtnCell" @click="save">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
var draw;
var preHandler = function(e){e.preventDefault();}
class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    init(btn) {
        var that = this; 
        // this.height= this.$refs.elememt.offsetHeight;  //100
        // this.width = this.$refs.
        this.canvas.addEventListener('touchstart', function(event) {
            document.addEventListener('touchstart', preHandler, false); 
            that.drawBegin(event)
        })
        this.canvas.addEventListener('touchend', function(event) { 
            document.addEventListener('touchend', preHandler, false); 
            that.drawEnd()
            
        })
        this.clear(btn)
    }
    drawBegin(e) {
        var that = this;
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = "#000"
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
        canvas.addEventListener("touchmove",function(){
            that.drawing(event)
        })
    }
    drawing(e) {
        this.cxt.lineTo(
            e.changedTouches[0].clientX - this.stage_info.left,
            e.changedTouches[0].clientY - this.stage_info.top
        )
        this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
        this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
        this.cxt.stroke()
    }
    drawEnd() {
        document.removeEventListener('touchstart', preHandler, false); 
        document.removeEventListener('touchend', preHandler, false);
        document.removeEventListener('touchmove', preHandler, false);
        //canvas.ontouchmove = canvas.ontouchend = null
    }
    clear(btn) {
        this.cxt.clearRect(0, 0, 300, 600)
    }
    save(){
       return canvas.toDataURL("image/png")
    }
}

export default {
    props: ['queryData'],
    data () {
        return {
        form:{
            imgStrQuestion:''
        },
        msg: 'Welcome to Your Vue.js App',
        val:true,
        url:""
        }
    },
  mounted() {
      draw=new Draw('canvas');
      draw.init();
    //   let data = {
    //     popBg: false
    //   }
    //   this.$emit('change', data)
  },
  methods:{
    clear:function(){
        draw.clear();
        let data = {
            popBg: false
        }
        this.$emit('change', data)
    },
    save(){
        var data1=draw.save();
        let form = this.form;
        this.form.imgStrQuestion = data1;
        // console.log(this.form.imgStrQuestion);
        this.$emit('search', this.form.imgStrQuestion)
        let data = {
            popBg: false
        }
        this.$emit('change', data)
    },
    noKeyword () {
      document.activeElement.blur()
    },

} } </script> 
<style scoped> 
  .helloView{width: 80%;background: #ffffff; padding: 0.1rem 0.2rem 0.45rem; position: relative;}
  .helloView >>> .el-form-item{margin-bottom: 0.05rem;}
  .helloView >>> .searchBtn{position: absolute; bottom: -0.05rem; left: 0; right: 0; height: 0.4rem;}
  .helloView >>> .searchBtn .el-button{width: 50%; border: none; padding: 0; margin: 0; height: 0.4rem; border-radius: 0; color: #999999; font-size: 0.13rem;}
  .helloView >>> .searchBtn .el-button:hover{background: #ffffff;}
  .helloView >>> .searchBtn .searchBtnCell:hover{background: #2698d6;}
  .helloView >>> .searchBtn .el-form-item__content{margin: 0!important; display: flex;}
  .helloView >>> .searchBtn .searchBtnCell{background: #2698d6; color: #ffffff;}
    h1, h2 { font-weight: normal; } 
    ul { list-style-type: none; padding: 0; } 
    li { display: inline-block; margin: 0 10px; } 
    a { color: #42b983; } 
    #canvas { background: #ffffff; cursor: default; margin-right:0;border:1px solid #666} 
    #keyword-box { margin: 10px 0; } 
    *{touch-action: none;}
</style>