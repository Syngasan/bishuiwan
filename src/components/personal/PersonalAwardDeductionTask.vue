<template>
  <div class="PersonalAwardDeductionTask">
    <el-row class="IntegralAuditBox">
      <el-col :span="12">
        完成状态：
        <el-select v-model="state" class="EventTheme" placeholder="请选择完成状态" size="small">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="未达标" value="0"></el-option>
          <el-option label="已达标" value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        结算状态：
        <el-select v-model="settlement" class="EventTheme" placeholder="请选择结算状态" size="small">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="未结算" value="0"></el-option>
          <el-option label="已结算" value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        任务名称：
        <el-input class="EventTheme" placeholder="请输入任务名称" v-model="name" size="small"></el-input>
      </el-col>
      <el-col :span="12" class="textR">
        <el-button type="primary" @click="getList" size="small" class="btnn">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe >
      <el-table-column align="center" width="80px" type="index" label="序号"></el-table-column>
      <el-table-column align="center" min-width="100px" prop="createTime" label="任务周期"></el-table-column>
      <el-table-column align="center" min-width="50px" prop="taskName" label="任务名称"></el-table-column>
      <el-table-column align="center" min-width="50px" label="任务指标">
        <template slot-scope="scope">
          <span>{{scope.row.reward}}/{{scope.row.completeDeduction}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="50px" prop="completeReward" label="完成值">
      </el-table-column>
      <el-table-column align="center" min-width="50px" prop="state" label="完成状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未达标</span>
          <span v-else-if="scope.row.state == 1">已达标</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="50px" prop="punish" label="积分扣罚"></el-table-column>
      <el-table-column align="center" min-width="50px" prop="settlement" label="结算状态">
        <template slot-scope="scope">
          <span v-if="scope.row.settlement == 0">未结算</span>
          <span v-else-if="scope.row.settlement == 1">已结算</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <!-- <el-col :span="4">
        <el-button plain type="primary">导出excel</el-button>
      </el-col> -->
      <el-col :span="24">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
export default {
  name: "PersonalAwardDeductionTask",
  data() {
    return {
      name: "",
      state: "-1",
      settlement: "-1",
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    rowClass({ row, rowIndex }) {
      console.log(rowIndex); //表头行标号为0
      return "background:red";
    },
    getList() {
      this.$axios({
        url: "reward/listMyRewardTask",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          name: this.name,
          state: this.state,
          settlement: this.settlement,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.tableData = res.data.data;
          for (let item of this.tableData) {
            item.createTime = item.createTime.split(" ")[0];
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.PersonalAwardDeductionTask {
  min-height: 800px;
  background-color: #F2F9FF;
}
.EventTheme {
  width: 318px;
  height: 46px;
}
.EventThemeDate1 {
  width: 250px;
  height: 46px;
}
.EventThemeDate {
  width: 150px;
  height: 46px;
}
.EventThemeNum {
  width: 83px;
  height: 46px;
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
.btnn {
  margin-right: -22px;
}
.el-table {
  margin-top: 19px;
}
.el-pagination {
  text-align: center;
  margin-top: 19px;
}
.textR {
  text-align: right;
  padding-right: 90px;
}
</style>