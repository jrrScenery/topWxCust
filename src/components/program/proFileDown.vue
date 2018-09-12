<!--文档下载-->
<template>
  <div class="proPlanView">
    <div class="proPlanCell">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <template v-for="item in table_arr">
            <el-table-column
              :fixed="item.fixed"
              :key="item.id"
              :prop="item.prop" 
              :label="item.label"
              :min-width="item.width">
              <template slot-scope="scope">
                  <template v-if="item.prop == 'DOC_NAME'">
                    <a @click="downFile(scope.row['href'],scope.row['fileext'],scope.row['docname'])" :download="scope.row['DOC_NAME']"> {{scope.row['DOC_NAME']}}</a>
                  </template>
                  <span v-else class="table_name">{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import global_ from '../../components/Global'
import fetch from '../../utils/ajax'

export default {
  name: 'proPlan',

  components: {

  },

  data () {
    return {
      tableData: [],
      table_arr: [
        {
          prop: 'DOC_NAME',
          label: '文档名称',
          fixed: true,
          width: '100%'
        },
        {
          prop: 'UPLOADER',
          label: '上传人',
          fixed: true,
          width: '45px'
        },
        {
          prop: 'CREATE_ON',
          label: '上传时间',
          fixed: true,
          width: '55px'
        }
      ]
    }
  },
  beforeCreate(){

  },
  created () {
    var url = "?action=GetProjectDoc&PROJECT_ID="+this.$route.query.projectId;
    fetch.get(url,{}).then(res=>{
      let tmpdata= res.data;
      tmpdata.map(function(item){
        item.href =global_.Server +"/api/download?fileId="+item.DOC_ID + "&fileName=" + item.DOC_NAME;
        let artemp = item.DOC_NAME.split('.'); 
        item.fileext =  artemp[artemp.length-1];
        item.docname= item.DOC_NAME;
      })

      this.tableData = tmpdata;
      console.log(this.tableData);
    });
  },
  methods: {
    downFile(url,fileExt,docname){
        let ua = navigator.userAgent.toLowerCase();
        console.log(url);
        console.log(fileExt);
        if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
          var info={action:"downFile",downloadurl:encodeURI(url)}
          window.webkit.messageHandlers.ioshandle.postMessage({body: info});
        }else if(/(Android)/i.test(ua)){
          var value = "{action:'downFile',downloadurl:'"+url+"',fileExt:'"+fileExt+"',docname:'"+encodeURI(docname) +"'}";
          android.getClient(value);
        }
    },
  }
}
</script>

<style scoped>
  .proPlanCell{margin-top: 0.05rem;}
  .proPlanCell >>> .el-table th{background-color:#f5f5f9 !important;color: #333333; text-align: center; padding: 0; font-size: 0.13rem;}
  .proPlanCell >>> .el-table th>.cell{line-height: 0.3rem; padding: 0 0.05rem;}
  .proPlanCell >>> .el-table td{padding: 0; text-align: center; color: #666666; font-size: 0.13rem;}
  .proPlanCell >>> .el-table td:first-child{text-align: left}
  .proPlanCell >>> .el-table td>.cell{line-height: 0.3rem;}
</style>
