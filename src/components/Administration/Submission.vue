<template>
  <div class="Submission">
    <ul class="navTitle">
      <li>
        <router-link to="/WebEntry">网页录入</router-link>
      </li>
      <li>
        <router-link to="/tableEntry">表格录入</router-link>
      </li>
      <li class="active">
        <router-link to="/Submission">已提交</router-link>
      </li>
      <li>
        <router-link to="/drafts">草稿箱</router-link>
      </li>
    </ul>
    <div class="clear"></div>
    <div class="bigBox">
      <div class="EventLibraryBox">
        <div class="EventLibraryBoxSelect">
          事件主题：
          <el-input class="inputTitle" placeholder="请输入事件主题" size="small" v-model="input2"></el-input>
          审核状态：
          <el-select v-model="input21" placeholder="请选择" size="small">
            <el-option label="全部" value="0"></el-option>
            <el-option label="待初审" value="1"></el-option>
            <el-option label="待终审" value="2"></el-option>
            <el-option label="审核通过" value="3"></el-option>
          </el-select>
          录入日期：
          <el-date-picker size="small" class="EventThemeDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="beginTime"></el-date-picker>
          至
          <el-date-picker size="small" class="EventThemeDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="endTime"></el-date-picker>
          <el-button type="primary" @click="getList" size="small">查询</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe style="width: 100%;margin-top:10px">
        <el-table-column prop="index" label="序号" align="center" width="100" :index="indexMethod"></el-table-column>
        <el-table-column prop="title" label="事件主題" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.type==0" class="mtt">
              <router-link :to="'/DetailsOfTheEvent/'+scope.row.id+'/'+scope.row.state+'/1'">{{scope.row.title}}</router-link>
            </div>
            <div v-else-if="scope.row.type==1" class="mtt">
              <router-link :to="'/DetailsOfTheTask/'+scope.row.id+'/'+scope.row.state+'/1'">{{scope.row.title}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="happenTime" label="奖扣日期" align="center"></el-table-column>
        <el-table-column prop="value" label="奖/扣分值" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.rewardValue}}/{{scope.row.reduceValue}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="firstExamineUserName" label="初审人" align="center"></el-table-column>
        <el-table-column prop="secondExamineUserName" label="终审人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="录入日期" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 1">待初审</span>
            <span v-else-if="scope.row.state == 2">待终审</span>
            <span v-else-if="scope.row.state == 3">审核通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
export default {
  name: "Submission",
  data() {
    return {
      tableData: [],
      input2: "",
      input21: "0",
      // state: '-1',
      beginTime: "",
      endTime: "",
      pageNumber: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.pageSize = Number(sessionStorage.getItem("pageSizeSub")) || 10;
    this.getList();
    // this.getrecallEvent()
  },
  methods: {
    indexMethod(index) {
      console.log(index);
      return index + 1;
    },
    getList() {
      this.$axios({
        url: "eventTitle/getSubmitEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          title: this.input2,
          state: this.input21 == 0 ? "" : this.input21,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          beginTime: this.beginTime == null ? "" : this.beginTime,
          endTime: this.endTime == null ? "" : this.endTime
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
          }
          this.total = res.data.data.totalRow;
          this.tableData = res.data.data.list;
          for (let item of this.tableData) {
            item.createTime = item.createTime.split(" ")[0];
          }
        }
      });
    },
    getrecallEvent() {
      this.$axios({
        url: "eventTitle/recallEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.recallEvent = res.data.data;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$axios({
        url: "eventTitle/recallEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          id: row.id
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          Message.success({
            message: "撤回成功！",
            customClass: "messageClass1",
            center: true
          });
          setTimeout(() => {
            this.tableData.splice(index, 1);
            // this.$router.back(-1)
          }, 2000);
        } else {
          Message.error({
            message: `${res.data.desc}`,
            customClass: "messageClass1",
            center: true
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      sessionStorage.setItem("pageSizeSub", this.pageSize);
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
      sessionStorage.setItem("pageSizeSub", "");
    }

    next();
  }
};
</script>

<style scoped>
.Submission {
  min-height: 1000px;
  background-color: #fff;
}
.bigBox {
  background-color: #f2f9ff;
  margin-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
}
.EventTitle {
  text-decoration: none;
  color: #606266;
}
.EventThemeDate {
  width: 170px;
  height: 46px;
}
.navTitle {
  list-style: none;
  display: inline-block;
  width: 100%;
  background-color: white;
  padding: 12px 0 0 0;
  margin: 0;
  box-sizing: border-box;
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
.EventLibraryBox {
  padding: 26px 0 0 0;
  background: rgba(242, 249, 255, 1);
  border-radius: 5px 5px 0px 0px;
}
.EventLibraryBoxSelect {
  color: rgba(32, 32, 32, 1);
  padding: 0 18px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 37px;
}
.searchInput {
  width: 430px;
  height: 46px;
}
.el-table {
  margin-top: 37px;
}
.el-pagination {
  margin-top: 43px;
  text-align: center;
  margin-bottom: 20px;
}
.inputTitle {
  width: 174px;
  height: 37px;
}
.el-select {
  width: 102px;
  height: 37px;
}
.el-date-editor {
  width: 132px;
  height: 37px;
}
</style>
