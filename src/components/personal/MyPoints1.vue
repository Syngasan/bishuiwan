<template>
  <div>
    <!-- <inheader></inheader> -->
    <div class="MyPoints">
      <ul class="navTitle">
        <li class="active">
          <router-link to="/personal/MyPoints/MyPoints1">月积分</router-link>
        </li>
        <li>
          <router-link to="/personal/MyPoints/AccumulativeIntegral">累计积分</router-link>
        </li>
        <li>
          <router-link to="/personal/MyPoints/IntegralTrend">积分趋势</router-link>
        </li>
        <li>
          <router-link to="/personal/MyPoints/RankingTrend">排名趋势</router-link>
        </li>
        <li style="float: right !important;cursor: pointer;border-right: 0px solid #fff !important" @click="getRange"><img src="./img/my_icon_sz@2x.png"></li>
      </ul>
      <div class="divBox">
        <el-row>
          <el-col :span="8" style="margin-left:10px">
            选择月份：
            <el-date-picker class="EventTheme" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月份" size="small" v-model="date1"></el-date-picker>

          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="getList" size="small">查询</el-button>
          </el-col>
          <div class="clear"></div>
          <el-col :span="12" class="marginTopBox">
            <div class="boxPadding flexboxPadding" style="height:335px">
              <div class="title">{{list.sortName}}</div>
              <div class="desc">{{month}}月排名</div>
              <div class="descNum">{{list.currentSort}}</div>
              <div class="descForList">
                <span>上月排名：{{list.previouslySort}}</span>
                <span class="PointsDesc">排名变化：{{list.change}}</span>
              </div>
            </div>
            <div class="forBox"></div>
            <div class="boxPadding flexboxPadding" style="height:335px">

              <div class="title">积分</div>
              <div class="desc">{{month}}月积分</div>
              <div class="descNum">{{list.thisMonth}}</div>
              <div class="descForList">
                <span>上月积分：{{list.preMonth}}</span>
                <span class="PointsDesc">累计积分：{{list.account}}</span>
              </div>

            </div>
          </el-col>
          <el-col :span="12" class="marginTopBox">
            <div class="boxPadding" style="height:685px">
              <div class="desc descMonth">{{month}}月积分分析</div>
              <!--创建一个echarts的容器-->
              <div id="echartContainer" style="width:400px; height:400px"></div>
              <div class="allgroud">
                <div class="TotalIntegral">总积分：{{list.total}}分</div>
                <div class="daily">日常奖扣分：{{list.totalDaily}}分</div>
                <div class="Buckle">奖扣任务分：{{list.totalReward}}分</div>
                <div class="fixedS">固定积分：{{list.totalSteady}}分</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-dialog title="设置默认排名范围" :visible.sync="dialogVisible" :center='true' :top="'29vh'" width="30%">
        <div class="rangeMain">
          <div v-for="items in rangeList" :key="items.id" class="rangeItem">
            <input type="radio" :label="items.name" :value="items.name" name='radio' :checked="items.checked" @change="radioChange(items.id,items.type)"> {{items.name}}
          </div>

        </div>
        <!-- <template>
           <el-row>
            <el-col :span="12"><el-radio v-model="radio1" :label="0">按小组名排</el-radio></el-col>
            <el-col :span="12"><el-radio v-model="radio1" :label="1">按部门排</el-radio></el-col>
            <el-col :span="12"><el-radio v-model="radio1" :label="2">按子公司排</el-radio></el-col>
            <el-col :span="12"> <el-radio v-model="radio1" :label="3">按公司排</el-radio></el-col>
          </el-row>
        </template> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setSortType">确 定</el-button>
        </span>
      </el-dialog>

      <!-- <el-dialog title="设置默认排名范围" :visible.sync="dialogVisible" width="20%" :center='true'>
        <template>
          <el-radio v-model="radio" :label="item.id" :key="index" v-for="(item,index) in rangeList">{{item.name}}</el-radio>

        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1=true,dialogVisible=false">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="设置默认排名范围" :visible.sync="dialogVisible1" width="20%" :center='true'>
        <el-row>
          <el-col :span="12"><el-radio v-model="radio1" :label="0">按小组名排</el-radio></el-col>
          <el-col :span="12"><el-radio v-model="radio1" :label="1">按部门排</el-radio></el-col>
          <el-col :span="12"><el-radio v-model="radio1" :label="2">按子公司排</el-radio></el-col>
          <el-col :span="12"> <el-radio v-model="radio1" :label="3">按公司排</el-radio></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1= false">取 消</el-button>
          <el-button type="primary" @click="setRange">确 定</el-button>
        </span>
    </el-dialog> -->
    </div>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { curentYearMonth } from "@/utils/date/getDate";
import inheader from "@/components/comp/inheader";
export default {
  name: "MyPoints",
  components: {
    inheader
  },
  data() {
    return {
      radiogroup: -1,
      radio: "1",
      radio1: 0,
      dialogVisible: false,
      dialogVisible1: false,
      date1: "",
      month: "",
      list: "",
      chartData: [],
      chartList: [],
      rangeList: [],
      groupList: [],
      type: "",
      typeId: "",
      checked: true
    };
  },
  methods: {
    getList() {
      this.chartData = [];
      this.chartList = [];
      this.month = this.date1.split("-")[1];
      this.$axios({
        url: "score/getMyScore",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          date: this.date1 + "-01"
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.list = res.data.data;
          for (var i = 0; i < res.data.data.list.length; i++) {
            this.chartData.push(res.data.data.list[i].name);
            this.chartList.push({
              name: res.data.data.list[i].name,
              value: res.data.data.list[i].ratio
            });
          }
          console.log(res, "00000000000000");

          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(
            document.getElementById("echartContainer")
          );
          // 绘制图表
          myChart.setOption({
            // title: { text: 'ECharts 入门示例' },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              right: 0,
              bottom: 0,
              data: this.chartData
            },
            color: ["#ffa92a", "#fb1f20", "#64c21d", "#2ea2f7"],
            lebal: [],

            calculable: true,
            series: [
              {
                name: "数据",
                type: "pie",
                radius: "60%",
                center: ["50%", "40%"],
                data: this.chartList
              }
            ]
          });
        }
      });
    },
    // radio值
    radioChange(value, types) {
      console.log("radio值", value, types);
      this.typeId = value;
      this.type = types;
    },
    // radio值 小组
    radioChangeGroup(value) {
      console.log("radio值", value);
      this.typeId = value;
      this.type = 0;
    },
    // 获取排名范围
    getSortRange() {
      this.$axios({
        url: "sort/getSortRange",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.rangeList.push(
            {
              name: res.data.data.business.businessName,
              id: res.data.data.business.businessId,
              type: res.data.data.business.type,
              checked: false
            },
            {
              name: res.data.data.company.companyName,
              id: res.data.data.company.companyId,
              type: res.data.data.company.type,
              checked: false
            }
            // {
            //   name: res.data.data.department.departmentName,
            //   id: res.data.data.department.departmentId,
            //   type: res.data.data.department.type,
            //   checked: false
            // }
            // {name: res.data.data.group.groupName, id: res.data.data.group.groupId}
          );

          for (let item of res.data.data.group) {
            this.rangeList.push({
              name: item.groupName,
              id: item.groupId,
              type: item.type,
              checked: false
            });
          }
          for (let items of this.rangeList) {
            if (items.id == res.data.data.selected.rangeId) {
              items.checked = true;
              this.typeId = items.id;
              this.type = items.type;
            }
          }
        }
      });
    },
    // 设置排名范围
    setSortType() {
      this.$axios({
        url: "sort/setSortType",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          id: this.typeId,
          type: this.type
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: res.data.desc,
            customClass: "messageClass1"
          });
          this.dialogVisible = false;
          this.rangeList = [];
          this.getList();
          this.getSortRange();
        }
      });
    },
    getRange() {
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.date1 = curentYearMonth();
    this.getList();
    this.getSortRange();
  }
};
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
  margin: auto 0.5%;
  display: flex;
  align-items: center;
}
.MyPoints {
  /* min-height: 900px; */
  background-color: #fff;
}
.navTitle {
  list-style: none;
  margin: 0;
  padding: 12px 0 0 0;
  display: inline-block;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #EDEDED;
}
.navTitle li {
  list-style: none;
  margin: 0;
  float: left;
  padding: 1px 30px 1px 30px;
  margin-bottom: 13px;
  border-right: 1px solid #ababab;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(38, 45, 57, 1);
}
.navTitle a {
  text-decoration: none;
  color: rgba(21, 21, 21, 1);
}
.navTitle .active a {
  color: rgba(0, 131, 255, 1) !important;
}
.divBox {
  padding: 20px 18px 28px 19px;
  box-sizing: border-box;
  height: 802px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(27, 30, 29, 1);
  background-color: #F2F9FF;
  margin-top: 10px;
}
.EventTheme {
  width: 195px;
  /* height: 46px; */
}
.marginTopBox {
  padding: 10px;
}
.boxPadding {
  padding: 15px 21px;
  /* border: 1px dotted #ccc; */
  background-color: #fff;
  box-sizing: border-box;
}
.flexboxPadding {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 19px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(10, 143, 246, 1);
  /* line-height: 0px; */
}
.desc {
  /* margin-top: 41px; */
  text-align: center;
  font-size: 22px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
}
.descNum {
  font-size: 70px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(29, 161, 243, 1);
  text-align: center;
  /* margin-top: 57px; */
}
.descForList {
  font-size: 19px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(37, 37, 37, 1);
  /* margin-top: 77px; */
}
.PointsDesc {
  margin-left: 65px;
}
.forBox {
  height: 15px;
}
.echartContainer {
  margin-top: 33px;
}
.TotalIntegral {
  font-size: 27px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(13, 13, 13, 1);
}
.daily {
  margin-top: 24px;
  font-size: 20px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(99, 99, 99, 1);
}
.Buckle {
  margin-top: 21px;
  font-size: 20px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(99, 99, 99, 1);
}
.fixedS {
  margin-top: 22px;
  font-size: 20px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(99, 99, 99, 1);
  padding-bottom: 48px;
}
.allgroud {
  margin-top: -98px
}
.descMonth {
  margin-top: 40px
}
</style>
