<template>
  <div class="inheader">
    <div class="bigBox">
      <el-row class="logo">
        <el-col :span="6" style="">
          <i class="logoHeader" :style="{backgroundImage: 'url(' + logo + ')'}"></i>
          <img src="./img/logoRight.png" alt="" class="logoRight">
        </el-col>
        <el-col class="elColFlex" :span="12">
          <!-- <div @click="routerGo('/home')"  :class="currentPath == '/home'?'routerDiv1':''">
            <a class="routerDiv">首    页</a>
          </div>
          <div @click="routerGo('/WebEntry')"   :class="currentPath == '/WebEntry'?'routerDiv1':''">
            <a class="routerDiv">积分管理</a>
          </div>
          <div @click="routerGo('/ReportForm/integralReport1/integralReport')" :class="currentPath == '/ReportForm/integralReport1/integralReport'?'routerDiv1':''">
            <a class="routerDiv">积分报表</a>
          </div>
          <div @click="routerGo('/hall/toTask/toTask1')" :class="currentPath == '/hall/toTask/toTask1'?'routerDiv1':''">
            <a class="routerDiv">任务大厅</a>
          </div>
          <div @click="routerGo('/personal/MyPoints/MyPoints1')" :class="currentPath == '/personal/MyPoints/MyPoints1'?'routerDiv1':''">
            <a class="routerDiv">个人中心</a>
          </div> -->
          <div v-for="(navItem, navIndex) in navTab" :key="navIndex" @click="routerGo(navItem.path, navIndex)" :class="[navActiveIndex == navIndex && 'routerDiv1']" id="navItem">
            <a class="routerDiv">{{navItem.name}}
              <div class="qipao" v-if="$store.state.snatchTaskNumber>0 && navIndex == 3">
                {{$store.state.snatchTaskNumber}}
              </div>
            </a>

          </div>
        </el-col>

        <el-col :span="6" class="colRight">
          <!-- <el-row> -->
          <div class="presonL" style="
              height:100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;">
            <!-- <router-link to="/personal/MyPoints/MyPoints1"> -->

            <img :src="$store.state.imgInfo?'http://47.107.71.47/bishuiwan'+$store.state.imgInfo : head" class="logoContent" @click="toPerson()">
            <!-- </router-link> -->
            <div class="personMsg">
              <div class="personName" @click="toPerson()">{{ realName }}</div>

              <div class="personScore">
                <template v-for="(item,index) in list.crown">
                  <img src="./img/cc01.png">
                </template>
                <template v-for="(item,index) in list.sun" v-if="list.crown<5">
                  <img src="./img/cc02.png">
                </template>
                <template v-for="(item,index) in list.month" v-if="list.sun<5">
                  <img src="./img/cc03.png">
                </template>
                <template v-for="(item,index) in list.star" v-if="list.month<5">
                  <img src="./img/cc04.png">
                </template>
              </div>

            </div>
            <div class="utils">
              <img src="../../images/bb04.png" alt="消息" @click="toMessage()" title="消息">
              <div class="messageNumber" v-if="$store.state.messageNumber>0">{{$store.state.messageNumber}}
              </div>
              <img src="../../images/bb03.png" style="margin-left:28px" @click="out()" title="退出登录">
            </div>
          </div>
          <!-- </el-col>
            <el-col :span="5"><img src="" class="logoFooter"></el-col>
            <el-col :span="5"><img src="" class="logoFooter"></el-col> -->
          <!-- </el-row> -->
        </el-col>
      </el-row>

      <!-- <el-menu :default-active="currentPath" class="el-menu-demo menuflex" mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/WebEntry">积分管理</el-menu-item>
        <el-menu-item index="/ReportForm/integralReport1/integralReport">积分报表</el-menu-item>
        <el-menu-item index="/hall/toTask/toTask1">任务大厅
          <div class="qipao" v-if="$store.state.totalTaskNumber>0">
            {{$store.state.totalTaskNumber}}
          </div>
          <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start" v-model="value">
          </el-tooltip>
        </el-menu-item>
        <el-menu-item index="/personal/MyPoints/MyPoints1">个人中心</el-menu-item>
      </el-menu> -->

      <!-- <keep-alive> -->
      <!-- <router-view></router-view> -->
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import { outLogin, getRecordNew, personal } from "@/utils/axios/axios";
export default {
  name: "inheader",
  data() {
    return {
      currentPath: "",
      realName: "",
      head: "",
      value: true,
      messageNumber: 0,
      taskNumber: 0,
      value5: 1,
      star: [],
      month: [],
      sun: [],
      crown: [],
      list: [],
      totalTaskNumber: 0,
      navTab: [
        { name: "首    页", path: "/home" },
        { name: "积分管理", path: "/WebEntry" },
        {
          name: "积分报表",
          path: "/ReportForm/integralReport1/integralReport"
        },
        { name: "任务大厅", path: "/hall/toTask/toTask1" },
        { name: "个人中心", path: "/personal/MyPoints/MyPoints1" }
      ],
      navActiveIndex: 0,
      logo: ""
    };
  },
  //  computed: {
  //       messageNumbers: function(){
  //           if (this.messageNumber ==0) {
  //             return false
  //           } else {
  //             return true
  //           }
  //       },
  //   },
  watch: {
    messageNumber: function(val, oldval) {
      console.log(val, oldval);
      this.messageNumber = val;
    },
    imgHead: function(val, oldval) {
      // this.head = 'http://47.107.71.47/bishuiwan'+localStorage.getItem('head')
      console.log(val);
    },
    // $route(to, from) {
    //   console.log(this.$route.path);
    //   if (this.$route.path == '/personal/MyPoints/MyPoints1') {
    //     this.currentPath == '/personal/MyPoints/MyPoints1'
    //   }
    // }
    $route: "getPath"
  },
  computed: {
    // currentPath() {
    //   if(this.$route.path.replace('/','')=='personal/MyPoints/MyPoints1'){
    //                return 'personal/MyPoints/MyPoints1';
    //             }
    //             else{
    //                 return this.$route.path.replace('/','');
    //             }
    //   // return this.$route.path.replace('/','')
    // }
  },
  methods: {
    routerGo(currentpath, index) {
      this.navActiveIndex = index;
      this.$router.push(currentpath);
      // index = currentpath;
    },
    getPath() {
      this.currentPath = "";
      if (this.$route.path == "/personal/MyInformation" || this.$route.path == '/personal/MyPoints/MyPoints1') {
        this.navActiveIndex = 4;
      } else if (
        this.$route.path == "/WebEntry" ||
        this.$route.path == "/IntegralAudit" ||
        this.$route.path == "/integralSelect" ||
        this.$route.path == "/BuckleTask"
      ) {
        this.navActiveIndex = 1;
      } else if (
        this.$route.path ==
        "/ReportForm/integralReport1/integralReport"
      ) {
        this.navActiveIndex = 2;
      } else if (this.$route.path == "/home") {
        this.navActiveIndex = 0;
      } 
      // this.currentPath = this.$route.path
    },
    // routerGo(path) {
    //   this.$router.push("/" + path);
    //   console.log(path);
    //   // this.indexs = path;
    // },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(this.$route);
    },
    toMessage() {
      this.$router.push("/message");
      // this.messageNumber = 0;
    },
    toPerson() {
      this.$router.push("/personal/MyInformation");
    },
    // 退出登录
    out() {
      console.log(2);

      // this.$router.push('/login')
      let sessionId = localStorage.getItem("sessionId");
      // console.log(sessionId)
      let out = { sessionId: sessionId, type: 1 };
      console.log(out);

      outLogin(this.$qs.stringify(out)).then(res => {
        console.log(res, "退出登录");
        if (res.code === 1) {
          this.$router.push("/login");
          localStorage.setItem("sessionId", "");
          localStorage.setItem("head", "");
          this.$store.state.imgInfo = "";
          localStorage.setItem("level", false);
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
          console.log(res, "气泡试试消息");
          this.totalTaskNumber = res.data.totalTaskNumber;
          this.$store.state.totalTaskNumber = res.data.totalTaskNumber;
          this.messageNumber = res.data.messageNumber;
          this.taskNumber = res.data.taskNumber;
          this.$store.state.taskNumber = res.data.taskNumber;
          this.$store.state.messageNumber = res.data.messageNumber;
          this.$store.state.snatchTaskNumber = res.data.snatchTaskNumber;
          console.log("额鹅鹅鹅", this.$store.state.snatchTaskNumber);
        }
      });
    },
    // 用户信息
    personal() {
      let params = {
        sessionId: localStorage.getItem("sessionId")
      };
      personal(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          console.log(res, "等级");
          this.list = res.data;
          this.star.length = res.data.star;
          this.sun.length = res.data.sun;
          this.month.length = res.data.month;
          this.crown.length = res.data.crown;
        }
      });
    }
  },
  mounted() {
    this.realName = localStorage.getItem("realName");
    this.head =
      "http://47.107.71.47/bishuiwan" + localStorage.getItem("head");
    this.logo = localStorage.getItem("logo");
    console.log(this.head, "当前路由", this.$store.state.imgInfo, this.logo);
    this.currentPath = this.$route.path;
    let splitBUrrentPath = "/" + this.currentPath.split("/")[1];
    console.log(
      this.currentPath,
      this.navActiveIndex,
      splitBUrrentPath,
      "路由"
    );
    this.qipao();
    this.personal();
    // localStorage.setItem('currentPath',splitBUrrentPath)
    if (splitBUrrentPath == "/home") {
      this.navActiveIndex = 0;
    } else if (splitBUrrentPath == "/WebEntry") {
      this.navActiveIndex = 1;
    } else if (
      splitBUrrentPath == "/ReportForm" ||
      splitBUrrentPath == "/customGrouping" ||
      splitBUrrentPath == "/customReport"
    ) {
      this.navActiveIndex = 2;
    } else if (splitBUrrentPath == "/hall") {
      this.navActiveIndex = 3;
    } else if (splitBUrrentPath == "/personal") {
      this.navActiveIndex = 4;
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
.elColFlex {
  /* margin-top: 22px; */
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.colRight {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.inheader {
  width: 100%;
  height: 89px;
  min-width: 1200px;
  /* height: 135px; */
  /* box-shadow: 0px 2px 2px 0px rgba(74, 153, 254, 0.19); */
  /* background: rgba(255, 255, 255, 1); */
  background: url(../../images/bb02.png) no-repeat;
  background-size: 100% 100%;
  /* border-bottom: 1px solid #e6e6e6; */
  /*  margin: 0 auto;*/
}
a {
  background-color: rgba(255, 255, 255, 0);
}
.bigBox {
  height: 100%;
  width: 1219px;
  margin: 0 auto;
  box-sizing: border-box;
  /* padding: 0 10px; */
  /* padding-bottom: 5px; */
}
.logo {
  text-align: left;
  display: flex;
  align-items: center;
  height: 100%;
}
.logoContent {
  width: 42px;
  height: 41px;
  border-radius: 50%;
  /* margin-top: 15px; */
  overflow: hidden;
  margin-right: 10px;
}
.logoHeader {
  margin-top: 10px;
  /* margin-left: -23px; */
  display: inline-block;
  width: 54px;
  height: 54px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 4px;
}
.logoRight {
  position: absolute;
  top: 25px;
  left: 60px;
}
.logoCol {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.inheader span {
  /* width: 224px; */
  height: 28px;
  font-size: 27px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #fff;
  line-height: 28px;
  margin-top: 29px;
  margin-left: 10px;
  position: absolute;
}
.menuflex {
  display: flex;
  justify-content: space-around;
}
.personName {
  cursor: pointer;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.personMsg {
  /* margin-top: 15px; */
  /* margin-left: 10px; */
  box-sizing: border-box;
}
.currentRouter {
  color: #ffd100;
  font-size: 18px;
}
.utils {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 10px; */
  margin-left: 10px;
  position: relative;
  right: -5px;
}
.qipao {
  color: white;
  position: absolute;
  bottom: 30px;
  left: 80px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  /* font-size: 2px; */
  font-family: 微软雅黑;
  background-color: red;
  border-radius: 50%;
}
.messageNumber {
  background-color: red;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  position: absolute;
  top: -3px;
  left: 10px;
  border-radius: 50%;
}
.personScore {
  /* display: flex; */
  /* justify-content: flex-start; */
  /* margin: 22px auto; */
  width: 115px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}
.personScore ul {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.routerDiv {
  cursor: pointer;
  width: 88px;
  height: 34px;
  // background-color: #ffd100;
  border-radius: 2px;
  line-height: 34px;
  text-align: center;
  display: inline-block;
  position: relative;
  color: #fff;
  font-size: 18px;
}
.routerDiv1 {
  cursor: pointer;
  width: 88px;
  height: 34px;
  background-color: #ffae00;
  border-radius: 2px;
  line-height: 34px;
  text-align: center;
  display: inline-block;

  a {
    color: #fff;
    font-weight: bold;
    font-size: 19px;
    div {
      font-weight: 400;
    }
  }
}
</style>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: 0px solid #000;
  background-color: rgba(255, 255, 255, 0);
}
.el-menu-item.is-active {
  background-color: #ffd100 !important;
  color: #ffffff !important;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 17px;
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #ffd100;
}
</style>
