<template>
  <div class="integralSelect">
    <ul class="navTitle">
      <li class="active">
        <router-link to="/integralSelect">积分构成</router-link>
      </li>
      <li>
        <router-link to="/Prizes">奖扣明细</router-link>
      </li>
      <li>
        <router-link to="/BuckleExecution">奖扣执行</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <el-row class="IntegralAuditBox">
        <el-col :span="10">姓名或工号：
          <el-input size="small" class="EventTheme" placeholder="请输入姓名或工号" v-model="name"></el-input>
        </el-col>
        <el-col :span="10">
          选 择 部 门：
          <!-- <el-select v-model="AllConcatTypeId" class="EventTheme" placeholder="请选择部门">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in AllConcatType"></el-option>
        </el-select> -->
          <el-cascader placeholder="碧水湾" size='small' expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
          </el-cascader>
        </el-col>

      </el-row>
      <el-row style=" padding: 0px 19px; margin-top: 10px;" class="IntegralAuditBox">
        <el-col :span="10">
          排 序 依 据：
          <el-select v-model="sort" class="" placeholder="请选择排序依据" size="small">
            <el-option label="用户" value="0"></el-option>
            <el-option label="姓名" value="1"></el-option>
            <el-option label="部门" value="2"></el-option>
            <el-option label="工号" value="3"></el-option>
            <el-option label="日常奖分" value="4"></el-option>
            <el-option label="奖扣积分" value="5"></el-option>
            <el-option label="固定积分" value="6"></el-option>
            <el-option label="总积分" value="7"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <!-- 选 择 月 份：<el-date-picker class="EventTheme" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月份" v-model="date1"></el-date-picker> -->
          选 择 月 份：
          <el-date-picker size="small" class="" v-model="month" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
          <!-- <el-date-picker class="EventTheme" type="data" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月份" v-model="month"></el-date-picker> -->
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="getList" size="small" style="position: absolute;
    right: 112px;
    width: 74px;">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe>
        <el-table-column align="center" prop="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="realName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="department" label="部门"></el-table-column>
        <el-table-column align="center" prop="number" label="工号"></el-table-column>
        <el-table-column align="center" prop="dailyIntegral" label="日常奖扣分"></el-table-column>
        <el-table-column align="center" prop="buckleIntegral" label="奖扣任务分"></el-table-column>
        <el-table-column align="center" prop="fixIntegral" label="固定积分"></el-table-column>
        <el-table-column align="center" prop="totalIntegral" label="总积分"></el-table-column>
      </el-table>
      <el-row style="margin-top:10px">
        <el-col :span="4">
          <el-button type="primary" @click="exportExcel">导出excel</el-button>
        </el-col>
        <el-col :span="20" style="margin-top:20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
// import { curentYearMonth } from '@/utils/date/getDate'
import {
  ifSettlement,
  settlement,
  getAllDepartment,
  personal
} from "@/utils/axios/axios";

export default {
  name: "integralSelect",
  data() {
    return {
      sort: "",
      name: "",
      // date1: '',
      month: "",
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      AllConcatType: [],
      AllConcatTypeId: "",
      AllArgument: [],
      AllArgumentId: "",
      selectedOptions2: [],
      prop: {
        value: "id",
        children: "children",
        label: "name"
      },
      option: [],
      departmentId: "",
      myId: ""
    };
  },

  methods: {
    // 当前月份
    curentMonth() {
      var now = new Date();
      var year = now.getFullYear(); // 年
      var month = now.getMonth() + 1; // 月
      var day = now.getDate(); // 日
      var clock = year + "-";
      if (month < 10) {
        clock += "0";
      }
      clock += month + "-";
      if (day < 10) {
        clock += "0";
      }
      clock += day;
      return clock;
    },
    // 个人信息
    getPersonal() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      personal(this.$qs.stringify(params)).then(res => {
        if (res.code == 1) {
          console.log(res, "个人");
          this.myId = res.data.departmentId;
          this.departmentId = this.myId;
          console.log(this.departmentId, "个人");
        }
      });
    },
    handleChange(value) {
      console.log(
        this.selectedOptions2[this.selectedOptions2.length - 1],
        "选中部门",
        value
      );
      this.departmentId = this.selectedOptions2[
        this.selectedOptions2.length - 1
      ];
      this.queryType = 2;
    },
    exportExcel() {
      window.location.href =
        "http://47.107.71.47/bishuiwan/api/score/ExportIntegralCompositionExcel?sessionId=" +
        localStorage.getItem("sessionId") +
        "&name=" +
        this.name +
        "&month=" +
        this.month +
        "&departmentId=" +
        this.departmentId +
        "&pageNumber=" +
        this.pageNumber +
        "&pageSize=" +
        this.pageSize +
        "&sort=" +
        this.sort;
    },
    getAllConcatType() {
      this.$axios({
        url: "department/getAllConcatName",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.AllConcatType = res.data.data;
        }
      });
    },
    getAugrment() {
      // this.$axios({
      //   url: 'department/getAllJsonDepartment',
      //   method: 'POST',
      //   data: {
      //     sessionId: localStorage.getItem('sessionId'),
      //     departmentId:this.departmentId
      //   },
      //   transformRequest: transformRequestFn
      // }).then((res) => {
      //   if (res.data.code === 1) {
      //     this.option = res.data
      //   }
      // })
      let params = {
        sessionId: localStorage.getItem("sessionId"),
      };
      // console.log(this.departmentId,'是是是');

      getAllDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // for (let item of this.option) {
          //       item = res.data
          //       console.log(item,'没');

          //   }
          // this.option.push(res.data)
          this.option = res.data;
          this.options = this.option;
          console.log(this.departmentId);

          if (this.options) {
            try {
              for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].id == this.myId) {
                  this.selectedOptions2 = [this.options[i].id];
                  this.vals = [this.options[i].name];
                  break;
                }
                if (this.options[i].children) {
                  let children1 = this.options[i].children;
                  for (let j = 0; j < children1.length; j++) {
                    if (
                      children1[j].id == this.myId
                      // &&
                      // children1[j].hasOwnProperty("head")
                    ) {
                      this.selectedOptions2 = [
                        this.options[i].id,
                        children1[j].id
                      ];
                      this.vals = [this.options[i].name, children1[j].name];
                      break;
                    }
                    if (children1[j].children) {
                      let children2 = children1[j].children;
                      for (let g = 0; g < children2.length; g++) {
                        if (
                          children2[g].id == this.myId
                          //  &&
                          // children2[g].hasOwnProperty("head")
                        ) {
                          this.selectedOptions2 = [
                            this.options[i].id,
                            children1[j].id,
                            children2[g].id
                          ];
                          this.vals = [
                            this.options[i].name,
                            children1[j].name,
                            children2[g].name
                          ];
                          break;
                        }
                        if (children2[g].children) {
                          let children3 = children2[g].children;
                          for (let h = 0; h < children3.length; h++) {
                            if (
                              children3[h].id == this.myId
                              // &&
                              // children3[h].hasOwnProperty("head")
                            ) {
                              this.selectedOptions2 = [
                                this.options[i].id,
                                children1[j].id,
                                children2[g].id,
                                children3[h].id
                              ];
                              this.vals = [
                                this.options[i].name,
                                children1[j].name,
                                children2[g].name,
                                children3[h].name
                              ];
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              this.myId = Number(this.myId);
              this.getList()
            } catch (e) {
              console.log(e.message);
            }
          }
        }
      });
    },
    getList() {
      // this.month = this.date1.split('-')[1]
      console.log(this.selectedOptions2,'叽叽叽叽军');
      
      this.$axios({
        url: "score/integralCompositionPC",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          name: this.name,
          departmentId: this.departmentId,
          month: this.month == null ? "" : this.month,
          sort: Number(this.sort),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
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
  },
  mounted() {
    // this.date1 = curentYearMonth()
    this.month = this.curentMonth();
    this.getPersonal();
    this.getAugrment();
    this.getAllConcatType();
    // this.getList();
  }
};
</script>

<style scoped>
.integralSelect {
  padding-bottom: 50px;
  min-height: 800px;
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
.bigBox {
  background-color: #f2f9ff;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.EventTheme {
  width: 215px;
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
.el-table {
  margin-top: 19px;
}
.el-pagination {
  text-align: center;
  margin-top: 19px;
}
</style>
