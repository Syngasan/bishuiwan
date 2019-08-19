<template>
  <div class="FixedIntegral">
    <el-row class="IntegralAuditBox">
      <!-- <el-col :span="22" class="banner">XX月固定积分明细</el-col>
      <el-col :span="2"><el-button plain type="primary">返回</el-button></el-col> -->
      <el-col :span="8">
        姓名或工号：
        <el-input class="EventTheme" placeholder="请输入姓名或工号" v-model="keyword" size="small"></el-input>
      </el-col>
      <el-col :span="8">
        部门名称：
        <!-- <el-select v-model="departmentId" class="EventTheme" placeholder="请选择部门">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in department"></el-option>
        </el-select> -->
        <el-cascader placeholder="碧水湾" size='small' expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
        </el-cascader>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="getList" size="small">查询</el-button>
        <el-button type="primary" @click="dialogVisible=true" size="small">结算</el-button>
        <el-button type="primary" @click='jiesuan' size="small">查看结算日志</el-button>
      </el-col>
      <!-- <el-col :span="24" class="textR"><router-link to="/IntegralLog">查看结算日志</router-link></el-col> -->
    </el-row>
    <!-- <el-table :data="tableData" stripe>
      <el-table-column prop="userId" label="序号"></el-table-column>
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="number" label="工号"></el-table-column>
      <el-table-column prop="companyName" label="部门"></el-table-column>
      <template v-for="(item, index) in tableData">
        <template v-for="(steadyItem, steadyIndex) in item.steadyScore" :key="index">
          <el-table-column :prop="tableData[0].label" :label="steadyItem.name" ></el-table-column>
        </template>
      </template>
      <el-table-column prop="date" label="学历分"></el-table-column>
      <el-table-column prop="date" label="证书分"></el-table-column>
      <el-table-column prop="date" label="特长分"></el-table-column>
      <el-table-column prop="date" label="工龄分"></el-table-column>
      <el-table-column prop="total" label="固定积分合计"></el-table-column>
    </el-table> -->
    <table style="margin-top:10px">
      <tr class="header">
        <th>序号</th>
        <th>姓名</th>
        <th>工号</th>
        <th>部门</th>
        <th v-for="(item, index) in labelList" :key="index">{{item.name}}</th>
        <th>固定积分合计</th>
      </tr>
      <tr class="body" v-for="(item, index) in tableData" :key="index">
        <td>{{item.index}}</td>
        <td>{{item.realName}}</td>
        <td>{{item.number}}</td>
        <td>{{item.companyName}}</td>
        <td v-for="(steadyItem, steadyIndex) in item.steadyScore" :key="steadyIndex" style="white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;">{{steadyItem.name}} ({{steadyItem.score}}) </td>
        <td>{{item.total}}</td>
      </tr>
    </table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="20%" :center='true'>
      选 择 月 份：
      <el-date-picker class="EventTheme" type="month" value-format="yyyy-MM-dd" placeholder="选择月份" v-model="dateMonth" @change="getSTime"></el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="pushN">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加排除人员 -->
    <el-dialog :visible.sync="dialogVisible1" width="20%" :center='true'>
      <div>添加排除人员:
        <!-- <span @click="pageExcludeUser()">添加</span> -->
        <el-button @click="pageExcludeUser()" type="primary" size="small">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import {
  steadyIfSettlement,
  steadySettlement,
  getAllDepartment,
  personal
} from "@/utils/axios/axios";
export default {
  name: "FixedIntegral",
  data() {
    return {
      labelList: [],
      dateMonth: "",
      dialogVisible: false,
      dialogVisible1: false,
      department: [],
      keyword: "",
      departmentId: 1,
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      steadyScore: [],
      selectedOptions2: [],
      prop: {
        value: "id",
        children: "children",
        label: "name"
      },
      option: [],
      fileList: []
    };
  },
  created() {
    this.getPersonal();
    this.getAugrment();
    this.getList();
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
      this.$router.push("/IntegralLog");
    },
    // 时间
    getSTime(val) {
      this.dateMonth = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      // console.log(this.month,val);
      console.log("shijian ssuisd", this.dateMonth);
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
      // this.$axios({
      //   url: 'steady/settlement',
      //   method: 'POST',
      //   data: {
      //     sessionId: localStorage.getItem('sessionId'),
      //     date: this.dateMonth
      //   },
      //   transformRequest: transformRequestFn
      // }).then((res) => {
      //   if (res.data.code === 1) {
      //     this.$message({
      //     message: res.data.desc,
      //     type: 'success'
      //   });
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        date: this.dateMonth == null ? "" : this.dateMonth
      };
      steadyIfSettlement(this.$qs.stringify(params)).then(res => {
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
    },

    // 结算
    settlement() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        date: this.dateMonth
      };
      steadySettlement(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          //  this.$message({
          //     message: res.desc,
          //     type: 'success'
          //   });
          this.getList();
          this.dialogVisible = false;
          this.dialogVisible1 = true;
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
    },
    // 添加排除人员
    pageExcludeUser() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        date: this.dateMonth
      };
      this.$router.push({ path: "/ExclusionStaff", query: params });
      // this.$router.push('/pageExcludeUser')
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
      this.$axios({
        url: "steady/pageSteady",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          keyword: this.keyword,
          departmentId: this.departmentId,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res, "999999999999999999999999999");
          this.total = res.data.data.totalRow;
          for (let i = 0; i < res.data.data.list.length; i++) {
            // res.data.data.list[i].head = this.url + res.data.data.list[i].head;
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
          }
          this.tableData = res.data.data.list;
          // this.tableData.forEach((item, index) => {
          //   if(item.steadyScore.length < item.label.length) {
          //     for(let i = 0; i < item.label.length - item.steadyScore.length; i ++) {
          //       item.steadyScore.push({name: '-', score: 0, steadyId: 0})
          //     }
          //   }
          // })

          this.labelList = res.data.data.list[0].label;
          console.log(this.labelList, "9999");

          this.tableData.forEach((item, index) => {
            item.steadyScore.sort(function(a, b) {
              return a.steadyId - b.steadyId;
            });
            console.log(
              item.steadyScore,
              "4444444444444444444444444444444444444444444444444444444444"
            );
          });
          // let arr = []
          // for(let index = 0; index < this.tableData.length; index++) {
          //   for(let x = 0; x < this.tableData[index].label.length; x++) {
          //     for(let y = 0; y < this.tableData[index].steadyScore.length; y++) {
          //       if(this.labelList[x].steadyTypeId !== this.tableData[index].steadyScore[y].steadyId) {
          //         console.log("找到异类");
          //         arr = this.tableData[index].steadyScore.splice(x, 0, {steadyId: this.tableData[index].label[x].steadyTypeId, name: '-', score: 0})
          //         console.log(arr);
          //         // break;
          //       }
          //
          //     }
          //   }
          // }
          console.log(this.tableData);
          // this.steadyScore = res.data.data.page.list
          // console.log(this.steadyScore,'哈哈哈哈哈哈');
          // for (let item of this.tableData) {
          //   for ( let index of item.steadyScore) {

          //   }
          // }
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
/*.banner {
  font-size:16px;
font-family:PingFang-SC-Regular;
font-weight:bold;
color:rgba(0,0,0,1);
}*/
.FixedIntegral {
  padding-bottom: 50px;
  min-height: 750px;
}
.EventTheme {
  width: 195px;
  /* height: 46px; */
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
  color: #ff0993fe !important;
}
.textR a {
  color: rgba(10, 143, 246, 1);
  text-decoration: none;
}
table {
  min-width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  table-layout: fixed;
}
tr {
  width: 100%;
  color: #333333;
  text-align: center;
}

tr.header {
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: #ffffff;
  background-color: #42acfe;
}

tr.header th {
  flex: 1;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  /* min-width: 130px; */
}

tr.body {
  padding: 20px 0;
  display: flex;
  align-items: center;
  background-color: rgba(10, 143, 246, 1);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  background-color: #ffffff;
}

tr.body:hover {
  background-color: rgba(245, 247, 250, 1);
}

tr.body:nth-of-type(2n) {
  background-color: rgba(250, 250, 250, 1);
}

tr td {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
  padding: 5px 0px;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  text-align: left;
  /* min-width: 130px; */
}
th,
td {
  text-align: center;
}
</style>
