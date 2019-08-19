<template>
  <div class="task">
    <div class="header_title">

      <div class="header_title_left">任务详情</div>
      <el-button type="primary" size="small" @click="back()">返回</el-button>
    </div>
    <div class="time mt">
      发布时间{{taskDetail.createTime}}
    </div>
    <div class="title">
      <div class="left_title">{{taskDetail.eventTypeName}}</div>
      <div class="right_title">
        <div class="fenzhi">
          任务分值{{ taskDetail.reward }}/{{ taskDetail.deduction }}
        </div>
        <!-- <img src="../../images/doing.png" v-if="isExpire==0"> -->
        <!-- <img src="../../images/did.png" v-if="isExpire==1"> -->
      </div>
    </div>
    <div class="person mt">
      <img :src="url+taskDetail.head" class="left_div_img">
      <div>
        <div class="taskName">{{ taskDetail.realName }}</div>
        <div class="taskDep"> {{ taskDetail.department }} </div>
      </div>
    </div>
    <div class=" mt" v-if="ranges ==1 ">
      <!-- <img src="../../images/nav_sun.png" class="left_div_img">
              <div>
                <div>王小明</div>
              <div>部门</div>
              </div> -->
      <div class="task_content_title">
        可见范围：
      </div>
      <div class="kejianfanwei" style="margin-top:20px">
        <div class="kejianfanweiBtn" v-for="(items ,indexs ) in taskDetail.departmentList" :key="indexs">{{items.name}}</div>
      </div>
    </div>
    <div class="task_content mt" style="margin-top:30px">
      <div class="task_content_title">
        任务内容：
      </div>
      <div class="task_content_content " style="margin-top:20px">
        {{taskDetail.content}}
      </div>
      <div class="task_content_footer" style="margin-top:30px" v-if="taskDetail.remark!=''">
        {{ taskDetail.remark}}
      </div>
    </div>
    <div class="shenhe mt">
      终审人：{{ taskDetail.secondExamineUserName }}
    </div>
    <!-- <div class="shenhe mt">
              发布人：{{ taskDetail.realName }}
            </div> -->
    <div class="getTask mt">
      <div class="getTask_title shenhe">
        抢到任务：
      </div>
      <div class="getTask_content">
        <ul style="display: flex;justify-content: center;padding-inline-start: 0;">
          <li v-for="(item,index) in taskDetail.userList" :key="index" v-if="index<8" class="img50 mr5">
            <div>
              <img :src="url+item.head" alt="" class="getimg">
            </div>
          </li>

        </ul>
        <div class="img_font" @click="dialogVisible = true">
          <span v-if="qiangdaorenwu!=0">等{{ qiangdaorenwu }}人抢到了任务</span>
          <span v-if="qiangdaorenwu === 0" style="margin-top:10px">暂时没有人抢到任务</span>
        </div>
      </div>
    </div>
    <!-- 完成任务 -->
    <div class="getTask mt" style="margin-top:90px">
      <div class="getTask_title shenhe">
        完成任务：
      </div>
      <div class="getTask_content">
        <ul style="display: flex;justify-content: center;padding-inline-start: 0;">
          <li v-for="(item,index) in taskDetail.finshUserList" :key="index" v-if="index<8" class="img50 mr5">
            <div>
              <img :src="url+item.head" alt="" class="getimg">
            </div>
          </li>
        </ul>

        <div class="img_font" @click="finishdialogVisible = true">
          <span v-if="wanchengrenwu!=0">等{{ wanchengrenwu }}人完成了任务</span>
          <span v-if="wanchengrenwu === 0" style="margin-top:10px">暂时没有人完成任务</span>
        </div>
      </div>
    </div>

    <div class="tip" style="margin-top:70px">截止时间：{{taskDetail.endTime}}</div>
    <div class="tip mt">完成期限：{{taskDetail.happenTime}}</div>
    <div style="text-align:center" v-if="isGrap == 0">
      <el-button type="primary" size="small" style='margin-top:30px' @click="commitTask()" id="commit" v-if="taskDetail.stock != 0 &&qiangdaorenwu != taskDetail.number">抢任务</el-button>
      <el-button type="info" size="small" style='margin-top:30px' id="commit" v-if="qiangdaorenwu == taskDetail.number">已抢光</el-button>
    </div>
    <div style="text-align:center" v-else>
      <el-button type="info" size="small" style='margin-top:30px' id="commit">已抢</el-button>
    </div>
    <!-- 抢到任务 -->
    <el-dialog :show-close=true :visible.sync="dialogVisible" width="30%">
      <div class="d_title">抢到任务</div>
      <ul>
        <li v-for="(item ,index) in taskDetail.userList" :key="index" class="img50 ">
          <div class="d_li ">
            <div class="d_li_l img50">
              <img :src="url+item.head" alt="" class="img50 inBlock radius">
            </div>
            <div class="d_li_r">
              <div class="right_div_title">
                <div class="jifen">{{ item.realName }}</div>
                <div class="jifen2">{{ item.department }}</div>
              </div>
              <div class="right_div_content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 完成任务 -->
    <el-dialog :show-close=true :visible.sync="finishdialogVisible" width="30%">
      <div class="d_title">完成任务</div>
      <ul>
        <li v-for="(item ,index) in taskDetail.finshUserList" :key="index" class="img50 ">
          <div class="d_li ">
            <div class="d_li_l img50">
              <img :src="url+item.head" alt="" class="img50 inBlock radius">
            </div>
            <div class="d_li_r">
              <div class="right_div_title">
                <div class="jifen">{{ item.realName }}</div>
                <div class="jifen2">{{ item.department }}</div>
              </div>
              <div class="right_div_content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="finishdialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="finishdialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {
  taskList,
  getTask,
  grabTask,
  getMyTask,
  getRecordNew
} from "@/utils/axios/axios";
import { Message } from "element-ui";

export default {
  data() {
    return {
      dialogVisible: false,
      finishdialogVisible: false,
      taskDetail: [],
      qiangdaorenwu: 0,
      wanchengrenwu: 0,
      isExpire: 0,
      ranges: 0,
      id: "",
      isGrap: "0",
      url: "http://47.107.71.47/bishuiwan"
    };
  },
  methods: {
    qipao() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getRecordNew(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res, "气泡试试消息");
          this.$store.state.totalTaskNumber = res.data.totalTaskNumber;
          this.$store.state.taskNumber = res.data.taskNumber;
          this.$store.state.messageNumber = res.data.messageNumber;
          this.$store.state.snatchTaskNumber = res.data.snatchTaskNumber;
          console.log("额鹅鹅鹅", this.$store.state.snatchTaskNumber);
        }
      });
    },
    dialog() {
      this.$refs.dialog.style.display = "block";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    back() {
      this.$router.go(-1);
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        taskId: this.$route.query.taskId
      };
      getTask(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.taskDetail = res.data;
          console.log(this.taskDetail);

          this.qiangdaorenwu = this.taskDetail.userList.length;
          this.wanchengrenwu = this.taskDetail.finshUserList.length;
          this.isExpire = res.data.isExpire;
          this.ranges = res.data.ranges;
          this.departmentList = res.data.departmentList;
          this.id = res.data.id;
          this.isGrap = res.data.isGrap;
        } else {
          Message.error({
            message: res.desc,
            customClass: "messageClass",
            center: true
          });
        }
      });
    },
    commitTask() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        taskId: this.$route.query.taskId
      };
      grabTask(this.$qs.stringify(params)).then(res => {
        console.log(res);
        if (res.code === 1) {
          console.log(1);

          this.qipao();
          // document.getElementById("commit").style.display = "none";
          this.isGrap = "1";
          // this.$alert(res.desc, {
          //   confirmButtonText: "去看看",
          //   callback: action => {
          //     let taskParams = {
          //       sessionId: localStorage.getItem("sessionId"),
          //       taskId: this.id
          //     };
          //     this.$router.push({
          //       path: "/hall/myTask/allTaskDetail",
          //       query: taskParams
          //     });
          //   }
          // });
          this.$confirm(
            res.desc,

            {
              distinguishCancelAndClose: true,
              confirmButtonText: "去看看",
              cancelButtonText: "取消"
            }
          )
            .then(() => {
              let taskParams = {
                sessionId: localStorage.getItem("sessionId"),
                taskId: this.id
              };
              this.$router.push({
                path: "/hall/myTask/allTaskDetail",
                query: taskParams
              });
            })
            .catch(action => {
              // this.$message({
              //   type: "info",
              //   message:
              //     action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
              // });
            });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.task {
  padding: 15px;
  background-color: #f8f9fa;
  min-height: 800px;
  position: relative;
}
.header_title {
  display: flex;
  justify-content: space-between;
}
.header_title_left {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  // line-height: 0px;
}
.time {
  // width:189px;
  height: 12px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 35px;
  margin-bottom: 30px;
  text-align: left;
}
.title {
  display: flex;
  justify-content: space-between;
}

.right_title {
  width: 165px;
  height: 18px;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(10, 143, 246, 1);
  line-height: 35px;
}
.mt {
  margin-top: 15px;
}
.person {
  // border: 1px solid rgba(153,153,153,1);
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left_div_img {
  width: 51px;
  height: 51px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
}
.task_content_title {
  // width:94px;
  box-sizing: border-box;
  padding-left: 10px;
  text-align: left;
  height: 17px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
  border-left: 4px solid #7c71cb;
}
.task_content_content {
  text-align: left;
  // width:350px;
  // height: 16px;
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(114, 114, 114, 1);
  line-height: 24px;
}
.task_content_footer {
  // width: 191px;
display: inline-block;
  // height: 24px;
  line-height: 24px;
  background: rgba(238, 238, 238, 1);
  border-radius: 4px;
  overflow: hidden;
  // text-align: center;
}
.shenhe {
  // width:130px;
  text-align: left;
  height: 17px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
  border-left: 4px solid #7c71cb;
  box-sizing: border-box;
  padding-left: 10px;
}
.getTask {
  width: 100px;
  height: 17px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
  // border-left: 4px solid #7C71CB;
}
.getTask_content {
  display: flex;
  // justify-content: flex-start;
  align-items: center;
}
.getimg {
  width: 40px !important;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.img_font span {
  cursor: pointer;
  text-align: right;
  vertical-align: middle;
  display: flex;
  justify-content: flex-start;
  width: 500px !important;
  height: 12px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 12px;
  margin-left: 10px;
}
.tip {
  // width:189px;
  height: 12px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 35px;
}
.dialog {
  display: none;
  width: 272px;
  height: 415px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}

.d_title {
  width: 72px;
  height: 19px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(1, 1, 1, 1);
  line-height: 34px;
}
.d_li {
  border-top: 1px solid #fafff0;
  width: 272px;
  height: 50px;
  line-height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin-left: -40px;
}
.d_li_l {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
}
.d_li_r {
  width: 80%;
  height: 100%;
}
.right_div_title {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.jifen {
  display: inline-block;
  text-align: left;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 16px;
  height: 16px;
}
.jifen2 {
  display: inline-block;
  font-size: 13px;
  height: 13px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(97, 97, 97, 1);
  line-height:13px;
}
li {
  list-style: none;
}
.kejianfanwei {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.kejianfanweiBtn {
  height: 22px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(10, 143, 246, 1);
  line-height: 0px;
  line-height: 22px;
  text-align: center;
  border: 1px solid rgba(10, 143, 246, 1);
  margin-right: 5px;
  border-radius: 2px;
  padding: 0 5px;
  box-sizing: border-box;
  margin-bottom: 3px;
}
</style>
