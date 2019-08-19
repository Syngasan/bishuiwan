<template>
  <div class="BuckleExecution">
    <ul class="navTitle">
      <li>
        <router-link to="/integralSelect">积分构成</router-link>
      </li>
      <li>
        <router-link to="/Prizes">奖扣明细</router-link>
      </li>
      <li class="active">
        <router-link to="/BuckleExecution">奖扣执行</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <el-row class="IntegralAuditBox">
        <el-col :span="10" class="IntegralAuditBox1">
          <el-radio v-model="radio1" label="1">
            按月查询：
            <el-date-picker size="small" class="EventTheme" style="width:250px" v-model="month" format="yyyy-MM" value-format="yyyy-MM" type="month" placeholder="选择月"></el-date-picker>
          </el-radio>
        </el-col>
        <el-col :span="11" class="IntegralAuditBox1">
          <el-radio v-model="radio1" label="2">
            录入日期：
            <el-date-picker size="small" class="EventThemeDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="beginTime"></el-date-picker>
            至
            <el-date-picker class="EventThemeDate" size="small" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="endTime"></el-date-picker>
          </el-radio>
        </el-col>
      </el-row>
      <el-row class="IntegralAuditBox">
        <el-col :span="7">
          姓 名：
          <el-input class="EventTheme" placeholder="请输入员工姓名" size="small" v-model="name"></el-input>
        </el-col>
        <el-col :span="8">
          选择部门：
          <!-- <el-select v-model="AllConcatTypeId" class="EventTheme" placeholder="请选择部门">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in AllConcatType"></el-option>
        </el-select> -->
          <el-cascader placeholder="碧水湾" size='small' expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
          </el-cascader>
        </el-col>
        <el-col :span="7">
          排序依据：
          <el-select v-model="sort" class="EventTheme" placeholder="请选择排序依据" size="small">
            <el-option label="用户" value="0"></el-option>
            <el-option label="总奖分" value="1"></el-option>
            <el-option label="奖分数量" value="2"></el-option>
            <el-option label="平均奖分" value="3"></el-option>
            <el-option label="总减分" value="4"></el-option>
            <el-option label="扣分数" value="5"></el-option>
            <el-option label="平均扣分" value="6"></el-option>
            <!-- <el-option :key="item.name" :label="item.name" :value="item.id" v-for="(item,index) in sort"></el-option> -->
          </el-select>
        </el-col>
        <el-col :span="1">
          <el-button size="small" type="primary" @click="getList">查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe>
        <el-table-column align="center" prop="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="realName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="department" label="部门"></el-table-column>
        <el-table-column align="center" prop="rewardNumber" label="总奖分"></el-table-column>
        <el-table-column align="center" prop="rewardCount" label="奖分人次"></el-table-column>
        <el-table-column align="center" prop="rewardAverage" label="平均奖分"></el-table-column>
        <el-table-column align="center" prop="reduceNumber" label="总扣分"></el-table-column>
        <el-table-column align="center" prop="reduceCount" label="扣分人次"></el-table-column>
        <el-table-column align="center" prop="reduceAverage" label="平均扣分"></el-table-column>
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
  name: "BuckleExecution",
  data() {
    return {
      radio1: "1",
      name: "",
      sort: "0",
      // date1: '',
      month: "",
      beginTime: "",
      endTime: "",
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      AllConcatType: [],
      AllConcatTypeId: "",
      selectedOptions2: [],
      prop: {
        value: "id",
        children: "children",
        label: "name"
      },
      option: [],
      departmentId: ""
    };
  },
  created() {
    this.getPersonal();
    // this.date1 = curentYearMonth()
    this.getList();
    this.getAllConcatType();
    this.getAugrment();
  },
  methods: {
    // 个人信息
    getPersonal() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      personal(this.$qs.stringify(params)).then(res => {
        if (res.code == 1) {
          // console.log(res);
          this.myId = res.data.departmentId;
          this.departmentId = this.myId;
          console.log(this.departmentId, "部门id");
          this.getList();
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
      // window.location.href = 'http://47.107.71.47/bishuiwan/api/score/ExportIntegralExecutionPCExcel?name='+this.name+'&month='+this.month+'&sort='+this.sort+'&departmentId='+this.departmentId+'&beginTime='+this.beginTime+'&endTime='+this.endTime+'&pageNumber='+this.pageNumber+'&pageSize='+this.pageSize+'&sessionId='+this.$cookie.get('sessionId')
      window.location.href =
        "http://47.107.71.47/bishuiwan/api/score/ExportIntegralExecutionPCExcel?name=" +
        this.name +
        "&month=" +
        this.month +
        "&sort=" +
        this.sort +
        "&departmentId=" +
        this.departmentId +
        "&beginTime=" +
        this.beginTime +
        "&endTime=" +
        this.endTime +
        "&pageNumber=" +
        this.pageNumber +
        "&pageSize=" +
        this.pageSize +
        "&sessionId=" +
        this.$cookie.get("sessionId");
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
        if (res.data.code === 1) {
          this.AllConcatType = res.data.data;
        }
      });
    },
    getList() {
      // this.month = this.date1.split('-')[1]
      this.$axios({
        url: "score/integralExecutionPC",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          // date: this.date1 + '-01',
          name: this.name,
          month: this.month == null ? "" : this.month,
          sort: this.sort,
          departmentId: this.departmentId,
          beginTime: this.beginTime == null ? "" : this.beginTime,
          endTime: this.endTime == null ? "" : this.endTime,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow;
          // for (var i = 0; i < res.data.data.list.length; i++) {
          //   res.data.data.list[i].splitTime = res.data.data.list[i].createTime.split('-')[0]+'-'+res.data.data.list[i].createTime.split('-')[1]
          // }
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
          }
          this.tableData = res.data.data.list;
          for (let item of this.tableData) {
            item.rewardAverage = item.rewardAverage.toFixed(2);
            item.reduceAverage = item.reduceAverage.toFixed(2);
          }
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
      let sessionId = localStorage.getItem("sessionId");
      let departmentId = this.departmentId;
      let params = {
        sessionId: sessionId,
        departmentId: departmentId
      };
      getAllDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // for (let item of this.option) {
          //       item = res.data
          //       console.log(item,'没');

          //   }
          // this.option.push(res.data)
          this.option = res.data;
          this.options = this.option;
          console.log(this.options);

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
              this.check();
            } catch (e) {
              console.log(e.message);
            }
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
.BuckleExecution {
  min-height: 1000px;
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
  width: 180px;
  /* height: 46px; */
}
.EventThemeDate1 {
  width: 250px;
  height: 46px;
}
.EventThemeDate {
  width: 160px;
  /* height: 46px; */
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
.IntegralAuditBox1 {
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
.textR {
  text-align: right;
  padding-right: 90px;
}
</style>
<style>
.el-radio__label {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
}
</style>