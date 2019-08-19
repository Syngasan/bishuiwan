<template>
  <div class="home">
    <div class="homeContainer">
      <el-row>
        <el-col :span="12" class="homeNotice">
          <div class="Notice">
            <!-- <img src="./img/bb07.png">
            <div>公告栏</div> -->
            <img src="./img/bb100.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="more">
            <router-link to="/BulletinList">
              <img src="../../images/bb06.png" alt="">
            </router-link>
          </div>
        </el-col>
      </el-row>
      <el-row class="marginForTop">
        <img :src="pageOne.image" class="titleImg" style="width:431px;height:260px">
        <div class="Titlecontain">
          <div class="titleName">
            <router-link to="/BulletinListDetails">{{pageOne.title}}</router-link>
          </div>
          <div class="titleTime">发布：{{pageOne.createTime}}</div>
          <el-scrollbar style="height:68%;overflow:-Scroll;overflow-x: hidden;">
            <div class="titleDesc" v-html="pageOne.content">
              <!-- <span class="list"><router-link to="/BulletinListDetails">详情</router-link>
              </span> -->
            </div>
          </el-scrollbar>
          <span class="list" @click="toDetail(pageOne.id)">详情</span>

          <!-- BulletinListDetails -->
        </div>
      </el-row>
      <el-row class="marginForBottom">
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/WebEntry"><img src="./img/bsw01.png"></router-link>
          </div>
          <div class="tpggArea">积分录入</div>
        </div>
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/IntegralAudit"><img src="./img/bsw02.png"></router-link>
            <div class="paopao" v-if="list.examineNumber!=0">{{list.examineNumber}}</div>
          </div>
          <div class="tpggArea">积分审核</div>
        </div>
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/ReportForm/integralReport1/integralReport"><img src="./img/bsw03.png"></router-link>
          </div>
          <div class="tpggArea">积分报表</div>
        </div>
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/integralSelect"><img src="./img/bsw06.png"></router-link>
          </div>
          <div class="tpggArea">积分查询</div>
        </div>
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/BuckleTask"><img src="./img/baw05.png"></router-link>
          </div>
          <div class="tpggArea">奖扣任务</div>
        </div>
        <div class="navFlex">
          <div class="tpgg">
            <router-link to="/personal/MyPoints/MyPoints1"><img src="./img/bsw04.png"></router-link>
          </div>
          <div class="tpggArea">个人中心</div>
        </div>
      </el-row>
      <div class="boxBottom"></div>
    </div>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { page, getPage, pageNoImage } from "@/utils/axios/axios";
export default {
  name: "home",
  data() {
    return {
      list: "",
      examineNumber: 0,
      level: false,
      pageOne: [],
      pageAll: []
    };
  },
  created() {
    this.level = localStorage.getItem("level");
    // this.getList()
    console.log(this.$route.path,'jj');
    localStorage.setItem('currentPath',this.$route.path)
    this.opens();
    this.page();

    this.getEvent();
  },
  methods: {
    getList() {
      this.$axios({
        url: "active/getMyLevel",
        method: "POST",
        center: true,
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          if (res.data.data === -1) {
            this.messageBox(res.data.desc, "warning", "排名下降！");
          } else if (res.data.data === 0) {
            this.messageBox(res.data.desc, "info", "排名不变!");
          } else if (res.data.data === 1) {
            this.messageBox(res.data.desc, "success", "排名上升!");
          }
        }
      });
    },
    opens() {
      if (this.level === true) {
        console.log("999");

        this.getList();
      }
    },
    getEvent() {
      this.$axios({
        url: "user/getRecordNew",
        method: "POST",
        data: {
          sessionId: window.localStorage.getItem("ryToken")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.list = res.data.data;
        }
      });
    },
    messageBox(desc, type, title) {
      this.$alert(desc, title, {
        confirmButtonText: "去看看",
        type: type,
        callback: action => {
          if (action === "confirm") {
            this.$router.push("/personal/MyPoints/MyPoints1");
          }
        }
      });
    },
    page() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      pageNoImage(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          this.pageOne = res.data.list[0];
          console.log(this.pageOne);

          this.pageOne.image =
            "http://47.107.71.47/bishuiwan" + this.pageOne.image;
          this.pageAll = res.data.list;
        }
      });
    },
    toDetail(value) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: value
      };
      getPage(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // this.$router.push({path:'/BulletinListDetails',query:params})
          this.$router.push({ path: "/BulletinListDetails", query: params });
        }
      });
    }
  },
  mounted() {
    // this.examineNumber = localStorage.getItem('examineNumber')
  },
  destroyed: function() {
    localStorage.setItem("level", false);
  }
};
</script>

<style scoped>
.paopao {
  position: absolute;
  top: 0;
  right: 40%;
  background-color: red;
  color: white;
  border-radius: 50%;
  /* padding: 8px 8px; */
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.home {
  width: 100%;
  height: auto;
  min-height: 100%;
  /* margin-top: 5px; */
  background-color: #f8fbfe !important;
}
.homeContainer {
  width: 1200px;
  display: inline-block;
  margin: 20px auto 0 auto;
  background-color: #f8fbfe !important;
}
.homeNotice {
  text-align: left;
}
.Notice {
  width: 131px;
  height: 36px;
  background-color: rgb(10, 143, 246);
  text-align: left;
  position: relative;
  margin-bottom: 15px;
  margin-top: -19px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
}
.Notice img {
  /* width: 33px;
  height: 27px; */
  margin-top: 5px;
  /* margin-left: 12px; */
}
.Notice div {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.more a {
  text-decoration: none;
  color: rgba(10, 143, 246, 1);
}
.more {
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  color: rgba(10, 143, 246, 1);
  line-height: 0px;
  text-align: right;
  /* margin-top: 30px; */
}
.marginForTop {
  /* margin-top: 20px; */
  background-color: white;
  height: 314px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 28px 10px 28px;
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  box-shadow: 0px 3px 10px 0px rgba(24, 150, 248, 0.08);
}

.Titlecontain {
  /* padding: 0px 43px 0 26px; */
  margin: auto;
  width: 70%;
  height: 250px;
  overflow: hidden;
  text-align: left;
  /* margin-top: 44px; */
  margin-left: 45px;
  box-sizing: border-box;
  text-align: left;
}
.titleImg {
  /* width: 30%; */
  margin: auto;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.titleName {
  font-size: 28px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
}
.titleName a {
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
}
.titleTime {
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(169, 169, 169, 1);
  line-height: 24px;
  margin-top: 17px;
}
.titleDesc {
  height: 136px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
  /* line-height: 24px; */
  margin-top: 23px;
}
.list {
  cursor: pointer;
  text-decoration: none;
  color: rgba(10, 143, 246, 1);
}
.marginForBottom {
  width: 100%;
  margin-top: 10px;
  background-color: #f8fbfe;
  /* height: 430px; */
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  padding: 0;
  box-shadow: 0px 3px 10px 0px rgba(24, 150, 248, 0.08);
}
.navFlex {
  /* height: 49%; */
  height: 215px;
  flex: 0 1 32.3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin: 0.5%;
  /* margin-top: 0.5px;
  margin-right: 0.5%;
  margin-bottom: 0.5px;
  margin-left: 0.5%; */
  background-color: #fff;
  /* background-color: greenyellow; */
}
.tpgg {
}
.tpgg,
.tpgg img {
  /* width: 120px;
  height: 105px; */
  display: inline-block;
  position: relative;
}
.tpggArea {
  font-size: 18px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(33, 36, 39, 1);
  line-height: 0px;
  position: relative;
}
.tpggMagn {
  margin-top: 46px;
}
.boxBottom {
  height: 46px;
}
</style>


<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>