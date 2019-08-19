<template>
  <!-- 发布任务 -->
  <div class="task">
    <div class="caogao" style="margin-left:26px">
      <el-button type="primary" size="small" @click="caogao()">草稿箱</el-button>
    </div>
    <!-- <div class="header_title mt">
      <div class="header_title_left">编辑任务</div>
      <div class="header_title_right">
        <el-button type="primary" plain size="small">返回</el-button>
      </div>
    </div> -->
    <div class="contentDetail mt">
      <el-form :inline="true">
        <div class="content_header" style="margin-left:20px">
          <i class="el-icon-edit-outline"></i>
          填写发布任务
        </div>
         <el-row class="mt">
           <el-col :span="8">
             <el-form-item label="事件主题">
              <el-input placeholder="积分任务" size="small" style="width:200px"></el-input>
            </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="事件类型">
              <el-select v-model="value" placeholder="任务类型" size='small' style="width:200px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
         </el-row>
         <el-row class="mt" >
           <el-col :span="8">
             <el-form-item label="终  审 人">
              <el-select v-model="value" placeholder="任务类型" size='small' style="width:200px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="5">
             <el-form-item label="完成奖分">
              <el-input placeholder="" size="small" style="width:40px"></el-input>&nbsp;分
            </el-form-item>
           </el-col>
           <el-col :span="5">
             <el-form-item label="未完成扣分" >
              <el-input  size="small" style="width:40px"></el-input> &nbsp;分
            </el-form-item>
           </el-col>
         </el-row>
         <el-row class="mt">
           <el-col :span="8">
             <el-form-item label="备      注">
              <el-input placeholder="备      注" size="small" style="width:200px"></el-input>
            </el-form-item>
           </el-col>
         </el-row>
         <el-row  class="mt">
           <el-col :span="8">
             <el-form-item label="任务内容">
             <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容">
          </el-input>
           </el-form-item>
           </el-col>
         </el-row>
         <el-row class="mt">
           <el-col :span="8">
             <el-form-item label=" 推送范围">
              <el-select v-model="example0" placeholder="任务类型" size='small' style="width:200px">
                <el-option
                  v-for="item in optionsa"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="数量上限">
              <el-input placeholder="积分任务" size="small" style="width:200px"></el-input>
            </el-form-item>
           </el-col>
         </el-row>
         <!-- 设置推送范围 -->
         <el-row > 
           <el-col :span="4">
             <el-form-item id="canSee" style="display:none">
              <el-radio v-model="radio" label="1" class="font" >设置可见范围</el-radio>
            </el-form-item>
           </el-col>
         </el-row>

         <el-row >
           <div class="can" id="canSee1" style="display:none">
             <el-col :span="8" >
             <el-form-item > 
               <div class="checkBox" >
                 <div class="checkBox_left">房务部</div>
                 <div class="checkBox_right">
                  X
                 </div>
             </div>
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item>
               <div class="checkBox">
                 <div class="checkBox_left">房务部</div>
                 <div class="checkBox_right">
                  X
                 </div>
             </div>
             </el-form-item>
           </el-col>
           </div>
         </el-row>

         <el-row>
           <el-col :span="8">
              <el-form-item label="选择月份"  style="margin-left:10px;">
              <el-date-picker type="date" placeholder="选择日期"  size="small" style="width:200px"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期"  style="margin-left:10px;">
              <el-date-picker type="date" placeholder="选择日期"  size="small" style="width:200px"></el-date-picker>
            </el-form-item>
            </el-col>
         </el-row>
      </el-form>
      <!-- <el-button type="primary" size="small">发布</el-button>
      <el-button  size="small">保存</el-button> -->
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>一</span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      >
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span> -->
      <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value4"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['Source', 'Target']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
    </el-transfer>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    const generateData = _ => {
      const data = []
      const old = ['diyi', 'ii', 'ijj']
      for (let i = 0; i <= old.length; i++) {
        data.push({
          key: i,
          label: old[i]
          // label: `备选项 ${i}`
          // disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value3: [1],
      value4: [1],
      renderFunc (h, option) {
        return <span>{ option.key } - { option.label }</span>
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      optionsa: [{
        value: 1,
        label: '部分可见'
      }, {
        value: 2,
        label: '定向推送'
      }],
      value: '',
      valuetuisong: 10,
      radio: true,
      dialogVisible: false,
      dialogVisible1: false,
      example0: ''
    }
  },
  methods: {
    caogao () {
      console.log(1)

      this.$router.push('/releaseTask')
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  },
  computed: {
    // openTui: function () {
    //   if (this.optionsa[0].value === 1) {
    //     // return this.dialogVisible = true
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  watch: {
    example0 (curVal, oldVal) {
      console.log(curVal, oldVal)
      if (curVal === 1) {
        this.dialogVisible = true
        // console.log(this.$refs.canSee,'可见');
        console.log(document.getElementById('canSee'));
        document.getElementById('canSee').style.display='block'
        document.getElementById('canSee1').style.display='block'
      } else if (curVal === 2) {
        this.dialogVisible1 = true
        document.getElementById('canSee').style.display='none'
        document.getElementById('canSee1').style.display='none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
  }
  .task {
    background-color: #F2F9FF;
    padding: 15px;
    width: 100%;
    min-height: 750px
  }
  .caogao {
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
  }
  .header_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .header_title_left {
    // width:60px;
    height:20px;
    font-size:20px;
    font-family:PingFang-SC-Regular;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:0px;
  }
  .content_header {
    width:160px;
    height:20px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(21,21,21,1);
  }
  .mt {
    margin-top: 15px;
  }
  .font {
    width:107px;
  height:18px;
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(6,147,255,1);
  line-height:0px;
  }
  .checkBox {
    width:217px;
    height:38px;
    // background:rgba(97,97,97,1);
    // background-color: red;
    border: 1px solid black;
    border-radius:5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing:  border-box;
    padding: 0 10px;
  }
  .checkBox_right {
    width:27px;
    height:27px;
    line-height: 27px;
    font-size: 20px;
    vertical-align: middle;
    color: #979797;
    border-radius:50%;
    border: 1px solid black;
  }
</style>
