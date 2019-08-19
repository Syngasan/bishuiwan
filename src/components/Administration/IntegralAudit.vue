<template>
  <div class="IntegralAudit">
    <ul class="navTitle">
      <li class="active">
        <router-link to="/IntegralAudit">待审核</router-link>
      </li>
      <li>
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
          <el-date-picker class="dateInput" size="small" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="firstBeginTime"></el-date-picker>
          至
          <el-date-picker class="dateInput" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="firstEndTime"></el-date-picker>
        </el-col>
        <el-col :span="12">
          录入日期：
          <el-date-picker size="small" class="dateInput" type="date" placeholder="选择日期" v-model="secondBeginTime" @change="setTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          至
          <el-date-picker class="dateInput" size="small" type="date" placeholder="选择日期" v-model="secondEndTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          <el-button type="primary" @click="getList" size="small" style="position: absolute;
    right: 21px;
    width: 74px;">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" max-height="500" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="index" label="序号" width="100" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="title" label="事件主题">
          <template slot-scope="scope">
            <div v-if="scope.row.type==0" class="mtt" :class="[scope.row.secondExamineState==3&&'inputActive']">
              <router-link :to="'/DetailsOfTheEvent/'+scope.row.id+'/'+scope.row.state + '/0'">{{scope.row.title}}</router-link>
            </div>
            <div v-else-if="scope.row.type==1" class="mtt" :class="[scope.row.secondExamineState==3&&'inputActive']">
              <router-link :to="'/DetailsOfTheTask/'+scope.row.id+'/'+scope.row.state + '/0'">{{scope.row.title}}</router-link>
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
            <div v-if="scope.row.state==0">拟稿</div>
            <div v-else-if="scope.row.state==1">待初审</div>
            <div v-else-if="scope.row.state==2">待终审</div>
            <div v-else-if="scope.row.state==3">审核通过</div>
            <div v-else>未知</div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px">
        <el-button type="primary" size="small" style="width: 74px;" @click="batchExamine(0)">同意</el-button>
        <el-button type="danger" size="small" style="width: 74px;" @click="batchExamine(1)">退回</el-button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { batchExamine } from "@/utils/axios/axios";
export default {
  name: "IntegralAudit",
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
      secondEndTime: "",
      batchExamineID: []
    };
  },
  created() {
    console.log(this.pageSize);
    this.pageSize = Number(sessionStorage.getItem("pageSize")) || 10;
    this.getList();
    localStorage.setItem("currentPath", this.$route.path);
    console.log(this.$route.path);
  },
  methods: {
    // 批量审核
    batchExamine(val) {
      // if (val == 0) {
      //   let params = {
      //   sessionId: localStorage.getItem("sessionId"),
      //   reason: "",
      //   state: 1,
      //   // id: this.batchExamineID.toString()
      //   id :this.hhh(this.multipleSelection).toString()
      // };
      // console.log(params.id);
      // batchExamine(this.$qs.stringify(params)).then(res => {
      //   console.log(res);
      //   if (res.code === 1) {
      //     this.$message({
      //       message: res.desc,
      //       type: "success",
      //       customClass: "messageClass1"
      //     });
      //     this.getList();
      //   }
      // });
      // } else {
      //   let params = {
      //   sessionId: localStorage.getItem("sessionId"),
      //   reason: "",
      //   state: 2,
      //   id :this.hhh(this.multipleSelection).toString()
      // };
      // batchExamine(this.$qs.stringify(params)).then(res => {
      //   console.log(res);
      //   if (res.code === 1) {
      //     this.$message({
      //       message: res.desc,
      //       type: "success",
      //       customClass: "messageClass1"
      //     });
      //     this.getList();
      //   }
      // });
      // }
      this.$prompt("请填写审核意见：", " ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          console.log(value);
          if (val == 0) {
            let params = {
              sessionId: localStorage.getItem("sessionId"),
              reason: value,
              state: 1,
              id: this.getItemId(this.multipleSelection).toString()
            };
            console.log(params.id);
            batchExamine(this.$qs.stringify(params)).then(res => {
              console.log(res);
              if (res.code === 1) {
                this.$message({
                  message: res.desc,
                  type: "success",
                  customClass: "messageClass1"
                });
                this.getList();
              }
            });
          } else {
            let params = {
              sessionId: localStorage.getItem("sessionId"),
              reason: value,
              state: 2,
              id: this.getItemId(this.multipleSelection).toString()
            };
            batchExamine(this.$qs.stringify(params)).then(res => {
              console.log(res);
              if (res.code === 1) {
                this.$message({
                  message: res.desc,
                  type: "success",
                  customClass: "messageClass1"
                });
                this.getList();
              }
            });
          }
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("你买啥了", this.multipleSelection);

      // this.batchExamineID.length = this.multipleSelection.length
      // for (let item of this.multipleSelection) {
      //   this.batchExamineID.push(item.id)
      // }
      // for (let items of this.multipleSelection) {
      //     this.batchExamineID = this.multipleSelection.filter(
      //       (item, index, arr) => item.id
      //     );
      //   }
      // if (this.batchExamineID.length != 0) {
      console.log("删除");

      // if (this.multipleSelection.length == 0) {
      //   this.batchExamineID = [];
      // } else {
      //   for (let i in this.batchExamineID) {
      //     for (let y in this.multipleSelection) {
      //       if (this.batchExamineID[i] == this.multipleSelection[y].id) {
      //         console.log("已存在", this.batchExamineID[i]);

      //         this.batchExamineID = this.multipleSelection.filter(
      //           (item, index, arr) =>  this.batchExamineID[i] !=   item.id
      //         );
      //         this.batchExamineID = this.batchExamineID.filter(
      //           (item, index, arr) =>  typeof(item) == 'string'
      //         );
      //       }
      //     }
      //   }
      // }
      // } else {
      console.log("新增");

      // this.multipleSelection.map(item => {
      //   this.batchExamineID.push(item.id);
      // });
      // for (let it of this.multipleSelection) {
      //   this.batchExamineID.push(it.id)
      // }
      // this.batchExamineID = [...new Set(this.batchExamineID)];
      // }

      console.log(this.batchExamineID, "审核id");
    },
    getItemId(arr) {
      let ids = [];
      for (let i = 0; i < arr.length; i++) {
        ids.push(arr[i].id);
      }
      console.log(ids);

      return ids;
    },
    setTime(e) {
      console.log(e);
    },
    indexMethod(index) {
      return index + 1;
    },
    tableRowClassName({ row }) {
      if (row.secondExamineState == 3) {
        return "success-row";
      }
      return "";
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
          state: 0,
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
          }
          this.total = res.data.data.totalRow;
          this.tableData = res.data.data.list;
          for (let item of this.tableData) {
            item.createTime = item.createTime.split(" ")[0];
            item.submitTime = item.submitTime.split(" ")[0];
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      sessionStorage.setItem("pageSize", this.pageSize);
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
      sessionStorage.setItem("pageSize", "");
    }

    next();
  }
};
</script>

<style>
.success-row {
  color: #ff2727;
}
.inputActive a {
  color: red !important;
}
</style>

<style scoped>
.IntegralAudit {
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
.bigBox {
  background-color: #f2f9ff;
  padding-top: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.navTitle {
  display: inline-block;
  width: 100%;
  background-color: white;
  padding-top: 12px;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
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
</style>
  <style>
/* .el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: auto !important;
  background-color: #c0c0c0 !important;
} */
</style>