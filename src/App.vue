<template>
  <div id="app">
    <transition-group name="fade" tag="div" class="list-group">
      <router-view class="routerViewIndex" :key="'routerViewIndex'" />
    </transition-group>
  </div>
</template>

<script>
import "./assets/iconfont/iconfont.css";
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: white;
  padding-right: 0 !important;
  /* overflow-y: scroll; */
}
body::-webkit-scrollbar {
  display: none;
}
.rgb196 {
  color: red !important;
}
.tableA ::-webkit-scrollbar {
  display: inline-block;
  /* background-color:; */
}

#app {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.clear {
  clear: both;
}
/* .el-dialog__wrapper {
  z-index:2500 !important
} */
.messageClass {
  min-width: 300px;
}
.messageClass1 {
  min-width: 300px;
  top: 50%;
  z-index: 5000 !important
}
.messageClass2 {
  min-width: 300px;
  top: -10px;
  z-index: 5000 !important
}
.alertClass {
  max-width: 300px;
}
.routerViewIndex {
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  overflow: unset !important;
}
.displayNone {
  display: none;
}
.WebEntry .el-form-item__label {
  width: 80px !important;
}
.el-table thead tr th {
  background-color: #42acfe !important;

  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 1) !important;
}
.el-table tr td {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
}
.PromptBox {
  text-align: center;
}
.PromptBox img {
  width: 260px;
  margin: 15px auto;
}

.circular {
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
.left_title {
  font-size: 24px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.btnnn {
  margin-top: -15px;
}
.specFont {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
}
.el-radio__label {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  line-height: 26px;
}
.el-form-item__label {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(32, 32, 32, 1);
  /* line-height: 26px; */
}
.marginT {
  margin-top: 20px;
}
.w460 {
  width: 460px;
}
.img50 {
  width: 40px;
  height: 40px;
  /* display: inline-block; */
}
.inBlock {
  display: inline-block;
}
.mr {
  margin-right: 10px;
}
.taskName {
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}
.taskDep {
  font-size: 13px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(97, 97, 97, 1);
}
.groudBtn {
  width: 100px;
  height: 38px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  /* line-height: 26px; */
}
.groudSpan {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(39, 39, 39, 1);
  line-height: 26px;
}
.mr5 {
  margin-left: 8px;
}
.radius {
  border-radius: 50%;
  overflow: hidden;
}
.dialogBtn {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
