<template>
  <div class="BuckleTask">
    <el-row class="IntegralAuditBox">
      <el-col :span="8">
        选择月份：
        <el-date-picker size="small" type="month" placeholder="选择日期" v-model="month" @change="getSTimes" value-format="yyyy-MM-dd"></el-date-picker>
      </el-col>
      <el-col :span="8">
        任务名称：
        <el-input size="small" class="EventTheme" placeholder="请输入任务名称" v-model="name"></el-input>
      </el-col>
      <el-col :span="8">
        姓名：
        <el-input class="EventTheme" size="small" placeholder="请输入员工姓名" v-model="realName"></el-input>
      </el-col>
      <el-col :span="8" style="margin-top:10px">
        部门名称：
        <!-- <el-select v-model="AllConcatTypeId" class="EventTheme" placeholder="请选择部门" @change="bumen(AllConcatTypeId)">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in AllConcatType" ></el-option>
        </el-select> -->
        <el-cascader placeholder="碧水湾" size='small' expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
        </el-cascader>
      </el-col>
      <el-col :span="8" style="margin-top:10px">
        完成状态：
        <el-select v-model="state" class="EventTheme" size="small" placeholder="请选择状态">
          <!-- <el-option label="全部" value="-1"></el-option>
          <el-option label="未达标" value="0"></el-option>
          <el-option label="已达标" value="1"></el-option> -->
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="margin-top:10px">
        <el-button type="primary" @click="getList" size="small">查询</el-button>
        <el-button type="primary" @click="dialogVisible = true" size="small">结算</el-button>
        <el-button type="primary" @click="jiesuan" size="small">
          查看结算日志
        </el-button>
      </el-col>
      <el-col :span="24" class="textR"></el-col>
    </el-row>
    <el-table :data="tableData" stripe highlight-current-row @current-change="handleCurrent" style="margin-top:10px">
      <el-table-column align="center" prop="splitTime" label="任务周期"></el-table-column>
      <el-table-column align="center" prop="realName" label="姓名"></el-table-column>
      <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
      <el-table-column align="center" prop="name" label="任务名称"></el-table-column>
      <el-table-column align="center" label="任务指标">
        <template slot-scope="scope">
          <span>{{scope.row.reward}}/{{scope.row.deduction}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成值">
        <template slot-scope="scope">
          <span>{{scope.row.completeReward}}/{{scope.row.completePunish}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="state" label="完成状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未达标</span>
          <span v-else-if="scope.row.state == 1">已达标</span>
          <!-- <span v-else>未知</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="punish" label="积分扣罚"></el-table-column>
      <el-table-column align="center" prop="settlement" label="结算状态">
        <template slot-scope="scope">
          <span v-if="scope.row.settlement == 0">未结算</span>
          <span v-else-if="scope.row.settlement == 1">已结算</span>
          <!-- <span v-else>未知</span> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
    </el-pagination>
    <!-- </el-dialog> -->
    <el-dialog :visible.sync="dialogVisible" width="20%" :center='true'>
      选 择 月 份：
      <el-date-picker class="EventTheme" type="month" @change="getSTime" value-format="yyyy-MM-dd" placeholder="选择月份" v-model="dateMonth"></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="pushN">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import {
  ifSettlement,
  settlement,
  getAllDepartment,
  personal
} from "@/utils/axios/axios";
// import { curentYearMonth } from '@/utils/date/getDate'
export default {
  name: "BuckleTask",
  data() {
    pickerBeginDateBefore: {
      disabledDate: time => {
        let _now = Date.now();
        return time.getTime() > _now;
      };
    }
    return {
      dateMonth: "",
      name: "",
      state: -1,
      realName: "",
      month: "",
      // date1: '',
      tableData: [],
      departmentId: "",
      AllConcatType: [],
      AllConcatTypeId: 1,
      dialogVisible: false,
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      currentRow: [],
      queryType: 1,
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "未达标"
        },
        {
          value: 1,
          label: "已达标"
        }
      ],
      selectedOptions2: [],
      prop: {
        value: "id",
        children: "children",
        label: "name"
      },
      option: []
    };
  },
  created() {
    // this.date1 = curentYearMonth()
    this.getPersonal();
    this.getList();
    this.getAllConcatType();
    this.getAugrment();
    // this.getsettlement()
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
    jiesuan() {
      this.$router.push("/BuckleLogt");
    },
    handleChange(value) {
      console.log(
        this.selectedOptions2[this.selectedOptions2.length - 1],
        "选中部门",
        this.option
      );
      this.departmentId = this.selectedOptions2[
        this.selectedOptions2.length - 1
      ];
      for (let item of this.option) {
        console.log(item);
        if (
          item.businessId ==
          this.selectedOptions2[this.selectedOptions2.length - 1]
        ) {
          this.queryType = 1;
        } else {
          this.queryType = 2;
        }
      }
    },
    pushN() {
      if (this.dateMonth == "" || this.dateMonth == null) {
        Message.error({
          message: "請選擇月份",
          customClass: "messageClass1",
          center: true
        });
        return false;
      }

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        date: this.dateMonth
      };
      ifSettlement(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.settlement();
        } else {
          this.dialogVisible = false;
          this.$confirm("已结算过, 是否重新结算?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.settlement();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消结算",
                customClass: "messageClass1"
              });
            });
        }
      });

      // this.$axios({
      //   url: "reward/settlement",
      //   method: "POST",
      //   data: {
      //     sessionId: localStorage.getItem("sessionId"),
      //     date: this.dateMonth
      //   },
      //   transformRequest: transformRequestFn
      // }).then((res) => {
      //   console.log(res)
      //   if (res.data.code === 1) {
      //     this.$message({
      //     message: res.data.desc,
      //     type: 'success'
      //   });
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
      // .then(res => {
      //   if (res.data.code === 1) {
      //     this.getList()
      //     this.dialogVisible = false
      //   }
      // })
    },
    getSTimes(val) {
      this.month = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      console.log(this.month, val);
    },
    // 选择部门
    // bumen(val) {
    //     console.log(val,'部门');
    //     this.queryType = 2
    // },
    // 结算
    settlement() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        date: this.dateMonth
      };
      settlement(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.$message({
            message: res.desc,
            type: "success",
            customClass: "messageClass1"
          });
          this.getList();
          this.dialogVisible = false;
        }
      });
    },
    handleCurrent(val) {
      this.currentRow = val;
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
    getList() {
      // this.month = this.date1.split('-')[1]
      this.$axios({
        url: "reward/pageRewardTask",
        method: "POST",
        data: {
          // queryType: this.queryType,
          sessionId: localStorage.getItem("sessionId"),
          // date: this.date1 + '-01',
          state: this.state,
          name: this.name,
          realName: this.realName,
          date: this.month == null ? "" : this.month,
          departmentId: this.departmentId,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow;
          for (var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].splitTime =
              res.data.data.list[i].createTime.split("-")[0] +
              "-" +
              res.data.data.list[i].createTime.split("-")[1];
          }
          this.tableData = res.data.data.list;
        }
      });
    },
    // 时间
    getSTime(val) {
      this.dateMonth = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      // console.log(this.month,val);
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
.BuckleTask {
  padding-bottom: 50px;
  min-height: 750px;
}
.EventTheme {
  width: 195px;
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
.textR a {
  color: rgba(10, 143, 246, 1);
  text-decoration: none;
}
.jiesuan {
  width: 82px;
  height: 30px;
}
.jiesuan a {
  color: rgba(10, 143, 246, 1);
}
</style>
