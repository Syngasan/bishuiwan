<template>
  <!-- 草稿 -->
  <div class="task">
    <div class="header_title">
      <div class="header_title_left" style="margin-left:30px">草稿箱</div>
      <div class="header_title_right" style="margin-right: 16px;">
        <el-button type="primary" plain size="small" @click="back()">返回</el-button>
      </div>
    </div>
    <div class="content" v-show="currentList.length!=0">
      <ul v-for="(item ,index) in currentList" :key="index">
        <li @click.prevent="toDateil(item.id)">
          <div class="contentDetail">
            <div class="contentDetail_t">
              <div class="contentDetail_t_l">
              {{ item.title}}
            </div>
            <div class="contentDetail_t_r mt">
              <div class="contentDetail_top">
                上次保存时间：{{ item.createTime}}
              </div>
               <el-button type="primary" size="small" class="btn" style="margin-top:38px" @click.stop="del(item.id)">删除</el-button>
            </div>
            </div>
          <div class="contentDetail_c mtt">
            {{item.content }}
          </div>
          </div>
        </li>
      </ul>
            <div style="text-align:center">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNumber"
              :page-sizes="[10, 100, 500, 1000]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="length">
            </el-pagination>
            </div>
    </div>
    <!-- <div v-show="currentList.length===0" style="text-align:center">草稿箱暂时没有内容</div>     -->
  </div>
</template>
<script>
import {getDraftTask ,deleteDraftTask} from '@/utils/axios/axios'
export default {
  data () {
    return {
      index: '',
      currentList:[],
      pageNumber:1,
      pageSize:10,
      length:0
    }
  },
  methods: {
    toDateil (value) {
      console.log('编辑任务')
      let params = {
        sessionId:localStorage.getItem('sessionId'),
        id:value
      }
      this.$router.push({path:'/hall/releaseTaskDetail/releaseTaskDetailEdit',query:params})
    },
    back () {
      this.$router.go(-1)
    },
    init () {
      let params = {
            sessionId:localStorage.getItem('sessionId'),
            pageNumber:this.pageNumber,
            pageSize:this.pageSize
          }
          getDraftTask( this.$qs.stringify(params)) .then(res=>{
            console.log(res);
            if (res.code === 1) {
              this.currentList = res.data.list
              this.length = res.data.totalRow 
            }
          })
    },
    // 删除
    del(value) {
      console.log(value,'错误');
      let params ={
        sessionId:localStorage.getItem('sessionId'),
        id:value
      }
      deleteDraftTask( this.$qs.stringify(params) ).then(res=>{
        console.log(res,'删除');   
        if (res.code ===1) {
          this.init()
        }    
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()                        
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNumber = val
      this.init()      
    },
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
  li {
    list-style: none;
  }
  .task {
    background-color: #F2F9FF;
     padding: 20px 18px 50px 19px;
    width: 100%;
    min-height: 800px;
  }
  .header_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .header_title_left {

    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(0,0,0,1);
    // line-height:0px;
  }
  .contentDetail {
    width:95%;
    height:126px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    box-shadow:0px 5px 18px 0px rgba(10,143,246,0.14);
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .contentDetail_t {
    display: flex;
    justify-content: space-between;
  }
  .contentDetail_t_l {
    // width:87px;
    font-size:26px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(10,143,246,1);
    line-height:36px;
  }
  .contentDetail_t_r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // width:197px;
    // height:13px;
    font-size:13px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(185,185,185,1);
    position: relative;
  }
  .contentDetail_c {
    width:432px;
    // height:41px;
    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(130,135,142,1);
    line-height:26px;
    text-align: left;
  }
  .mt {
    margin-top: 15px;
  }
  .btn {
    width: 90px;
    height: 36px;
    position: absolute;
    right: 0;
    margin-top: 15px;
  }
</style>
