<template>
  <div class="wrapper">
    <div class="WebEntry">
      <ul class="navTitle">
        <li :class="[this.$route.query.id==undefined&&'active']">
          <router-link to="/WebEntry">网页录入</router-link>
        </li>
        <li>
          <router-link to="/tableEntry">表格录入</router-link>
        </li>
        <li>
          <router-link to="/Submission">已提交</router-link>
        </li>
        <li :class="[this.$route.query.id!=undefined&&'active']">
          <router-link to="/drafts">草稿箱</router-link>
        </li>
      </ul>
      <div class="clear"></div>
      <div class="Entry">
        <div class="EntryTitle"><img src="./img/bb18.png">
          <span>填写事项</span>
        </div>
        <el-row class="">
          <el-col :span="12" class="marginBotton">
            <span class="eventtypetheme">事件主题</span>
            <el-input size="small" class="EventTheme" placeholder="事件主题" v-model="title"> </el-input>
          </el-col>
          <el-col :span="12" class="marginBotton">
            <span class="eventtypetheme">初审人</span>
            <!-- <el-select v-model="firstExamineUserId" class="EventTheme" placeholder="请输入 \ 选择"> -->
            <el-cascader size="small" placeholder="请输入 \ 选择" @change="getFirstExamineUserName" v-model="firstExamineUserId" :show-all-levels='level' :props="prop9" :options="options" filterable change-on-select class="EventTheme">
              <!-- <el-option :key="item.id" :label="item.label" :value="item.id" v-for="(item,index) in options"></el-option> -->
            </el-cascader>
            <!-- </el-select> -->
          </el-col>
          <el-col :span="12" class="marginBotton">
            <span class="eventtypetheme">奖扣日期</span>
            <el-date-picker class="EventTheme" size="small" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="happenTime" @change="setTime" :picker-options="pickerOptions"></el-date-picker>
          </el-col>
          <el-col :span="12" class="marginBotton">
            <span class="eventtypetheme">终审人</span>
            <el-select v-model="secondExamineUserId" size="small" filterable class="EventTheme" placeholder="请输入 \ 选择">
              <el-option :key="item.userId" :label="item.nick" :value="item.userId" v-for="(item,index) in options1"></el-option>
            </el-select>
          </el-col>

        </el-row>
        <div class="clear"></div>

        <div class="EntryTitle"><img src="./img/bb19.png">
          <span>填写事件</span>
        </div>
        <template v-for="(item,index) in event">
          <div :class="[ event.length>1 && 'eventBorder']">
            <div class="EntryEvent"><img src="./img/bb20.png">
              <span>事件{{index+1}}</span>
              <el-button type="primary" @click="toggleIsBool(index)" size="small" class="shijianku">事件库
              </el-button>
              <el-button type="danger" @click="deleteEvent(index)" v-if="event.length > 1" size="small">删除事件
              </el-button>
              <!-- <router-link to="/EventLibrary">
              <el-button type="primary" @click="toggleIsSelectedEventLib()">事件库</el-button>
            </router-link> -->
            </div>
            <!-- <ul class="Event">
            <li class="EventItem">
              <span class="title">事件类型</span>
              <span class="content">{{$store.state.eventInfo.eventTypeName}}</span>
            </li>
            <li class="EventItem">
              <span class="title">备&emsp;&emsp;注</span>
              <input type="text" placeholder="请输入备注内容" v-model="$store.state.eventInfo.remark">
            </li>
            <li class="EventItem">
              <span class="title">事件内容</span>
              <span class="eventContent">{{$store.state.eventInfo.content}}</span>
            </li>
          </ul> -->
            <el-row>
              <el-col :span="24" class="marginBotton">
                <span class="eventtypetheme">事件类型</span>
                <!--  -->
                <el-select v-model="form[index].eventTypeId" placeholder="请选择" size="small" :disabled="isSelectedEventLib[index]" style="margin-left: 7px;">
                  <el-option :label="item.name" :value="item.id" v-for="(item,index) in eventList" :key="index"></el-option>
                </el-select>
              </el-col>
              <el-col :span="24" class="marginBotton" style="display:flex">
                <span class="eventtypetheme">事件内容</span>
                <el-input style="margin-left: 10px;" type="textarea" :rows="4" placeholder="请输入事件内容" size="small" v-model="form[index].content" :disabled="isSelectedEventLib[index]"></el-input>
              </el-col>
              <el-col :span="24" class="marginBotton">
                <span class="eventtypetheme">备 注</span>
                <el-input size="small" style="margin-left: 6px;" class="inputRemake" placeholder="选填" v-model="form[index].remark"></el-input>
              </el-col>

            </el-row>
            <div class="entryHeader">奖扣对象</div>
            <div :ref="toValue" style="display:none;height:20px;margin-bottom:15px;margin-top: 15px;" v-show="!isSelectedEventLib[index]">
              <el-button @click="toValue(form[index].allValue)" type="primary" size="small">一键设置</el-button>
              <el-input-number v-model="form[index].allValue" style="width:150px;margin-left:103px" size="small"></el-input-number>&nbsp;
              <span style="width:16px;
height:16px;
font-size:17px;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(0,0,0,1);
line-height:0px;">分</span>
            </div>
            <el-row>
              <el-col :span="12" :key="this" class="objectList" v-for="(items,indexs) in form[index].userList">
                <div class="objectListBox">
                  <img class="logo" :src=url+items.head>
                  <div class="objectListBoxName">
                    <div class="objectListBoxNameTop">{{items.name || 'null'}}</div>
                    <div class="objectListBoxNameBottom">{{items.department}}</div>
                  </div>
                  <div class="objectListBoxNum">
                    <el-input-number size="small" v-model="defaultWorderScore[index]" @change="handleChange" label="描述文字" :disabled="isSelectedEventLib[index]" v-if="isSelectedEventLib[index]"></el-input-number>
                    <el-input-number size="small" v-model="items.value" @change="handleChange" label="描述文字" :disabled="isSelectedEventLib[index]" v-else></el-input-number> 分
                  </div>
                  <img class="close" src="./img/jkdx_close@3x.png" @click="removeEvent(index, indexs)">
                </div>
              </el-col>
            </el-row>
            <div class="clear"></div>
            <div class="addEntry" @click="showDialogVisible(index)"><img src="./img/bb22.png">
              <p>添加奖扣对象</p>
            </div>
          </div>
        </template>
        <div class="clear"></div>
        <div class="addEntry backgroundB" @click="addEvent()"><img src="./img/bb22.png">
          <p>添加事件</p>
        </div>
        <ul class="detail">
          <li class="item" v-if="firstExamineTime">初审时间: {{firstExamineTime}}</li>
          <li class="item" v-if="firstExamineReason">初审意见: {{firstExamineReason}}</li>
          <li class="item" v-if="secondExamineTime">终审时间: {{secondExamineTime}}</li>
          <li class="item" v-if="secondExamineReason">终审意见: {{secondExamineReason}}</li>
        </ul>
        <div class="forBtn">
          <el-button type="primary" @click="saveEvent(0)" class="shijianku" size="small">保存</el-button>
          <el-button plain @click="saveEvent(1)" class="shijianku" size="small">提交</el-button>
        </div>
      </div>

      <el-dialog title="添加成员" :visible.sync="dialogVisible" width="40%">
        <div class="treeBox">
          <div class="leftTree">
            <el-scrollbar style="height:250px;overflow-x: hidden;">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
              <el-tree :data="data4" show-checkbox node-key="id" :props="prop9" :expand-on-click-node="false" @check-change="check_right_change" ref="tree" :filter-node-method="filterNode">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" class="fuckBtn" v-show="data.hasOwnProperty('account')" size="mini" @click="() => append(data)">
                      <!-- {{data.hasOwnProperty('account')  ? '设为常选' : ''}} -->
                      设为常选
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </el-scrollbar>
            <div>
              <span>常选人员</span>
              <el-scrollbar style="height:250px;overflow-x: hidden;">
                <el-tree :data="data6" show-checkbox :props="prop11" @check-change="check_right_change_Common" ref="treechangxaun">
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

          <div class="rightTree" style="height:100%">
            <!-- <div>
              <ul v-for="(item,index) in checkList"
                  :key="index">
                <li>
                  <el-button plain
                             size="small"
                             @click="delDepId(item.id)">{{item.name}}</el-button>
                </li>
              </ul>
            </div> -->
            <el-scrollbar style="overflow-x: hidden;height:100%">
              <ul v-for="(cols,colIndex) in checkListUser" :key="colIndex">
                <li>
                  <el-button @click="delId(cols.id)" style="margin-top:10px" plain size="small">{{cols.realName}}</el-button>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <el-button @click="add()" type="primary" size="small" class="dialogBtn" style="text-align:right">确定</el-button>
        </div>
      </el-dialog>
      <!--
        <el-dialog title=" " :visible.sync="dialogMessageVisible" center width="30%">
          <mt-cell title="提交失败">
            <img slot="icon" src="./img/fail_icon@2x.png" style="margin-right: 10px;" width="24" height="24">
          </mt-cell>
          <div class="MessageCode">事件1与系统中已有事件存在重复项，请检查<p>修改后重新提交！</p></div>
        </el-dialog> -->

      <div class="fixedMark" v-show="bool">
        <div class="EventLibrary">
          <div class="EventLibraryBox">
            <div class="EventLibraryBoxSelect">
              <el-select v-model="eventTypeId" placeholder="请选择">
                <!-- <el-cascader placeholder="全部" v-model="eventTypeId" :options="options"filterable change-on-select class="EventTheme"> -->
                <el-option :key="item.name" :label="item.name" :value="item.id" v-for="(item,index) in eventType"></el-option>
                <!-- </el-cascader>  -->
              </el-select>
              <el-input class="searchInput" v-model="keyword1" placeholder="请输入内容"></el-input>
              <el-button type="primary" @click="getList1">搜索</el-button>
              <el-button plain @click="toggleIsBool">返回</el-button>
              <!-- <router-link to="/WebEntry"><el-button plain>返回</el-button></router-link> -->
            </div>
          </div>
          <el-table :data="tableData1" stripe style="width: 100%">
            <el-table-column prop="eventTypeId" label="序号" align="center" type="index" :index="setIndex"></el-table-column>
            <el-table-column prop="name" label="事件类型" align="center">
            </el-table-column>
            <el-table-column prop="content" label="事件内容" align="center">
              <!-- <template slot-scope="scope">
                <router-link :to="'/DetailsOfTheEvent/'+scope.row.id+'/1'"
                             class="EventTitle">{{scope.row.content}}</router-link>
              </template> -->
            </el-table-column>
            <el-table-column prop="value" label="分值" align="center"></el-table-column>
            <el-table-column prop="address" label="操作" align="center">
              <template slot-scope="scope">
                <!-- <router-link to="/WebEntry"> -->
                <el-button type="danger" size="mini" @click="clodeEventInfo(scope.row)" v-if="selectEventId[eventIndex] == scope.row.id">取消选择</el-button>
                <el-button type="primary" size="mini" @click="pushEventInfo(scope.row)" v-else>确认选择</el-button>
                <!-- </router-link> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="pageNumber1" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Message } from "element-ui";
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
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { curentYearMonthDay } from "@/utils/date/getDate";
export default {
  name: "WebEntry",
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
      checkList: [],
      checkListbufen: [],
      checkListUser: [],
      data: generateData(),
      title: "", // 事件主题
      happenTime: "",
      firstExamineUserId: [],
      firstExamineUserName: [],
      secondExamineUserId: "",
      event: [1],
      radio2: 1,
      dialogEventVisible: false,
      dialogMessageVisible: false,
      allValue: "",
      form: [
        {
          eventTypeId: "",
          remark: "",
          content: "",
          userList: [],
          value: "",
          allValue: ""
        }
      ],
      num1: 1,
      num2: 1,
      dialogVisible: false,
      data: [
        {
          key: 1,
          label: "昵称昵称"
        },
        {
          key: 2,
          label: "昵称昵称"
        },
        {
          key: 3,
          label: "昵称昵称"
        },
        {
          key: 4,
          label: "昵称昵称"
        },
        {
          key: 5,
          label: "昵称昵称"
        },
        {
          key: 6,
          label: "昵称昵称"
        }
      ],
      options: [],
      selectedOptions: [],
      options1: [],
      selectedOptions1: [],
      eventList: [],
      addIndex: 0,
      vals: [],
      isSelectedEventLib: [false],
      steadyScore: [],
      address: "",
      keyword1: "",
      eventType: [],
      eventTypeId: [],
      tableData1: [],
      pageNumber1: 1,
      pageSize1: 10,
      total1: 0,
      bool: false,
      eventIndex: 0,
      selectEventId: [], //事件库被选中的id
      defaultWorderScore: [0],
      leftTreeSelectList: [], //奖扣对象, 左侧被选中列表
      targetId: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      secondExamineReason: "",
      secondExamineTime: "",
      firstExamineTime: "",
      firstExamineReason: "",
      level: true,
      url: "http://47.107.71.47/bishuiwan"
    };
  },
  // computed: {
  //   isSelectedEventLib() {
  //     if(!this.$store.state.eventInfo) {
  //       return false
  //     }
  //     return true
  //   }
  // },
  mounted() {
    //do something after updating vue instance
    // console.log(this.firstExamineUserId);
    localStorage.setItem("currentPath", this.$route.path);
  },
  created() {
    if (this.$route.query.id) {
      this.getEventTitle(this.$route.query.id);
    } else {
      this.happenTime = curentYearMonthDay();
      this.getDefaultSecond();
      this.getDefaultFirst();
    }
    this.getFirstUserByName();
    this.getFirstUserByName1();
    this.getFirstUserByName2();
    this.getDepartmentPeople();
    this.getCommonUserListPeople();
    this.getList1();
    this.getEventType();

    console.log("sadsafaaaaaaaaaaa", this.$route.query.id);
    // if (this.$route.query.id == undefined) {

    // }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    toValue(changeValue) {
      console.log(this.form[this.eventIndex]);

      this.form[this.eventIndex].userList.map(item => {
        return (item.value = changeValue);
      });
      // this.checkListUser.map(item => {
      //   return (item = {
      //     userId: item.userId,
      //     name: item.name,
      //     department: item.department,
      //     head: item.head,
      //     value: item.allValue
      //   });
      // });
      // console.log(this.form[this.eventIndex].userList, this.form);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
      console.log(data);
    },
    deleteEvent(index) {
      console.log(index, this.form, this.isSelectedEventLib);
      this.checkListUser = [];
      this.getDepartmentPeople();
      this.getCommonUserListPeople();

      this.$delete(this.event, index);
      this.$delete(this.form, index);
      this.$delete(this.isSelectedEventLib, index);
      console.log(index, this.form, this.isSelectedEventLib);
    },
    getEventTitle(eventTitleId) {
      this.$axios({
        url: "event/getEventTitle",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          eventTitleId
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        this.firstExamineUserName = res.data.data.firstExamineUserName;
        // this.firstExamineUserId = res.data.data.firstExamineUserId
        this.targetId = res.data.data.firstExamineUserId;
        this.secondExamineUserId = res.data.data.secondExamineUserId;
        this.secondExamineUserName = res.data.data.secondExamineUserName;
        this.happenTime = res.data.data.happenTime;
        this.title = res.data.data.title;
        if (res.data.data.firstExamineReason) {
          this.firstExamineReason = res.data.data.firstExamineReason;
        }
        if (res.data.data.firstExamineTime) {
          this.firstExamineTime =
            res.data.data.firstExamineTime.split(" ")[0] + "";
        }
        if (res.data.data.secondExamineTime) {
          this.secondExamineTime =
            res.data.data.secondExamineTime.split(" ")[0] + "";
        }
        if (res.data.data.secondExamineReason) {
          this.secondExamineReason = res.data.data.secondExamineReason;
        }
        this.form = res.data.data.eventList.map(item => {
          return {
            eventTypeId: item.eventTypeId,
            remark: item.remark,
            content: item.content,
            id: item.id,
            userList: item.eventUserList.map(ite => {
              return {
                userId: ite.userId,
                name: ite.name,
                department: ite.department,
                head: ite.head,
                value: ite.value
              };
            })
          };
        });
      });
    },
    delId(col) {
      console.log(col, "===============================", this.checkListUser);
      // for ( let i =0;i<this.checkListUser.length;i++) {
      //   if (this.checkListUser[i].id == col) {
      //     this.checkListUser.splice(i,1)
      //   }
      // }
      this.checkListUser = this.checkListUser.filter((item, index) => {
        return item.id !== col;
      });
      console.log(this.checkListUser, "截取数组");
    },
    setIndex(index) {
      return index + 1;
    },
    setTime(e) {
      console.log(e);
      this.happenTime = e;
    },
    getDefaultFirst() {
      this.$axios({
        url: "examiner/getDefaultFirst",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.targetId = res.data.data.id;
          console.log("targetId", this.targetId);
          // console.log(this.firstExamineUserId);
          // this.firstExamineUserId = [res.data.data.id]
          this.firstExamineUserName = res.data.data.realName;
        }
      });
    },
    getDefaultSecond() {
      this.$axios({
        url: "examiner/getDefaultSecond",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        this.secondExamineUserId = res.data.data.id;
        this.secondExamineUserName = res.data.data.realName;
      });
    },
    pushEventInfo(row) {
      // this.eventList = []
      console.log(row, this.eventList);
      // this.eventList.push(row)
      // console.log(this.eventList);

      // this.selectEventId[this.eventIndex] = row.id
      this.$set(this.selectEventId, this.eventIndex, row.id);
      this.$set(this.defaultWorderScore, this.eventIndex, row.value);
      this.$set(this.form, this.eventIndex, {
        eventTypeId: row.secondEventType,
        eventLibraryId: row.id,
        remark: row.remark,
        content: row.content,
        value: row.value,
        type: 1,
        userList: []
      });
      // this.form[this.eventIndex] = {
      //   eventTypeId: row.eventTypeId,
      //   eventLibraryId: row.id,
      //   remark: row.remark,
      //   content: row.content,
      //   value: row.value,
      //   type: 1,
      //   userList: []
      // }
      this.isSelectedEventLib[this.eventIndex] = true;
      this.bool = !this.bool;
      // this.eventList = row
      // this.eventList = [];
      console.log(this.eventList);
    },
    clodeEventInfo(row) {
      // this.selectEventId[this.eventIndex] = 0
      this.$set(this.selectEventId, this.eventIndex, 0);
      this.$set(this.defaultWorderScore, this.eventIndex, 0);
      // this.form[this.eventIndex] = {
      //   eventTypeId: "",
      //   remark: "",
      //   content: "",
      //   value: "",
      //   type: 0,
      //   userList: []
      // };
      this.$set(this.form, this.eventIndex, {
        eventTypeId: "",
        remark: "",
        content: "",
        value: "",
        type: 0,
        userList: []
      });
      // this.isSelectedEventLib[this.eventIndex] = false;
      this.$set(this.isSelectedEventLib, this.eventIndex, false);
      this.bool = !this.bool;
      console.log(this.eventList,'取消');
    },
    toggleIsBool(index) {
      // this.$router.push('/EventLibrary')
      this.eventIndex = index;
      this.bool = !this.bool;
    },
    getFirstExamineUserName(res, ress, resss) {
      this.vals = this.getCascaderObj(this.firstExamineUserId, this.options);
      // this.firstExamineUserName = this.getCascaderObj(this.firstExamineUserName, this.options);
      console.log(this.vals, "0000", res, ress, resss);
      this.level = false;
    },
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) {
            opt = itm.children;
            return itm;
          }
        }
        return null;
      });
    },
    // getCascaderObj(val, opt) {
    //   return val.map(function(value, index, array) {
    //     for (var itm of opt) {
    //       if (itm.value == value) {
    //         opt = itm.children;
    //         return itm;
    //       }
    //     }
    //     return null;
    //   });
    // },
    removeEvent(index, indexs) {
      // items.splice(indexs, 1)
      // this.$set(this.form[index].userList, indexs, [])
      this.$delete(this.form[index].userList, indexs);
      // this.form[index].userList = this.form[index].userList.filter(item => {
      //   return item.length !== 0
      // })
      console.log(this.form[index].userList);
      // this.$set(items, indexs, [])
    },
    saveEvent(index) {
      console.log(index);

      if (this.firstExamineUserId == []) {
        Message.error({
          message: "请选择初审人",
          customClass: "messageClass1",
          center: true
        });
        return;
      }
      if (!this.title) {
        Message.error({
          message: "请填写事件主题",
          customClass: "messageClass1",
          center: true
        });
        return;
      }
      if (!this.happenTime) {
        Message.error({
          message: "请选择奖扣日期",
          customClass: "messageClass1",
          center: true
        });
        return;
      }
      if (this.form.some(item => item.eventTypeId == "")) {
        Message.error({
          message: "请选择事件类型",
          customClass: "messageClass1",
          center: true
        });
        return;
      }
      if (this.form.some(item => item.content == "")) {
        Message.error({
          message: "请事件内容",
          customClass: "messageClass1",
          center: true
        });
        return;
      }
      if (this.form.some(item => item.userList.length == 0)) {
        Message.error({
          message: "请添加奖扣对象",
          customClass: "messageClass1",
          center: true
        });
        return;
      }

      var firstExamineUserId =
        this.firstExamineUserId.length == 0
          ? ""
          : this.firstExamineUserId[this.firstExamineUserId.length - 1];
      var firstExamineUserName = this.vals[this.vals.length - 1].realName
        ? this.vals[this.vals.length - 1].realName
        : this.vals[this.vals.length - 1];
      var secondExamineUserName = "";
      // for (var i = 0; i < this.vals.length; i++) {
      //   if (this.vals[i].departmentId == this.firstExamineUserId) {
      //     firstExamineUserName =this.vals[i].label
      //   }
      // }
      for (var i = 0; i < this.options1.length; i++) {
        if (this.options1[i].userId == this.secondExamineUserId) {
          secondExamineUserName = this.options1[i].nick;
        }
      }
      // console.log(firstExamineUserName)
      // console.log(secondExamineUserName)
      // return
      console.log("初审人ID: ", firstExamineUserId);
      console.log("初审人Name: firstExamineUserName", this.vals);
      console.log("终审人Id: ", this.secondExamineUserId);
      console.log("终审人Name: ", secondExamineUserName);
      console.log("奖扣日期: ", this.happenTime);
      if (!this.$route.query.id) {
        this.$axios({
          url: "event/saveEvent",
          method: "POST",
          data: {
            sessionId: localStorage.getItem("sessionId"),
            state: index,
            title: this.title,
            firstExamineUserId: firstExamineUserId,
            firstExamineUserName: firstExamineUserName,
            secondExamineUserId: this.secondExamineUserId,
            secondExamineUserName: secondExamineUserName,
            happenTime: this.happenTime,
            jsonData: JSON.stringify(this.form)
          },
          transformRequest: transformRequestFn
        }).then(res => {
          if (res.data.code === 1) {
            Message.success({
              message: res.data.desc,
              customClass: "messageClass1",
              center: true
            });
            setTimeout(() => {
              this.form = [
                {
                  eventTypeId: "",
                  remark: "",
                  content: "",
                  userList: [],
                  value: ""
                }
              ];
              this.isSelectedEventLib = [false];
              this.eventIndex = 0;
              this.selectEventId = []; //事件库被选中的id
              this.defaultWorderScore = [0];
              this.title = "";
              this.allValue = "";
            });
            this.$refs.toValue[0].style.display = "none";
          } else {
            Message.error({
              message: res.data.desc,
              customClass: "messageClass1",
              center: true
            });
          }
        });
      } else if (this.$route.query.id) {
        console.log(this.form);
        this.$axios({
          url: "event/updateEventTitle",
          method: "POST",
          data: {
            sessionId: localStorage.getItem("sessionId"),
            state: index,
            title: this.title,
            firstExamineUserId: firstExamineUserId,
            firstExamineUserName: firstExamineUserName,
            id: this.$route.query.id,
            secondExamineUserId: this.secondExamineUserId,
            secondExamineUserName: secondExamineUserName,
            happenTime: this.happenTime,
            jsonData: JSON.stringify(this.form)
          },
          transformRequest: transformRequestFn
        }).then(res => {
          if (res.data.code === 1) {
            console.log(44);

            Message.success({
              message: res.data.desc,
              customClass: "messageClass1",
              center: true
            });
            setTimeout(() => {
              this.form = [
                {
                  eventTypeId: "",
                  id: "",
                  remark: "",
                  content: "",
                  userList: []
                }
              ];
              this.isSelectedEventLib = [false];
              this.eventIndex = 0;
              this.selectEventId = []; //事件库被选中的id
              this.defaultWorderScore = [0];
              this.title = "";
            });
            setTimeout(() => {
              this.$router.push("/drafts");
            }, 2000);
            this.$refs.toValue[0].style.display = "none";
          } else {
            Message.error({
              message: res.data.desc,
              customClass: "messageClass1",
              center: true
            });
          }
        });
      }
    },
    showDialogVisible(index) {
      this.eventIndex = index;
      this.dialogVisible = true;
      this.addIndex = index;
    },
    deteleObject(obj) {
      var uniques = [];
      var stringify = {};
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
          return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      uniques = uniques;
      return uniques;
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
    add() {
      // console.log(this.checkListUser);

      if (!this.isSelectedEventLib[this.eventIndex]) {
        console.log(
          "0000000000000000000000",
          this.form[this.eventIndex].userList
        );
        // this.form[this.eventIndex].userList = this.checkListUser.map(item => {
        //   return (item = {
        //     userId: item.userId,
        //     name: item.name,
        //     department: item.department,
        //     head: item.head,
        //     value: this.allValue
        //   });
        // })
        let arr = this.checkListUser.map(item => {
          return (item = {
            userId: item.userId,
            name: item.name,
            department: item.department,
            head: item.head,
            value: 0
          });
        });
        console.log(arr, "叽叽叽叽");
        // concat
        this.form[this.eventIndex].userList = this.form[
          this.eventIndex
        ].userList.concat(arr);

        this.form[this.eventIndex].userList = this.unique(
          this.form[this.eventIndex].userList
        );

        // this.$refs.toValue[0].style.display = "block";
      } else {
        //           console.log(this.$refs.toValue[0].style.display);
        // this.$refs.toValue[0].style.display = "none";
        this.form[this.eventIndex].userList = this.checkListUser.map(item => {
          return (item = {
            userId: item.userId,
            name: item.name,
            department: item.department,
            head: item.head,
            value: this.defaultWorderScore[this.eventIndex]
          });
        });
      }
      // let arrIn = this.$refs.tree.getCheckedNodes()
      // this.form[this.eventIndex].userList = this.checkListUser
      // arrIn = arrIn.filter(item => {
      //   for (var key in item) {
      //     if (key == 'account') {
      //       return item
      //     }
      //   }
      // })
      //
      // if (this.isSelectedEventLib[this.eventIndex]) {
      //   for (var i = 0; i < arrIn.length; i++) {
      //     this.form[this.addIndex].userList.push({
      //       userId: arrIn[i].userId,
      //       name: arrIn[i].name,
      //       department: arrIn[i].department,
      //       head: arrIn[i].head,
      //       value: this.defaultWorderScore[this.eventIndex]
      //     })
      //   }
      // } else {
      //   for (var i = 0; i < arrIn.length; i++) {
      //     this.form[this.addIndex].userList.push({
      //       userId: arrIn[i].userId,
      //       name: arrIn[i].name,
      //       department: arrIn[i].department,
      //       head: arrIn[i].head,
      //       value: 0
      //     })
      //   }
      // }
      this.dialogVisible = false;
      // this.ccList = this.doUserId.split(',')
    },
    getFirstUserByName() {
      this.$axios({
        url: "department/getJsonFirst",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.options = res.data.data;
          let name = [];
          console.log("获取的this.options", this.options, this.targetId);
          if (this.options) {
            try {
              // this.options.forEach((item1, index1) => {
              //   if (item1.id == this.targetId) {
              //     this.firstExamineUserId = [item1.id];
              //     this.vals = [item.realName];
              //     throw new Error("error1");
              //   }
              //   item1.children.forEach((item2, index2) => {
              //     if (item2.id == this.targetId) {
              //       this.firstExamineUserId = [item1.id, item2.id];
              //       this.vals = [item1.realName, item2.realName];
              //       throw new Error("error2");
              //     }
              //     item2.children.forEach((item3, index3) => {
              //       if (item3.id == this.targetId) {
              //         this.firstExamineUserId = [item1.id, item2.id, item3.id];
              //         this.vals = [
              //           item1.realName,
              //           item2.realName,
              //           item3.realName
              //         ];
              //         throw new Error("error3");
              //       }
              //       item3.children.forEach((item4, index4) =>
              //       {
              //         if (item4.id == this.targetId) {
              //           this.firstExamineUserId = [
              //             item1.id,
              //             item2.id,
              //             item3.id,
              //             item4.id
              //           ];
              //           this.vals = [
              //             item1.realName,
              //             item2.realName,
              //             item3.realName,
              //             item4.realName
              //           ];
              //           throw new Error("error4");
              //         }
              //       });
              //     });
              //   });
              // });
              for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].id == this.targetId) {
                  this.firstExamineUserId = [this.options[i].id];
                  this.vals = [this.options[i].name];
                  break;
                }
                if (this.options[i].children) {
                  let children1 = this.options[i].children;
                  for (let j = 0; j < children1.length; j++) {
                    if (
                      children1[j].id == this.targetId &&
                      children1[j].hasOwnProperty("head")
                    ) {
                      this.firstExamineUserId = [
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
                          children2[g].id == this.targetId &&
                          children2[g].hasOwnProperty("head")
                        ) {
                          this.firstExamineUserId = [
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
                              children3[h].id == this.targetId &&
                              children3[h].hasOwnProperty("head")
                            ) {
                              this.firstExamineUserId = [
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
              // let options = this.options;
              // for(let i= 0;i<options.length;i++){
              //   console.log(options[i].id,1)
              //   if(options[i].id == this.targetId){
              //     this.firstExamineUserId = [options[i].id];
              //     this.vals = [options[i].realName];
              //     continue
              //   }
              //   if(options[i].children){
              //     let children1 = options[i].children
              //     for(let i = 0;i<children1.length;i++){
              //       console.log(children1[i].id,2)
              //       if(children1[i].id == this.targetId){
              //         this.firstExamineUserId = [children1[i].id];
              //         this.vals = [children1[i].realName];
              //         continue
              //       }
              //     }
              //     if(children1[i].children){
              //       let children2 = children1[i].children
              //       for(let i = 0;i<children2.length;i++){
              //         console.log(children2[i].id,3)
              //         if(children2[i].id == this.targetId){
              //           this.firstExamineUserId = [children2[i].id];
              //           this.vals = [children2[i].realName];
              //           continue
              //         }
              //       }
              //       if(children2[i].children){
              //         let children3 = children2[i].children
              //         for(let i = 0;i<children3.length;i++){
              //           console.log(children3[i].id,4)
              //           if(children3[i].id == this.targetId){
              //             this.firstExamineUserId = [children3[i].id];
              //             this.vals = [children3[i].realName];
              //             continue
              //           }
              //         }
              //       }
              //     }
              //   }
              // }]
              this.targetId = Number(this.targetId);
              // for (let item1 of this.options) {
              //   // console.log(item1);
              //   if (item1.id === this.targetId) {
              //     this.firstExamineUserId = [item1.id];
              //     this.vals = [item.realName];
              //     throw new Error("error1");
              //   }
              //   console.log(item1.children);

              //   for (let item2 of item1.children) {
              //     // console.log(item2);

              //     if (item2.id === this.targetId) {
              //       this.firstExamineUserId = [item1.id, item2.id];
              //       this.vals = [item1.realName, item2.realName];
              //       throw new Error("error2");
              //     }
              //     if (item2.length != 0) {
              //       for (let item3 of item2.children) {
              //         // console.log(item3);

              //         if (item3.id === this.targetId) {
              //           this.firstExamineUserId = [
              //             item1.id,
              //             item2.id,
              //             item3.id
              //           ];
              //           this.vals = [
              //             item1.realName,
              //             item2.realName,
              //             item3.realName
              //           ];
              //           throw new Error("error3");
              //         }
              //         if (item3.length != 0) {
              //           for (let item4 of item3.children) {
              //             // console.log(item4);

              //             if (item3.length != 0) {
              //               if (item4.id === this.targetId) {
              //                 this.firstExamineUserId = [
              //                   item1.id,
              //                   item2.id,
              //                   item3.id,
              //                   item4.id
              //                 ];
              //                 this.vals = [
              //                   item1.realName,
              //                   item2.realName,
              //                   item3.realName,
              //                   item4.realName
              //                 ];
              //                 throw new Error("error4");
              //               }
              //             } else {
              //               console.log('第四层为空');

              //             }
              //           }
              //         } else {
              //           console.log("第三层为空");
              //         }
              //       }
              //       console.log(item2.children);
              //     } else {
              //       console.log("第二层为空");
              //     }

              //   }
              // }
            } catch (e) {
              console.log(e.message);
            }
          }
          // console.log(this.vals, "ffff");
          // console.log("this.firstExamineUserId => ", this.firstExamineUserId);
          // this.getFirstExamineUserName();
          // for (var i=0;i<res.data.data.length;i++) {
          // this.options.push({value: res.data.data[i].businessId, label: res.data.data[i].name})
          // }
        }
      });
    },
    getFirstUserByName1() {
      this.$axios({
        url: "user/getExamineUserByBusiness",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res);
          this.options1 = res.data.data;
          // for (var i=0;i<res.data.data.length;i++) {
          //   this.options1.push({value: res.data.data[i].departmentId, label: res.data.data[i].nick})
          // }
        }
      });
    },
    getFirstUserByName2() {
      this.$axios({
        url: "eventtype/getEventTypeName",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.eventList = res.data.data;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    addEvent() {
      console.log(this.isSelectedEventLib);

      this.checkListUser = [];
      this.getDepartmentPeople();
      this.getCommonUserListPeople();
      this.event.push(1);
      this.eventIndex += 1;
      this.isSelectedEventLib[this.eventIndex] = false;
      this.form.push({
        eventTypeId: "",
        remark: "",
        content: "",
        userList: []
      });
    },
    // 选中标签
    check_right_change() {
      let arr = this.$refs.tree.getCheckedNodes(true);
      this.checkListUser = this.checkListUser.concat(arr);
      let hash = {};
      this.checkListUser = this.checkListUser.reduce((item, next) => {
        hash[next.userId] ? "" : (hash[next.userId] = true && item.push(next));
        return item;
      }, []);
    },
    getDepartmentPeoplebufen() {
      // let departmentId = this.departmentId
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getAllDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.data5 = res.data;
          // console.log(this.data5,'集团');
        }
      });
    },
    getDepartmentPeople() {
      // let departmentId = this.departmentId
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getDepartment(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.data4 = res.data;
          // console.log(this.data4,'集团');
        }
      });
    },
    // 追加常选
    append(data) {
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
      // console.log(data,'追加常选');
      // 设为常选人员
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      setCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // console.log(Vue,'----------------------------------');
          this.$delete(data, "account"); //vue方法
          this.getCommonUserListPeople();
          data.isSetChangXuan = true;

          console.log(data);
        } else {
          Message.error({
            message: res.desc,
            customClass: "messageClass1",
            center: true
          });
        }
      });
    },
    // 取消常选
    noAppend(data) {
      // console.log('取消',data);
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        selectUserId: data.userId
      };
      cancelCommonUser(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // console.log(res.desc,'----------------------------------');
          this.getCommonUserListPeople();
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
        }
      });
    },
    // 指定常选人员
    check_right_change_Common() {
      var arr = this.$refs.treechangxaun.getCheckedNodes();
      this.checkListUser = this.checkListUser.concat(arr);
      let hash = {};
      this.checkListUser = this.checkListUser.reduce((item, next) => {
        hash[next.userId] ? "" : (hash[next.userId] = true && item.push(next));
        return item;
      }, []);
      // this.checkListUser.concat(arr)
      console.log(arr, "选中的常选");
      console.log(this.checkListUser, "去重");
      // for (let item of arr) {
      //   this.checkListUser.push(item)
      //   this.checkListUser = [...new Set(this.checkListUser)]
      // }
    },
    // 获取常选名单
    getCommonUserListPeople() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getCommonUserList(this.$qs.stringify(params)).then(res => {
        // console.log(res,'常选');
        if (res.code === 1) {
          this.data6 = res.data;
        } else {
          Message.error({
            message: res.desc,
            customClass: "messageClass1",
            center: true
          });
        }
      });
    },
    getEventType() {
      this.$axios({
        url: "eventtype/list",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.eventType = res.data.data;
        }
      });
    },
    getList1() {
      this.$axios({
        url: "eventlibrary/getEventLibrary",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          eventTypeId: this.eventTypeId,
          keyword: this.keyword1,
          pageNumber: this.pageNumber1,
          pageSize: this.pageSize1
        },
        transformRequest: transformRequestFn
      }).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          this.total1 = res.data.data.totalRow;
          this.tableData1 = res.data.data.list;
        }
      });
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.getList1();
    },
    handleCurrentChange1(val) {
      this.pageNumber1 = val;
      this.getList1();
    }
  }
};
</script>

<style lang="sass" scoped>
  ul.Event
    list-style-type: none
    padding: 12px 0
    li.EventItem
      padding: 0
      font-size: 12px
      color: #202020
      margin-bottom: 15px
      span.title
        display: inline-block
        margin-right: 30px
      span.content
        display: inline-block
        min-width: 350px
        padding: 20px 15px
        border: 1px solid #CDCDCD
        background-color: #ffffff
        border-radius: 5px
        input
          display: inline-block
          min-width: 350px
          padding: 20px 15px
          border: 1px solid #CDCDCD
          background-color: #ffffff
          border-radius: 5px
          overflow: hidden
          span.eventContent
            display: inline-block
            min-width: 350px
            height: 100px
            padding: 20px 15px
            border: 1px solid #CDCDCD
            background-color: #ffffff
            border-radius: 5px
            overflow: hidden
  ul.detail
    list-style-type: none
    color: #727272
    font-weight: bold
    font-size: 15px
    li.item
      padding: 5px 15px
</style>

<style scoped>
.eventBorder {
  margin-top: 10px;
  border-bottom: 10px solid #dde5f8;
}
.marginBotton {
  margin-bottom: 15px;
}

.inputRemake {
  width: 215px;
}
.shijianku {
  width: 90px;
  height: 37px;
  font-size: 16px;
}
.eventtypetheme {
  /* width: 70px; */
  display: inline-block;

  width: 64px;
  /* height:16px; */
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
  margin-right: 28px;
}

.EventTheme {
  width: 250px;
  height: 46px;
  line-height: 46px;
}

.backgroundB {
  background-color: #f1f5f8;
  margin-right: -10px;
  margin-left: -10px;
  padding: 0 10px;
  height: 60px;
  line-height: 75px;
}

.WebEntry {
  min-height: 1000px;
  position: relative;
  background-color: #fff;
}

.el-radio {
  width: 100%;
  margin-left: 10px !important;
  margin-bottom: 10px;
  font-size: 24px;
}

.mint-cell {
  text-align: center;
}

.MessageTips {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(1, 1, 1, 1);
  text-align: center;
}

.MessageTips img {
  top: 10px;
}

.MessageCode {
  font-size: 16px;
  text-align: center;
  color: rgba(1, 1, 1, 0.7);
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navTitle {
  display: inline-block;
  width: 100%;
  background-color: white;
  padding-top: 12px;
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

  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(38, 45, 57, 1);
  line-height: 0px;
}

.navTitle .active a {
  color: rgba(0, 131, 255, 1) !important;

  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}

.Entry {
  padding: 16px;
  background: rgba(248, 249, 250, 1);
  box-sizing: border-box;
  margin-top: 10px;
}

.EntryTitle {
  position: relative;
  margin-bottom: 19px;
}

.EntryTitle img {
  /* width: 28px;
  height: 23px; */
}

.entryHeader {
  font-size: 16px;
  color: #000;
}

.EntryTitle span {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(21, 21, 21, 1);
  position: absolute;
  top: -2px;
  left: 36px;
}

.EntryEvent {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(21, 21, 21, 1);
  position: relative;
  margin-bottom: 19px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.EntryEvent img {
  /* width: 28px;
  height: 23px; */
}

.EntryEvent span {
  margin-left: 5px;
}

.EntryEvent button {
  margin-left: 25px;
}

.objectList {
  margin-top: 13px;
}

.objectListBox {
  /* width: 386px;
  height: 50px;*/
  width: 80%;
  padding: 11px 13px;
  background: rgba(237, 242, 246, 1);
  border-radius: 5px;
  position: relative;
}

.objectList .logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.objectListBoxName {
  position: absolute;
  left: 70px;
  top: 15px;
}

.objectListBoxNameTop {
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.objectListBoxNameBottom {
  font-size: 13px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(97, 97, 97, 1);
}

.objectList .close {
  position: absolute;
  right: 10px;
  top: 24px;
  width: 27px;
  height: 27px;
}

.objectListBoxNum {
  position: absolute;
  right: 47px;
  top: 15px;
  font-size: 17px;
}

.objectListBoxNum .el-input-number {
  width: 150px;
}

.addEntry {
  margin-top: 30px;
  font-size: 24px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(12, 130, 221, 1) !important;
  position: relative;
}

.addEntry p {
  position: absolute;
  left: 50px;
  top: -22px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
}

.addEntry img {
  width: 32px;
  height: 32px;
  margin-top: -20px;
  margin-right: 10px;
}

.forBtn {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.el-textarea {
  width: 800px;
}

.fixedMark {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
}

.EventLibrary {
  width: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
  bottom: 10%;
  margin: auto;
  background-color: #ffffff;
  overflow-y: auto;
}

.EventLibraryBox {
  padding: 26px 0 10px 0;
  background: rgba(242, 249, 255, 1);
  border-radius: 5px 5px 0px 0px;
}

.EventLibraryBoxSelect {
  padding: 0 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchInput {
  /* width: 430px; */
  flex: 1;
  overflow: hidden;
  margin: 0 10px;
  /* height: 46px; */
}

.el-table {
  margin-top: 37px;
}

.el-pagination {
  margin-top: 43px;
  text-align: center;
  margin-bottom: 20px;
}
.userMessage {
  color: plum;
}
</style>
<style lang="scss"
       >
.treeBox {
  position: relative;
}

.leftTree {
  display: inline-block;
  // border: 1px solid #000;
  width: 50%;
  height: 50%;
  border-right: 1px solid black;
}

.rightTree {
  margin-left: 55%;
  text-align: left;
  // border: 1px solid #000;
  height: 50%;
  width: 200px;
  overflow-y: auto;
  top: 0;
  position: absolute;
  // right: 0;
}
</style>
<style>
/* .fuckBtn span {
  position: absolute;
  right: 10px;
  display: inline-block;
  height: 0px;
  line-height: 0px;
} */
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