<template>
  <div class="hall" >
      <div class="header_title">
        <div class="header_title_left">
        {{ name }}积分分析</div>
        <div class="btn" @click="btn()">返回</div>
      </div>
    <div class="content">
      <div id="myChart" :style="{width: '600px', height: '500px'}" class="myCharts">      </div>
          <div class="TotalIntegral">总积分：{{list.total}}分</div>
        <div class="content_flex">
            <div class="daily" style="margin-left:10px;">日常奖扣分：{{list.totalDaily}}分</div>
            <div class="Buckle" style="margin-left:10px;">奖扣任务分：{{list.totalReward}}</div>
            <div class="fixedS" style="margin-left:10px;">固定积分：{{list.totalSteady}}分</div>
        </div>

            
    </div>
  </div>

</template>

<script>
import {getScoreAnalysisByAccumulate,getCustomizeScoreAnalysisByAccumulate} from '@/utils/axios/axios'
export default {
  name: 'echarts',
  data () {
    return {
      list: '',
      chartData: [],
      chartList: [],
      begin:'',
      end:''  ,
      name:''
    }
  },
  mounted () {
    this.init()
    // this.drawLine()
  },
  methods: {
    drawLine () {      
      // this.chartData = []
      // this.chartList = []
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '日常奖扣分占比分析',
          // subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.chartList
        },
        color: ['#ffa92a','#fb1f20','#64c21d','#2ea2f7'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartList

                                    // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        ]
      })
    },
    init () {
      if(this.$route.query.departmentId) {
          let params = {
          sessionId:localStorage.getItem('sessionId'),
          departmentId:this.$route.query.departmentId,
          keyword:this.$route.query.keyword,
        }
        // console.log(params,'分析参数',this.$route.query);
        getScoreAnalysisByAccumulate( this.$qs.stringify(params) ).then(res=>{
          // console.log(res.data,'分析');
          if (res.code ===1) {
              this.list=res.data
            // this.chartList = res.data
            // this.chartData = res.data
            // console.log(  this.list ,'定义',this.$route.query);
            this.name = res.data.name
            for ( let i=0;i<res.data.list.length;i++) {
              //  this.chartData.push(res.data.list[i].name)
              this.chartList.push({name:res.data.list[i].name, value: res.data.list[i].ratio})
            }
            console.log(this.chartData,this.chartList);
            this.drawLine()
          }
        })
      } else {
        console.log('自定义分析');
        
        let params = {
          sessionId:localStorage.getItem('sessionId'),
          groupId:this.$route.query.groupId,
          reportId:this.$route.query.reportId,
          keyword:this.$route.query.keyword,
        }
        // console.log(params,'分析参数',this.$route.query);
        getCustomizeScoreAnalysisByAccumulate( this.$qs.stringify(params) ).then(res=>{
          // console.log(res.data,'分析');
          if (res.code ===1 ) {
              this.list=res.data
            // this.chartList = res.data
            // this.chartData = res.data
            // console.log(  this.list ,'定义',this.$route.query);
            this.name = res.data.name
            for ( let i=0;i<res.data.list.length;i++) {
              //  this.chartData.push(res.data.list[i].name)
              this.chartList.push({name:res.data.list[i].name, value: res.data.list[i].ratio})
            }
            console.log(this.chartData,this.chartList);
            this.drawLine()
          }
        })
      }
    },
    btn () {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="scss" scoped>
  .hall {
      background-color: #F2F9FF;
      box-sizing: border-box;
      padding: 20px 15px;
  }
  .header_title {
    text-align: left;
    display: flex;
    justify-content: space-between;
    height: 50px;
     .header_title_left {
    //  width:183px;
      height:10px;
      font-size:10px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color:rgba(0,0,0,1);
      line-height:0px;
    }
    .btn {
      text-align: center;
      width:41px;
      height:15px;
      line-height: 15px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(10,143,246,1);
      border-radius:3px;
    }
  }

  .myCharts {
    margin:auto ;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding: 20px 15px;
  }
  .content_flex {
    display: flex;
    justify-content: flex-start;
  }
  .TotalIntegral {
  font-size:27px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(13,13,13,1);
  text-align: left;
}
.daily {
  margin-top: 24px;
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(99,99,99,1);
}
.Buckle {
  margin-top: 24px;
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(99,99,99,1);
}
.fixedS {
  margin-top: 24px;
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(99,99,99,1);
  padding-bottom: 48px;
}
</style>
