<template>
  <div class="hall">
    <!-- <router-vew></router-vew> -->
    <el-form ref="form" label-width="80px">
      <!-- <el-tabs type="border-card"> -->
      <!-- <el-tab-pane label="月度排名报表"> -->
      <ul class="navTitle">
        <li>
          <router-link to="/ReportForm/integralReport1/integralReport">月度排名报表</router-link>
        </li>
        <li class="active">
          <router-link to="/ReportForm/integralReport1/phased">阶段性排名报表</router-link>
        </li>
        <li>
          <router-link to="/ReportForm/integralReport1/accumulate">累积排名报表</router-link>
        </li>

      </ul>
      <div class="divOne">
        <el-form :inline="true">
          <el-row label-width="80px" type="flex">
            <el-col :span="10">
              <el-form-item style="margin-left:28px">
                <el-radio v-model="radio" label="1">默认报表</el-radio>
                <el-cascader placeholder="碧水湾" size='small' :disabled = isdisabled sdisabled style="width:250px;margin-left:13px" expand-trigger="hover" :options="option" :props="prop" change-on-select v-model="selectedOptions2" @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-radio v-model="radio" label="2" @change="radio_Change()">自定义报表</el-radio>
                <el-cascader placeholder="自定义报表" size='small' :disabled = isdisabled1 sdisabled1 style="width:250px;margin-left:13px" :options="getAllReport" expand-trigger="hover" :props="prop2" change-on-select v-model="selectedOptions3" @change="handleChangezidingyi">
                </el-cascader>
                <!-- </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" style="margin-top:-11px">
            <el-col :span="10">
              <el-form-item label="姓名或工号：" style="margin-left:26px;">
                <el-input v-model="keyword" size="small" style="width:250px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label=" 日          期：" style="    margin-left: 5px;">
                <el-date-picker type="date" placeholder="选择日期" class="themeDate" value-format="yyyy-MM-dd" v-model="monthBegin" size="small" style="width:138px" @change="getSTimeBegin"></el-date-picker>&nbsp;至&nbsp;
                <el-date-picker type="date" placeholder="选择日期" class="themeDate" value-format="yyyy-MM-dd" v-model="monthEnd" size="small" style="width:138px" @change="getSTimeEnd"></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-button type="primary" size="small">主要按钮</el-button> -->
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" size="small" style="margin-left:-15px;width:74px;" @click="check()">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form class="spppp" :inline="true" style="margin-top:-7px">
          <el-form-item style="margin-left:28px">
            <span style="height:38px; line-height:38px; " class="groudSpan">积分类型:</span>
          </el-form-item>
          <el-form-item v-for="(item,index) in tableData2Copy" :key="index">
            <el-button size="small" @click="btnn(item, index)" :type="tableData2Copy[index].isSelected ? 'primary' : 'success'" class="groudBtn">{{ item.name }}</el-button>
          </el-form-item>
          <el-button type="primary" size="small" @click="all()" class="groudBtn">总积分</el-button>
          <!-- <el-form-item>
            <el-button type="primary" size="small" plain>奖扣任务分</el-button>
            <el-button type="primary" size="small" plain>固定积分</el-button>
            <el-button type="primary" size="small" plain>总积分</el-button>
          </el-form-item> -->
        </el-form>
        <el-table :row-style="tableRowStyle" :header-cell-style="{background:'rgba(66,172,254,1)',width:'980px',height:'55px','text-align':'center'}" :data="tableData" style="width: 100%;" max-height="400" size='small'>
          <el-table-column prop="index" label="序号">
          </el-table-column>
          <el-table-column prop="date" label="头像">
            <template slot-scope="scope">
              <img :src='scope.row.head' alt="" min-width="40" height="40" class="circular">
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="姓名">
          </el-table-column>
          <template v-for="(col ,index) in tableData3" v-if="noShow">
            <el-table-column :prop="col.type" :label="col.name" v-if="show">
            </el-table-column>
          </template>
          <!-- <el-table-column prop="reward" label="奖扣任务分">
          </el-table-column>
          <el-table-column prop="steady" label="固定积分">
          </el-table-column> -->
          <el-table-column prop="total" label="总积分">
          </el-table-column>
          <el-table-column prop="order" label="排名">
          </el-table-column>
        </el-table>
        <div type='flex' style="margin-top:10px;margin-left:27px">
          <el-button type="primary" size="small" @click="exportReport()">导出报表</el-button>
          <el-button type="primary" size="small" @click="toEcharts()">积分分析</el-button>
        </div>
        <div class="block" style="margin-top:10px;text-align: center;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="length">
          </el-pagination>
        </div>

      </div>
      <!-- </el-tabs> -->

    </el-form>
  </div>
</template>

<script>
import {
  getAllDepartment,
  scorePageScore,
  getAllReport,
  getScoreType,
  exportScorelExcel,
  pageCustomizeScore,
  getCustomizeScoreAnalysisByStage,
  exportCustomizeScorelExcel,
  personal
} from "@/utils/axios/axios";

export default {
  name: "integralReport",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      radio: "1",
      keyword: "",
      monthBegin: "",
      monthEnd: "",
      currentPage4: 4,
      tableData: [],
      option: [],
      selectedOptions: [],
      selectedOptions2: [],
      selectedOptions3: [],
      departmentId: "",
      prop: {
        value: "id",
        children: "children",
        label: "name"
      },
      prop2: {
        value: "value",
        children: "children",
        label: "label"
      },
      btnParams: [],
      test: [],
      doingWork: false,
      newtable: [],
      length: 0,
      pageNumber: 1,
      pageSize: 10,
      tableData2: [],
      getAllReport: [],
      groupId: "",
      reportId: "",
      tableData3: [],
      url: "http://47.107.71.47/bishuiwan",
      tableData2Copy: [],
      EventType: [],
      show: true,
      noShow: false,
      isFirstClick: true
    };
  },
  computed: {
    isdisabled: function() {
      if (this.radio == 1) {
        return false;
      } else {
        return true;
      }
    },
    isdisabled1: function() {
      if (this.radio == 2) {
        return false;
      } else {
        return true;
      }
    }
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
          this.init()
        }
      });
    },
    fun_date(aa) {
      var date1 = new Date(),
        time1 =
          date1.getFullYear() +
          "-" +
          (date1.getMonth() + 1) +
          "-" +
          date1.getDate(); //time1表示当前时间
      this.timeNow = time1;
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      var time2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();
      return time2;
    },
    // fun_date(7);//7天后的日期
    // fun_date(-7);//7天前的日期
    all() {
      this.noShow = true;
      if (this.isFirstClick) {
        this.show = true;
        this.isFirstClick = false;
        return;
      }
      if (this.show == true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    // 截取@后面的字符做ID
    getCaption(obj) {
      var index = obj.lastIndexOf("@");
      obj = obj.substring(index + 1, obj.length);
      //  console.log(obj);
      return obj;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.check();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.check();
    },
    toEcharts() {
      if (this.radio == 1) {
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          keyword: this.keyword,
          departmentId: this.departmentId,
          begin: this.monthBegin,
          end: this.monthEnd
        };
        console.log(params, "分析参数");

        this.$router.push({ path: "/echartsPhased", query: params });
      } else if (this.radio == 2) {
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          keyword: this.keyword,
          begin: this.monthBegin,
          end: this.monthEnd,
          groupId: this.groupId,
          reportId: this.reportId
        };
        console.log(params, "分析参数");

        this.$router.push({
          path: "/ReportForm/integralReport1/echartsPhased",
          query: params
        });
      }
    },
    // 选择默认报表
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
    // 选择显示
    btnn(item, index) {
      this.noShow = true;
      console.log(item, "按钮类型");
      // this.tableData3 = item
      // this.tableData3.push(item)
      // if (JSON.stringify(this.tableData2).indexOf(JSON.stringify(item)) === -1 ) {
      // this.tableData3.push(item)
      // this.EventType1 = this.getCaption(item.id) + ',' + this.EventType1
      // this.EventType = this.EventType1+-1+','+-2
      // this.show = ! this.show
      // this.check()
      // } else {
      //   console.log('已存在');

      // }
      if (item.isSelected) {
        this.EventType[index] = this.getCaption(item.id);
        this.check();
        this.$set(this.tableData2Copy, index, {
          id: item.id,
          name: item.name,
          isSelected: false
        });
        // this.tableData2 = this.tableData2.filter(ite => {
        //   return ite.id != item.id;
        // });
      } else {
        this.EventType[index] = "";
        this.check();
        if (
          JSON.stringify(this.tableData2).indexOf(JSON.stringify(item)) === -1
        ) {
          this.$set(this.tableData2Copy, index, {
            id: item.id,
            name: item.name,
            isSelected: true
          });
          // this.tableData2.push({
          //   id: item.id,
          //   name: item.name
          // });
        } else {
          console.log("已存在");
        }

        console.log(this.tableData2, "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=");
      }
    },
    // 选择自定义报表
    handleChangezidingyi(value) {
      // console.log(this.selectedOptions3,'选中自定义部门',value)
      // this.departmentId = this.selectedOptions3[this.selectedOptions3.length-1]
      // for (let item of this.selectedOptions3) {
      //   console.log(item,'======');

      // }
      if (this.selectedOptions3.length == 1) {
        this.reportId = this.selectedOptions3[this.selectedOptions3.length - 1];
        this.groupId = "";
        console.log("报表", this.reportId);
      } else if (this.selectedOptions3.length == 2) {
        this.groupId = this.selectedOptions3[this.selectedOptions3.length - 1];
        console.log("小组", this.groupId);
      }
    },
    // 选择默认报表
    radioChange() {
      // this.radio = 10
      // console.log('单选',this.radio);
      // this.selectedOptions2 = ''
    },
    // 选择自定义
    radio_Change() {
      // this.radio = 20
      // console.log(this.radio,'二');
      // this.selectedOptions3 = ''
    },
    // 每一行的样式
    tableRowStyle({ row, rowIndex }) {
      return "text-align: center ";
    },
    getSTimeBegin(val) {
      this.monthBegin = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      console.log(this.monthBegin, val);
    },
    getSTimeEnd(val) {
      this.monthEnd = val;
      // if (this.monthBegin.split("-")[1] == this.monthEnd.split("-")[1] && this.monthBegin.split("-")[0] == this.monthEnd.split("-")[0]) {
      //   let lastDay = new Date(this.monthEnd.split("-")[0], this.monthEnd.split("-")[1], 0);
      //   let year = lastDay.getFullYear();
      //   let month = lastDay.getMonth() + 1;
      //   month = month < 10 ? "0" + month : month;
      //   let day = lastDay.getDate();
      //   day = day < 10 ? "0" + day : day;
      //   // console.log(day,this.monthEnd);
      //   let splitMonth = this.monthEnd.split('-')
      //   // console.log(splitMonth);

      //   splitMonth[2] = day.toString()
      //   // console.log(splitMonth);
      //   this.monthEnd = splitMonth.join('-')
      //   // console.log(this.monthEnd);

      // } else {
      //   this.monthEnd = val
      // }
    },
    // 6.1.11	按层级获取部门
    init() {
      // console.log(new Date(),'当前日期')
      // this.month = new Date()
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
      // 7.1.2	(集团,子公司,部门)(月度,阶段性,累计)报表
      // scorePageScore (this.$qs.stringify()).then(res=>{
      //   console.log(res);

      // })
      let getAllReportParams = {
        sessionId: sessionId,
        reportId: ""
      };
      getAllReport(this.$qs.stringify(getAllReportParams)).then(res => {
        this.getAllReport = res.data;
        console.log(res, "获取到自定义列表");
      });
      let jifenparams = {
        sessionId: localStorage.getItem("sessionId")
        // head:''
      };
      getScoreType(this.$qs.stringify(jifenparams)).then(res => {
        this.tableData2 = res.data;
        this.tableData2.forEach(item => {
          this.tableData2Copy.push({
            ...item,
            isSelected: true
          });
        });
        console.log(this.tableData2, "888888");
      });
    },
    // 导出报表
    exportReport() {
      if (this.radio == 1) {
        console.log("导出报表");
        // this.centerDialogVisible = true
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: "",
          pageSize: "",
          departmentId: this.departmentId,
          keyword: this.keyword,
          EventTypes: "",
          dateType: 2,
          begin: this.monthBegin,
          end: this.monthEnd
        };
        exportScorelExcel(this.$qs.stringify(params)).then(res => {
          if (res.code === 0) {
            this.$message.error("错误");
          } else {
            let str =
              "http://47.107.71.47/bishuiwan/api/score/exportScorelExcel?sessionId=" +
              localStorage.getItem("sessionId") +
              "&departmentId=" +
              this.departmentId +
              "&begin=" +
              this.monthBegin +
              "&end=" +
              this.monthEnd +
              "&keyword=" +
              this.keyword+"&dateType="+2;
            console.log(str, "跳转链接");
            window.location.href = str;
          }
        });
      } else if (this.radio == 2) {
        console.log("导出报表");
        // this.centerDialogVisible = true
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          keyword: this.keyword,
          EventTypes: "",
          dateType: 2,
          begin: this.monthBegin,
          end: this.monthEnd,
          groupId: this.groupId,
          reportId: this.reportId
        };
        exportCustomizeScorelExcel(this.$qs.stringify(params)).then(res => {
          if (res.code === 0) {
            this.$message.error("错误");
          } else {
            let str =
              "http://47.107.71.47/bishuiwan/api/score/exportCustomizeScorelExcel?sessionId=" +
              localStorage.getItem("sessionId") +
              "&reportId=" +
              this.reportId +
              "&groupId=" +
              this.groupIds +
              "&begin=" +
              this.monthBegin +
              "&end=" +
              this.monthEnd +
              "&keyword=" +
              this.keyword+"&dateType="+2;
            console.log(str, "跳转链接");
            window.location.href = str;
          }
        });
      }
    },
    check() {
      if (this.radio == 1) {
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          departmentId: this.departmentId,
          keyword: this.keyword,
          EventTypes: this.EventType.filter(item => item != "").toString(),
          dateType: 2,
          date: this.month,
          begin: this.monthBegin,
          end: this.monthEnd
        };
        scorePageScore(this.$qs.stringify(params)).then(res => {
          console.log(res, "查询");
          if (res.code === 1) {
            // for (let  item of res.data.data.list) {
            //   item.head = this.url + item.head
            // }
            for (let i = 0; i < res.data.data.list.length; i++) {
              res.data.data.list[i].head =
                this.url + res.data.data.list[i].head;
              res.data.data.list[i].index =
                (res.data.data.pageNumber - 1) * 10 + 1 + i;
            }
            this.tableData = res.data.data.list;
            // console.log(this.tableData,'ssssssshshsh');
            this.tableData3 = res.data.label;
            this.length = res.data.data.totalRow;
            // res.data.list[9].head = 'https://img-blog.csdn.net/20180723162104907'
          }
        });
      } else if (this.radio == 2) {
        console.log("自定义");

        let params = {
          sessionId: localStorage.getItem("sessionId"),
          pageNumber: "",
          pageSize: "",
          keyword: this.keyword,
          EventTypes: this.EventType.filter(item => item != "").toString(),
          dateType: 2,
          date: this.month,
          begin: this.monthBegin,
          end: this.monthEnd,
          groupId: this.groupId,
          reportId: this.reportId
        };
        pageCustomizeScore(this.$qs.stringify(params)).then(res => {
          console.log(res, "查询");
          if (res.code === 1) {
            // for (let  item of res.data.data.list) {
            //   item.head = this.url + item.head
            // }
            for (let i = 0; i < res.data.data.list.length; i++) {
              res.data.data.list[i].head =
                this.url + res.data.data.list[i].head;
              res.data.data.list[i].index =
                (res.data.data.pageNumber - 1) * 10 + 1 + i;
            }
            this.tableData = res.data.data.list;
            // console.log(this.tableData,'ssssssshshsh');
            this.tableData3 = res.data.label;
            this.length = res.data.data.totalRow;
            // res.data.list[9].head = 'https://img-blog.csdn.net/20180723162104907'
          }
        });
      }
    },
     getDateTime(dt) {

　　　　// 先获取我们需要的所有的元素哦~
            var year=dt.getFullYear();
            var month=dt.getMonth()+1;
            var day=dt.getDate();
            var h=dt.getHours();
            var m=dt.getMinutes();
            var s=dt.getSeconds();

　　　　// 这里应该想一下，如果是个数怎么办？那就用三元表达式来处理
            month=month<10?"0"+month:month;
            day=day<10?"0"+day:day;
            h=h<10?"0"+h:h;
            m=m<10?"0"+m:m;
            s=s<10?"0"+s:s;

　　　　// 下面可以返回了
            return year+"-"+month+"-"+day;
        }

　　// 把这个方法放入我们项目的js文件中，当我需要的时候直接调用就可以了。
       
  },
  mounted() {
    this.getPersonal()
    // this.init();
    // this.check();
    // let initDay = this.fun_date(-7);
    // console.log(initDay, '星期');
    // this.monthEnd = this.timeNow;
    // this.monthBegin = initDay;
    var y = new Date().getFullYear(); //当前年份
    var m = new Date().getMonth(); //当前月份
    var q = parseInt(m / 3); //当前季度
    var qs = new Date(y, q * 3, 1); //上一季度的开始日期
    var qe = new Date(y, (q+1) * 3, 0); //上一季度的结束日期
    // console.log("初始化", y, qs, qe);
    console.log(this.getDateTime(qs),'季度',this.getDateTime(qe));
    this.monthBegin = this.getDateTime(qs)
    this.monthEnd = this.getDateTime(qe)
  }
};
</script>

<style scoped>
.hall {
  background-color: #fff;
  min-height: 900px;
}
.circular {
  border-radius: 50%;
  overflow: hidden;
}
.divOne {
  background-color: #f2f9ff;
  min-height: 750px;
  box-sizing: border-box;
  padding-top: 20px;
  box-sizing: border-box;
  margin-top: 10px;
}
.table {
  margin-top: 10px;
  overflow-y: scroll;
  height: 300px;
}
.table_title {
  text-align: center;
  color: blue;
}
.numTwo_1 {
  margin-left: 60px;
}
/* .el-table__body{
    table-layout:auto !important;

} */
a {
  text-decoration: none;
}
a:visited {
  color: #262d39;
  text-decoration: none;
}
a:active {
  color: #0083ff;
  text-decoration: none;
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
.navTitle .active a {
  color: rgba(0, 131, 255, 1) !important;
}
.themeDate {
  /* width: 150px; */
}
</style>
<style>
/* 表格内容样式  自定义组件样式*/
.cell {
  text-align: center !important;
  /* color: red; */
}
</style>
