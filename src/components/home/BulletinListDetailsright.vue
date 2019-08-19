<template>
  <div class="rightBox">
    <div class="rightBoxTop">
      <span class="moreBulletin">更多公告</span>
      <router-link to="/BulletinList">
        <span class="more">更多 ></span>
      </router-link>
    </div>
    <!-- <div > -->
      <img :src="imgjjj" alt="" class="imgJJJ">
    <!-- </div> -->
    <div class="moreListBox" v-for="(item,index) in moreList" :key="index" @click="toDetail(item.id)">
      <el-row>
        <el-col :span="8"><img :src="item.image"></el-col>
        <el-col :span="16">
          <div class="moreTitle">{{item.title}}</div>
          <div class="moreTime">发布时间：{{item.createTime}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getPage } from "@/utils/axios/axios";
import { transformRequestFn } from "@/utils/transformRequestFn/transformRequestFn";
export default {
  name: "BulletinListDetailsright",
  data() {
    return {
      moreList: [],
      imgjjj :''
    };
  },
  mounted() {
    this.getMoreList();
    this.jjj()
  },
  methods: {
    getMoreList() {
      this.$axios({
        url: "notice/page",
        method: "POST",
        data: {
          sessionId: localStorage.getItem("sessionId"),
          pageSize: 10,
          pageNumber: 1
        },
        transformRequest: transformRequestFn
      }).then(res => {
        if (res.data.code === 1) {
          this.moreList = res.data.data.list;
          for (let item of this.moreList) {
            item.image = "http://47.107.71.47/bishuiwan" + item.image;
          }
          console.log(res);
        }
      });
    },
    toDetail(id) {
      console.log(id);

      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: id
      };
      getPage(this.$qs.stringify(params)).then(res => {
        // if (res.code ===1) {
        //   this.$router.push({path:'/BulletinListDetailsleft',query:params})
        // }
        this.$store.commit("getInfo", res.data);
      });
    },
    jjj() {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id: this.$route.query.id
      };
      getPage(this.$qs.stringify(params)).then(res => {
        if (res.code ===1) {
          console.log(res.data.image);
          this.imgjjj = "http://47.107.71.47/bishuiwan" + res.data.image
        }
        // this.$store.commit("getInfo", res.data);
      });
    }
  }
};
</script>
<style scoped>
.clear {
  clear: both;
}
.BulletinList {
  width: 100%;
  height: auto;
  min-height: 100%;
  background-color: #f8fbfe !important;
}
.BulletinListDetails {
  width: 1200px;
  display: inline-block;
  margin: 30px auto 0 auto;
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
.leftBox {
  width: 710px;
  display: inline-block;
  float: left;
  margin-top: 22px;
  padding: 31px 18px 20px 18px;
  text-align: left;
  background-color: white;
}
.rightBox {
  width: 366px;
  display: inline-block;
  float: right;
  margin-top: 22px;
  margin-left: 20px;
  /* padding: 24px 19px 20px 21px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background-color: white;
}
.title {
  font-size: 22px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(23, 25, 25, 1);
  line-height: 83px;
  margin-top: -31px;
}
.time {
  font-size: 13px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(169, 169, 169, 1);
  line-height: 83px;
  margin-top: -47px;
}
.contain {
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(110, 110, 110, 1);
  line-height: 28px;
}
.contain img {
  width: 710px;
  height: 452px;
}
.rightBoxTop {
  padding-bottom: 19px;
  border-bottom: 1px dashed #cccccc;
}
.moreBulletin {
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(23, 25, 25, 1);
  line-height: 28px;
  padding-left: 10px;
  border-left: 2px solid blue;
}
.more {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(10, 143, 246, 1);
  float: right;
}
.rightImgBox {
  width: 100%;
  text-align: center;
  margin-top: 19px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.rightImgBox img {
  width: 326px;
  height: 185px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
}
.moreListBox {
  margin-top: 24px;
  padding-bottom: 19px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.moreListBox img {
  width: 96px;
  height: 72px;
  display: inline-block;
}
.moreTitle {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(67, 68, 68, 1);
  line-height: 22px;
}
.moreTime {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  line-height: 33px;
}
.imgJJJ {
  width: 326px;
  height: 185px;
  /* border: 1px solid black; */
  margin: 10px auto;
  display: inline-block;
}
</style>
