<template>
  <div class="Bulletin">
    <div class="BulletinList">
      <div class="BulletinListNavigation">
        <router-link to="/home">首页</router-link> ->
        <span class="colorB">公告列表</span>
      </div>
      <div class="BulletinListBox" v-for="(item,index) in list" :key="index">

        <img :src="item.image" class="imgI">

        <div class="listBox">
          <div class="title">{{item.title}}</div>
          <div class="time">发布时间：{{item.createTime}}</div>
          <div class="contain" v-html="item.content"></div>
          <div class="list" @click="routerGoBulletinListDetails(item.id)">详情</div>
        </div>

      </div>
      <div class="paging">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
import { page, getPage, pageNoImage } from "@/utils/axios/axios";

export default {
  name: "BulletinList",
  data() {
    return {
      pageSizes: [10, 100, 500, 1000],
      currentPage: 1,
      pageSize: 10,
      total: 10,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    routerGoBulletinListDetails(value) {
      console.log("090");

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: value
      };
      // this.$router.push('/BulletinListDetails/' + id)
      getPage(this.$qs.stringify(params)).then(res => {
        if (res.code === 1) {
          // this.$router.push({path:'/BulletinListDetails',query:params})
          this.$router.push({ path: "/BulletinListDetails", query: params });
        }
      });
    },
    getList() {
      this.$axios({
        url: "notice/pageNoImage",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          pageSize: this.pageSize,
          pageNumber: this.currentPage
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.total = res.data.data.totalRow;
          this.currentPage = res.data.data.pageNumber;
          this.list = res.data.data.list;
          for (let item of this.list) {
            item.image = "http://47.107.71.47/bishuiwan" + item.image;
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
.list {
  color: rgb(121, 185, 248);
  cursor: pointer;
}
.list a {
  color: rgba(10, 143, 246, 1);
  text-decoration: none;
}
.Bulletin {
  width: 100%;
  
  /* min-height: 100%; */
  background-color: #f8fbfe !important;
}
.BulletinList {
  width: 1200px;
  display: inline-block;
  margin: 30px 0px 0px 0px;
  background-color: #f8fbfe !important;
}
.BulletinListNavigation {
  text-align: left;
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(28, 28, 28, 1);
  line-height: 26px;
}
.colorB {
  color: rgb(131, 196, 249);
}
.BulletinListBox {
  margin-bottom: 13px;
  padding: 34px 35px 37px 35px;
  box-sizing: border-box;
  width: 100%;
  height: 240px;
  background-color: #ffffff;
  display: flex;
  /* justify-content: ; */
  overflow: hidden;
}
.BulletinListBox img {
  width: 252px;
  /* height: 169px; */
  /* margin-top: 10px; */
  margin-right: 50px;
}
.listBox {
  text-align: left;
}
.title {
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(30, 30, 30, 1);
  line-height: 43px;
}
.time {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(169, 169, 169, 1);
  line-height: 22px;
}
.contain {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(110, 110, 110, 1);
  /* line-height:26px; */
  height: 67px;
  overflow: hidden;
  margin-top: 24px;
}
.Box {
  /* margin-bottom: 13px; */
  width: 100%;
  height: 240px;
}
/* .paging{
  margin-top: 41px;
} */
.imgI {
  width: 252px !important;
  /* height: 169px; */
}
</style>
