<template>
  <div class="tableEntry" id="tableEntry" v-on:click="ctrlV()">
    <ul class="navTitle">
      <li>
        <router-link to="/WebEntry">网页录入</router-link>
      </li>
      <li class="active">
        <router-link to="/tableEntry">表格录入</router-link>
      </li>
      <li>
        <router-link to="/Submission">已提交</router-link>
      </li>
      <li>
        <router-link to="/drafts">草稿箱</router-link>
      </li>
    </ul>
    <div class="bigBox">
      <div class="tableEntryBox">
        <!-- <el-button type="primary" @click="dialogVisible = true">粘贴</el-button> -->
        <el-button type="primary" @click="exportExclude" size="small">下载模板</el-button>
        <el-upload style="margin-left:10px" class="upload-demo" type="primary" ref="upload" size="small" :limit=1 action='http://47.107.71.47/bishuiwan/api/event/getImportExcelEvent' multiple method:="post" accept=".xls,.xlsx" :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true">
        </el-upload>
        <el-button style="margin-left:10px" type="primary" size="small" @click="examineImportEvent">验证</el-button>
        <el-button style="margin-left:10px" size="small" type="primary" plain @click="importEvent">提交</el-button>
        <el-button style="margin-left:10px" size="small" type="primary" plain @click="importSuccessEvent">提交完成</el-button>
        <el-button style="margin-left:10px" size="small" type="primary" plain @click="deleteRow">清除</el-button>
      </div>
      <el-table :data="tableData" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" :cell-class-name="rowClass">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="事件主题" width="150" align="center">
          <template slot-scope="scope">
            <!-- <input type="text" v-model="scope.row.title" class='inputHidden' v-if="scope.row.status == true" style="color:green">
            <input type="text" v-model="scope.row.title" class='inputHidden' v-else > -->
            <!-- :class="[scope.row.status==true&&'inputActive']" -->
            <input type="text" v-model="scope.row.title" class='inputHidden'>
          </template>
        </el-table-column>
        <el-table-column label="初审人" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.firstExamineName" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="终审人" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.secondExamineName" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="奖扣日期" width="150" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.happenTime" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="事件类型" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.eventTypeName" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="事件内容" width="180" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.content" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="分值" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.value" class="inputHidden">
          </template>
        </el-table-column>
        <el-table-column label="奖扣对象" align="center">
          <template slot-scope="scope">
            <input type="text" v-model="scope.row.userName" class="inputHidden">
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-form-item type='flex' style="margin-top:10px;text-align:left">
        <el-button type="primary"  size="small" @click="exportReport()">导出报表</el-button>
      </el-form-item> -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination> -->
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">

      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="copy()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { Message } from "element-ui";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import {
  exportEventExcel,
  importEvent,
  getImportExcelEvent,
  examineImportEvent,
  getImportEvent,
  importSuccessEvent
} from "@/utils/axios/axios";
export default {
  name: "tableEntry",
  data() {
    return {
      is: false,
      tableData: [
        {
          title: "",
          firstExamineName: "",
          secondExamineName: "",
          happenTime: "",
          eventTypeName: "",
          content: "",
          value: "",
          userName: ""
        }
      ],
      pageNumber: 1,
      pageSize: 9999,
      total: 0,
      fileList: [],
      form: "",
      dialogVisible: false,
      textarea: "",
      isCopy: true,
      Nun: 0
    };
  },
  created() {
    // this.getList()
    // this.ctrlV()
  },
  watch: {},
  methods: {
    // 手动选择行
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection.length);
    },
    deleteRow() {
      if (this.multipleSelection.length == this.tableData.length) {
        console.log(
          this.tableData.length,
          this.multipleSelection.length,
          "清除"
        );

        this.tableData = [];
        this.isCopy == true;
      } else {
        for (let items of this.multipleSelection) {
          this.tableData = this.tableData.filter(
            (item, index, arr) => item != items
          );
        }
        this.isCopy == true;
      }
    },
    ctrlV() {
      console.log("粘贴", this.isCopy);

      document.getElementById("tableEntry").addEventListener("paste", e => {
        // Prevent the default pasting event and stop bubbling
        e.preventDefault();
        e.stopPropagation();

        // Get the clipboard data
        let paste = (e.clipboardData || window.clipboardData).getData("text");

        // Do something with paste like remove non-UTF-8 characters
        // paste = paste.replace(/style/gi, "data-style");

        // Find the cursor location or highlighted area
        const selection = window.getSelection();

        // Cancel the paste operation if the cursor or highlighted area isn't found
        if (!selection.rangeCount) return false;
        // var div = document.createElement("div");
        // div.innerHTML = paste;
        // // Paste the modified clipboard content where it was intended to go
        // selection.getRangeAt(0).insertNode(div);
        // console.log(paste);
        // if (this.isCopy == true && paste != "") {
        //   }
        this.textarea = paste;
        this.copy();
        //$("#tip").html(paste)
      });
    },
    //  数组分割
    sliceArray(array, size) {
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    },
    unique(arr) {
      let unique = {};
      arr.forEach(function(item) {
        unique[JSON.stringify(item)] = item; //键名不会重复
      });
      arr = Object.keys(unique).map(function(u) {
        //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
        return JSON.parse(u);
      });
      return arr;
    },
    copy() {
      console.log("tableData原数据: ", this.tableData);
      this.dialogVisible = false;
      this.textarea = this.textarea.replace(/[\r\n]/g, "	");
      console.log(this.textarea);
      let arr = this.textarea.split("	");
      console.log(arr[arr.length - 1]);
      console.log(arr.splice(arr.length - 1, 1));

      // arr.splice(arr[arr.length],1)
      arr = this.sliceArray(arr, 9);
      console.log(arr);
      // console.log(arr);
      let copyArr = [];
      for (let item of arr) {
        // console.log(arr[i]);
        copyArr.push({
          title: item[0],
          status: "",
          firstExamineName: item[1],
          secondExamineName: item[2],
          happenTime: item[3],
          eventTypeName: item[4],
          content: item[5],
          value: item[6],
          userName: item[7]
        });
        console.log(copyArr);
        // console.log(item[0]);
      }

      copyArr = this.unique(copyArr);
      // copyArr.splice(0, 1);
      this.isCopy = false;
      if (this.tableData.length > 1) {
        console.log(1);

        this.tableData = this.tableData.concat(copyArr);
      } else {
        console.log(2);
        this.tableData.splice(0, 1);
        this.tableData = this.tableData.concat(copyArr);
      }

      this.tableData = this.unique(this.tableData);
      console.log(this.tableData);
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        jsonData: JSON.stringify(this.tableData),
        pageSize: 9999
      };
      // getImportEvent(this.$qs.stringify(params)).then(res => {
      //   if (res.code === 1) {
      //     console.log(res);
      //     this.tableData = res.data.list;
      //     this.total = res.data.totalRow;
      //     this.isCopy = false;
      //     console.log(this.isCopy);
      //   }
      // });
    },
    importSuccessEvent() {
      // this.$axios({
      //   url: "event/importSuccessEvent",
      //   method: "POST",
      //   data: {
      //     sessionId: localStorage.getItem("sessionId"),
      //     jsonData: this.tableData
      //   },
      //   transformRequest: transformRequestFn
      // }).then(res => {
      //   if (res.data.code === 1) {
      //     Message.success({
      //       message: res.desc,
      //       customClass: "messageClass",
      //       center: true
      //     });
      //   }
      // });
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        jsonData: JSON.stringify(this.tableData)
      };
      importSuccessEvent(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.tableData = [];
          this.$message({
            type: "success",
            message: res.desc,
            customClass: "messageClass1"
          });
        }
      });
    },
    // 完成
    importEvent() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        jsonData: JSON.stringify(this.tableData)
      };
      importEvent(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.tableData = [];
          this.$message({
            type: "success",
            message: res.desc,
            customClass: "messageClass1"
          });
        }
      });
    },
    //   importEvent(){
    //     this.$axios({
    //       url: 'event/importEvent',
    //       method: 'POST',
    //       data: {
    //         sessionId: localStorage.getItem('sessionId'),
    //         jsonData: this.tableData
    //       },
    //       transformRequest: transformRequestFn
    //     }).then((res) => {
    //       if (res.data.code === 1) {
    //         Message.success({
    //   message: res.desc,
    //   customClass: 'messageClass',
    //   center: true
    // })
    //       }
    //     })
    //   },

    getNum(text) {
      var value = text.replace(/[^0-9]/gi, "");
      return value;
    },
    // 指定行变色
    tableRowClassName({ row, rowIndex }) {
      // console.log(row, rowIndex);

      // if (rowIndex === this.Nun) {
      //   return "success-row";
      // }
      if (row.status && row.status == true) {
        console.log("class执行");
        return "error-row";
      }
      return "";
    },
    // 指定单元格变色
    rowClass({ row, column, rowIndex, columnIndex }) {
      if (row.status == true && columnIndex == this.columnNum) {
        return "rgb196";
      }
      if (row.status == true && columnIndex == this.columnNum1) {
        return "rgb196";
      }
    },
    examineImportEvent() {
      //     this.$axios({
      //       url: 'event/examineImportEvent',
      //       method: 'POST',
      //       data: {
      //         sessionId: localStorage.getItem('sessionId'),
      //         jsonData: this.tableData
      //       },
      //       transformRequest: transformRequestFn
      //     }).then((res) => {
      //       if (res.data.code === 1) {
      //         Message.success({
      //   message: res.desc,
      //   customClass: 'messageClass',
      //   center: true
      // })
      //       }
      //     })
      // console.log(this.form,'999');
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        jsonData: JSON.stringify(this.tableData)
      };
      examineImportEvent(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.$message({
            type: "success",
            message: res.desc,
            customClass: "messageClass1"
          });
        }
        this.Nun = res.data.row - 1;
        this.Nun1 = res.data.row1 - 1;
        this.columnNum = res.data.column;
        this.columnNum1 = res.data.column1;
        // this.tableData[this.Nun].status = true;
        for (let item in this.tableData) {
          if (this.Nun == item) {
            this.tableData[item].status = true;
          } else {
            this.tableData[item].status = false;
          }
        }
        let params = this.tableData[this.Nun];
        this.$set(this.tableData, this.Nun, { ...params });
        // for (let item in this.tableData) {
        //   if (this.Nun1 == item) {
        //     this.tableData[item].status = true;
        //   } else {
        //     this.tableData[item].status = false;
        //   }
        // }

        // let params1 = this.tableData[this.Nun1];
        // this.$set(this.tableData, this.Nun1, { ...params });
      });
    },
    exportExclude() {
      // window.location.href =
      //   "http://10.0.0.110:8080/bishuiwan/api/event/exportEventExcel?sessionId=" +
      //   localStorage.getItem("sessionId");
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      exportEventExcel(this.$qs.stringify(params)).then(res => {
        console.log(res, "下载模板");
        if (res.code === 0) {
          this.$message.error("错误");
        } else {
          let str =
            "http://47.107.71.47/bishuiwan/api/event/exportEventExcel?sessionId=" +
            localStorage.getItem("sessionId");
          console.log(str, "跳转链接");
          window.location.href = str;
        }
      });
    },
    // 成功导入
    // submitUpload() {
    //     let list = document.getElementsByClassName('el-upload-list__item is-ready')
    //     if(list.length == 0){
    //       this.$message({
    //         type:'warning',
    //         message:"请选择需要导入的模板！"
    //       })
    //       return;
    //     }
    //     this.$refs.upload.submit();
    //   },
    uploadSectionFile(param) {
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("sessionId", localStorage.getItem("sessionId"));
      form.append("eventExcel", fileObj);
      form.append("pageNumber", this.pageNumber);
      form.append("pageSize", this.pageSize);
      console.log(form.get("sessionId"), "文件参数");
      console.log("文件", fileObj);
      this.form = form;
      getImportExcelEvent(form).then(res => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: res.desc,
            customClass: "messageClass1"
          });
          this.fileList = [];
          this.tableData = res.data.list;
          this.total = res.data.totalRow;
        } else {
          this.$message({
            type: "error",
            message: res.desc,
            customClass: "messageClass1"
          });
          this.fileList = [];
        }
      });
    },

    getList() {
      // this.$axios({
      //   url: 'event/importEvent',
      //   method: 'POST',
      //   data: {
      //     sessionId: localStorage.getItem('sessionId'),
      //     pageNumber: this.pageNumber,
      //     pageSize: this.pageSize,
      //   },
      //   transformRequest: transformRequestFn
      // }).then((res) => {
      //   if (res.data.code === 1) {
      //     this.total = res.data.data.totalRow
      //     this.tableData = res.data.data.list
      //   }
      // })
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
    // this.$nextTick(() => {
    //   this.tableRowClassName();
    // })
  }
};
</script>

<style>
.el-table .error-row > {
  color: red;
}
.rgb196 .cell input {
  color: red !important;
}
</style>


<style scoped>
.bigBox {
  background-color: #f2f9ff;
}
/* .el-table__row td {
  overflow: hidden;
  display: flex;
}
input {
  flex: 1;
  overflow: hidden;
  padding: 5px 10px;
} */

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tableEntry {
  min-height: 1000px;
  background-color: #fff;
}
.inputHidden {
  border: none;
  text-align: center;
  width: 80%;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
}
.inputActive {
  border: none;
  text-align: center;
  width: 80%;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: red;
}
.temLeft {
  text-align: left;
}
.navTitle {
  display: inline-block;
  width: 100%;
  background-color: white;
  padding-top: 12px;
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
.tableEntryBox {
  padding: 10px 15px 10px 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  /* height: 60px; */
  box-sizing: border-box;
  margin-top: 10px;
}
.el-pagination {
  margin-top: 43px;
  text-align: center;
  margin-bottom: 20px;
}
.cell {
  text-align: left !important;
  /* color: red; */
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table .error-row {
  background: red;
}
.rgb196 {
  color: blue !important;
}
</style>
