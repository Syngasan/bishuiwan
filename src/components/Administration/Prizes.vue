<template>
  <div class="Prizes">
    <ul class="navTitle">
      <li>
        <router-link to="/integralSelect">积分构成</router-link>
      </li>
      <li class="active">
        <router-link to="/Prizes">奖扣明细</router-link>
      </li>
      <li>
        <router-link to="/BuckleExecution">奖扣执行</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <div class="IntegralAuditBox">
        <el-row>
          <el-col :span="10">
            选择部门：
            <!-- <el-select v-model="AllConcatTypeId" class="EventTheme" placeholder="请选择部门">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in AllConcatType"></el-option>
        </el-select> -->
            <el-cascader placeholder="碧水湾" size='small' class="w250" expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
            </el-cascader>
          </el-col>
          <el-col :span="7">
            奖扣对象：
            <el-input size='small' class="EventTheme" placeholder="请输入奖扣对象" v-model="name"></el-input>
          </el-col>
          <el-col :span="7">
            初 审 人：
            <el-input class="EventTheme" size='small' placeholder="请输入初审人" v-model="firstExamineName"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:6px">
          <el-col :span="10">
            奖扣日期：
            <el-date-picker class="EventThemeDate" size='small' type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="happenTimeBegin"></el-date-picker>
            至
            <el-date-picker class="EventThemeDate" type="date" size='small' format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="happenTimeEnd"></el-date-picker>
          </el-col>
          <el-col :span="7">
            分值：
            <el-input class="EventThemeNum" v-model="valueBegin" size='small'></el-input>
            到
            <el-input class="EventThemeNum" v-model="valueEnd" size='small'></el-input>
          </el-col>
          <el-col :span="6">
            终 审 人：
            <el-input size='small' class="EventTheme" placeholder="请输入终审人" v-model="secondExamineName"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:6px">
          <el-col :span="10">
            录入日期：
            <el-date-picker size='small' class="EventThemeDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="createTimeBegin"></el-date-picker>
            至
            <el-date-picker class="EventThemeDate" size='small' type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="createTimeEnd"></el-date-picker>
          </el-col>
          <el-col :span="7">
            事件主题：
            <el-input class="EventTheme" size='small' placeholder="请输入事件主题" v-model="title"></el-input>
          </el-col>
          <el-col :span="6" style="margin-left:-5px">
            事件内容：
            <el-input class="EventTheme" size='small' placeholder="请输入事件内容" v-model="content"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:6px;">
          <el-col :span="9">
            事件类型：
            <el-select v-model="eventTypeId" class="EventTheme" placeholder="请选择事件类型" size='small'>
              <el-option :key="item.name" :label="item.name" :value="item.id" v-for="(item,index) in eventType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            排序依据：
            <el-select v-model="sort" class="EventTheme" placeholder="请选择排序依据" size='small'>
              <el-option label="用户" value="0"></el-option>
              <el-option label="录入事件" value="1"></el-option>
              <el-option label="奖扣时间" value="2"></el-option>
            </el-select>
          </el-col>
          <el-col :span="7" class="textR">
            <el-button type="primary" @click="getList" size='small' style="width:74px;    position: absolute;
    right: 106px;">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData" stripe style="margin-top:10px;width:100%;" >
        <el-table-column align="center" min-width="60px" prop="index" label="序号"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="userName" label="奖扣对象"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="eventTypeName" label="事件类型"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="title" label="事件主题"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="content" label="事件内容"></el-table-column>
        <el-table-column align="center" min-width="100px" prop="value" label="分值" :render-header="renderHeader1" v-if="hiddenHeader1"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="firstExamineName" label="初审人" :render-header="renderHeader2" v-if="hiddenHeader2"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="secondExamineName" label="终审人" :render-header="renderHeader3" v-if="hiddenHeader3"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="recordName" label="记录人" :render-header="renderHeader4" v-if="hiddenHeader4"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="happenTime" label="奖扣日期" :render-header="renderHeader5" v-if="hiddenHeader5"></el-table-column>
        <el-table-column align="center" min-width="120px" prop="createTime" label="录入日期" :render-header="renderHeader6" v-if="hiddenHeader6"></el-table-column>
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
import {
  ifSettlement,
  settlement,
  getAllDepartment,
  personal
} from "@/utils/axios/axios";
export default {
  name: "Prizes",
  data() {
    return {
      title: "",
      eventTypeName: "",
      content: "",
      hiddenHeader1: true,
      hiddenHeader2: true,
      hiddenHeader3: true,
      hiddenHeader4: true,
      hiddenHeader5: true,
      hiddenHeader6: true,
      tableData: [],
      eventType: [],
      eventTypeId: "",
      AllConcatType: [],
      AllConcatTypeId: "",
      sort: "",
      name: "",
      firstExamineName: "",
      secondExamineName: "",
      valueBegin: "",
      valueEnd: "",
      happenTimeBegin: "",
      happenTimeEnd: "",
      createTimeBegin: "",
      createTimeEnd: "",
      pageNumber: 1,
      pageSize: 10,
      total: 0,
      department: [],
      departmentId: "",
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
    this.getPersonal();
    this.getEventType();
    this.getAllConcatType();
    this.getList();
  },
  mounted() {
    this.getAugrmentaaaa();
    this.$nextTick(() => {
      var _this = this;
      document.getElementById("hiden1").onclick = function() {
        _this.hiddenHeader1 = false;
      };
      document.getElementById("hiden2").onclick = function() {
        _this.hiddenHeader2 = false;
      };
      document.getElementById("hiden3").onclick = function() {
        _this.hiddenHeader3 = false;
      };
      document.getElementById("hiden4").onclick = function() {
        _this.hiddenHeader4 = false;
      };
      document.getElementById("hiden5").onclick = function() {
        _this.hiddenHeader5 = false;
      };
      document.getElementById("hiden6").onclick = function() {
        _this.hiddenHeader6 = false;
      };
    });
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
    getAugrmentaaaa() {
      console.log(22);

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
    exportExcel() {
      let localStr =
        "http://47.107.71.47/bishuiwan/api/score/ExportIntegralDeTailPCExcel?sessionId=" +
        localStorage.getItem("sessionId") +
        "&name=" +
        this.name +
        "&departmentId=" +
        this.departmentId +
        "&firstExamineName=" +
        this.firstExamineName +
        "&secondExamineName=" +
        this.secondExamineName +
        "&happenTimeBegin=" +
        this.happenTimeBegin +
        "&happenTimeEnd=" +
        this.happenTimeEnd +
        "&createTimeBegin=" +
        this.createTimeBegin +
        "&createTimeEnd=" +
        this.createTimeEnd +
        "&valueBegin=" +
        this.valueBegin +
        "&valueEnd=" +
        this.valueEnd +
        "&title=" +
        this.title +
        "&content=" +
        this.content;
      "&eventTypeId=" +
        this.eventTypeId +
        "&sort=" +
        this.sort +
        "&pageNumber=" +
        this.pageNumber +
        "&pageSize=" +
        this.pageSize;
      window.location.href = localStr;
      console.log(localStr, "导出");
    },
    getList() {
      this.$axios({
        url: "score/integralDeTailPC",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          name: this.name,
          departmentId: this.departmentId,
          firstExamineName: this.firstExamineName,
          secondExamineName: this.secondExamineName,
          happenTimeBegin:
            this.happenTimeBegin == null ? "" : this.happenTimeBegin,
          happenTimeEnd: this.happenTimeEnd == null ? "" : this.happenTimeEnd,
          createTimeBegin:
            this.createTimeBegin == null ? "" : this.createTimeBegin,
          createTimeEnd: this.createTimeEnd == null ? "" : this.createTimeEnd,
          valueBegin: this.valueBegin,
          valueEnd: this.valueEnd,
          title: this.title,
          content: this.content,
          eventTypeId: this.eventTypeId,
          sort: this.sort,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow;
          for (var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].createTime = res.data.data.list[
              i
            ].createTime.split(" ")[0];
            res.data.data.list[i].happenTime = res.data.data.list[
              i
            ].happenTime.split(" ")[0];
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
          }
          this.tableData = res.data.data.list;
          console.log(this.tableData, "0----");
        }
      });
    },
    // getAugrment () {
    //   this.$axios({
    //     url: 'department/getAllConcatName',
    //     method: 'POST',
    //     data: {
    //       sessionId: localStorage.getItem('sessionId')
    //     },
    //     transformRequest: transformRequestFn
    //   }).then((res) => {
    //     if (res.data.code === 1) {
    //       this.department = res.data.data
    //     }
    //   })
    // },
    getEventType() {
      this.$axios({
        url: "eventtype/getEventTypeName",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.eventType = res.data.data;
        }
      });
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

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getList();
    },
    renderHeader1() {
      return (
        <div>
          <span>分值</span>
          <i class="iconfont icon-xianshi" id="hiden1" />
        </div>
      );
    },
    renderHeader2() {
      return (
        <div>
          <span>初审人</span>
          <i class="iconfont icon-xianshi" id="hiden2" />
        </div>
      );
    },
    renderHeader3() {
      return (
        <div>
          <span>终审人</span>
          <i class="iconfont icon-xianshi" id="hiden3" />
        </div>
      );
    },
    renderHeader4() {
      return (
        <div>
          <span>记录人</span>
          <i class="iconfont icon-xianshi" id="hiden4" />
        </div>
      );
    },
    renderHeader5() {
      return (
        <div>
          <span>奖扣日期</span>
          <i class="iconfont icon-xianshi" id="hiden5" />
        </div>
      );
    },
    renderHeader6() {
      return (
        <div>
          <span>录入日期</span>
          <i class="iconfont icon-xianshi" id="hiden6" />
        </div>
      );
    }
  }
};
</script>

<style scoped>
.Prizes {
  background-color: #fff;
  min-height: 800px;
}
.w250 {
  width: 200px;
}
.icon-xianshi {
  cursor: pointer;
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
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.EventTheme {
  width: 150px;
  height: 46px;
}
.EventThemeDate {
  /* width: 215px;
  height: 46px; */
  width: 138px;
}
.EventThemeNum {
  width: 77px;
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

</style>
