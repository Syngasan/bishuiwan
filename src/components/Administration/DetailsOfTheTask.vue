<template>
<div class="DetailsOfTheTask">
  <div class="title"><span>任务详情</span>
    <el-button class="backBtn" type="primary" @click="routerBack">返回</el-button>
  </div>
  <div class="EventBox">
    <div class="eventName">{{list.title}}</div>
    <div class="divBox"></div>
    <div class="time">记录时间：{{list.createTime}}</div>
    <div class="time">完成期限：{{list.happenTime}}</div>
    <div class="time">提交时间：{{list.submitTime}} </div>
    <div class="event">任务内容：</div>
    <div class="eventTips">{{list.content}}</div>
    <div class="eventDesc">{{list.remark}}</div>
    <div class="event">奖扣对象：</div>
    <div class="publisher">
      <i class="head-photo" :style="{backgroundImage: 'url(' + url + publisherHead  + ')'}"></i>
      <p class="name">任务发布人：{{publisher}}</p>
    </div>
    <el-row>
      <el-col :key="this" :span="8" class="objectList" v-for="(item,index) in list.userList">
        <div class="objectListBox">
          <img class="logo" :src=url+item.head>
          <div class="objectListBoxName">
            <div class="left">
              <div class="objectListBoxNameTop">{{item.realName}}</div>
              <div class="objectListBoxNameBottom">{{item.department}}</div>
            </div>
            <div class="objectListBoxNum">
              <input type="text" v-model="item.value" disabled :class="item.value < 0 && 'negative'">
              <!-- <span>{{item.value}}</span> -->
              分</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <ul class="detail">
    <li class="item" v-if="firstExamineTime">初审时间: {{firstExamineTime}}</li>
    <li class="item" v-if="firstExamineReason">初审意见: {{firstExamineReason}}</li>
    <li class="item" v-if="secondExamineTime">终审时间: {{secondExamineTime}}</li>
    <li class="item" v-if="secondExamineReason">终审意见: {{secondExamineReason}}</li>
  </ul>
  <div class="textCen">
    <el-button class="btn" type="primary" @click="eventTitle()" v-if="(isState ==1||isState ==2) && isDetail != 1 && isSHEN !=1">同意</el-button>
    <el-button class="btn" type="primary" v-if="isExamine == 1" @click="recall()">撤回</el-button>
    <el-button class="btn" v-else type="primary" @click="togglePopup()">退回</el-button>
  </div>
  <div class="popup-mark" v-show="showPopup">
    <div class="popup-body">
      <div class="title">请填写退回意见</div>
      <div class="select-box">
        <span><i class="select-icon" @click="selectState(2)"><i class="active" :style="{display: exitStateCode === 2 ? 'block' : 'none' }"></i></i>退回至"拟稿"步骤</span>
        <span><i class="select-icon" @click="selectState(3)"><i class="active" :style="{display: exitStateCode === 3 ? 'block' : 'none' }"></i></i>退回至"初审"步骤</span>
      </div>
      <textarea placeholder="请输入退回意见" v-model="opinion"></textarea>
      <div class="footer">
        <button class="cancel" @click="closePopup()">取消</button>
        <button class="ok" @click="eventBack()">确认</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Message
} from 'element-ui'
import {
  transformRequestFn
} from '@/utils/transformRequestFn/transformRequestFn'
import config from '@/config'
export default {
  name: 'DetailsOfTheTask',
  data() {
    return {
      list: '',
      state: 0,
      secondExamineReason: '',
      secondExamineTime: '',
      firstExamineTime: '',
      firstExamineReason: '',
      publisherHead: '',
      publisher: '',
      url: 'http://47.107.71.47/bishuiwan',
      showPopup: false,
      exitStateCode: 2,
      opinion: '',
      isExamine: 0,
      isDetail: '',
    }
  },
  created() {
    console.log(this.url);
    
    this.isDetail = this.isExamine = this.$route.params.isDetail
    this.isState =  this.$route.params.state
    console.log(this.isState);
    
    this.getList()
  },
  methods: {
    closePopup() {
      this.showPopup = false
    },
    recall() {
      this.$axios({
        url: 'examiner/recallExamineEvent',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          id: this.$route.params.id
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          Message.success({
            message: '撤回成功！',
            customClass: 'messageClass1',
            center: true
          })
          setTimeout(() => {
            this.$router.back(-1)
          }, 2000)
        } else {
          Message.warning({
            message: `${res.data.desc}`,
            customClass: 'messageClass1',
            center: true
          })
        }
      })
    },
    getList() {
      this.$axios({
        url: 'task/getTaskDetail',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          id: this.$route.params.id
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.list = res.data.data
          this.state = res.data.data.state
          this.publisherHead = res.data.data.head
          this.publisher = res.data.data.publishName
          this.isExamine = res.data.data.isExamine
          this.isSHEN = res.data.data.isExamine
          if (res.data.data.firstExamineReason) {
            this.firstExamineReason = res.data.data.firstExamineReason
          }
          if (res.data.data.firstExamineTime) {
            this.firstExamineTime = res.data.data.firstExamineTime.split(' ')[0] + ''
          }
          if (res.data.data.secondExamineTime) {
            this.secondExamineTime = res.data.data.secondExamineTime.split(' ')[0] + ''
          }
          if (res.data.data.secondExamineReason) {
            this.secondExamineReason = res.data.data.secondExamineReason
          }
          console.log(res)
        }
      })
    },
    eventBack() {
      if(this.opinion == '') {
        Message.error({
          message: '请填写内容!',
          customClass: 'messageClass1',
          center: true
        })
        return
      }
      this.$axios({
        url: 'task/examineTaskSecond',
        method: 'POST',
        data: {
          secondExamineReason: this.opinion,
          secondExamineState: this.exitStateCode,
          sessionId: localStorage.getItem('sessionId'),
          id: this.$route.params.id
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          Message.success({
            message: '退回成功！',
            customClass: 'messageClass1',
            center: true
          })
          this.showPopup = false
          setTimeout(() => {
            this.$router.back(-1)
          }, 2000)
        } else {
          Message.warning({
            message: `${res.data.eventDesc}`,
            customClass: 'messageClass1',
            center: true
          })
        }
      })
    },
    routerBack() {
      this.$router.back(-1)
    },
    eventTitle() {
      this.$prompt('请填写审核意见：', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
        value
      }) => {
        console.log(value)
        if (this.$route.params.state == '1') {
          this.$axios({
            url: 'task/examineTaskFirst',
            method: 'POST',
            data: {
              firstExamineReason: value,
              firstExamineState: 1,
              sessionId: localStorage.getItem('sessionId'),
              id: this.$route.params.id
            },
            transformRequest: transformRequestFn
          }).then((res) => {
            if (res.data.code === 1) {
              Message.success({
                message: '审核成功！',
                customClass: 'messageClass1',
                center: true
              })
              setTimeout(() => {
                this.$router.back(-1)
              }, 2000)
            }else{
              Message.warning({
                message: `${res.data.desc}`,
                customClass: 'messageClass1',
                center: true
              })
            }
          })
        } else if (this.$route.params.state == '2') {
          this.$axios({
            url: 'task/examineTaskSecond',
            method: 'POST',
            data: {
              secondExamineReason: value,
              secondExamineState: 1,
              sessionId: localStorage.getItem('sessionId'),
              id: this.$route.params.id
            },
            transformRequest: transformRequestFn
          }).then((res) => {
            if (res.data.code === 1) {
              Message.success({
                message: '审核成功！',
                customClass: 'messageClass1',
                center: true
              })
              setTimeout(() => {
                this.$router.back(-1)
              }, 2000)
            }else {
              Message.warning({
                message: `${res.data.desc}`,
                customClass: 'messageClass1',
                center: true
              })
            }
          })
        }
      }).catch(() => {});
    },
    selectState(code) {
      this.exitStateCode = code
    },
    togglePopup() {
      if (this.$route.params.state == 1) {
        this.$prompt('请填写退回意见：', ' ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          this.$axios({
            url: 'task/examineTaskFirst',
            method: 'POST',
            data: {
              firstExamineReason: value,
              firstExamineState: 2,
              sessionId: localStorage.getItem('sessionId'),
              id: this.$route.params.id,
            },
            transformRequest: transformRequestFn
          }).then((res) => {
            if (res.data.code === 1) {
              Message.success({
                message: '退回成功！',
                customClass: 'messageClass1',
                center: true
              })
              setTimeout(() => {
                this.$router.back(-1)
              }, 2000)
            }else {
              Message.success({
                message: `${res.data.desc}`,
                customClass: 'messageClass1',
                center: true
              })
            }
          })
        })
      } else if (this.$route.params.state == '2') {
        this.showPopup = !this.showPopup
      }
    },
  }
}
</script>

<style lang="sass" scoped>
  .objectListBox
    display: flex
    align-items: center
    img.logo
      display: inline-block
      width: 48px
      height: 48px
      border-radius: 50%
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      margin-right: 10px
    .objectListBoxName
      flex: 1
      overflow: hidden
      display: flex
      align-items: center
      justify-content: space-between
      .left
        .objectListBoxNameTop
          color: #000
          font-size: 16px
          padding-bottom: 5px
          font-weight: bold
        .objectListBoxNameBottom
          color: #616161
          font-size: 13px
      .objectListBoxNum
        font-weight: bold
        input
          display: inline-block
          width: 60px
          height: 30px
          line-height: 30px
          padding: 5px 15px
          overflow: hidden
          border: none
          border-radius: 5px
          background-color: #ffffff
          color: #010101
          font-size: 17px
          font-weight: bold
          text-align: center
          margin-right: 5px
          &[disabled]
            background-color: #D5D5D5
          &.negative
            color: #FF2727

  .publisher
    position: absolute
    top: 30px
    right: 10px
    i.head-photo
      display: block
      width: 48px
      height: 48px
      margin: 0 auto 15px
      border-radius: 50%
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      border: 1px solid #cccccc
    p.name
      color: #666666
      font-size: 16px

  ul.detail
    list-style-type: none
    color: #727272
    font-weight: bold
    font-size: 15px
    li.item
      padding: 5px 15px
</style>

<style scoped>
.DetailsOfTheTask {
  padding: 13px 10px 19px 5px;
  background-color: #F5F7FC;
  min-height: 800px;
}

.textCen {
  margin-top: 35px;
  text-align: center;
}

.title {
  font-size: 20px;
  font-family: PingFang-SC-Regular;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  padding-left: 18px;
  margin-bottom: 40px;
}

.title span {
  padding-top: 10px;
  display: inline-block;
}

.backBtn {
  width: 80px;
  height: 15px;
  line-height: 3px;
  float: right;
}

.EventBox {
  /* background: rgba(241, 245, 248, 1); */
  border-radius: 4px;
  position: relative;
  margin-bottom: 20px;
  padding: 5px 15px;
  box-sizing: border-box;
  background-color: #F1F5F8;
}

.eventName {
  font-size: 24px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.divBox {
  height: 20px;
}

.time {
  font-size: 14px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(114, 114, 114, 1);
  padding-bottom: 5px;
}

.event {
  font-size: 16px;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-top: 18px;
  padding-left: 10px;
  border-left: 4px solid rgba(124, 113, 203, 1);
}

.eventTips {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(114, 114, 114, 1);
  margin-top: 18px;
}

.eventDesc {
  display: inline-block;
  margin-top: 16px;
  padding: 6px 8px 6px 10px;
  background: rgba(238, 238, 238, 1);
  border-radius: 4px;
  font-size: 714x;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  display: inline-block;
}

.objectList {
  margin-top: 13px;
}

/* .objectListBox {
  padding: 11px 13px;
  border-radius: 5px;
  position: relative;
}

.objectList .logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.objectListBoxName {
  position: absolute;
  left: 70px;
  top: 15px;
}

.objectListBoxNameTop {
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
}

.objectListBoxNameBottom {
  font-size: 13px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(97, 97, 97, 1);
}

.objectList .close {
  position: absolute;
  right: 10px;
  top: 24px;
  width: 27px;
  height: 27px;
}

.objectListBoxNum {
  position: absolute;
  right: 47px;
  top: 20px;
  font-size: 17px;
}

.objectListBoxNum .el-input-number {
  width: 150px;
}

.objectListBoxNum span {
  background: rgba(213, 213, 213, 1);
  border-radius: 1px;
  padding: 5px 13px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(1, 1, 1, 1);
} */

.btn {
  width: 80px;
  height: 15px;
  line-height: 3px;
}

.timeList {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(114, 114, 114, 1);
}

.popup-mark {
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-mark .popup-body {
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  width: 30%;
  background-color: #ffffff;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  padding: 30px;
  border-radius: 5px;
}

.popup-mark .popup-body .title {
  width: 100%;
  text-align: center;
  padding: 0 0 30px;
  font-size: 20px;
  font-weight: bold;
}

.popup-mark .popup-body .select-box {
  width: 100%;
  padding: 0 0 24px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
}

.popup-mark .popup-body .select-box span {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-mark .popup-body .select-box span i.select-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  margin-right: 7px;
  position: relative;
}

.popup-mark .popup-body .select-box span i.select-icon i.active {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #0A8FF6;
}

.popup-mark .popup-body textarea {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #ffffff;
  color: #333333;
  padding: 14px 16px;
  margin-bottom: 40px;
  border: 1px solid #cccccc;
}

.popup-mark .popup-body textarea:placeholder {
  color: #A4A4A4
}

.popup-mark .popup-body .footer {
  width: 100%;
  display: flex;
  justify-content: center;

}

.popup-mark .popup-body .footer button {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: none;
  border-radius: 4px;
}

.popup-mark .popup-body .footer button.cancel {
  background-color: #ffffff;
  border: 1px solid #868686;
  color: #868686;
  margin-right: 28px;
}

.popup-mark .popup-body .footer button.ok {
  background-color: #0A8FF6;
  color: #ffffff;
}
</style>
