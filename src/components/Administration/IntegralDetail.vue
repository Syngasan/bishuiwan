<template>
  <div class="IntegralDetail">
  	<el-row class="IntegralAuditBox">
  	  <el-col :span="14" class="textl">{{forMonth}}月固定积分明细</el-col>
      <el-col :span="10" class="textR"><el-button plain type="primary" @click="routerBack" size="small">返回</el-button></el-col>
      <el-col :span="10" style="margin-top:10px">姓名或工号：<el-input v-model="keyword" class="EventTheme" placeholder="请输入姓名或工号" size="small"></el-input></el-col>
      <el-col :span="10" style="margin-top:10px">部门名称：
        <el-select v-model="AllConcatTypeId" class="EventTheme" placeholder="请选择部门" size="small">
          <el-option :key="index" :label="item.concatName" :value="item.id" v-for="(item,index) in AllConcatType"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" style="margin-top:10px">
      	<el-button type="primary" @click="getList" size="small">查询</el-button>
      	<el-button type="primary" @click="dialogVisible=true" size="small">结算</el-button>
      </el-col>
    </el-row>
    <!-- <el-table :data="tableData" stripe>
      <el-table-column prop="businessName" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="createTime" label="结算月份" align="center"></el-table-column>
      <el-table-column prop="rewardTaskId" label="结算状态" align="center">
        <template  slot-scope="scope">
          <span v-if="scope.row.rewardTaskId == 0">未结算</span>
          <span v-else-if="scope.row.rewardTaskId == 1">已结算</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateUser" label="更新人" align="center"></el-table-column>
      <el-table-column prop="createTime" label="更新日期" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="操作" align="center"></el-table-column>
    </el-table> -->
        <table>
          <tr class="header">
            <th>序号</th>
            <th>姓名</th>
            <th>工号</th>
            <th>部门</th>
            <th v-for="(item, index) in labelList" :key="index">{{item.name}}</th>
            <th>固定积分合计</th>
          </tr>
          <tr class="body" v-for="(item, index) in tableData" :key="index">
            <td>{{item.userId}}</td>
            <td>{{item.realName}}</td>
            <td>{{item.number}}</td>
            <td>{{item.companyName}}</td>
            <td v-for="(steadyItem, steadyIndex) in item.steadyScore" :key="steadyIndex">{{steadyItem.name}} ({{steadyItem.score}})</td>
            <td>{{item.total}}</td>
          </tr>
        </table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next,  jumper" :total="total">
    </el-pagination>
    <el-dialog :visible.sync="dialogVisible" width="20%" :center='true'>
      选 择 月 份：<el-date-picker class="EventTheme" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择月份" v-model="dateMonth"></el-date-picker>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="pushN">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { transformRequestFn } from '@/utils/transformRequestFn/transformRequestFn'
export default {
  name: 'IntegralDetail',
  data () {
    return {
      forMonth: '',
      dateMonth: '',
      dialogVisible: false,
      keyword: '',
      AllConcatType:[],
      AllConcatTypeId: '',
      total: 0,
      pageNumber: 1,
      pageSize: 10,
    	tableData: [],
    	options: [],
      value: '',
      labelList: [],
    }
  },
  created () {
    console.log(this.$route.query.date);
    this.forMonth = this.$route.query.date.split('-')[1]
    
    this.forMonth = this.forMonth.split('')
    if (this.forMonth[0]==0) {
      this.forMonth = this.forMonth[1]
    } else {
      this.forMonth = this.forMonth[0]+this.forMonth[1]
    }
    console.log(this.forMonth);
    
    this.getAllConcatType()
    this.getList()
  },
  methods: {
    pushN() {
      if (this.dateMonth == '' || this.dateMonth == null) {
        Message.error({
    message: '請選擇月份',
    customClass: 'messageClass1',
    center: true
  })
        return false
      }
      this.$axios({
        url: 'steady/settlement',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          date: this.month + '-01'
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    routerBack () {
      this.$router.back(-1)
    },
    getAllConcatType () {
      this.$axios({
        url: 'department/getAllConcatName',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.AllConcatType = res.data.data
        }
      })
    },
    getList () {
      this.$axios({
        url: 'steady/pageSteadyDetail',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          date: this.$route.query.date,
          departmentId: this.AllConcatTypeId,
          keyword: this.keyword
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow
          this.tableData = res.data.data.list
                    this.labelList = res.data.data.list[0].label
                    this.tableData.forEach((item, index) => {
                      item.steadyScore.sort(function(a, b) {
                        return a.steadyId - b.steadyId
                      })
                      console.log(item.steadyScore);
                    })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.IntegralAuditBox {
  margin-top: 20px;
  padding: 0px 19px;
}
.textl{
  font-size:20px;
  font-family:PingFang-SC-Regular;
  font-weight:bold;	
  color:rgba(0,0,0,1);
  line-height:24px;
}
.textR {
  text-align: right;
}
.EventTheme {
  width: 290px;
  height: 46px;
}
.el-pagination {
  text-align: center;
  margin-top: 19px;
}
table {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  table-layout: fixed;
}
tr {
  width: 100%;
  color: #333333;
  text-align: center;
}

tr.header {
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: #ffffff;
  background-color: rgba(10,143,246,1);
}

tr.header th {
  flex: 1;
  height: 100%;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

tr.body {
  padding: 20px 0;
  display: flex;
  align-items: center;
  background-color: rgba(10,143,246,1);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  background-color: #ffffff;
}

tr.body:hover {
  background-color: rgba(245, 247, 250, 1);
}

tr.body:nth-of-type(2n) {
  background-color: rgba(250, 250, 250, 1);
}

tr td {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: normal;
  padding: 5px 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
