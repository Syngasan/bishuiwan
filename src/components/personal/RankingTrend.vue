<template>
  <div class="RankingTrend">
    <ul class="navTitle">
      <li><router-link to="/personal/MyPoints/MyPoints1">月积分</router-link></li>
      <li><router-link to="/personal/MyPoints/AccumulativeIntegral">累计积分</router-link></li>
      <li><router-link to="/personal/MyPoints/IntegralTrend">积分趋势</router-link></li>
      <li class="active"><router-link to="/personal/MyPoints/RankingTrend">排名趋势</router-link></li>
      <li style="float: right !important;cursor: pointer;border-right: 0px solid #fff !important" @click="getRange"><img src="./img/my_icon_sz@2x.png"></li>
    </ul>
    <div class="divBox">
      <div id="echartContainer" style="width:932px; height:604px"></div>
    </div>
    <el-dialog title="设置默认排名范围" :visible.sync="dialogVisible" :center='true' :top="'29vh'" width="30%">
        <!-- <template>
          <el-radio v-model="radio" :label="item.id" :key="index" v-for="(item,index) in rangeList">{{item.name}}</el-radio>
        </template> -->
          <div  class="rangeMain"> 
                <div v-for="items in rangeList" :key="items.id" class="rangeItem">
                  <input type="radio" :label="items.name" :value="items.name" name='radio'  :checked="items.checked"  @change="radioChange(items.id,items.type)">
                  {{items.name}}
                </div>

          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setSortType">确 定</el-button>
        </span>
    </el-dialog>
    <!-- <el-dialog title="设置默认排名范围" :visible.sync="dialogVisible1" width="20%" :center='true'>
        <el-row>
          <el-col :span="12"><el-radio v-model="radio1" :label="0">按小组名排</el-radio></el-col>
          <el-col :span="12"><el-radio v-model="radio1" :label="1">按部门排</el-radio></el-col>
          <el-col :span="12"><el-radio v-model="radio1" :label="2">按子公司排</el-radio></el-col>
          <el-col :span="12"><el-radio v-model="radio1" :label="3">按公司排</el-radio></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="setRange">确 定</el-button>
        </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { transformRequestFn } from '@/utils/transformRequestFn/transformRequestFn'
export default {
  name: 'RankingTrend',
  data () {
    return {
      radio: '1',
      radio1: '',
      xAxisList: [],
      yAxisList: [],
      dialogVisible: false,
      dialogVisible1: false,
      rangeList: [],
      type:'',
      typeId:'',
    }
  },
  methods: {
    // radio值
    radioChange(value ,types) {
      console.log('radio值',value,types);
      this.typeId = value
      this.type = types
    },
    // 设置排名范围
    setSortType ()  {
      this.$axios({
        url: 'sort/setSortType',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          id: this.typeId,
          type: this.type
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: res.data.desc,
            customClass: "messageClass1",
          })
          this.dialogVisible = false
          this.getList()   
        }
      })
    },
    getList() {
        this.$axios({
      url: 'sort/sortTrend',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          for (var i = 0; i < res.data.data.list.length; i++) {
            this.xAxisList.push(res.data.data.list[i].time)
            this.yAxisList.push(res.data.data.list[i].value)
          }
          var myChart = this.$echarts.init(document.getElementById('echartContainer'))
          // 绘制图表
          myChart.setOption({
            title: { text: '当月排名：'+res.data.data.sort },
            xAxis: {
              type: 'category',
              data: this.xAxisList,
              axisLine: {onZero: false},
              
            },
            yAxis: {
              inverse:true,
              type: 'value',
            },
            dataZoom: [{
              type: 'inside',
              start: 0,
              end: 100,
              
            }, {
              start: 0,
              end: 100,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
            series: [{
              data: this.yAxisList,
              type: 'line',
              smooth: true
            }]
          })
        }
      })
    },
    getRange() {
      this.dialogVisible = true
    },
    // 获取排名范围
    getSortRange () {
      this.$axios({
        url: 'sort/getSortRange',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.rangeList.push(
           {name: res.data.data.business.businessName, id: res.data.data.business.businessId, type: res.data.data.business.type,checked:false} ,
            {name: res.data.data.company.companyName, id: res.data.data.company.companyId, type: res.data.data.company.type,checked:false},
            // {name: res.data.data.department.departmentName, id: res.data.data.department.departmentId, type: res.data.data.department.type,checked:false},
            // {name: res.data.data.group.groupName, id: res.data.data.group.groupId}
          )
          for (let item of res.data.data.group) {
            this.rangeList.push(
              {name:item.groupName,id:item.groupId,type:item.type,checked:false}
            )
          }
          for (let items of this.rangeList) {
            if (items.id == res.data.data.selected.rangeId) {
              items.checked =  true
              this.typeId = items.id
              this.type = items.type
            }
          }   
        }
      })
    }
  },
  mounted () {
    this.getSortRange()
    this.getList()
  }
}
</script>

<style scoped>
.el-dialog__body {
  padding: 37px 15% 50px !important;
}
.rangeMain {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.rangMain .rangeItem {
  flex: 0 1 32%;
  margin: auto .5%;
  display: flex;
  align-items: center;
}
.RankingTrend {
  min-height: 900px;
  background-color: #fff;
}
.navTitle {
  list-style: none;
  margin: 0;
  padding: 12px 0 0 0;
  display: inline-block;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #ededed;
}
.navTitle li{
  list-style: none;
  margin: 0;
  float: left;
  padding: 1px 30px 1px 30px;
  margin-bottom: 13px;
  border-right: 1px solid #ABABAB;
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(38,45,57,1);
}
.navTitle a{
  text-decoration:none;
  color:rgba(21,21,21,1);
}
.navTitle .active a{
  color:rgba(0,131,255,1) !important;
}
.divBox {
  padding: 20px 18px 28px 19px;

    background-color: #fff;
  margin-top: 10px;
  border:20px solid #F2F9FF;
}
#echartContainer {
  margin: 0 auto;
}
</style>
