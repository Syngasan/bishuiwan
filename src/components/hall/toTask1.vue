<template>
  <div class="task">
    <div class="bigBox" v-show="list.length!=0">
      <ul style="padding-left:0">
        <li v-for="(item,index) in list" :key="index">
          <div class="liDiv" @click="toDetail(item.id)">
            <div class="left_div">
              <img :src=url+item.head class="left_div_img">
              <div class="realName_">{{ item.realName }}</div>
              <div class="department_">{{ item.department }}</div>
            </div>
            <div class="right_div">
              <div class="right_div_title">
                <div class="jifen" v-if="item.isGrap == 0 &&  item.stock != 0 ">{{ item.reward }}/{{ item.deduction }}</div>
                <div class="jifen2" v-else>{{ item.reward }}/{{ item.deduction }}</div>
                <div style="text-align:left" class="mtt">{{ item.content }}</div>
              </div>
              <div class="right_div_content">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </li>

      </ul>
      <div class="block" style="text-align:center" v-show="list.length != 0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="length">
        </el-pagination>
      </div>
    </div>
    <!-- <div v-show="list.length===0" style="text-align:center">暂时没有任务</div> -->
  </div>
</template>
<script>
import { taskList, getTask } from "@/utils/axios/axios";
export default {
  data() {
    return {
      // index: 1,
      list: [],
      pageNumber: 1,
      pageSize: 10,
      length: 0,
      url: "http://47.107.71.47/bishuiwan"
    };
  },
  methods: {
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
    toDetail(param) {
      // this.$router.push('/taskDetail')
      console.log(param, "任务id");
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        taskId: param
      };

      this.$router.push({ path: "/hall/toTask/taskDetail", query: params });
    },
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      taskList(this.$qs.stringify(params)).then(res => {
        console.log(res, "抢任务列表");
        if (res.code === 1) {
          this.list = res.data.list;
          this.length = res.data.totalRow;
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
  padding-bottom: 50px;
  min-height: 800px;
  // overflow: auto;
}
.bigBox {
  background-color: #f2f9ff;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
li {
  list-style: none;
}
.liDiv {
  overflow: hidden;
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
  border-radius: 50%;
  overflow: hidden;
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
  padding-left: 20px;
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
.jifen2 {
  // width:87px;
  height: 25px;
  font-size: 26px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(144, 147, 153, 1);
  line-height: 36px;
}
.right_div_title {
  width: 432px;
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
.mtt {
  margin-top: 15px;

  // word-wrap: break-word;
  // word-break: normal;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right_div_content {
  width: 139px;
  height: 13px;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(185, 185, 185, 1);
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
</style>
