<template>
  <div class="drafts">
    <ul class="navTitle">
      <li>
        <router-link to="/WebEntry">网页录入</router-link>
      </li>
      <li>
        <router-link to="/tableEntry">表格录入</router-link>
      </li>
      <li>
        <router-link to="/Submission">已提交</router-link>
      </li>
      <li class="active">
        <router-link to="/drafts">草稿箱</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <el-table :data="tableData" stripe :row-class-name="recallDraftsClass">
        <el-table-column align="center" prop="index" label="序号" width="100" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="title" label="事件主题">
          <template slot-scope="scope">
            <span v-if="scope.row.firstExamineState ==2 || scope.row.secondExamineState == 2" class="inputActive mtt" @click="pageTo('/WebEntry', {id: scope.row.id})">{{scope.row.title}}</span>
            <span v-else class="url mtt" @click="pageTo('/WebEntry', {id: scope.row.id})">{{scope.row.title}}</span>
            <!-- <router-link :to="'/WebEntry/'+">{{scope.row.title}}</router-link> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="happenTime" label="奖扣日期"></el-table-column>
        <el-table-column align="center" prop="value" label="奖/扣分值">
          <template slot-scope="scope">
            <span>{{scope.row.rewardValue}}/{{scope.row.reduceValue}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="firstExamineUserName" label="初审人"></el-table-column>
        <el-table-column align="center" prop="secondExamineUserName" label="终审人"></el-table-column>
        <el-table-column align="center" prop="recordName" label="记录人"></el-table-column>
        <el-table-column align="center" prop="createTime" label="更新时间"></el-table-column>
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0">拟稿</span>
            <span v-else-if="scope.row.state == 1">待初审</span>
            <span v-else-if="scope.row.state == 2">待终审</span>
            <span v-else-if="scope.row.state == 3">审核通过</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
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
  name: "drafts",
  data() {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.pageSize = Number(sessionStorage.getItem("pageSizeDra")) || 10;
    this.getList();
  },
  methods: {
    recallDraftsClass({ row }) {
      console.log(row);
      if (row.firstExamineState == 2 || row.secondExamineState == 2) {
        return "recallDraftsClass";
      }
      return "";
    },
    pageTo(url, params) {
      this.$router.push({ path: url, query: params });
    },
    indexMethod(index) {
      return index + 1;
    },
    getList() {
      this.$axios({
        url: "eventTitle/getDraftEvent",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
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
          }
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$axios({
            url: "eventTitle/delDraftEvent",
            method: "POST",
            data: {
              sessionId: localStorage.getItem("sessionId"),
              id: row.id
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
                this.tableData.splice(index, 1);
                // this.$router.go(0)
              }, 1500);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            customClass: "messageClass1"
          });
        });
      // this.$alert(" 确认删除", {
      //   confirmButtonText: "确定",
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${ action }`,
      //       center: true
      //     });
      //     this.$axios({
      //       url: "eventTitle/delDraftEvent",
      //       method: "POST",
      //       data: {
      //         sessionId: localStorage.getItem("sessionId"),
      //         id: row.id
      //       },
      //       transformRequest: transformRequestFn
      //     })
      //       .then(res => {
      //         if (res.data.code === 1) {
      //           Message.success({
      //             message: res.data.desc,
      //             customClass: "messageClass1",
      //             center: true
      //           });
      //           setTimeout(() => {
      //             this.tableData.splice(index, 1);
      //             // this.$router.go(0)
      //           }, 1500);
      //         }
      //       })

      //   }
      // });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      sessionStorage.setItem("pageSizeDra", this.pageSize);
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
      sessionStorage.setItem("pageSizeDra", "");
    }

    next();
  }
};
</script>

<style>
.recallDraftsClass {
  color: red;
}
</style>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
/*.JumpEvent {
  text-decoration:none;
}*/
.drafts {
  min-height: 1000px;
  background-color: #fff;
}
.bigBox {
  background-color: #f2f9ff;
  margin-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
}
span.url {
  color: rgba(0, 131, 255, 1);
}
span.url:hover {
  cursor: pointer;
}
.EventTitle {
  text-decoration: none;
  color: #606266;
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
.el-table {
  margin-top: 19px;
}
.el-pagination {
  margin-top: 43px;
  text-align: center;
  margin-bottom: 20px;
}
.inputActive {
  color: red !important;
}
</style>
