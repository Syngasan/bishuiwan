<template>
  <div class="PersonalAwardDeductionDetails">
    <el-row class="IntegralAuditBox">
      <el-col :span="8">
        事件类型：
        <el-select v-model="eventTypeId" class="EventTheme" placeholder="请选择事件类型" size="small">
          <el-option :key="item.name" :label="item.name" :value="item.id" v-for="(item,index) in eventType"></el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        初审人：
        <el-input size="small" class="EventTheme" placeholder="请输入初审人" v-model="firstExamineName"></el-input>
      </el-col>
      <el-col :span="7">
        终审人：
        <el-input class="EventTheme" size="small" placeholder="请输入终审人" v-model="secondExamineName"></el-input>
      </el-col>
      <el-col :span="12" style="margin-top:10px">
        奖扣日期：
        <el-date-picker class="EventThemeDate" size="small" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="happenTimeBegin"></el-date-picker>
        至
        <el-date-picker class="EventThemeDate" type="date" size="small" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="happenTimeEnd"></el-date-picker>
      </el-col>
      <el-col :span="12" style="margin-top:10px">
        录入日期：
        <el-date-picker class="EventThemeDate" type="date" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="createTimeBegin"></el-date-picker>
        至
        <el-date-picker class="EventThemeDate" type="date" format="yyyy-MM-dd" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="createTimeEnd"></el-date-picker>
      </el-col>

      <el-col :span="8" style="margin-top:10px">
        事件主题：
        <el-input class="EventTheme" size="small" placeholder="请输入事件主题" v-model="title"></el-input>
      </el-col>
      <el-col :span="8" style="margin-top:10px">
        事件内容：
        <el-input class="EventTheme" placeholder="请输入事件内容" size="small" v-model="content"></el-input>
      </el-col>
      <el-col :span="8" style="margin-top:10px">
        分值：
        <el-input size="small" class="EventThemeNum" v-model="valueBegin"></el-input>
        到
        <el-input size="small" class="EventThemeNum" v-model="valueEnd"></el-input>
        <el-button type="primary" size="small" @click="getList">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe :cell-class-name="rowClass">
      <el-table-column align="center" min-width="100px" prop="index" label="序号"></el-table-column>
      <el-table-column align="center" min-width="100px" prop="eventTypeName" label="事件类型"></el-table-column>
      <el-table-column align="center" min-width="100px" prop="title" label="事件主题">
        <template slot-scope="scope">
          <div class="mtt">
            {{scope.row.title}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" prop="content" class="mtt" label="事件内容">
        <template slot-scope="scope">
          <div class="mtt">
            {{scope.row.content}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" prop="value" label="分值" :render-header="renderHeader1" v-if="hiddenHeader1"></el-table-column>
      <el-table-column align="center" min-width="110px" prop="firstExamineName" label="初审人" :render-header="renderHeader2" v-if="hiddenHeader2"></el-table-column>
      <el-table-column align="center" min-width="110px" prop="secondExamineName" label="终审人" :render-header="renderHeader3" v-if="hiddenHeader3"></el-table-column>
      <el-table-column align="center" min-width="120px" prop="recordName" label="记录人" :render-header="renderHeader4" v-if="hiddenHeader4"></el-table-column>
      <el-table-column align="center" min-width="130px" prop="happenTime" label="奖扣日期" :render-header="renderHeader5" v-if="hiddenHeader5"></el-table-column>
      <el-table-column align="center" min-width="140px" prop="createTime" label="录入日期" :render-header="renderHeader6" v-if="hiddenHeader6"></el-table-column>
    </el-table>
    <el-row>
      <!-- <el-col :span="4">
        <el-button type="primary">导出excel</el-button>
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
  name: "PersonalAwardDeductionDetails",
  data() {
    return {
      hiddenHeader1: true,
      hiddenHeader2: true,
      hiddenHeader3: true,
      hiddenHeader4: true,
      hiddenHeader5: true,
      hiddenHeader6: true,
      eventType: [],
      eventTypeId: "",
      title: "",
      content: "",
      firstExamineName: "",
      secondExamineName: "",
      happenTimeBegin: "",
      happenTimeEnd: "",
      createTimeBegin: "",
      createTimeEnd: "",
      eventTypeId: "",
      keyword: "",
      valueBegin: "",
      valueEnd: "",
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0
    };
  },
  created() {
    this.getEventType();
    this.getList();
  },
  mounted() {
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
    getList() {
      this.$axios({
        url: "score/myIntegralDeTailPC",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          eventTypeId: this.eventTypeId,
          firstExamineName: this.firstExamineName,
          secondExamineName: this.secondExamineName,
          happenTimeBegin: this.happenTimeBegin,
          happenTimeEnd: this.happenTimeEnd,
          createTimeBegin: this.createTimeBegin,
          createTimeEnd: this.createTimeEnd,
          eventTypeId: this.eventTypeId,
          title: this.title,
          content: this.content,
          valueBegin: this.valueBegin,
          valueEnd: this.valueEnd,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            // res.data.data.list[i].head = this.url + res.data.data.list[i].head;
            res.data.data.list[i].index =
              (res.data.data.pageNumber - 1) * 10 + 1 + i;
          }
          this.total = res.data.data.totalRow;
          this.tableData = res.data.data.list;

          for (let item of this.tableData) {
            item.happenTime = item.happenTime.split(" ")[0];
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
    },
    renderHeader1() {
      return (
        <div class="rander">
          <span>分值</span>
          <i class="iconfont icon-xianshi" id="hiden1" />
        </div>
      );
    },
    renderHeader2() {
      return (
        <div class="rander">
          <span>初审人</span>
          <i class="iconfont icon-xianshi" id="hiden2" />
        </div>
      );
    },
    renderHeader3() {
      return (
        <div class="rander">
          <span>终审人</span>
          <i class="iconfont icon-xianshi" id="hiden3" />
        </div>
      );
    },
    renderHeader4() {
      return (
        <div class="rander">
          <span>记录人</span>
          <i class="iconfont icon-xianshi" id="hiden4" />
        </div>
      );
    },
    renderHeader5() {
      return (
        <div class="rander">
          <span>奖扣日期</span>
          <i class="iconfont icon-xianshi" id="hiden5" />
        </div>
      );
    },
    renderHeader6() {
      return (
        <div class="rander">
          <span>录入日期</span>
          <i class="iconfont icon-xianshi" id="hiden6" />
        </div>
      );
    }
  }
};
</script>

<style scoped>

.dddddd {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.PersonalAwardDeductionDetails {
  min-height: 800px;
  background-color: #f2f9ff;
}
.icon-xianshi {
  cursor: pointer;
}
.EventTheme {
  width: 200px;
}
.EventThemeDate {
  width: 138px;
  /* height: 46px; */
}
.EventThemeNum {
  width: 75px;
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
.el-button {
  position: absolute;
  right: 10px;
}
.rander {
  height: 23px;
  margin: auto;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rander > span:first-child {
  display: inline;
  font-size: 16px;
}
.has-gutter > tr > th > div.cell {
  /* height: 23px; */
  display: block !important;
}
</style>
<style>

</style>