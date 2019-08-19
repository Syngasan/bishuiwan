<template>
  <div class="login">
    <!-- :style="{backgroundImage:'url('+bg+')'}" -->
    <!-- <div class="logo"><img src="../../images/logo_w@2x.png"><span>员工积分管理系统</span></div> -->
    <div class="logo">
      <i class="logoHeader" :style="{backgroundImage: 'url(' + logo + ')'}"></i>
      <!-- <span>碧水湾积分管理系统</span> -->
      <img src="./img/aaa.png" alt="" class="logoRight">
    </div>
    <div class="divBottom">
      <img :src="bg" alt="" class="bg_Img" style="width:1239px">
      <div class="loginCon">
        <!-- <div class="loginTitle">Password</div> -->
        <div class="welcome">找回密码</div>
        <el-input class="ForInputPadding ForInput" v-model="phone" placeholder="请输入手机号码">
          <i slot="prefix" class="el-input__icon iconfont icon-phone iconStyle"></i>
        </el-input>
        <el-row>
          <el-col :span="16">
            <el-input v-model="code" class="ForInputPaddings ForInput" placeholder="请输入验证码">
              <i slot="prefix" class="el-input__icon iconfont icon-anquanbaozhang1 iconStyle"></i>
            </el-input>
          </el-col>
          <el-col :span="8" style="z-index:99">
            <el-button class="sureBtn" type="primary" @click="getCode">{{sendMsg}}</el-button>
          </el-col>
        </el-row>
        <el-input class="ForInputPadding ForInput" v-model="newPassword" placeholder="请输入新密码">
          <i slot="prefix" class="el-input__icon iconfont icon-suo iconStyle"></i>
        </el-input>
        <el-input class="ForInputPadding ForInput" v-model="againPassword" placeholder="请再次输入密码">
          <i slot="prefix" class="el-input__icon iconfont icon-suo iconStyle"></i>
        </el-input>
        <el-row>
          <el-col :span="24">
            <el-button class="sureBtne" type="primary" @click="changePhone">重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { checkLogin, getLoginPic } from "@/utils/axios/axios";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
export default {
  name: "forget",
  data() {
    return {
      phone: "",
      code: "",
      newPassword: "",
      againPassword: "",
      canSend: true,
      sendMsg: "获取验证码",
      url: "http://47.107.71.47/bishuiwan",
      logo: "",
      bg: "",
      android: "",
      ios: ""
    };
  },
  mounted() {
    this.logoPC();
  },
  methods: {
    getCode() {
      if (this.canSend) {
        this.getTime(60);
        this.sendCode();
      }
    },
    sendCode() {
      this.$axios({
        url: "user/code",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          mobile: this.phone,
          type: 0
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: "success",
            message: res.data.desc
          });
        }
      });
    },

    logoPC() {
      getLoginPic({ name: "logoPC" }).then(res => {
        console.log(res);
        console.log(this.url + res.data);
        if (res.code === 1) {
          this.logo = this.url + res.data;
          localStorage.setItem("logo", this.logo);
        }
      }),
        getLoginPic({ name: "loginPagePC" }).then(res => {
          console.log(res);
          console.log(this.url + res.data);
          if (res.code === 1) {
            this.bg = this.url + res.data;
          }
        });
      getLoginPic({ name: "Android" }).then(res => {
        console.log(res);
        console.log(this.url + res.data);
        if (res.code === 1) {
          this.android = this.url + res.data;
        }
      });
      getLoginPic({ name: "IOS" }).then(res => {
        console.log(res);
        console.log(this.url + res.data);
        if (res.code === 1) {
          this.ios = this.url + res.data;
        }
      });
    },
    getTime(time) {
      if (time > 0) {
        this.canSend = false;
        this.sendMsg = time + "后重新获取";
        time--;
        setTimeout(() => {
          this.getTime(time);
        }, 1000);
      } else {
        this.sendMsg = "获取验证码";
        this.canSend = true;
      }
    },
    changePhone() {
      this.$axios({
        url: "user/resetPwd",
        method: "POST",
        data: {
          mobile: this.phone,
          code: this.code,
          password: this.newPassword,
          repeatPassword: this.againPassword
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.desc
          });
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: rgba(254, 239, 243, 1);
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%; */
}
/* .forget {
  background-image: url(../../images/bg@2x.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
} */
.logoHeader {
  display: inline-block;
  width: 63px;
  height: 63px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.logo {
  text-align: left;
  position: relative;
  width: 100%;
  height: 94px;
  padding-top: 17px;
  padding-bottom: 14px;
  padding-left: 340px;
  background-color: #fff;
  line-height: 94px;
  box-sizing: border-box;
}
.logo span {
  font-size: 27px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(10, 143, 246, 1);
  line-height: 39px;
  margin-left: 30px;
  position: absolute;
  top: 58px;
}
.logoRight {
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  transform: translate(10px, -45%);
}
.divBottom {
  /* width: 100%; */
  width: 1239px;
  height: 626px;
  position: relative;
  margin: auto;
  /* height: 100vh; */
  overflow: hidden;
  /* background-repeat: no-repeat;
  background-position: 0px 340px 220px 340px !important;
  background-size: 100% 100%; */
}
.loginCon {
  position: absolute;
  top: 52px;
  right: 54px;
  width: 412px;
  height: 525px;
  background-color: #fff;
  padding-top: 26px;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
}
.loginTitle {
  width: 121px;
  height: 23px;
  font-family: PingFang-SC-Medium;
  font-size: 30px;
  font-weight: 500;
  color: rgba(55, 61, 65, 1);
  line-height: 0px;
  margin: 0 auto;
  padding-top: 42px;
}
.ForInputPadding {
  width: 331px;
  height: 46px;
}
.ForInputPaddings {
  width: 219px;
  /*height: 49px;*/
}
.welcome {
  height: 18px;
  font-size: 17px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(115, 119, 122, 1);
  text-align: left;
}
.ForInput {
  margin-top: 23px;
}
.iconStyle {
  font-size: 18px;
  margin-left: 4px;
}
.rememberCon {
  text-align: left;
}
.remember {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(90, 90, 90, 1);
}
.forGet {
  text-align: right;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(10, 143, 246, 1);
}
.sureBtn {
  width: 100%;
  width: 112px;
  height: 40px;
  margin-top: 23px;
  /* margin-left: 8px; */
  z-index: 99;
  background-color: #ff005c;
  border-color: #ff005c;
}
.sureBtne {
  font-size: 19px;
  width: 100%;
  width: 331px;
  height: 47px;
  margin-top: 68px;
  background-color: #ff005c;
  border-color: #ff005c;
}
.downPhone {
  font-size: 17px;
  font-weight: 400;
  color: rgba(63, 63, 63, 1);
  line-height: 0px;
  margin-top: 30px;
  height: 17px;
}
.downPhoneImg img {
  width: 182px;
  height: 57px;
}
</style>
<style>

</style>