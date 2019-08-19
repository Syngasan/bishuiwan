<template>
  <div class="EventLibrary">
    <div class="EventLibraryBox">
      <div class="EventLibraryBoxSelect">
        <el-select v-model="eventTypeId" placeholder="请选择">
        <!-- <el-cascader placeholder="全部" v-model="eventTypeId" :options="options"filterable change-on-select class="EventTheme"> -->
          <el-option :key="item.name" :label="item.name" :value="item.id" v-for="(item,index) in eventType"></el-option>
        <!-- </el-cascader>  -->
        </el-select>
        <el-input class="searchInput" v-model="keyword" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="getList">搜索</el-button>
        <router-link to="/WebEntry"><el-button plain>返回</el-button></router-link>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="eventTypeId" label="序号" align="center"></el-table-column>
      <el-table-column prop="content" label="事件内容" align="center">
        <template slot-scope="scope">
            <router-link :to="'/DetailsOfTheEvent/'+scope.row.id+'/1'" class="EventTitle">{{scope.row.content}}</router-link>
          </template>
      </el-table-column>
      <el-table-column prop="value" label="分值" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
            <router-link to="/WebEntry"><el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">确认选择</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { transformRequestFn } from '@/utils/transformRequestFn/transformRequestFn'
export default {
  name: 'EventLibrary',
  data () {
    return {
      options:[],
      address: '',
      keyword: '',
      eventType: [],
      eventTypeId: [],
      tableData: [],
      pageNumber: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getList()
    this.getEventType()
  },
  methods: {
    getEventType () {
      this.$axios({
        url: 'eventtype/list',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId')
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.eventType = res.data.data
        }
      })
    },
     getList () {
      this.$axios({
        url: 'eventlibrary/getEventLibrary',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          eventTypeId: this.eventTypeId,
          keyword: this.keyword,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow
          this.tableData = res.data.data.list
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
.EventLibraryBox {
  padding: 26px 0 0 0;
  background:rgba(242,249,255,1);
  border-radius:5px 5px 0px 0px;
}
.EventLibraryBoxSelect {
  padding: 0 18px;
}
.searchInput {
  width: 430px;
  height: 46px;
}
.el-table {
  margin-top: 37px;
}
.el-pagination {
  margin-top: 43px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
