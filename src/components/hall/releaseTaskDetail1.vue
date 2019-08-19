<template>
  <!-- 发布任务 -->
  <div class="task">
    <div class="caogao">
      <el-button type="primary" size="small" @click="caogao()">草稿箱</el-button>
    </div>
    <!-- <div class="header_title mt">
      <div class="header_title_left">编辑任务</div>
      <div class="header_title_right">
        <el-button type="primary" plain size="small">返回</el-button>
      </div>
    </div> -->
    <div class="contentDetail mt">
      <el-form :inline="true">
        <div class="content_header">
          <i class="el-icon-edit-outline"></i>
          填写发布任务
        </div>
        <el-row style="margin-top:20px">
          <el-col :span="8">
            <!-- <el-form-item label="事件主题" > -->
            <span class="eventtypetheme">事件主题</span>
            <el-input placeholder="请输入事件主题" size="small" style="width:200px;margin-left:4px" class="EventTheme" v-model="title"></el-input>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="事件类型"> -->
            <span class="eventtypetheme">事件类型</span>
            <el-select v-model="eventTypeId" placeholder="请选择" size='small' style="width:200px" class="EventTheme">
              <el-option v-for="item in option" :key="item.value" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
        <el-row class="mt">
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="终  审 人" > -->
            <span class="eventtypetheme" style="margin-left:5px">终 审 人</span>
            <el-select v-model="secondExamineUserId" placeholder="请输入 \ 选择" size='small' style="width:200px;margin-left:5px" class="EventTheme" filterable @change="getinput(secondExamineUserId)">
              <el-option v-for="item in options" :key="item.id" :label="item.nick" :value="item.userId">
              </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="完成奖分"> -->
            <span class="eventtypetheme">完成奖分</span>
            <el-input placeholder="" size="small" style="width:80px" class="EventTheme" v-model="reward" oninput="value=value.replace(/[^0-9-]+/,'')"></el-input>&nbsp;分
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="未完成扣分"> -->
            <span class="eventtypetheme">未完成扣分</span>
            <el-input size="small" style="width:80px" class="EventTheme" v-model="deduction" oninput="value=value.replace(/[^0-9-]+/,'')"></el-input> &nbsp;分
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
        <el-row class="mt">
          <el-col :span="24" style="display:flex" class="mt">
            <!-- <el-form-item label="备      注">
              <el-input placeholder="请输入备注内容" size="small" style="width:200px" v-model="remark"></el-input>
            </el-form-item> -->
            <span class="eventtypetheme">备 注</span>
            <el-input placeholder="请输入备注内容" size="small" style="width:200px;margin-left:36px" v-model="remark"></el-input>
          </el-col>
        </el-row>
        <el-row class="mt">
          <el-col :span="24" style="display:flex" class="mt">
            <!-- <el-form-item label="任务内容">
              <el-input type="textarea" :rows="2" placeholder="请输入事件内容" v-model="content">
              </el-input>
            </el-form-item> -->

            <span class="eventtypetheme" style="width:80px">事件内容</span>
            <el-input type="textarea" :rows="6" placeholder="请输入事件内容" v-model="content" size="small"></el-input>
          </el-col>
        </el-row>
        <el-row class="mt">
          <el-col :span="8" class="mt">
            <!-- <el-form-item label=" 推送范围"> -->
            <span class="eventtypetheme">推送范围</span>
            <el-select v-model="example0" placeholder="请选择推送范围" size='small' class="EventTheme" style="width:200px;margin-left:5px" ref="tuisong" @change="tuisong(example0)">
              <el-option v-for="item in optionsa" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="数量上限"> -->
            <span class="eventtypetheme">数量上限</span>
            <el-input placeholder="请输入数量上限" :disabled="numberInput" size="small" style="width:200px;" class="EventTheme" oninput="value=value.replace(/[^\d]/g,'')" v-model="number" ref="numberInput"></el-input>
            <!-- </el-form-item> -->
          </el-col>
        </el-row>
        <!-- 设置推送范围 -->
        <el-row class="mt">
          <el-col :span="4" class="mt">
            <el-form-item id="canSee" style="display:none">
              <el-radio v-model="radio" label="1" class="font">设置可见范围</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <div class="can" id="canSee1" style="display:none">
            <el-col :span="8">
              <el-form-item>
                <div class="checkBox">
                  <div class="checkBox_left">房务部</div>
                  <div class="checkBox_right">
                    X
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="checkBox">
                  <div class="checkBox_left">房务部</div>
                  <div class="checkBox_right">
                    X
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row>
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="截止日期"> -->
            <span class="eventtypetheme">截止日期</span>
            <el-date-picker type="datetime" placeholder="请选择截止期限" size="small" class="EventTheme" style="width:200px;margin-left:5px" value-format="yyyy-MM-dd HH:mm:ss" v-model="endTime" @change="getEndTime"></el-date-picker>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="8" class="mt">
            <!-- <el-form-item label="完成期限"> -->
            <span class="eventtypetheme">完成期限</span>
            <el-date-picker type="datetime" placeholder="请选择完成期限" size="small" class="EventTheme" style="width:200px" value-format="yyyy-MM-dd HH:mm:ss" v-model="happenTime" @change="getHappenTime"></el-date-picker>
            <!-- </el-form-item> -->
          </el-col>

        </el-row>
      </el-form>
      <div style="margin-left:200px;margin-top:90px">
        <el-button type="primary" size="small" @click="toCommit()" style="width:82px">发布</el-button>
        <el-button size="small" @click="save()" style="width:82px">保存</el-button>
      </div>
    </div>
    <el-dialog title="可见范围" :visible.sync="dialogVisible" width="40%">
      <div class="treeBox">
        <div class="leftTree">
          <el-scrollbar style="height:250px;overflow-x: hidden;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>

            <el-tree :data="data5" show-checkbox node-key="id" :props="prop10" default-expand-all :expand-on-click-node="false" @check-change="check_right_change_bufen" ref="treebufen" :filter-node-method="filterNode">
            </el-tree>
          </el-scrollbar>
        </div>
        <div class="rightTree">
          <el-scrollbar style="overflow-x: hidden;height:100%">
            <ul>
              <li v-for="(item,index) in selectedTreeArr3" :key="index" style="margin-top:10px">
                <!-- <el-checkbox :label="item.name" @change="part( item.id )"></el-checkbox> -->
                <el-button @click="part(item.id)" plain size="small">{{item.name}}</el-button>

              </li>
            </ul>
          </el-scrollbar>

        </div>

        <el-button @click="bufenCommit()" type="primary" size="small" class="dialogBtn" style="text-align:right">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="指定人员" :visible.sync="dialogVisible1" width="40%">
      <div class="treeBox">
        <div class="leftTree">
          <el-scrollbar style="height:250px;overflow-x: hidden;">
            <el-input placeholder="输入关键字进行过滤" v-model="filterTexts">
            </el-input>
            <el-tree :data="data4" show-checkbox node-key="id" :props="prop9" :expand-on-click-node="false" @check-change="check_right_change" ref="tree" :filter-node-method="filterNodes">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" class="fuckBtn" v-show="data.hasOwnProperty('account')" size="mini" @click="() => append(data)">
                    设为常选
                    <!-- {{data.hasOwnProperty('account') ==true ? '设为常选' : ''}} -->
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
          <div>
            <span>常选人员</span>
            <el-scrollbar style="height:250px;overflow-x: hidden;">
              <el-tree :data="data6" show-checkbox :props="prop11" @check-change="check_right_change_Common" node-key="id" ref="treechangxaun">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button class="fuckBtn" type="text" size="mini" @click="() => noAppend(data)">
                      取消常选
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </el-scrollbar>

          </div>
        </div>

        <div class="rightTree">
          <div>
            <ul>
              <!-- 部门 -->
              <li v-for="(item,index) in selectedTreeArr" :key="index" v-show="item.hasOwnProperty('series')" style="margin-top:10px">
                <el-button plain size="small" type="success" @click="delDepId(item.id)">{{item.name}}</el-button>
              </li>
            </ul>
          </div>
          <el-scrollbar style="height:500px;overflow-x: hidden;">
            <ul>
              <!-- 人员 -->
              <li v-for="(cols,colIndex) in selectedTreeArr" :key="colIndex" v-show="cols.hasOwnProperty('account')" style="margin-top:10px">
                <el-button @click="delId(cols.id)" type="primary" plain size="small">{{cols.realName}}</el-button>
              </li>
            </ul>
            <ul>
              <li v-for="(colss,colIndexs) in selectedTreeArr2" :key="colIndexs" style="margin-top:10px">
                <el-button @click="delIdCC(colss.id)" plain size="small">{{colss.realName}}</el-button>
              </li>
            </ul>
          </el-scrollbar>
        </div>
        <el-button @click="add()" type="primary" size="small" class="dialogBtn" style="text-align:right;position: absolute;
    bottom: 0;
    right: 0;">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  publishTask,
  getExamineUserByBusiness,
  getEventTypeName,
  getDepartment,
  getCommonUserList,
  getAllDepartment,
  setCommonUser,
  cancelCommonUser
} from "@/utils/axios/axios";
export default {
  data() {
    const generateData = _ => {
      const data = [];
      const old = [];
      for (let i = 0; i < old.length; i++) {
        data.push({
          key: i,
          label: old[i]
          // label: `备选项 ${i}`
          // disabled: i % 4 === 0
        });
      }
      return data;
    };
    const data4 = [];
    const data5 = [];
    const data6 = [];
    return {
      filterText: "",
      filterTexts: "",
      ccList: [],
      seltedRights: [],
      checkList: [],
      checkListbufen: [],
      checkListUser: [],
      prop10: {
        value: "id",
        children: "children",
        label: "name"
      },
      prop9: {
        value: "id",
        children: "children",
        label: "name"
      },
      prop11: {
        value: "userId",
        label: "realName"
      },
      data4: JSON.parse(JSON.stringify(data4)),
      data5: JSON.parse(JSON.stringify(data5)),
      data6: JSON.parse(JSON.stringify(data6)),
      data: generateData(),
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      option: [],
      options: [],
      optionsa: [
        {
          value: 1,
          label: "部分可见"
        },
        {
          value: 2,
          label: "定向推送"
        },
        {
          value: 0,
          label: "全员"
        }
      ],
      title: "",
      valuetuisong: 10,
      radio: true,
      dialogVisible: false,
      dialogVisible1: false,
      example0: "",
      example1: "",
      eventTypeId: this.eventTypeId,
      secondExamineUserId: "",
      secondExamineUserName: "",
      reward: "",
      deduction: "-" + "",
      content: "",
      remark: "",
      ranges: "",
      number: "",
      endTime: "",
      happenTime: "",
      groupId: "",
      optionPeople: [],
      value: [],
      www: {
        value: "id",
        children: "children",
        label: "name"
      },
      selectedOptions2: [],
      departmentId: "",
      state: 0,
      changxuan: "",
      doUserId: "",
      doUserIds: "",
      numberInput: false,
      clearable: false,
      selectedTreeArr: [], //选中的指定人员
      selectedTreeArr2: [], //选中的常选人员
      selectedTreeArr3: [] //选中的范围
    };
  },

  methods: {
    // 选中部分
    check_right_change_bufen() {
      // let arr = this.$refs.treebufen.getCheckedNodes();
      // console.log(arr, "部门");

      // for (let item in arr) {
      //   this.checkListbufen.push(arr[item]);
      //   this.checkListbufen = [...new Set(this.checkListbufen)];
      //   console.log(arr[item], "数组", item);
      //   let newArr = [];
      //   for (let index of this.checkListbufen) {
      //     newArr.push(index.id);
      //     this.departmentId = newArr.join(",");
      //     console.log("参数", this.departmentId);
      //   }
      // }
      this.selectedTreeArr3 = this.$refs.treebufen.getCheckedNodes();
      console.log(this.selectedTreeArr3);
    },
    // 选中标签指定人员
    check_right_change() {
      // var arr = this.$refs.tree.getCheckedNodes();
      // console.log(arr, "数组");
      // for (let item of arr) {
      //   console.log(item, "区分");
      //   if (item.series) {
      //     this.checkList.push(item);
      //     let newArr = [];
      //     for (let itemNew of this.checkList) {
      //       newArr.push(itemNew.id);
      //       // this.checkList = newArr
      //       this.checkList = [...new Set(this.checkList)];
      //     }
      //     this.departmentId = newArr.join(",");
      //     console.log("部门", this.departmentId);
      //   } else if (item.account) {
      //     this.checkListUser.push(item);
      //     let userArr = [];
      //     this.checkListUser = [...new Set(this.checkListUser)];
      //     for (let itemUser of this.checkListUser) {
      //       userArr.push(itemUser.id);
      //       userArr = [...new Set(userArr)];
      //       this.checkListUser = [...new Set(this.checkListUser)];
      //     }
      //   }
      // }
      this.selectedTreeArr = this.$refs.tree.getCheckedNodes();
      console.log(this.selectedTreeArr, "选中的指定人员");
    },
    // 确认选中的人 拼接
    add() {
      let arr = [];
      let newArr = [];
      this.selectedTreeArr = this.selectedTreeArr.concat(this.selectedTreeArr2);
      console.log("拼接数组", this.selectedTreeArr);
      //64 1120
      // this.checkListUser = [...new Set(this.checkListUser)];
      // for (let item of this.checkListUser) {
      //   arr.push(item.id);
      // }
      // for (let items of this.checkList) {
      //   newArr.push(items.id);
      // }
      // this.number = this.checkListUser.length;
      // this.numberInput = true;
      // arr = [...new Set(arr)];
      // newArr = [...new Set(newArr)];
      // this.doUserId = arr.toString();
      // this.departmentId = newArr.toString();
      // console.log(this.doUserId, "结果数组", this.departmentId);
      for (let item in this.selectedTreeArr) {
        if (this.selectedTreeArr[item].hasOwnProperty("series")) {
          arr.push(this.selectedTreeArr[item].id);
        } else if (this.selectedTreeArr[item].hasOwnProperty("account")) {
          newArr.push(this.selectedTreeArr[item].id);
        }
      }
      this.doUserId = newArr.toString();
      this.departmentId = arr.toString();

      this.dialogVisible1 = false;
      // this.$refs.tuisong.selected = false
      this.number = this.checkListUser.length;
      this.numberInput = true;
      console.log(this.example0);
      this.example0 = "";
      this.example0 = "定向推送";
      // this.ccList = this.doUserId.split(',')
    },
    aaaaa() {
      let arr = this.ccList.filter(item => {
        return item != "-1";
      });
      console.log(arr);
    },
    // 删除指定用户id
    delId(col) {
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr.length; i++) {
        if (
          this.selectedTreeArr[i].id == col &&
          this.selectedTreeArr[i].hasOwnProperty("account")
        ) {
          this.selectedTreeArr.splice(i, 1);
        }
      }
      this.selectedTreeArr.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      this.$refs.tree.setCheckedNodes(setCheckNodes);
    },
    // 删除部门id
    delDepId(col) {
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr.length; i++) {
        if (
          this.selectedTreeArr[i].id == col &&
          this.selectedTreeArr[i].hasOwnProperty("series")
        ) {
          this.selectedTreeArr.splice(i, 1);
        }
      }
      this.selectedTreeArr.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      this.$refs.tree.setCheckedNodes(setCheckNodes);
    },
    delIdCC(col) {
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr2.length; i++) {
        if (this.selectedTreeArr2[i].id == col) {
          this.selectedTreeArr2.splice(i, 1);
        }
      }
      this.selectedTreeArr2.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      this.$refs.treechangxaun.setCheckedNodes(setCheckNodes);
    },
    // 追加常选
    append(data) {
      // 设为常选人员
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      setCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res.desc, "----------------------------------");
          this.$delete(data, "account");
          this.getCommonUserListPeople();
        }
      });
    },
    // 取消常选
    noAppend(data) {
      console.log("取消", data);
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      cancelCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res.desc, "----------------------------------");
          for (let item of this.data4) {
            for (let item1 of item.children) {
              for (let item2 of item1.children) {
                if (data.id == item2.id) {
                  console.log(item1, "哈哈哈哈哈");
                  this.$set(item2, "account", 1);
                }
              }
            }
          }
          this.getCommonUserListPeople();
        }
      });
    },
    // 指定常选人员
    check_right_change_Common() {
      // var arr = this.$refs.treechangxaun.getCheckedNodes();
      // console.log(arr, "选中的常选", this.doUserId);
      // let newArr = [];
      // for (let item of arr) {
      //   this.checkListUser.push(item);
      //   this.checkListUser = [...new Set(this.checkListUser)];
      // }
      // this.ccList = [...new Set(newArr)];
      this.selectedTreeArr2 = this.$refs.treechangxaun.getCheckedNodes();
      console.log(this.selectedTreeArr2);
      for (let item in this.selectedTreeArr2) {
        this.selectedTreeArr2[item].account = "1";
      }
    },
    caogao() {
      console.log(1);

      this.$router.push("/hall/releaseTaskDetail/releaseTask");
    },
    // handleChange (value, direction, movedKeys) {
    //   console.log(value, direction, movedKeys)
    // },
    // 完成时间
    getHappenTime(val) {
      this.happenTime = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      // console.log(this.month,val);
    },
    // 截止时间
    getEndTime(val) {
      this.endTime = val; //这个sTime是在data中声明的，也就是v-model绑定的值
      // console.log(this.month,val);
    },
    handleChangeTo(value) {
      console.log(value, "选中");
    },
    handleChange(value) {
      console.log(this.optionPeople, "选中部门", value);
      // for( let item of this.optionPeople ) {
      //   for (let item2 of this.data) {
      //     item2.label = item.name
      //     this.doUserId = item2.key
      //   }
      // }
      // this.optionPeople.forEach((item, index) => {
      //   if(value == item.id) {
      //     this.data.push({
      //       key: value,
      //       label: item.name
      //     })
      //   }
      // })
      // console.log(this.doUserId,this.data,'hhhhhhhhh');
    },
    // 发布
    toCommit() {
      this.state = 1;
      this.commit();
    },
    // 保存
    save() {
      this.state = 0;
      this.commit();
    },
    commit() {
      // this.state = 1
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        title: this.title,
        eventTypeId: this.eventTypeId,
        secondExamineUserId: this.secondExamineUserId,
        secondExamineUserName: this.secondExamineUserName,
        reward: this.reward,
        deduction: this.deduction,
        content: this.content,
        remark: this.remark,
        ranges: this.example1,
        number: this.number,
        endTime: this.endTime,
        happenTime: this.happenTime,
        groupId: this.groupId == false ? "" : this.groupId,
        departmentId: this.departmentId == false ? "" : this.departmentId,
        doUserId: this.doUserId == false ? "" : this.doUserId,
        state: this.state
      };
      console.log(params);

      publishTask(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.tip = res.desc.split("")[0] + res.desc.split("")[1];

          this.$confirm(
            "您可以继续" +
              this.tip +
              "新的任务，也可以查看刚才" +
              this.tip +
              "的任务！",
            res.desc,
            {
              confirmButtonText: "去看看",
              cancelButtonText: "取消",
              // type: 'warning',
              center: true
            }
          )
            .then(() => {
              if (res.desc === "发布成功") {
                console.log("发布成功");
                let taskParams = {
                  sessionId: localStorage.getItem("sessionId"),
                  taskId: res.data
                };
                this.$router.push({
                  path: "/hall/published/publishedTaskDetailDid",
                  query: taskParams
                });
              } else if (res.desc === "保存成功") {
                console.log("保存成功");
                // releaseTaskDetailEdit
                let taskParams = {
                  sessionId: localStorage.getItem("sessionId"),
                  taskId: res.data
                };
                this.$router.push({
                  path: "/hall/published/releaseTaskDetailDraft",
                  query: taskParams
                });
              }
            })
            .catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '取消'
              // });
              // this.$router.go(0)
              (this.title = ""),
                (this.eventTypeId = ""),
                (this.secondExamineUserId = ""),
                (this.secondExamineUserName = ""),
                (this.reward = ""),
                (this.deduction = ""),
                (this.content = ""),
                (this.remark = ""),
                (this.example0 = ""),
                (this.number = ""),
                (this.endTime = ""),
                (this.happenTime = ""),
                (this.groupId = ""),
                (this.departmentId = ""),
                (this.doUserId = ""),
                (this.state = "");
            });
        }
      });
    },
    // 可见范围 删除
    part(value) {
      // for (let i = 0; i < this.selectedTreeArr3.length; i++) {
      //   if (this.selectedTreeArr3[i].id == value) {
      //     this.selectedTreeArr3.splice(i, 1);
      //   }
      // }
      let setCheckNodes = [];
      for (let i = 0; i < this.selectedTreeArr3.length; i++) {
        this.selectedTreeArr3.splice(i, 1);
      }
      this.selectedTreeArr3.forEach(item => {
        setCheckNodes.push({ id: item.id, label: item.name });
      });
      this.$refs.treebufen.setCheckedNodes(setCheckNodes);
    },
    bufenCommit() {
      let arr = [];
      for (let item in this.selectedTreeArr3) {
        arr.push(this.selectedTreeArr3[item].id);
      }
      arr = [...new Set(arr)];
      this.departmentId = arr.toString();
      console.log(this.departmentId);

      this.dialogVisible = false;
      this.example0 = "";
      this.example0 = "部分可见";
    },
    handleNodeClick() {
      console.log(4);
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      // 终审人
      getExamineUserByBusiness(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.options = res.data;
          // console.log(this.options,'dd');
        }
      });
      // 事件类型
      getEventTypeName(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.option = res.data;
          console.log(this.option, "dd");
        }
      });
    },
    // 同时获取value和label 终审
    getinput(val) {
      let obj = {};
      obj = this.options.find(item => {
        //这里的userList就是上面遍历的数据源
        return item.userId === val; //筛选出匹配数据
      });
      console.log(obj, val, "终审"); //我这边的name就是对应label的
      this.secondExamineUserName = obj.nick;
    },
    getDepartmentPeople() {
      let sessionId = localStorage.getItem("sessionId");
      // let departmentId = this.departmentId
      let params = {
        sessionId: sessionId
      };
      getDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.data4 = res.data;
          console.log(this.data4, "集团");
        }
      });
    },
    getDepartmentPeoplebufen() {
      let sessionId = localStorage.getItem("sessionId");
      // let departmentId = this.departmentId
      let params = {
        sessionId: sessionId
      };
      getAllDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.data5 = res.data;
          console.log(this.data5, "集团");
        }
      });
    },
    renderContent(h, { node, data, store }) {},
    // 获取常选名单
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
    // 推送
    tuisong(val) {
      if (val === 1) {
        // 部分
        console.log("339695569");

        this.dialogVisible = true;
        this.number = "";
        this.numberInput = false;
        this.example1 = val;
        this.ranges = this.example1;
        this.getDepartmentPeoplebufen();
      } else if (val === 2) {
        // 定向
        console.log(val, this.example0);

        this.dialogVisible1 = true;
        this.example1 = val;
        this.ranges = this.example1;
        this.getDepartmentPeople();
        this.getCommonUserListPeople();
      } else if (val === 0) {
        console.log("val");

        this.numberInput = false;
        this.number = "";
        this.example1 = val;
        this.ranges = this.example1;
      }
    },
    // 筛选
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
      console.log(data);
    },
    filterNodes(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
      console.log(data);
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    filterText(val) {
      this.$refs.treebufen.filter(val);
    },
    filterTexts(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.task {
  background-color: #f2f9ff;
  padding: 15px;
  box-sizing: border-box;
  padding-left: 20px;
  width: 100%;
  min-height: 850px;
}
.caogao {
  display: flex;
  justify-content: flex-start;
  // margin-left: 10px;
}
.header_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.header_title_left {
  // width:60px;
  height: 20px;
  font-size: 20px;
  font-family: PingFang-SC-Regular;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 0px;
}
.content_header {
  width: 160px;
  height: 20px;
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(21, 21, 21, 1);
}
.mt {
  margin-top: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
}
.font {
  width: 107px;
  height: 18px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(6, 147, 255, 1);
  line-height: 0px;
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
  margin-left: 55%;
  text-align: left;
  // border: 1px solid #000;
  height: 100%;
  width: 200px;
  overflow-y: auto;
  top: 0;
  position: absolute;
  // right: 0;
}
.shijianneirong {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
}
.eventtypetheme {
  /* width: 70px; */
  display: inline-block;

  /* height:16px; */
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  // line-height: 26px;
}
.EventTheme {
  // width: 250px;
  height: 46px;
  line-height: 46px;
}
</style>
<style>
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
  overflow: scroll;
}
.fuckBtn span {
  position: absolute;
  right: 10px;
  top: 8px;
}
.el-tree-node__content {
  padding-left: 36px;
  position: relative;
}
</style>
