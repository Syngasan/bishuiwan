<template>
  <div class="message">
    <div class="title">
      <img src="../../images/nav_new@2x.png">
      <span class="span_t">消息通知</span>
    </div>
    <ul style="padding-left: 0px;">
      <li v-for="(item,index) in messageList" :key="index" class="liFlex">
        <div class="libox mt" @click="toDetail(item.ids,item)">
          <div class="left">
            <img src="../../images/nav_new@2x.png" alt="">
          </div>
          <div class="center ">

            <div class="paopao" v-if="item.isRead == 0"></div>
            <div class="center_1">【{{ item.title }}】</div>
            <div class="center_2"> {{ item.content }} </div>
          </div>
          <div class="right">
            {{ item.createTime }}
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>
<script>
import {
  getInformationList,
  getInformation,
  getRecordNew
} from "@/utils/axios/axios";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 999559959,
      messageList: [],
      length: ""
    };
  },
  methods: {
    init() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      console.log(params, "参数");

      getInformationList(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res);
          this.messageList = res.data.list;
          this.length = res.data.totalRow;
          console.log(this.messageList, "消息列表");
        }
      });
    },
    // 气泡消息
    qipao() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      getRecordNew(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res, "气泡消息");
          // localStorage.setItem('examineNumber',res.data.examineNumber)
          this.messageNumber = res.data.messageNumber;
          this.taskNumber = res.data.taskNumber;
          this.$store.state.taskNumber = res.data.taskNumber;
          this.$store.state.messageNumber = res.data.messageNumber;
          console.log(this.$store.state.taskNumber);
        }
      });
    },
    toDetail(value, item) {
      console.log(value, "任务id", item);
      if (item.isChange == 1) {
        if (item.type == 1) {
          this.$message({
            message: "该任务状态已改变",
            type: "warning"
          });
          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });
          // this.init();
        } else if (item.type == 0) {
          this.$message({
            message: "该事件状态已改变",
            type: "warning"
          });
          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });
          // this.init();
        }
      } else if (item.isChange == 0) {
        if (item.state == 2) {
          let params = {
            sessionId: localStorage.getItem("sessionId"),
            taskId: item.ids
          };
          console.log(params, "状态2");
          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });
          this.$router.push({
            path: "/hall/myTask/allTaskDetail",
            query: params
          });
          this.qipao();
          // this.$router.push('/customGrouping')
        } else if (item.state == 3) {
          console.log(1);

          if (item.type == 1) {
            let taskParams = {
              sessionId: localStorage.getItem("sessionId"),
              taskId: item.ids
            };
            let read = {
              sessionId: localStorage.getItem("sessionId"),
              id: item.id
            };
            getInformation(this.$qs.stringify(read)).then(res => {
              if (res.code === 1) {
                console.log(res);
              }
            });
            console.log(22);

            this.$router.push({
              path: "/hall/myTask/allTaskDetailDid",
              query: taskParams
            });
            this.qipao();
          } else if (item.type == 0) {
            let read = {
              sessionId: localStorage.getItem("sessionId"),
              id: item.id
            };
            getInformation(this.$qs.stringify(read)).then(res => {
              if (res.code === 1) {
                console.log(res);
              }
            });
            this.$router.push({
              path: `/DetailsOfTheEvent/${item.ids}/${item.flag}/${1}`
            });

            this.qipao();
          }
        } else if (item.state == 1) {
          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });

          console.log(item);
          if (item.type == 1) {
            let read = {
              sessionId: localStorage.getItem("sessionId"),
              id: item.id
            };
            getInformation(this.$qs.stringify(read)).then(res => {
              if (res.code === 1) {
                console.log(res);
              }
            });
            this.$router.push({
              path: `/DetailsOfTheTask/${item.ids}/${item.flag}/${0}`
            });
            this.qipao();
          } else if (item.type == 0) {
            let read = {
              sessionId: localStorage.getItem("sessionId"),
              id: item.id
            };
            getInformation(this.$qs.stringify(read)).then(res => {
              if (res.code === 1) {
                console.log(res);
              }
            });
            this.$router.push({
              path: `/DetailsOfTheEvent/${item.ids}/${item.flag}/${item.type}`
            });
            this.qipao();
          }
          //  this.$router.push({path:`/DetailsOfTheEvent/${item.ids}/${item.type}/${item.type}`})
          // this.$router.push('/DetailsOfTheEvent')
        } else if (item.state === 5) {
          console.log(1);
          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });

          this.$router.push({
            path: `/DetailsOfTheEvent/${item.ids}/${1}/${item.type}`
          });
          this.qipao();
          // this.$router.push({ path: "/WebEntry", query: params });
          // let read = {
          //     sessionId:localStorage.getItem('sessionId'),
          //     id:item.id
          //   }
          //   getInformation( this.$qs.stringify(read) ).then(res=>{
          //     if (res.code === 1) {
          //       console.log(res);
          //     }
          //   })

          //   console.log(item);
          //   if (item.type == 1) {
          //     this.$router.push({path:`/DetailsOfTheTask/${item.ids}/${item.type}/${item.type}`})
          //   } else if (item.type ==0 ) {
          //     this.$router.push({path:`/DetailsOfTheEvent/${item.ids}/${item.type}/${item.type}`})
          //   }
        } else if (item.state === 4) {
          console.log(3);

          let read = {
            sessionId: localStorage.getItem("sessionId"),
            id: item.id
          };
          getInformation(this.$qs.stringify(read)).then(res => {
            if (res.code === 1) {
              console.log(res);
            }
          });
          // this.$router.push({
          //   path: '/WebEntry',
          //   query: item.ids
          // });
          let ids = {
            id: item.ids
          };
          this.$router.push({ path: "/WebEntry", query: ids });
        }
      }
    }
  },
  mounted() {
    this.init();
    this.qipao();
  }
};
</script>

<style lang="scss" scoped>
.message {
  padding: 15px;
  min-height: 1000px;
  background-color: #f8fbfe;
}
li {
  list-style: none;
}
.paopao {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 8px;
  box-sizing: border-box;
}
.span_t {
  width: 122px;
  height: 30px;
  font-size: 30px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 40px;
}
.title {
  position: relative;
}
.title img {
  // margin-top: 10px
  // vertical-align: middle;
  position: absolute;
  top: 50%;
  transform: translate(-120%, -50%);
}
.libox {
  width: 1251px;
  height: 114px;
  background: rgba(255, 255, 255, 1);
  // background-color: red;
  border-radius: 10px;
  box-shadow: 0px 4px 9px 0px rgba(3, 88, 160, 0.07);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.left {
  display: inline-block;
  background: url("../../images/area_icon_dorder@2x.png") no-repeat;
  width: 72px;
  height: 72px;
  position: relative;
  margin-left: 100px;
}
.left img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center {
  // display: inline-block;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-;
  text-align: left;
}
.center_1 {
  width: 119px;
  height: 25px;
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(16, 16, 16, 1);
  line-height: 40px;
}
.center_2 {
  width: 330px;
  height: 18px;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(98, 98, 98, 1);
  line-height: 0px;
  margin-top: 25px;
  margin-left: 8px;
}
.right {
  // width:75px;
  height: 12px;
  font-size: 15px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(154, 154, 154, 1);
  line-height: 40px;
  position: absolute;
  right: 10px;
  top: 26px;
}
.mt {
  margin-top: 15px;
}
.liFlex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
