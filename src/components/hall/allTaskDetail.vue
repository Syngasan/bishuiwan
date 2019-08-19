<template>
  <div class="task">
    <div class="header_title">

      <div class="header_title_left">任务详情</div>
      <el-button type="primary" class="btnnn" size="small" @click="back()">返回</el-button>
    </div>
    <div class="time mt">
      发布时间：{{ task.createTime }}
    </div>
    <div class="title">
      <div class="left_title">{{ task.title }}</div>
      <div class="right_title">
        <div class="fenzhi">
          任务分值{{ task.reward }}/{{ task.deduction }}
        </div>
        <img src="../../images/doing.png" v-if="isDeadLine==0" title="进行中">
        <img src="../../images/did.png" v-if="isDeadLine==1" title="已结束">
      </div>
    </div>
    <div class="person mt">
      <img :src="url+task.head" class="left_div_img">
      <div>
        <div class="taskName">{{ task.realName }}</div>
        <div class="taskDep"> {{ task.department }} </div>
      </div>
    </div>
    <div class="task_content marginT">
      <div class="task_content_title shenhe">
        任务内容：
      </div>
      <div class="task_content_content " style="margin-top:10px">
        {{ task.content }}
      </div>
      <div class="task_content_footer" style="margin-top:30px" v-if="task.remark!=''">
        {{ task.remark}}
      </div>
    </div>
    <div class="shenhe mt">
      终审人：{{ task.secondExamineUserName }}
    </div>
    <div class="getTask mt" v-if="task.ranges!=2">
      <div class="getTask_title shenhe">
        抢到任务：
      </div>
      <div class="getTask_content mt">
        <ul style="display: flex;justify-content: center;padding-inline-start: 0;">
          <li v-for="(item,index) in task.userList" :key="index" v-if="index<8" class="img50 mr5">
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

    <div class="getTask mt" v-if="task.ranges == 2">
      <div class="getTask_title shenhe">
        推送人员：
      </div>
      <div class="getTask_content mt">
        <ul style="display: flex;justify-content: center;padding-inline-start: 0;">
          <li v-for="(item,index) in task.userList" :key="index" v-if="index<8" class="img50 mr5">
            <div>
              <img :src="url+item.head" alt="" class="getimg">
            </div>
          </li>

        </ul>
        <div class="img_font" @click="dialogVisible2 = true">
          <span v-if="qiangdaorenwu!=0">等{{ qiangdaorenwu }}人被推送了任务</span>
          <span v-if="qiangdaorenwu === 0" style="margin-top:10px">暂时没有人抢到任务</span>
        </div>
      </div>
    </div>
    <!-- 完成任务 -->
    <div class="getTask mt" style="margin-top:90px">
      <div class="getTask_title shenhe">
        完成任务：
      </div>
      <div class="getTask_content mt">
        <ul style="display: flex;justify-content: center;padding-inline-start: 0;">
          <li v-for="(item,index) in task.finshUserList" :key="index" v-if="index<8" class="img50 mr5">
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

    <div class="tip" style="margin-top:70px">截止时间：{{ task.endTime }}</div>
    <div class="tip mt">完成期限：{{ task.happenTime}}</div>
    <div style='margin-top:30px;text-align:center'>
      <el-button type="primary" size="small" ref="commit" id="commit" @click="commit()">提交任务</el-button>

    </div>
    <!-- 抢到任务 -->
    <el-dialog :show-close=true :visible.sync="dialogVisible" width="30%">
      <div class="d_title">抢到任务</div>
        <ul>
          <li v-for="(item ,index) in task.userList" :key="index">
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
    <!-- 推送人员 -->
    <el-dialog :show-close=true :visible.sync="dialogVisible2" width="30%">
      <div class="d_title">推送人员</div>
      <ul v-for="(item ,index) in task.userList" :key="index">
        <li>
          <div class="d_li ">
            <div class="d_li_l">
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
        <el-button @click="dialogVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 完成任务 -->
    <el-dialog :show-close=true :visible.sync="finishdialogVisible" width="30%">
      <div class="d_title">完成任务</div>
      <ul v-for="(item ,index) in task.finshUserList" :key="index">
        <li>
          <div class="d_li ">
            <div class="d_li_l">
              <img :src="url+item.head" alt=""  class="img50 inBlock radius">
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
import { getMyTask, submitTask ,getRecordNew} from "@/utils/axios/axios";
export default {
  data() {
    return {
      dialogVisible: false,
      finishdialogVisible: false,
      dialogVisible2: false,
      task: [],
      isDeadLine: 0,
      qiangdaorenwu: 0,
      wanchengrenwu: 0,
      url: "http://47.107.71.47/bishuiwan"
    };
  },
  methods: {
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
      console.log(params, "参数");

      getMyTask(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res);
          this.task = res.data;
          this.isDeadLine = res.data.isDeadLine;
          this.qiangdaorenwu = this.task.userList.length;
          this.wanchengrenwu = this.task.finshUserList.length;
        }
      });
    },
    qipao() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getRecordNew(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res, "气泡消息");
          // localStorage.setItem('examineNumber',res.data.examineNumber)
          this.$store.state.taskNumber = res.data.taskNumber;
          console.log(this.$store.state.taskNumber);
        }
      });
    },
    commit() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: this.$route.query.taskId
      };
      submitTask(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res);
          this.$message({
            message: res.desc,
            type: "success"
          });
          // this.$refs.commit.style.display = 'none'
          console.log(this.$refs.commit, "提交按钮");
          document.getElementById("commit").style.display = "none";
          this.qipao()
        }
      });
    }
  },
  mounted() {
    this.init();
    // this.qipao()
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
  box-sizing: border-box;
  padding-top: 10px;
}
.header_title_left {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 0px;
}
.time {
  // width:189px;
  text-align: left;
  height: 12px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 35px;
  margin-bottom: 30px;
}
.title {
  display: flex;
  justify-content: space-between;
}
// .left_title {
//   // width:157px;
//   height: 23px;
//   font-size: 24px;
//   font-family: PingFang-SC-Bold;
//   font-weight: bold;
//   color: rgba(51, 51, 51, 1);
//   line-height: 20px;
// }
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
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.state {
  position: absolute;
  right: 50px;
}
.left_div_img {
  width: 51px;
  height: 51px;
  border-radius: 26px;
  margin-right: 5px;
}
.task_content_title {
  // width:73px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
  // border-left: 4px solid #7C71CB;
}
.task_content_content {
  text-align: left;
  // width:350px;
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(114, 114, 114, 1);
  line-height: 24px;
}
.task_content_footer {
 display: inline-block;
  line-height: 24px;
  background: rgba(238, 238, 238, 1);
  border-radius: 4px;
  text-align: center;
  overflow: hidden;
}
.shenhe {
  // width:130px;
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
  text-align: left;
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

</style>
