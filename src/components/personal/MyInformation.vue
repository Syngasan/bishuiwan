<template>
  <div class="MyInformation">
    <div class="divBox">
      <img class="HeadPortrait" :src="list.head" @click="dialogHeadPortraitVisible=true">
      <div style="margin-top:10px">
        <span class="Grade"> <img src="./img/my_Level_v@2x.png" alt=""> {{list.level}}</span>
      </div>
      <div class="GradeImg" v-if="list.level != 0">
        <template v-for="(item,index) in list.crown">
          <img src="./img/bb105.png">
        </template>
        <template v-for="(item,index) in list.sun" v-if="list.crown<5">
          <img src="./img/bb104.png">
        </template>
        <template v-for="(item,index) in list.month" v-if="list.sun<5">
          <img src="./img/bb103.png">
        </template>
        <template v-for="(item,index) in list.star" v-if="list.month<5">
          <img src="./img/bb102.png">
        </template>
      </div>
      <div class="progressBox">
        <span class="Grade"> <img src="./img/my_Level_v@2x.png" alt=""> {{list.level}}</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage=levelDay color="rgba(220,179,119, 0.7)"></el-progress>
        <span class="Grade"> <img src="./img/my_Level_v@2x.png" alt=""> {{list.level+1}}</span>
      </div>
      <div class="forUp">距升级V{{list.level+1}}还剩{{list.day}}日 </div>
      <div class="listBox">
        <div class="title">基本信息</div>
        <div class="desc">
          <span class="descL">姓名：</span>
          <span>{{list.realName}}</span>
        </div>
        <div class="desc">
          <span class="descL">性别：</span>
          <span>{{list.sex}}</span>
        </div>
        <div class="desc">
          <span class="descL">部门：</span>
          <span>{{list.department}}</span>
        </div>
        <div class="desc">
          <span class="descL">职务：</span>
          <span>{{list.position}}</span>
        </div>
        <div class="desc">
          <span class="descL">工号：</span>
          <span>{{list.no}}</span>
        </div>
        <div class="borderBottom"></div>
        <div class="title">联系方式</div>
        <div class="desc">
          <span class="descL">邮箱：</span>
          <span>{{list.email}}</span>
          <!-- <span class="change" @click="changeEmail">修改邮箱</span> -->
          <div class="change">
            <img src="static/img/bb101.png" alt="">
            <div class="ml" @click="changeEmail" style="margin-right:34px">修改邮箱</div>
          </div>

        </div>
        <div class="desc">
          <span class="descL">电话：</span>
          <span>{{list.phone}}</span>
          <!-- <span class="change" @click="changeTel">修改电话</span> -->
          <div class="change">
            <img src="static/img/bb101.png" alt="">
            <div class="ml" @click="changeTel" style="margin-right:34px">修改电话</div>
          </div>
        </div>
        <div class="borderBottom"></div>
        <div class="desc">
          <span class="descL">账号：</span>
          <span>{{list.account}}</span>
        </div>
        <div class="desc">
          <span class="descL">密码：</span>
          <span>******</span>
          <div class="change">
            <img src="static/img/bb101.png" alt="">
            <div class="ml" @click="dialogPasswordVisible=true" style="margin-right:34px">修改密码</div>
          </div>
        </div>
        <div class="desc">
          <span class="descL">手机号码：</span>
          <span>{{list.mobile}}</span>
          <!-- <span class="change" @click="dialogPhoneNumberVisible= true">修改手机号码</span> -->
          <div class="change">
            <img src="static/img/bb101.png" alt="">
            <div class="ml" @click="dialogPhoneNumberVisible=true" style="margin-right:-1">修改手机号码</div>
          </div>
        </div>
        <div class="borderBottom"></div>
      </div>
    </div>
    <el-dialog class="textCenter" width="420px" title="修改密码" :visible.sync="dialogPasswordVisible"  @close='closeDialogPwd'  >
      <el-input class="ForInputPadding ForInput" v-model="phone" placeholder="请输入手机号码">
        <i slot="prefix" class="el-input__icon iconfont icon-phone iconStyle"></i>
      </el-input>
      <el-row>
        <el-col :span="16">
          <el-input class="ForInputPadding ForInput" v-model="code" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon iconfont icon-anquanbaozhang1 iconStyle"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="margin-top: 13px; width: 127px" @click="getCode(1)">{{sendMsg}}</el-button>
        </el-col>
      </el-row>
      <el-input class="ForInputPadding ForInput" v-model="newPassword" placeholder="请输入新密码">
        <i slot="prefix" class="el-input__icon iconfont icon-suo iconStyle"></i>
      </el-input>
      <el-input class="ForInputPadding ForInput" v-model="againPassword" placeholder="请再次输入密码">
        <i slot="prefix" class="el-input__icon iconfont icon-suo iconStyle"></i>
      </el-input>
      <div class="forBtn">
        <el-row>
          <el-col :span="12">
            <el-button class="leftBtn" @click="closePwd">取消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="rightBtn" type="primary" @click="changePassword">确认</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog class="textCenter" width="420px" title="修改手机号码" :visible.sync="dialogPhoneNumberVisible" @close='closeDialogPhone'>
      <span style="text-align: center;">
        <p>当前绑定手机号：{{list.mobile}}，更换手机号后将使</p>
        <p>用新的手机号找回密码或修改密码</p>
      </span>
      <el-input class="ForInputPadding ForInput" v-model="phone1" placeholder="请输入手机号码">
        <i slot="prefix" class="el-input__icon iconfont icon-phone iconStyle"></i>
      </el-input>
      <el-row>
        <el-col :span="16">
          <el-input v-model="code1" class="ForInputPadding ForInput" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon iconfont icon-anquanbaozhang1 iconStyle"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" style="margin-top: 13px; width: 127px" @click="getCode(0)">{{sendMsg}}</el-button>
        </el-col>
      </el-row>
      <div class="forBtn">
        <el-row>
          <el-col :span="12">
            <el-button class="leftBtn" @click="closePhone">取消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="rightBtn" @click="changePhone" type="primary">确认</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog class="textCenter" width="420px" title="更换头像" :visible.sync="dialogHeadPortraitVisible">
      <div style="display:flex;justify-content: space-around;height:32px">
        <!-- <el-button class="portraitBtn">上传本地照片</el-button> -->
        <!-- <el-upload style="margin-left:10px" class="upload-demo" ref="upload" :limit=1 action='http://47.107.71.47/bishuiwan/api/updateHead' method:="post" :compress='false' :on-preview="handlePreview" accept=".jpg,.png" :http-request="uploadSectionFile" :file-list="fileList" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :auto-upload="true" :show-file-list="false">
          <el-button slot="trigger" size="small" type="primary" class="portraitBtn">上传本地照片</el-button>
        </el-upload> -->
        <div class="fileBtn">上传本地头像
          <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="avatar1">
        </div>
        <!-- <el-button class="portraitBtn" @click="uploadPictrue()" size="small" type="primary">挑选推荐头像</el-button> -->
        <div class="fileBtn" @click="uploadPictrue()">
          挑选推荐头像
        </div>
      </div>
      <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:80%;margin-top:10px">
      <div style="text-align: center;">
        <!-- <img class="PortraitEdit" :src="list.head"> -->
        <!-- <el-slider v-model="value1" style="width: 300px; text-align: center;"></el-slider> -->
      </div>
      <div class="forBtn">
        <el-row>
          <el-col :span="12">
            <el-button class="leftBtn" @click="cancel">取消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="rightBtn" @click="submitHead" type="primary">确认</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog class="textCenter" width="420px" title="推荐头像" :visible.sync="dialogHeadPortraitVisible1">
      <!-- <div style="text-align: center;">
        <img class="PortraitEdit" :src="allHead.myHead">
      </div> -->
      <div>
        <span>职业</span>
        <div class="imgwidth">
          <img width="80" height="80" style="margin-right:5px" :src="url+items.head" alt="" v-for="(items , indexs) in allHead.career" @click="setHead(items.id,items.head)">
        </div>
        <span>卡通</span>
        <div class="imgwidth">
          <img width="80" height="80" style="margin-right:5px" :src="url+itemss.head" alt="" v-for="(itemss , indexss) in allHead.cartoon" @click="setHead(itemss.id,itemss.head)">
        </div>
        <span>风景</span>
        <div class="imgwidth">
          <img width="80" height="80" style="margin-right:5px" :src="url+itemsss.head" alt="" v-for="(itemsss , indexsss) in allHead.landscape" @click="setHead(itemsss.id,itemsss.head)">
        </div>
        <!-- <div>卡通</div>
        <img class="imgwidth" :src="url+items.head" alt="" v-for="(items , indexs) in allHead.cartoon" >
        <div>风景</div>
        <img class="imgwidth" :src="url+itemss.head" alt="" v-for="(itemss , indexss) in allHead.landscape" > -->
      </div>
      <div class="forBtn">
        <el-row>
          <el-col :span="12">
            <el-button class="leftBtn" @click="dialogHeadPortraitVisible1=false">取消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="rightBtn" @click="dialogHeadPortraitVisible1=false" type="primary">确认</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { updateHead, setHead } from "@/utils/axios/axios";

export default {
  name: "MyInformation",
  data() {
    return {
      phone: "",
      code: "",
      newPassword: "",
      againPassword: "",
      canSend: true,
      sendMsg: "获取验证码",
      dialogPasswordVisible: false,
      dialogPhoneNumberVisible: false,
      dialogHeadPortraitVisible: false,
      dialogHeadPortraitVisible1: false,
      list: "",
      phone1: "",
      code1: "",
      value1: 0,
      allHead: [],
      url: "http://47.107.71.47/bishuiwan",
      fileList: [],
      imageUrl: "",
      radio: 0,
      specHead: "",
      levelDay: 0,
      setTime: null,
      count: 60
    };
  },
  created() {
    this.getList();
    // alert(this.$route.path)
  },
  methods: {
    //关闭手机弹窗
    closeDialogPhone() {
      clearInterval(this.setTime);
      this.sendMsg = "获取验证码";
      this.canSend = true;
      this.count = 60;
      this.code1 = ''
      this.phone1 = ''
    },
    // 关闭密码弹窗
    closeDialogPwd() {
      clearInterval(this.setTime);
      this.sendMsg = "获取验证码";
      this.canSend = true;
      this.count = 60;
      this.code = ''
      this.phone = ''
    },
    // 
    closePwd () {
      this.dialogPasswordVisible=false
      clearInterval(this.setTime);
      this.sendMsg = "获取验证码";
      this.canSend = true;
      this.count = 60;
      this.code = ''
      this.phone = ''
    },
    closePhone () {
      this.dialogPhoneNumberVisible=false
      clearInterval(this.setTime);
      this.sendMsg = "获取验证码";
      this.canSend = true;
      this.count = 60;
      this.code1 = ''
      this.phone1 = ''
    },
    getCode(val) {
      console.log(val);

      if (val == 0) {
        // 修改手机
        if (this.canSend) {
          console.log(888);

          // this.sendCode();
          this.$axios({
            url: "user/code",
            method: "POST",
            data: {
              sessionId: localStorage.getItem("sessionId"),
              mobile: this.phone1,
              type: 0
            },
            transformRequest: transformRequestFn
          }).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              this.getTime(60);
            } else {
              this.$message({
                type: "error",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
            }
          });
        }
      } else if (val == 1) {
        // 修改密码
        if (this.sendCode) {
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
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              this.getTime(60);
            } else {
              this.$message({
                type: "error",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
            }
          });
        }
      }
    },
    sendCode() {},
    handlePreview(file) {
      console.log(file);
    },
    getTime() {
      this.setTime = setInterval(() => {
        if (this.count > 0) {
          this.canSend = false;
          this.sendMsg = this.count + "后重新获取";
          this.count--;
        } else {
          clearInterval(this.setTime);
          this.sendMsg = "获取验证码";
          this.canSend = true;
        }
      }, 1000);
    },
    getList() {
      this.$axios({
        url: "user/personal",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.list = res.data.data;
          this.levelDay = Number(10 - this.list.day + "0");

          this.list.head =
            "http://47.107.71.47/bishuiwan" + this.list.head;
          console.log(this.list.head);
          this.oldHead = this.list.head;
        }
      });
    },
    changeEmail() {
      this.$prompt("当前邮箱" + this.list.email, "修改邮箱", {
        center: true,
        inputPlaceholder: "请输入新的邮箱",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$axios({
            url: "user/updateEmail",
            method: "POST",
            data: {
              sessionId: localStorage.getItem("sessionId"),
              email: value
            },
            transformRequest: transformRequestFn
          }).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
            }
          });
        })
        .catch(() => {});
    },
    changeTel() {
      this.$prompt("当前联系方式" + this.list.phone, "修改联系方式", {
        center: true,
        inputPlaceholder: "请输入新的修改联系方式",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /13[123569]{1}\d{8}|15[1235689]\d{8}|188\d{8}/,
        inputErrorMessage: "联系方式不正确"
      })
        .then(({ value }) => {
          this.$axios({
            url: "user/updatePhone",
            method: "POST",
            data: {
              sessionId: localStorage.getItem("sessionId"),
              phone: value
            },
            transformRequest: transformRequestFn
          }).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: res.data.desc,
                customClass: "messageClass1",
                duration: 1000
              });
            }
          });
        })
        .catch(() => {});
    },
    changePassword() {
      this.$axios({
        url: "user/resetPwd",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
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
            message: res.data.desc,
            customClass: "messageClass1",
            duration: 1000
          });
          this.dialogPasswordVisible = false;
          clearInterval(this.setTime);
          this.sendMsg = "获取验证码";
          this.canSend = true;
          this.count = 60;
        } else {
          this.$message({
            type: "error",
            message: res.data.desc,
            customClass: "messageClass1",
            duration: 1000
          });
          clearInterval(this.setTime);
          this.sendMsg = "获取验证码";
          this.canSend = true;
          this.count = 60;
        }
      });
    },
    changePhone() {
      this.$axios({
        url: "user/updateMobile",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          mobile: this.phone1,
          code: this.code1
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: res.data.desc,
            customClass: "messageClass1",
            duration: 1000
          });
          this.dialogPhoneNumberVisible = false;
          // clearTimeout(this.setTime)
          clearInterval(this.setTime);
          this.sendMsg = "获取验证码";
          this.canSend = true;
          this.count = 60;
        } else {
          this.$message({
            type: "error",
            message: res.data.desc,
            customClass: "messageClass1",
            duration: 1000
          });
          clearInterval(this.setTime);
          this.sendMsg = "获取验证码";
          this.canSend = true;
          this.count = 60;
        }
      });
    },
    changeRecommendPortrait() {
      this.$axios({
        url: "user/getAllHead",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId")
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code == 1) {
          this.allHead = res.data.data;
          console.log(this.allHead);

          this.allHead.myHead =
            "http://47.107.71.47/bishuiwan" + this.allHead.myHead;

          // this.$message({
          //   type: "success",
          //   message: res.data.desc
          // });
          this.dialogPhoneNumberVisible = false;
        }
      });
    },
    changePortrait() {
      this.dialogHeadPortraitVisible = false;
    },
    // 获取推荐头像
    uploadPictrue() {
      this.radio = 2;
      this.dialogHeadPortraitVisible1 = true;
      this.changeRecommendPortrait();
    },
    // 设置推荐头像
    setHead(val, head) {
      console.log(head);
      this.specHead = val;
      this.dialogHeadPortraitVisible1 = false;
      this.imageUrl = this.url + head;
    },
    handleAvatarSuccess(res, file, fileList) {
      console.log(res, file, fileList, "图片信息");

      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(err, file) {
      console.log(err, file);
    },
    // 上传头像
    submitUpload() {
      let list = document.getElementsByClassName(
        "el-upload-list__item is-ready"
      );
      if (list.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要导入的模板！",
          customClass: "messageClass1",
          duration: 1000
        });
        return;
      }
      this.$refs.upload.submit();
    },

    uploadSectionFile(param) {
      // var fileObj = param.file;
      // // FormData 对象
      // var form = new FormData();
      // // 文件对象
      // compress: false,
      //   form.append("sessionId", localStorage.getItem("sessionId"));
      // form.append("head", fileObj);
      // console.log(form.get("sessionId"), "文件参数");
      // console.log("文件", fileObj);
      // // this.imageUrl = fileObj.name;
      // updateHead(form).then(res => {
      //   if (res.code == 1) {
      //     this.$message({
      //       type: "success",
      //       message: res.desc,
      //       customClass: "messageClass1"
      //     });
      //     // this.handleAvatarSuccess()
      //     this.imageUrl = this.url + res.data;
      //     localStorage.setItem("head", res.data);
      //     this.$store.commit("SETIMGINFO", res.data);
      //     this.getList();
      //     // this.submitDone()
      //     this.fileList = [];
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: res.desc,
      //       customClass: "messageClass1"
      //     });
      //     this.fileList = [];
      //   }
      // });
    },
    changeImage(e) {
      this.radio = 1;
      var file = e.target.files[0];
      // this.form = new FormData();

      // form.append("head", file);
      var reader = new FileReader();
      var that = this;
      console.log(that.imageUrl);

      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.imageUrl = this.result;
        console.log(this == e.currentTarget);
      };
    },
    submitHead() {
      if (this.radio == 1) {
        if (this.$refs.avatarInput.files.length !== 0) {
          let form = new FormData();
          form.append("head", this.$refs.avatarInput.files[0]);
          form.append("sessionId", localStorage.getItem("sessionId"));
          updateHead(form).then(res => {
            if (res.code == 1) {
              this.$message({
                type: "success",
                message: res.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              // this.handleAvatarSuccess()
              this.imageUrl = this.url + res.data;
              localStorage.setItem("head", res.data);
              this.$store.commit("SETIMGINFO", res.data);
              this.getList();
              // this.submitDone()
              this.fileList = [];
            } else {
              this.$message({
                type: "error",
                message: res.desc,
                customClass: "messageClass1",
                duration: 1000
              });
              // this.fileList = [];
            }
          });
        }
      } else if (this.radio == 2) {
        let params = {
          sessionId: localStorage.getItem("sessionId"),
          headId: this.specHead
        };
        console.log(params);

        setHead(this.$qs.stringify(params)).then(res => {
          if (res.code === 1) {
            this.$store.commit("SETIMGINFO", res.data);
            // this.$message({
            //   message: res.desc,
            //   type: 'success',
            //   customClass: "messageClass1",
            // });
            this.dialogHeadPortraitVisible1 = false;
            this.imageUrl = this.url + res.data;
            this.getList();
          }
        });
      }
      this.dialogHeadPortraitVisible = false;
    },
    cancel() {
      this.imageUrl = this.oldHead;
      this.dialogHeadPortraitVisible = false;
    }
  }
};
</script>

<style scoped>
.MyInformation {
  /* min-height: 750px; */
  overflow: auto;
  border: 1px solid #e9edf6;
  background-color: #fff;
}
.textCenter {
  text-align: center;
  /* margin: auto; */
}
.iconStyle {
  font-size: 18px;
  margin-left: 4px;
}
.forBtn {
  text-align: center;
  margin-top: 30px;
}
.leftBtn {
  width: 90px;
  margin-left: 80px;
}
.rightBtn {
  width: 90px;
  margin-right: 80px;
}
.ForInputPaddings {
  width: 138px;
  /*height: 49px;*/
}
.ForInputPadding {
  width: 100%;
  height: 40px;
}
.ForInput {
  margin-top: 13px;
}
.divBox {
  padding: 20px 18px 28px 19px;
  text-align: center;
}
.HeadPortrait {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  overflow: hidden;
}
.Grade {
  font-size: 18px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(170, 170, 170, 1);
  min-width: 50px;
  min-height: 25px;
  margin: 0 auto;
  background-color: #f1e9dd;
  border-radius: 5px;
  /* margin-top: 22px; */
  padding: 3px 1px;
  box-sizing: border-box;
  display: inline-block;
  margin: auto 0;
}
.GradeImg {
  /* margin-top: 22px; */
  margin: 22px auto;
  width: 150px;
  height: 20px;
  overflow: hidden;
}
.GradeImg img {
  /* width: 25px; */
  /* height: 20px; */
  margin: 0 1px;
  /* border-radius: 50%; */
}
.progressBox {
  margin-top: 19px;
}
.el-progress {
  width: 375px;
  display: inline-block;
}
.forUp {
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(43, 43, 43, 1);
  margin-top: 8px;
  padding-bottom: 38px;
  border-bottom: 1px solid rgba(233, 237, 246, 1);
}
.listBox {
  text-align: left;
}
.title {
  font-size: 20px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  margin-top: 27px;
  color: rgba(31, 31, 31, 1);
}
.desc {
  margin-top: 24px;
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(23, 23, 23, 1);
}
.descL {
  color: rgba(151, 151, 151, 1);
}
.borderBottom {
  margin-top: 25px;
  border: 1px solid rgba(233, 237, 246, 1);
}
.change {
  float: right;
  font-size: 18px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(10, 143, 246, 1);
  cursor: pointer;
  /* line-height: 25px;
  height: 25px; */
  display: flex;
  justify-content: flex-start;
}
.change img {
  width: 21px;
  height: 21px;
}
.ml {
  margin-left: 5px;
}
.imgwidth {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 5px;
}
.avatar1 {
  opacity: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.fileBtn {
  width: 130px;
  height: 32px;
  background-color: rgba(64, 158, 255);
  line-height: 32px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  display: inline-block;
  position: relative;
}
</style>
