<template>
  <div class="task">
    <!-- <el-tabs type="border-card"> -->
    <!-- <el-tab-pane label="当前任务"> -->
    <ul class="navTitle">
      <li>
        <router-link to="/hall/myTask/myTask1">当前任务</router-link>
      </li>
      <li>
        <router-link to="/hall/myTask/myTaskDid">未完成</router-link>
      </li>
      <li class="active">
        <router-link to="/hall/myTask/taskCommit">已提交</router-link>
      </li>

    </ul>
    <div class="bigBox">
      <div class="EventLibraryBox">
        <div class="EventLibraryBoxSelect">
          审核状态：
          <el-select placeholder="请选择" v-model="value" size="small" @change="selState">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="check()" style="margin-left:10px">查询</el-button>
        </div>
      </div>
      <ul style="padding-left:0">
        <li v-for="(item , index) in  currentList" :key="index">
          <div class="liDiv" @click="toDetail(item.taskId)">
            <div class="left_div">
              <img :src=url+item.user.head class="left_div_img">
              <div  class="realName_">{{ item.user.realName }}</div>
              <div class="department_">{{ item.user.department }}</div>
            </div>
            <div class="right_div">
              <div class="right_div_title">
                <div class="state_title">
                  <div class="jifen">
                    {{ item.reward }}/{{ item.deduction }}
                  </div>
                  <div class="stateBtn" v-if="item.state == 1">待初审</div>
                  <div class="stateBtn" v-if="item.state == 0">拟稿</div>
                  <div class="stateBtn" v-if="item.state == 2">待终审</div>
                  <div class="stateBtn" v-if="item.state == 3">审核通过</div>
                </div>
                <div style="text-align:left " class="mt mtt w460">
                  {{ item.content }}
                </div>
              </div>
              <div class="right_div_content">
                <div class="right_div_content_word">{{item.createTime}}发布</div>
                <el-button type="primary" size="small" class="btn" v-if="item.state == 1" @click.stop="withdraw(item.taskId)">撤回</el-button>
                <el-button type="primary" size="small" class="btn" v-if="item.state == 0" @click.stop="again(item.taskId)">重新提交</el-button>
                <!-- <el-button type="primary" size="small" class="btn">提交</el-button> -->
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="block" style="text-align:center" v-show="currentList.length!=0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="length">
        </el-pagination>
      </div>
      <!-- <div v-show="currentList.length===0" style="text-align:center">暂时没有任务</div> -->
    </div>
    <!-- </el-tab-pane>
  <el-tab-pane label="未完成"></el-tab-pane>
  <el-tab-pane label="已提交"></el-tab-pane>

</el-tabs> -->
  </div>
</template>
<script>
import {
  getCurrentTaskList,
  getMyTask,
  recallTask,
  submitTask
} from "@/utils/axios/axios";
export default {
  data() {
    return {
      value: "",
      input: "",
      currentList: [],
      options: [
        {
          value: "",
          label: "全员"
        },
        {
          value: 0,
          label: "拟稿"
        },
        {
          value: 1,
          label: "已提交"
        },
        {
          value: 2,
          label: "待终审"
        },
        {
          value: 3,
          label: "审核通过"
        }
      ],
      state: "",
      pageNumber: 1,
      pageSize: 10,
      length: 0,
      url: "http://47.107.71.47/bishuiwan"
    };
  },
  methods: {
    toDetail(value) {
      // this.$router.push('/allTaskDetailDid')
      let taskParams = {
        sessionId: localStorage.getItem("sessionId"),
        taskId: value
      };
      this.$router.push({
        path: "/hall/myTask/allTaskDetailDid",
        query: taskParams
      });
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        taskState: 2,
        state: this.state
      };
      getCurrentTaskList(this.$qs.stringify(params)).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.currentList = res.data.list;
          this.length = res.data.totalRow;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.init();
    },
    // 撤回
    withdraw(value) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: value
      };
      recallTask(this.$qs.stringify(params)).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.$message({
            message: res.desc,
            type: "success"
          });
          this.init();
        }
      });
    },
    // 重新
    again(value) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: value
      };
      submitTask(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res);
          this.$message({
            message: res.desc,
            type: "success"
          });
        }
      });
    },
    selState(value) {
      console.log("状态", value);
      this.state = value;
    },
    check() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped >
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
.divBox {
  padding: 20px 18px 28px 19px;
  background-color: #f2f9ff;
  box-sizing: border-box;
}
.EventLibraryBox {
  text-align: left;
  padding: 26px 0 0 0;
  background: rgba(242, 249, 255, 1);
  border-radius: 5px 5px 0px 0px;
}
.EventLibraryBoxSelect {
  padding: 0 18px;

  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.inputTitle {
  width: 174px;
  height: 37px;
}
</style>
<style lang="scss" scoped>
.task {
  padding-bottom: 50px;
  min-height: 800px;
  width: 100%;
  background-color: #fff;
}
.bigBox {
  background-color: #f2f9ff;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 10px;
}
li {
  list-style: none;
}
.liDiv {
  cursor: pointer;
  width: 95%;
  height: 136px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 10px;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0px 5px 18px 0px rgba(10, 143, 246, 0.14);
}
.left_div {
  width: 18%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.left_div_img {
  width: 51px;
  height: 51px;
  border-radius: 26px;
}
.right_div {
  width: 82%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-left: 1px solid rgba(233, 238, 242, 1);
  padding-top: 15px;
}
.state_title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.jifen {
  // width:87px;
  height: 25px;
  font-size: 26px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(10, 143, 246, 1);
  line-height: 36px;
}
.right_div_title {
  // width:432px;
  height: 41px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(130, 135, 142, 1);
  line-height: 26px;
}
.right_div_title span {
  width: 139px;
  height: 13px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(185, 185, 185, 1);
}

.right_div_content {
  // width:139px;
  // height:13px;
  // font-size:13px;
  // font-family:MicrosoftYaHei;
  // font-weight:400;
  // color:rgba(185,185,185,1);
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.right_div_content_word {
  // width:139px;
  height: 13px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(185, 185, 185, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn {
  margin-top: 30px;
  width: 109px;
  height: 35px;
}
.stateBtn {
  text-align: center;
  // width:48px;
  height: 18px;
  line-height: 18px;
  border: 1px solid rgba(255, 128, 46, 1);
  border-radius: 6px 5px 5px 0px;
  margin-left: 10px;
}
.realName_ {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  // line-height:0px;
}
.department_ {
  font-size: 12px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(160, 160, 160, 1);
  line-height: 17px;
}
.mt {
  margin-top: 10px
}
</style>
