<template>
  <div class="bigBox">
    <div class="header">
      <span>报表详情</span>
      <el-button type="primary" size="small" @click="back()">返回</el-button>
    </div>
    <div class="groupPerson">
      <div class="bigTitle">{{ report.reportName }}
        <i class="el-icon-edit-outline" @click="edit()"></i>
      </div>
      <div class="groupTitle">
        <span>报表描述</span>
      </div>
      <div class="groupCentant">{{ report.description }}</div>
      <div class="groupTitle">
        <span>创建人</span>
      </div>
      <div class="personPic">
        <img src="../../images/bg@2x.png">
        <div class="wd" style="margin-left:10px">
          <div class="writer taskName" style="font-size:15px">{{ report.realName }}</div>
          <div class="writerDetail taskDep" style="font-size:12px">{{ report.department }}</div>
        </div>
      </div>
      <div class="mTop" style="margin-left:10px;font-size:13px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(175,175,175,1);
line-height:0px">{{ report.createTime }}</div>
    </div>
    <div class="nav">
      <div class="groupTitle">
        <span>成员列表</span>
      </div>
      <div class="button_btn mTop">
        <el-button type="primary" size="small" @click="addUser()">添加</el-button>
        <!-- <el-button type="primary" size="small" @click='commitAdd()'>提交</el-button> -->
      </div>
      <el-table class="mTop" :data="report.groups" style="width:980px;box-sizing:border-box;padding:0 5px;" :row-style="tableRowStyle" header-row-class-name="center" :header-cell-style="{background:'rgba(66,172,254,1)',width:'980px',height:'55px','text-align':'center'}">
        <el-table-column label="序号" prop="index">
        </el-table-column>
        <el-table-column label="小组名称" prop="groupName">
          <!-- <template slot-scope="scope"> -->
          <!-- <el-popover  placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper"> -->
          <!-- <el-tag size="medium">{{ scope.row.groupName }}</el-tag> -->
          <!-- </div>
            </el-popover> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="小组描述">
          <template slot-scope="scope">

            <div slot="reference" class="name-wrapper mtt">
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleDeletes(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="block mt mTop">
      <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination> -->
    </div>
    <el-dialog title="编辑报表" :visible.sync="dialogFormVisible">
      <div style="text-align: center">
        <!-- <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value4"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :titles="['Source', 'Target']"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
          </el-transfer> -->
      </div>
    </el-dialog>
    <!-- 新建小组 -->
    <el-dialog title="" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formEdit">
        <el-form-item label="修改报表名称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改报表描述" :label-width="formLabelWidth">
          <el-input v-model="formEdit.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="commit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加成员" :visible.sync="dialogVisible1" width="40%">
      <div class="treeBox">
        <div class="leftTree">
          <el-scrollbar style="height:500px;overflow-x: hidden;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterTexts">
            </el-input>
            <el-tree :data="data4.list" show-checkbox :props="prop9" :filter-node-method="filterNodes" node-key="id" :expand-on-click-node="false" @check-change="check_right_change" ref="tree">
            </el-tree>
          </el-scrollbar>

        </div>

        <!-- <ul v-for="(item,index) in data4.list" :key="index">
                          <li>
                            <el-checkbox :label="item.groupName" @check-change="check_right_change"></el-checkbox>
                          </li>
                        </ul> -->
        <div class="rightTree">
          <el-scrollbar style="height:100%;overflow-x: hidden;">

            <ul>
              <li v-for="(item,index) in selectedTreeArr" :key="index" style="margin-top:10px">
                <el-button @click="delId(item.id)" plain size="small">{{item.groupName}}</el-button>
              </li>
            </ul>
          </el-scrollbar>

        </div>
        <el-button type="primary" size="small" @click='commitAdd()' style="text-align:right;position: absolute;
    bottom: 0;
    right: 0;" class="subBtn">提交</el-button>

      </div>
      <!-- <el-button type="primary" size="small" @click="commitAdd()" >提交</el-button> -->

    </el-dialog>

  </div>
</template>
<script>
import {
  reportDetails,
  addReportGroup,
  deleteReportGroup,
  editReport,
  getAllDepartment,
  pageGroup
} from "@/utils/axios/axios";
export default {
  data() {
    return {
      report: [],
      tableData: [],
      currentPage4: 4,
      dialogFormVisible: false,
      value3: [1],
      value4: [1],
      data4: [],
      dialogVisible1: false,
      checkList: [],
      checkListUser: [],
      departmentId: "",
      prop9: {
        value: "id",
        label: "groupName"
      },
      formEdit: {
        name: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        content: ""
      },
      dialogFormVisibleAdd: false,
      formLabelWidth: "120px",
      filterTexts: "",
      selectedTreeArr: [] //已选中的tree数据,
    };
  },
  watch: {
    filterTexts(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNodes(value, data) {
      if (!value) return true;
      return data.groupName.indexOf(value) !== -1;
      console.log(data);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    tableRowStyle({ row, rowIndex }) {
      return "background-color: #F2F9FF";
    },
    back() {
      this.$router.go(-1);
    },
    handleDeletes(index, param) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: param.groupId,
        reportId: param.reportId
      };
      deleteReportGroup(this.$qs.stringify(params)).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.init();
        }
      });
    },
    handleEdit() {
      this.dialogFormVisible = true;
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        reportId: this.$route.query.reportId
      };
      console.log(params);

      reportDetails(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.report = res.data;
          for(let item in this.report.groups) {
            this.report.groups[item].index = Number(item) +1 
          }
        }
      });
    },
    // 修改报表弹窗
    edit() {
      this.dialogFormVisibleAdd = true;
    },
    // 修改报表描述
    commit() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        reportId: this.$route.query.reportId,
        reportName: this.formEdit.name,
        description: this.formEdit.content
      };
      editReport(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.dialogFormVisibleAdd = false;
          this.init();
        }
      });
    },
    // 选择标签
    check_right_change() {
      // this.checkList = [];
      // this.checkListUser = [];
      // // getCheckedNodes(leafOnly, includeHalfChecked){
      // // console.log(43333333333,leafOnly, includeHalfChecked);
      // // }
      // // let arr = []
      // var arr = this.$refs.tree.getCheckedNodes();
      // console.log(arr, "数组");
      // for (let item of arr) {
      //   console.log(item, "区分");
      //   this.checkList.push(item);
      //   let newArr = [];
      //   for (let itemNew of this.checkList) {
      //     newArr.push(itemNew.id);
      //     this.checkList = [...new Set(this.checkList)];
      //   }
      //   this.groupIds = newArr.join(",");
      //   console.log("部门", this.groupIds);
      // }
      this.selectedTreeArr = this.$refs.tree.getCheckedNodes();
    },
    // 删除指定
    delId(col) {
      console.log(col, "===============================", this.checkListUser);
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr.length; i++) {
        if (this.selectedTreeArr[i].id == col) {
          this.selectedTreeArr.splice(i, 1);
          // this.$delete(this.selectedTreeArr, i)
        }
      }
      this.selectedTreeArr.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      console.log(setCheckNodes);
      this.$refs.tree.setCheckedNodes(setCheckNodes);
      // console.log(this.selectedTreeArr, "截取数组");
    },
    // // 添加弹窗
    addUser() {
      this.dialogVisible1 = true;

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageSize:99999
      };
      pageGroup(this.$qs.stringify(params)).then(res => {
        console.log(res, "部门");
        if (res.code === 1) {
          this.data4 = res.data;
          console.log(this.data4, "集团");
        }
      });
    },
    //   // 提交添加
    commitAdd() {
      let arr = [];
      console.log(this.selectedTreeArr);

      for (let items of this.selectedTreeArr) {
        arr.push(items.id);
        // arr.push(items.id)
      }
      this.groupIds = arr.toString();
      console.log(arr, "dddd");

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        reportId: this.$route.query.reportId,
        groupIds: this.groupIds
      };
      addReportGroup(this.$qs.stringify(params)).then(res => {
        console.log(res, "添加用户");
        if (res.code === 1) {
          this.dialogVisible1 = false;

          this.init();
        }
      });
    }
  },
  mounted() {
    this.init();
    // console.log(this.$route.query.reportId,'ddd');
  }
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.bigBox {
  background-color: #f2f9ff;
  width: 100%;
  height: 100%;
  min-height: 800px;
  margin-bottom: 50px;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.header span {
  font-size: 18px;
}
.groupPerson {
  width: 950px;
  height: 330px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
}
.bigTitle {
  // width:144px;
  height: 23px;
  font-size: 24px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(35, 35, 35, 1);
  line-height: 0px;
  margin-left: 7px;
}
.groupTitle {
  margin-top: 10px;
  border-left: 3px solid #7c72cb;
  font-size: 17px;
  line-height: 30px;
  margin-left: 10px;
}
.groupTitle span {
  margin-left: 10px;
}
.groupCentant {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 17px;
}
.personPic {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
}
.personPic img {
  width: 51px;
  height: 51px;
  border-radius: 26px;
  overflow: hidden;
}
.mTop {
  margin-top: 15px;
}
.button_btn {
  display: flex;
  justify-content: flex-start;
  margin-left: 10px;
}
.nav {
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
}
.dfCenter {
  display: flex;
  justify-content: center;
}
.treeBox {
  position: relative;
}
.leftTree {
  display: inline-block;
  // border: 1px solid #000;
  width: 50%;
  // height: 200px;
  border-right: 1px solid black;
}
.rightTree {
  margin-left: 50%;
  text-align: left;
  // border: 1px solid #000;
  height: 100%;
  width: 200px;
  overflow-y: auto;
  top: 0;
  position: absolute;
  // right: 0;
}
.wd {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<style>
/* 表格内容样式  自定义组件样式*/
.cell {
  text-align: center !important;
  /* color: red; */
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
