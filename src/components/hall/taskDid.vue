<template>
  <div class="published">
    <ul class="navTitle">
      <li>
        <router-link to="/hall/published/published1">进行中</router-link>
      </li>
      <li class="active">
        <router-link to="/hall/published/taskDid">已结束</router-link>
      </li>

    </ul>
    <div class="divBox">
      <div class="content">
        <ul style="padding-left:0">
          <li @click="toDateil(item.id)" v-for="(item ,index ) in task.list" :key="index" class="mt">
            <div class="contentDetail">
              <div class="content_l">
                <div class="content_l_one">{{ item.title }}</div>
                <div class="content_l_two mtt">{{ item.content }}</div>
                <div class="content_l_three">发布时间：{{ item.createTime }}</div>
              </div>
              <div class="content_r">
                <div class="content_r_l flex_align">
                  <div class="content_r_l_t">{{ item.userList.length }}</div>
                  <div class="content_r_l_b mt">抢到任务</div>
                </div>
                <div class="content_r_r flex_align" style="margin-left:20px">
                  <div class="content_r_l_t">{{ item.finshUserList.length }}</div>
                  <div class="content_r_l_b mt">完成任务</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="block" style="text-align:center" v-show="task.length!=0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="length">
          </el-pagination>
        </div>
        <!-- <div v-show="task.length===0" style="text-align:center">暂时没有任务</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getPublishTaskList } from "@/utils/axios/axios";
export default {
  name: "published",
  data() {
    return {
      date1: "",
      pageNumber: 1,
      pageSize: 10,
      isExpire: 1,
      length: 0,
      task: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toDateil(value) {
      // this.$router.push('/taskDetail')
      let taskParams = {
        sessionId: localStorage.getItem("sessionId"),
        taskId: value
      };
      console.log(taskParams, "===");

      this.$router.push({
        path: "/hall/published/publishedTaskDetailDid",
        query: taskParams
      });
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isExpire: this.isExpire
      };
      getPublishTaskList(this.$qs.stringify(params)).then(res => {
        console.log(res, "已发布任务");
        if (res.code === 1) {
          this.task = res.data;
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
    }
  }
};
</script>

<style scoped >
a {
  text-decoration: none;
  color: #262d39;
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
  margin-top: 10px;
}
</style>
<style lang="scss" scoped>
.published {
  min-height: 800px;
  margin-bottom: 50px;
  background-color: #fff;
}
li {
  list-style: none;
}
.contentDetail {
  cursor: pointer;
  width: 95%;
  height: 146px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-shadow: 0px 5px 18px 0px rgba(10, 143, 246, 0.14);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.content_l {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.content_l_one {
  // width:87px;
  font-size: 26px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(10, 143, 246, 1);
  line-height: 36px;
}
.content_l_two {
  width: 447px;

  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(130, 135, 142, 1);
  line-height: 26px;
  word-wrap: break-word;
  word-break: normal;
}
.content_l_three {
  // width:179px;
  height: 13px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(185, 185, 185, 1);
}
.content_r {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content_r_l_t {
  width: 32px;
  height: 16px;
  font-size: 20px;
  font-family: ArialMT;
  font-weight: 400;
  color: rgba(10, 143, 246, 1);
  line-height: 26px;
}
.content_r_l_b {
  width: 56px;
  height: 14px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(127, 127, 127, 1);
  line-height: 26px;
}
.mt {
  margin-top: 15px;
}
</style>
