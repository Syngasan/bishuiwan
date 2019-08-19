<template>
  <div class="bigBox">
    <div class="header">
      <span>小组详情</span>
      <el-button type="primary" size="small" @click="back()">返回</el-button>
    </div>
    <div class="groupPerson">
      <div class="bigTitle">{{ group.groupName }}
        <i class="el-icon-edit-outline" @click="edit()"></i>
      </div>
      <div class="groupTitle">
        <span>小组描述</span>
      </div>
      <div class="groupCentant">{{ group.description }} </div>
      <div class="groupTitle">
        <span>创建人</span>
      </div>
      <div class="personPic">
        <img src="../../images/bg@2x.png">
        <div class="wd" style="margin-left:10px">
          <div class="writer taskName" style="font-size:15px">{{ group.realName }}</div>
          <div class="writerDetail taskDep" style="font-size:12px">{{ group.department }}</div>
        </div>
      </div>
      <div class="mTop " style="margin-left:10px; 
font-size:13px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(175,175,175,1);
line-height:0px;">{{ group.createTime }}</div>
    </div>
    <div class="nav">
      <div class="groupTitle">
        <span>成员列表</span>
      </div>
      <div class="button_btn mTop">
        <el-button type="primary" size="small" style="height:32px" @click="addUser()">添加</el-button>
        <el-button type="primary" size="small" style="height:32px" @click="downExcal()">下载Excel模板</el-button>
        <el-upload style="margin-left:10px" class="upload-demo" ref="upload" :limit=1 action='http://47.107.71.47/bishuiwan/api/group/importGroupUserExcel' multiple method:="post" :on-preview="handlePreview" accept=".xls,.xlsx" :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true">
          <el-button slot="trigger" size="small" type="primary">导入Excel</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitDone">确认提交</el-button> -->
        </el-upload>
        <!-- <el-button type="primary" size="small" @click="intoExcal()">提交</el-button>         -->
      </div>
      <el-table class="mTop" :data="group.groupUser" style="width:980px;box-sizing:border-box;padding:0 5px;" :row-style="tableRowStyle" header-row-class-name="center" :header-cell-style="{background:'rgba(66,172,254,1)',width:'980px',height:'55px','text-align':'center'}">
        <el-table-column label="序号" prop="index">
        </el-table-column>
        <el-table-column label="部门" prop="name">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px" >{{ scope.row.date }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="姓名" prop="realName">
          <!-- <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
          </template> -->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 详情弹窗 -->
    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-form :model="formEdit">
        <el-form-item label="修改小组名称" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改小组描述" :label-width="formLabelWidth">
          <el-input v-model="formEdit.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitEdit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加成员" :visible.sync="dialogVisible1" width="40%">
      <div class="treeBox">
        <div class="leftTree">
          <el-scrollbar style="height:250px;overflow-x: hidden;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterTexts">
            </el-input>
            <el-tree :data="data4" show-checkbox node-key="id" :props="prop9" :expand-on-click-node="false" :filter-node-method="filterNodes" @check-change="check_right_change" ref="tree">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" class="fuckBtn" size="mini" v-show="data.hasOwnProperty('account')" @click="() => append(data)">
                    设为常选
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
          <div>
            <span>常选人员</span>
            <el-scrollbar style="height:250px;overflow-x: hidden;">

              <el-tree :data="data6" show-checkbox :props="prop11" node-key="id" @check-change="check_right_change_Common" ref="treechangxaun">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" class="fuckBtn" size="mini" @click="() => noAppend(data)">
                      取消常选
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </el-scrollbar>

          </div>

        </div>
        <div class="rightTree">
          <!-- <div>
            <ul v-for="(item,index) in checkList" :key="index">
              <li>
                <el-button plain size="small" @click="delDepId(item.id)">{{item.name}}</el-button>
              </li>
            </ul>
          </div> -->
          <div>
            <el-scrollbar style="height:100%;overflow-x: hidden;">
              <ul>
                <li v-for="(cols,colIndex) in selectedTreeArr" :key="colIndex" v-if="cols.hasOwnProperty('account')" style="margin-top:10px">
                  <el-button @click="delId(cols.id)" type="primary" size="small">{{cols.name}}</el-button>
                </li>
              </ul>
              <ul>
                <li v-for="(colss,colIndexs) in selectedTreeArr2" :key="colIndexs" style="margin-top:10px">
                  <el-button @click="delIdCC(colss.id)" plain size="small">{{colss.name}}</el-button>
                </li>
              </ul>
            </el-scrollbar>

          </div>

        </div>
        <el-button @click="commitAdd()" type="primary" size="small" style="text-align:right" class="dialogBtn">提交</el-button>

      </div>
      <!-- <el-button type="primary" size="small" @click="commitAdd()" style="margin-top:10px">提交</el-button> -->

    </el-dialog>
  </div>
</template>
<script>
import {
  groupDetails,
  addGroupUser,
  editGroup,
  deleteGroupUser,
  getDepartment,
  exportGroupModelExcel,
  importGroupUserExcel,
  setCommonUser,
  cancelCommonUser,
  getCommonUserList
} from "@/utils/axios/axios";
export default {
  data() {
    const data4 = [];
    const data6 = [];
    return {
      fileList: [],
      tableData: [],
      data4: JSON.parse(JSON.stringify(data4)),
      data6: JSON.parse(JSON.stringify(data6)),
      ccList: [],
      prop9: {
        children: "children",
        label: "name"
      },
      prop11: {
        value: "userId",
        label: "realName"
      },
      currentPage4: 4,
      dialogFormVisible: false,
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
      formAdd: {
        userId: ""
      },
      formLabelWidth: "120px",
      group: [],
      dialogVisible1: false,
      checkList: [],
      checkListUser: [],
      departmentId: "",
      userIds: "",
      userArrId: [],
      userArrIds: "",
      filterTexts: "",
      selectedTreeArr: [], //已选中的tree数据,
      selectedTreeArr2: [] //已选中的tree数据
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
      return data.name.indexOf(value) !== -1;
      console.log(data);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: this.$route.query.groupId,
        groupUserId: row.id
      };
      deleteGroupUser(this.$qs.stringify(params)).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.$message({
            message: res.desc,
            type: "success",
            customClass: "messageClass1"
          });
          this.init();
        }
      });
    },
    // 选中标签
    check_right_change() {
      // this.checkList =[]
      // this.checkListUser=[]
      // getCheckedNodes(leafOnly, includeHalfChecked){
      // console.log(43333333333,leafOnly, includeHalfChecked);
      // }
      // let arr = []
      // var arr = this.$refs.tree.getCheckedNodes();
      this.selectedTreeArr = this.$refs.tree.getCheckedNodes();
      // this.selectedTreeArr = this.selectedTreeArr.concat(this.$refs.tree.getCheckedNodes())
      // this.selectedTreeArr = [...new Set(this.selectedTreeArr)];
      console.log(this.selectedTreeArr, "当前数组");
      // for (let item of arr) {
      //   console.log(item);
      //   if (item.series) {
      //     console.log("部门", this.departmentId);
      //     this.checkList.push(item);
      //     let newArr = [];
      //     for (let itemNew of this.checkList) {
      //       newArr.push(itemNew.id);
      //       this.checkList = [...new Set(this.checkList)];
      //     }
      //     this.departmentId = newArr.toString();
      //   } else if (item.account) {
      //     console.log("用户", this.userIds);
      //     this.checkListUser.push(item);
      //     let userArr = [];
      //     for (let itemUser of this.checkListUser) {
      //       userArr.push(itemUser.id);
      //       this.checkListUser = [...new Set(this.checkListUser)];
      //     }
      //     // this.userIds = userArr.join(',')
      //   }
      // }
      // console.log(this.arrLength,arr.length);

      // this.checkListUser.length = arr.length;
      // console.log('发生变化');

      // for (let oldItem = 0; oldItem < this.checkListUser.length; oldItem++) {
      //   for (let newItem of arr) {
      //     if (this.checkListUser[oldItem].userId == newItem.id) {
      //       console.log("已存在");

      //       this.checkListUser.splice(oldItem, 1);
      //     } else {
      //       console.log("不存在");
      //       for (let item of arr) {
      //         console.log("斤斤计较军军军军军军军军军军军军军军军");

      //         if (item.series) {
      //           this.checkList.push(item);
      //           let newArr = [];
      //           for (let itemNew of this.checkList) {
      //             newArr.push(itemNew.id);
      //             this.checkList = [...new Set(this.checkList)];
      //           }
      //           this.departmentId = newArr.toString();
      //           console.log("部门", this.departmentId);
      //         } else if (item.account) {
      //           this.checkListUser.push(item);
      //           let userArr = [];
      //           for (let itemUser of this.checkListUser) {
      //             userArr.push(itemUser.id);
      //             this.checkListUser = [...new Set(this.checkListUser)];
      //           }
      //           // this.userIds = userArr.join(',')

      //           console.log("用户", this.userIds);
      //         }
      //       }
      //     }
      //   }
      // }
    },
    // 删除指定用户id
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
      this.$refs.tree.setCheckedNodes(setCheckNodes);
      // console.log(this.selectedTreeArr, "截取数组");
    },
    delIdCC(col) {
      console.log(col, "===============================", this.checkListUser);
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr2.length; i++) {
        if (this.selectedTreeArr2[i].id == col) {
          this.selectedTreeArr2.splice(i, 1);
          // this.$delete(this.selectedTreeArr, i)
        }
      }
      this.selectedTreeArr2.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      console.log(setCheckNodes);
      // this.$refs.tree.setCheckedNodes(setCheckNodes);
      this.$refs.treechangxaun.setCheckedNodes(setCheckNodes);
      // console.log(this.selectedTreeArr, "截取数组");
    },
    // 删除部门id
    delDepId(col) {
      for (let i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i].id == col) {
          this.checkList.splice(i, 1);
        }
      }
    },
    // 追加常选
    append(data) {
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
      console.log(data, "追加常选");
      // 设为常选人员
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      setCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(
            res.desc,
            "----------------------------------",
            this.data6
          );

          this.$delete(data, "account");

          this.getCommonUserListPeople();
        }
      });
    },
    // 取消常选
    noAppend(data) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      cancelCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res, "----------------------------------");
          // this.$set(data, "account", "1");
          for (let item of this.data4) {
            for (let item1 of item.children) {
              for (let item2 of item1.children) {
                if (data.id == item2.id) {
                  console.log(item1, "哈哈哈哈哈");
                  this.$set(item2,'account',1)
                }
              }
            }
          }
          // this.getDepPeople()
          this.getCommonUserListPeople();
        }
      });
    },
    // 指定常选人员
    check_right_change_Common() {
      // var arr = this.$refs.treechangxaun.getCheckedNodes();
      // let newArr = [];
      // for (let item of arr) {
      // item.account = '1'
      // this.selectedTreeArr.push(item);
      // this.selectedTreeArr = [...new Set(this.selectedTreeArr)];
      // console.log(this.checkListUser);
      // newArr.push(item.userId)
      // newArr = [...new Set(newArr)]
      // console.log(newArr,'常选');
      // }
      // if (this.checkListUser.length != 0) {
      //       this.checkListUser = this.checkListUser.concat(this.ccList)
      //     }
      // this.changxuan=newArr.join(',')

      // this.doUserId = this.changxuan+','+this.doUserIds
      // console.log(this.changxuan,'常选',this.doUserId);
      this.selectedTreeArr2 = this.$refs.treechangxaun.getCheckedNodes();
      console.log(this.selectedTreeArr2, "常选");
    },
    getCommonUserListPeople() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getCommonUserList(this.$qs.stringify(params)).then(res => {
        console.log(res, "常选");
        if (res.code === 1) {
          this.data6 = res.data;
        }
      });
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
    //获取部门人员
    getDepPeople() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageSize:99999
      };
      getDepartment(this.$qs.stringify(params)).then(res => {
        console.log(res, "部门");
        if (res.code === 1) {
          this.data4 = res.data;
          console.log(this.data4, "集团");
        }
      });
    },
    // 添加成员
    addUser() {
      this.dialogVisible1 = true;
      this.getCommonUserListPeople();
      this.getDepPeople();
    },
    // 提交编辑
    commitEdit() {
      console.log(this.form.name, this.form.content, "小组信息");
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.content = "";
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: this.$route.query.groupId
      };
      groupDetails(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.group = res.data;
          for(let item in this.group.groupUser) {
            this.group.groupUser[item].index = Number(item) +1 
          }
        }
      });
    },
    // 编辑详情
    edit() {
      this.dialogFormVisible = true;
    },
    commitEdit() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: this.$route.query.groupId,
        groupName: this.formEdit.name,
        description: this.formEdit.content
      };
      editGroup(this.$qs.stringify(params)).then(res => {
        // console.log(res,'修改小组');
        if (res.code === 1) {
          this.dialogFormVisible = false;
          this.init();
        }
      });
    },
    commitAdd() {
      let arr = [];
      let newArr = [];
      this.selectedTreeArr = this.selectedTreeArr.concat(this.selectedTreeArr2);
      for (let item of this.selectedTreeArr) {
        arr.push(item.id);
      }
      for (let items of this.selectedTreeArr) {
        newArr.push(items.id);
      }
      this.userIds = arr.toString();

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: this.$route.query.groupId,
        userIds: this.userIds
      };
      addGroupUser(this.$qs.stringify(params)).then(res => {
        console.log(res, "添加用户");
        if (res.code === 1) {
          this.dialogVisible1 = false;
          this.init();
          this.checkList = [];
          this.checkListUser = [];
        }
      });
    },
    // 下载excal模板
    downExcal() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      exportGroupModelExcel(this.$qs.stringify(params)).then(res => {
        console.log(res, "下载模板");
        if (res.code === 0) {
          this.$message.error("错误");
        } else {
          let str =
            "http://47.107.71.47/bishuiwan/api/group/exportGroupModelExcel?sessionId=" +
            localStorage.getItem("sessionId");
          console.log(str, "跳转链接");
          window.location.href = str;
        }
      });
    },
    // 导入excal

    // uploadUrl(){
    //                     var url = 'http://47.107.71.47/bishuiwan/api/group/importGroupUserExcel?sessionId='+localStorage.getItem('sessionId')
    //                     return url;
    //                 },
    //                 handleSuccess(){
    //                     //上传成功要处理的事
    //                 },
    handlePreview() {
      //上传前要处理的事
    },
    submitUpload() {
      let list = document.getElementsByClassName(
        "el-upload-list__item is-ready"
      );
      if (list.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要导入的模板！",
          customClass: "messageClass1"
        });
        return;
      }
      this.$refs.upload.submit();
    },
    uploadSectionFile(param) {
      var fileObj = param.file;
      // FormData 对象
      var form = new FormData();
      // 文件对象
      form.append("sessionId", localStorage.getItem("sessionId"));
      form.append("groupUsers", fileObj);
      console.log(form.get("sessionId"), "文件参数");
      console.log("文件", fileObj);

      importGroupUserExcel(form).then(res => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: res.desc,
            customClass: "messageClass1"
          });
          for (let item of res.data) {
            this.userArrId.push(item.id);
          }
          this.userArrIds = this.userArrId.join(",");
          this.init();
          this.submitDone();
          this.fileList = [];
        } else {
          // this.$message({
          //   type:'error',
          //   message:res.desc,
          //   customClass: "messageClass1",
          // })
          this.fileList = [];
        }
      });
    },
    // 确认提交完成
    submitDone() {
      console.log(this.userArrId, "用户id数组");
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        groupId: this.$route.query.groupId,
        userIds: this.userArrIds
      };
      addGroupUser(this.$qs.stringify(params)).then(res => {
        console.log(res, "添加用户");
        if (res.code === 1) {
          this.dialogVisible1 = false;
          this.init();
        }
      });
    }
  },
  mounted() {
    console.log(this.$route.query, "路由参数");
    this.init();
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
  box-sizing: border-box;
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
.groupTitle {
  margin-top: 10px;
  border-left: 3px solid #7c72cb;
  font-size: 17px;
  line-height: 30px;
  margin-left: 10px;
}
.groupTitle span {
  margin-left: 10px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(50, 50, 52, 1);
  line-height: 36px;
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
.checkBox {
  width: 217px;
  height: 38px;
  // background:rgba(97,97,97,1);
  // background-color: red;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
}
.checkBox_right {
  width: 27px;
  height: 27px;
  line-height: 27px;
  font-size: 20px;
  vertical-align: middle;
  color: #979797;
  border-radius: 50%;
  border: 1px solid black;
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
  height: 100%;
  width: 200px;
  overflow-y: auto;
  top: 0;
  position: absolute;
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
.fuckBtn span {
  position: absolute;
  right: 10px;
  /* top:0px; */
  display: inline-block;
  height: 0px;
  line-height: 0px;
}
/* .messageClass1 {
  min-width: 300px;
  top: 50%
} */
</style>
    