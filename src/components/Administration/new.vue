<template>
  <div class="WebEntry">
    <ul class="navTitle">
      <li class="active"><router-link to="/WebEntry">网页录入</router-link></li>
      <li><router-link to="/tableEntry">表格录入</router-link></li>
      <li><router-link to="/Submission">已提交</router-link></li>
      <li><router-link to="/drafts">草稿箱</router-link></li>
    </ul>
    <div class="clear"></div>
    <div class="Entry">
      <div class="EntryTitle"><img src="./img/jflr_icon06@3x.png"><span>填写事项</span></div>
      <el-form ref="EntryForm" :inline="true" :model="EventForm" label-width="100%">
        <el-col :span="12">
          <el-form-item label="事件主题">
            <el-input v-model="EventForm.dorder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="初审人">
            <el-cascader :options="options" filterable placeholder="请输入 \ 选择" v-model="EventForm.selectedOptions"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="奖扣日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="EventForm.date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终审人">
            <el-cascader :options="options1" filterable placeholder="请输入 \ 选择" v-model="EventForm.selectedOptions1"></el-cascader>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="clear"></div>
      <div class="EntryTitle"><img src="./img/jflr_icon07@3x.png"><span>填写事件</span></div>
      <template v-for="(item,index) in event">
        <div class="EntryEvent"><img src="./img/jflr_icon08@3x.png"><span>事件{{index+1}}</span><router-link to="/EventLibrary"><el-button type="primary">事件库</el-button></router-link></div>
        <el-form ref="EventForm" :inline="true" :model="form" label-width="100%">
          <el-col :span="24">
            <el-form-item label="事件类型">
              <el-select v-model="form[index].eventTypeId" placeholder="请选择">
                <el-option :key="this" :label="item.name" :value="item.id" v-for="(item,index) in eventList"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备    注">
              <el-input  placeholder="选填" v-model="form[index].remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="事件内容">
              <el-input type="textarea" :rows="4" placeholder="请输入事件内容" v-model="form[index].content"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div>奖扣对象</div>
        <el-row>
          <el-col :span="12" class="objectList" v-for="(items,indexs) in form[index].jsonData">
            <div class="objectListBox">
              <img class="logo" src="./img/u=1752349347,1084259068&fm=27&gp=0.jpg">
              <div class="objectListBoxName">
                <div class="objectListBoxNameTop">{{items.name}}</div>
                <div class="objectListBoxNameBottom">{{items.department}}</div>
              </div>
              <div class="objectListBoxNum"><el-input-number v-model="items.value" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>分</div>
              <img class="close" src="./img/jkdx_close@3x.png">
            </div>
          </el-col>
        </el-row>
        <div class="clear"></div>
        <div class="addEntry" @click="dialogVisible=true"><img src="./img/jkdx_add@3x.png"><span>添加奖扣对象</span></div>
      </template>
      <div class="clear"></div>

      <div class="addEntry backgroundB" @click="addEvent"><img src="./img/jkdx_add@3x.png"><span>添加事件</span></div>
      <div class="forBtn">
        <el-button type="primary">保存</el-button>
        <el-button plain @click="dialogMessageVisible=true">提交</el-button>
      </div>
    </div>



    <el-dialog title="添加成员" :visible.sync="dialogVisible" width="48%">
      <el-transfer v-model="value1" :data="data"></el-transfer>
    </el-dialog>

   <!--
    <el-dialog title=" " :visible.sync="dialogMessageVisible" center width="30%">
      <mt-cell title="提交失败">
        <img slot="icon" src="./img/fail_icon@2x.png" style="margin-right: 10px;" width="24" height="24">
      </mt-cell>
      <div class="MessageCode">事件1与系统中已有事件存在重复项，请检查<p>修改后重新提交！</p></div>
    </el-dialog> -->
  </div>
</template>

<script>
import { transformRequestFn } from '@/utils/transformRequestFn/transformRequestFn'
export default {
  name: 'WebEntry',
  data () {
    return {
      event: 1,
      radio2: 1,
      dialogEventVisible: false,
      dialogMessageVisible: false,
      form: [
        {
          eventTypeId:'',
          remark:'',
          content:'',
          jsonData:[]
        }
      ],
      EventForm: {
        dorder: '',
        selectedOptions: '',
        date: '',
        selectedOptions1: ''
      },
      num1: 1,
      num2: 1,
      dialogVisible: false,
      data: [
        {key: 1,label: '昵称昵称'},
        {key: 2,label: '昵称昵称'},
        {key: 3,label: '昵称昵称'},
        {key: 4,label: '昵称昵称'},
        {key: 5,label: '昵称昵称'},
        {key: 6,label: '昵称昵称'}
      ],
      value1: [1, 4],
      options: [],
      selectedOptions: [],
      options1: [],
      selectedOptions1: [],
      eventList: []
    }
  },
  created () {
    this.getFirstUserByName()
    this.getFirstUserByName1()
    this.getFirstUserByName2()
  },
  methods: {
    getFirstUserByName () {
      this.$axios({
        url: 'department/getDepartmentFirst',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          for (var i=0;i<res.data.data.length;i++) {
            this.options.push({value: res.data.data[i].businessId, label: res.data.data[i].name})
          }
        }
      })
    },
    getFirstUserByName1 () {
      this.$axios({
        url: 'user/getExamineUserByBusiness',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          for (var i=0;i<res.data.data.length;i++) {
            this.options1.push({value: res.data.data[i].businessId, label: res.data.data[i].nick})
          }
        }
      })
    },
    getFirstUserByName2 () {
      this.$axios({
        url: 'eventtype/getEventTypeName',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.eventList = res.data.data
        }
      })
    },
    handleChange(value) {
      console.log(value)
    },
    addEvent() {
      this.event += 1
    }
  }
}
</script>

<style scoped>
.backgroundB {
  background-color: #f1f5f8;
  margin-right: -10px;
  margin-left: -10px;
  padding: 0 10px;
  height: 60px;
  line-height: 75px;
}
.WebEntry {
  min-height: 1000px;
}
.el-radio {
  width: 100%;
  margin-left: 10px !important;
  margin-bottom: 10px;
  font-size: 24px;
}
.mint-cell {
  text-align: center;
}
.MessageTips {
  font-size:20px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(1,1,1,1);
  text-align: center;
}
.MessageTips img{
  top: 10px
}
.MessageCode {
  font-size: 16px;
  text-align: center;
  color:rgba(1,1,1,0.7);
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.navTitle {
  display: inline-block;
  width: 100%;
  background-color: white;
  padding-top: 12px;
}
.navTitle li{
  float: left;
  padding: 1px 30px 1px 30px;
  margin-bottom: 13px;
  border-right: 1px solid #ABABAB;
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(38,45,57,1);
}
.navTitle a{
  text-decoration:none;
  color:rgba(21,21,21,1);
}
.navTitle .active a{
  color:rgba(0,131,255,1) !important;

}
.Entry {
  padding: 16px;
  background:rgba(248,249,250,1);
}
.EntryTitle {
  position: relative;
  margin-bottom: 19px;
}
.EntryTitle img{
  width: 28px;
  height: 23px;
}
.EntryTitle span {
  font-size:20px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(21,21,21,1);
  position: absolute;
  top: -2px;
  left: 36px;
}
.EntryEvent {
  font-size:20px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(21,21,21,1);
  position: relative;
  margin-bottom: 19px;
}
.EntryEvent img {
  width: 28px;
  height: 23px;
}
.EntryEvent span {
  margin-left: 5px;
}
.EntryEvent button {
  margin-left: 25px;
}
.objectList {
  margin-top: 13px;
}
.objectListBox {
 /* width: 386px;
  height: 50px;*/
  width: 80%;
  padding: 11px 13px;
  background:rgba(237,242,246,1);
  border-radius:5px;
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
  font-size:16px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(0,0,0,1);
}
.objectListBoxNameBottom {
  font-size:13px;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(97,97,97,1);
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
  right:47px;
  top: 15px;
  font-size:17px;
}
.objectListBoxNum .el-input-number {
  width: 150px;
}
.addEntry {
  margin-top: 30px;
  font-size:24px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(12,130,221,1)!important;
  position: relative;
}
.addEntry span {
  position: absolute;
  left: 50px;
  top: -7px;
  cursor: pointer;
}
.addEntry img{
  width: 32px;
  height: 32px;
  margin-top: -20px;
  margin-right: 10px;
}
.forBtn {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.el-textarea {
  width: 800px;
}

</style>
