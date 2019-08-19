<template>
  <div class="Audited">
    <ul class="navTitle">
      <li>
        <router-link to="/IntegralAudit">待审核</router-link>
      </li>
      <li class="active">
        <router-link to="/Audited">已审核</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <el-row class="IntegralAuditBox">
        <el-col :span="12">事件主题：
          <el-input size="small" class="EventTheme" placeholder="请输入事件主题" v-model="title"></el-input>
        </el-col>
        <el-col :span="12">初 审 人 :
          <el-input size="small" style="margin-left:15px" class="EventTheme" placeholder="请输入初审人姓名" v-model="nick"></el-input>
        </el-col>
        <el-col :span="12">
          奖扣日期：
          <el-date-picker class="dateInput" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="firstBeginTime"></el-date-picker>
          至
          <el-date-picker class="dateInput" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="firstEndTime"></el-date-picker>
        </el-col>
        <el-col :span="12">
          录入日期：
          <el-date-picker class="dateInput" size="small" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="secondBeginTime"></el-date-picker>
          至
          <el-date-picker class="dateInput" size="small" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="secondEndTime"></el-date-picker>
          <el-button type="primary" size="small" @click="getList" style="position: absolute;
    right: 21px;
    width: 74px;">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe  max-height="500" >
        <!-- <el-scrollbar style="height:500px;"> -->
        <el-table-column align="center" prop="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="title" label="事件主题">
          <template slot-scope="scope">
            <div v-if="scope.row.type==0">
              <router-link :to="'/DetailsOfTheEvent/'+scope.row.id+'/'+scope.row.state + '/0'" class="mtt">{{scope.row.title}}</router-link>
            </div>
            <div v-else-if="scope.row.type==1">
              <router-link :to="'/DetailsOfTheTask/'+scope.row.id+'/'+scope.row.state + '/1'" class="mtt">{{scope.row.title}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="happenTime" label="奖扣日期"></el-table-column>
        <el-table-column align="center" label="奖/扣分值">
          <template slot-scope="scope">
            <span>{{scope.row.rewardValue}}/{{scope.row.reduceValue}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="firstExamineUserName" label="初审人"></el-table-column>
        <el-table-column align="center" prop="secondExamineUserName" label="终审人"></el-table-column>
        <el-table-column align="center" prop="recordName" label="记录人"></el-table-column>
        <el-table-column align="center" prop="createTime" label="录入日期"></el-table-column>
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.state==0">拟稿(未提交)</div> -->
            <!-- <div v-else-if="scope.row.state==1">待初审</div> -->
            <div v-if="scope.row.state==2">待终审</div>
            <div v-else-if="scope.row.state==3">审核通过</div>
            <div v-else>未知</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="recallExamineEvent(scope.row.id)">撤回</el-button>
          </template>
        </el-table-column>
        <!-- </el-scrollbar> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
export default {
  name: "Audited",
  data() {
    return {
      EventTheme: "",
      FirstInstance: "",
      date1: "",
      date2: "",
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      title: "",
      nick: "",
      firstBeginTime: "",
      firstEndTime: "",
      secondBeginTime: "",
      secondEndTime: ""
    };
  },
  created() {
    this.pageSize = Number(sessionStorage.getItem('pageSizeAudited')) || 10
    this.getList();
  },
  methods: {
    recallExamineEvent(item) {
      this.$axios({
        url: "examiner/recallExamineEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          id: item
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          Message.success({
            message: res.data.desc,
            customClass: "messageClass1",
            center: true
          });
          setTimeout(() => {
            this.getList();
          }, 1500);
        } else {
          Message.error({
            message: res.data.desc,
            customClass: "messageClass1",
            center: true
          });
        }
      });
    },
    getList() {
      this.$axios({
        url: "examiner/getExamineEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          title: this.title,
          state: 1,
          nick: this.nick,
          firstBeginTime:
            this.firstBeginTime == null ? "" : this.firstBeginTime,
          firstEndTime: this.firstEndTime == null ? "" : this.firstEndTime,
          secondBeginTime:
            this.secondBeginTime == null ? "" : this.secondBeginTime,
          secondEndTime: this.secondEndTime == null ? "" : this.secondEndTime
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res);
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
            res.data.data.list[i].createTime = res.data.data.list[
              i
            ].createTime.split(" ")[0];
          }
          this.total = res.data.data.totalRow;
          this.tableData = res.data.data.list;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      sessionStorage.setItem("pageSizeAudited", this.pageSize);
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "DetailsOfTheEvent") {

    } else if (to.name == "DetailsOfTheTask") {

    } else {
      sessionStorage.setItem("pageSizeAudited", "");
    }

    next();
  }
};
</script>

<style scoped>
.Audited {
  padding-bottom: 50px;
  min-height: 800px;
  background-color: #fff;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navTitle {
  display: inline-block;
  width: 100%;
  background-color: white;
  padding-top: 12px;
  border-bottom: 1px solid #ededed;
}
.navTitle li {
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
.bigBox {
  background-color: #f2f9ff;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 10px;
}
.IntegralAuditBox {
  margin-top: 20px;
  padding: 0px 19px;

  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
}
.EventTheme {
  width: 290px;
  height: 46px;
}
.dateInput {
  width: 132px;
}
.el-table {
  margin-top: 19px;
}
.el-pagination {
  text-align: center;
  margin-top: 19px;
}
/* .tableA {
  overflow-y: auto;
} */
</style>

<style>

</style>