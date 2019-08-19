<template>
  <div class="login" ref="logo">
    <!-- :style=" {backgroundImage:'url('+bg+')'}" -->
    <div class="logo">
      <i class="logoHeader" :style="{backgroundImage: 'url(' + logo + ')'}"></i>
      <img src="./img/loading_title_china@2x.png" alt="" class="logoRight">
    </div>
    <div class="divBottom">
      <img :src="bg" alt="" class="bg_Img" style="width:1239px">
      <div class="loginCon">
        <div class="loginCon1">
          <div class="welcome">欢迎，请登录</div>
          <el-input v-model="userName" class="ForInputPadding ForInput1" ForInput placeholder="请输入登录账号或手机号">
            <i slot="prefix" class="el-input__icon iconfont icon-yonghu iconStyle"></i>
          </el-input>
          <el-input v-model="passWord" class="ForInputPadding ForInput" placeholder="请输入密码" type="password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            <i slot="prefix" class="el-input__icon iconfont icon-suo iconStyle"></i>
          </el-input>
          <el-input v-model="businessNumber" class="ForInputPadding ForInput" placeholder="请输入企业ID">
            <i slot="prefix" class="el-input__icon iconfont icon-id iconStyle"></i>
          </el-input>
          <el-row>
            <el-col :span="12" class="rememberCon">
              <el-checkbox class="remember" v-model="rememberMe">记住登录状态</el-checkbox>
            </el-col>
            <el-col :span="12" class="forGet">
              <router-link to="/forget" style="cursor:pointer">忘记密码？</router-link>
            </el-col>
            <el-col :span="24">
              <el-button class="sureBtn" type="primary" @click="loginBtn">登录</el-button>
            </el-col>
            <el-col :span="24" class="downPhone">
              <img src="./img/loading_phone@2x.png" alt="">
            </el-col>

          </el-row>
        </div>

        <!-- <div class="loginCon2"> -->
          <el-col :span="12" class="downPhoneImg" @click.native="showDialogAnd"><img src="../../images/loading_Android@2x.png"></el-col>
          <el-col :span="12" class="downPhoneImgs" @click.native="showDialogIos"><img src="../../images/loading_iphone@2x.png"></el-col>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { checkLogin, getLoginPic } from "@/utils/axios/axios";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";

// import qs from 'qs'
export default {
  name: "login",
  data() {
    return {
      rememberMe: true,
      userName: "",
      passWord: "",
      businessNumber: "",
      url: "http://47.107.71.47/bishuiwan",
      logo: "",
      bg: "",
      android: "",
      ios: ""
    };
  },
  created() {
    this.userName = localStorage.getItem("userName");
    this.passWord = localStorage.getItem("passWord");
    this.businessNumber = localStorage.getItem("businessNumber");
    this.logoPC();
  },
  methods: {
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
    loginBtn() {
      // this.$router.push({ path: '/home' })
      let login = {
        account: this.userName,
        businessNumber: this.businessNumber,
        password: this.passWord,
        type: 1
      };
      console.log(login, "登录数组", this.$qs.stringify(login));

      checkLogin(this.$qs.stringify(login)).then(res => {
        if (res.code == 1) {
          if (this.rememberMe) {
            // this.$cookie.set('userName', this.userName, 3600 * 60 * 60 * 60 * 12)
            // this.$cookie.set('passWord', this.passWord, 3600 * 60 * 60 * 60 * 12)
            // this.$cookie.set('businessNumber', this.businessNumber, 3600 * 60 * 60 * 60 * 12)
            localStorage.setItem("userName", this.userName);
            localStorage.setItem("passWord", this.passWord);
            localStorage.setItem("businessNumber", this.businessNumber);
          } else {
            // this.$cookie.remove('userName')
            // this.$cookie.remove('passWord')
            // this.$cookie.remove('businessNumber')
            localStorage.setItem("userName", "");
            localStorage.setItem("passWord", "");
            localStorage.setItem("businessNumber", "");
          }
          this.$cookie.set(
            "sessionId",
            res.data.sessionId,
            3600 * 60 * 60 * 60 * 12
          );
          localStorage.setItem("ryToken", res.data.sessionId);
          localStorage.setItem("sessionId", res.data.sessionId);
          localStorage.setItem("realName", res.data.realName);
          if (res.data.head != null) {
            localStorage.setItem("head", res.data.head);
          }
          this.$router.push({ path: "/home" });

          localStorage.setItem("level", true);
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
              // if (res.data.data === -1) {
              //   this.messageBox(res.data.desc, "warning", "排名下降！");
              // } else if (res.data.data === 0) {
              //   this.messageBox(res.data.desc, "info", "排名不变!");
              // } else if (res.data.data === 1) {
              //   this.messageBox(res.data.desc, "success", "排名上升!");
              // }
            }
          });
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
    showDialogAnd() {
      //

      this.$alert(
        // document.getElementById('android').style.src()
        '<div class="PromptBox"><div class="banner"><img src="static/img/Login_tc_pic01@2x.png"/></div><div class="code"><img id="android" src="' +
          this.android +
          '"/></div><span>扫二维码下载手机客户端</span></div>',
        "",
        {
          closeOnClickModal: true,
          distinguishCancelAndClose: true,
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        }
      );
    },
    showDialogIos() {
      this.$alert(
        '<div class="PromptBox"><div class="banner"><img src="static/img/Login_tc_pic02@2x.png"/></div><div class="code"><img id="ios" src="' +
          this.ios +
          '"/></div><span>扫二维码下载手机客户端</span></div>',
        "",
        {
          closeOnClickModal: true,
          distinguishCancelAndClose: true,
          dangerouslyUseHTMLString: true,
          showClose: false,
          showConfirmButton: false
        }
      );
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%; */
  background: rgba(254, 239, 243, 1);
}
.logoHeader {
  /* margin-left: 43px; */
  /* margin-top: 38px; */
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
/* .logo span {
  font-size: 27px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(10, 143, 246, 1);
  line-height: 39px;
  margin-left: 30px;
  position: absolute;
  top: 58px;
} */
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
.bg_Img {
  width: 1239px;
}
/* .logo img {

  margin-left: 43px;
  margin-top: 38px;
} */
.loginCon {
  position: absolute;
  top: 52px;
  right: 54px;
  width: 412px;
  height: 525px;
  background-color: #fff;
  padding-top: 26px;
  box-sizing: border-box;
}
.loginCon1 {
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
}
.loginTitle {
  width: 121px;
  height: 23px;
  font-size: 30px;
  font-weight: 500;
  font-family: PingFang-SC-Medium;
  color: rgba(55, 61, 65, 1);
  line-height: 0px;
  margin: 0 auto;
  padding-top: 42px;
}
.ForInputPadding {
  width: 331px;
  height: 46px;
  /* border: NaNpx solid rgba(210, 210, 210, 1); */
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
.ForInput1 {
  margin-top: 18px;
}
.iconStyle {
  font-size: 17px;
  margin-left: 5px;
  margin-top: -30px;
}
.rememberCon {
  text-align: left;
}
.rememberCon .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ff005c !important;
}
.remember {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #ff005c !important;
  margin-top: 22px;
}
.forGet {
  text-align: right;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(10, 143, 246, 1);
  margin-top: 22px;
}
.forGet a {
  color: #ff005c;
  text-decoration: none;
}
.sureBtn {
  width: 100%;
  height: 47px;
  margin-top: 35px;
  background-color: #ff005c;
  border-color: #ff005c;
}
.downPhone {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(63, 63, 63, 1);
  line-height: 0px;
  margin-top: 30px;
}

.downPhoneImg img {
  width: 173px;
  height: 54px;
  margin-top: 20px;
  margin-left: 15px;
  /* border: 1px dashed #666; */
}
.downPhoneImgs img {
  width: 173px;
  height: 54px;
  margin-top: 20px;
  margin-right: 15px;
}
</style>
<style>
.rememberCon .el-checkbox__label {
  color: #ff005c !important;
}
.rememberCon .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff005c;
  border-color: #ff005c;
}
.rememberCon .el-checkbox__inner {
  border-color: #ff005c !important;
}
</style>