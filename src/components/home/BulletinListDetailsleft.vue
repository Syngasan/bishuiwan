<template>
  <div class="BulletinList">
        <div class="leftBox">
          <div class="title">{{$store.state.info.title}}</div>
          <div class="time">发布时间：{{$store.state.info.createTime}}</div>
          <!-- <div>{{list.content}}</div> -->
          <div class="contain" v-html="$store.state.info.content">
          </div>
        </div>
        <div class="clear"></div>
 </div>
</template>

<script>
import { transformRequestFn } from '@/utils/transformRequestFn/transformRequestFn'
import {
  getPage
} from "@/utils/axios/axios";
// import {mapState} from 'vuex'
export default {
  name: 'BulletinListDetails',
  data () {
    return {
      // list: {},
      moreList: []
    }
  },
  mounted () {
    
  },
  created() {
    this.getList(this.$route.query.id)
    this.getMoreList()
  },
  // computed: 
  //   mapState({
  //     // list: state => state.info
  //     lists:function(state){
  //              return state.info;
  //           }
  //   })
    // computed: {
    //   ...mapState({
    //     info
    //   })
    // }
  methods: {
    getList (id) {
      this.$axios({
        url: 'notice/get',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          id: id
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.$store.state.info = res.data.data
        }
      })
    },
    getMoreList () {
      this.$axios({
        url: 'notice/page',
        method: 'POST',
        data: {
          sessionId: localStorage.getItem('sessionId'),
          pageSize: 10,
          pageNumber: 1
        },
        transformRequest: transformRequestFn
      }).then((res) => {
        if (res.data.code === 1) {
          this.moreList = res.data.data.list
          for (let item of this.moreList ) {
            item.image = 'http://47.107.71.47/bishuiwan'+item.image
          }
          console.log(res)
        }
      })
    },
    toDetail(id) {
      let params = {
        sessionId: localStorage.getItem("sessionId"),
        id:id
      }
      getPage(this.$qs.stringify(params)).then(res=>{
        if (res.code ===1) {
          this.$router.push({path:'/BulletinListDetails',query:params})
        }
      })
    }
  }
}
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
  /* display: inline-block */
}
.BulletinListDetails{
  width: 1200px;
  display: inline-block;
  margin: 30px auto 0 auto;
}
.BulletinListNavigation {
  text-align: left;
  font-size:13px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(28,28,28,1);
  line-height:26px;
}
.colorB {
  color: rgb(131,196,249);
}
.leftBox {
  width: 850px;
  min-height: 625px;
  display: inline-block;
  float: left;
  margin-top:22px;
  padding: 31px 18px 20px 18px;
  box-sizing: border-box;
  text-align: left;
  background-color: white;
}
.rightBox {
  width: 366px;
  display: inline-block;
  float: right;
  margin-top: 22px;
  margin-left: 20px;
  padding: 24px 19px 20px 21px;
  text-align: left;
  background-color: white;
}
.title {
  font-size:22px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(23,25,25,1);
  line-height:83px;
  margin-top: -31px
}
.time {
  font-size:13px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(169,169,169,1);
  line-height:83px;
  margin-top:-47px;
}
.contain {
  font-size:15px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(110,110,110,1);
  line-height:28px;
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
  font-size:18px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(23,25,25,1);
  line-height:28px;
  padding-left: 10px;
  border-left: 2px solid blue;
}
.more {
  font-size:16px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(10,143,246,1);
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
  width:326px;
  height:185px;
  background:rgba(0,0,0,1);
  opacity:0.2;
}
.moreListBox {
  margin-top: 24px;
  padding-bottom: 19px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.moreListBox img{
  width: 96px;
  height: 72px;
  display: inline-block;
}
.moreTitle {
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(67,68,68,1);
  line-height:22px;
}
.moreTime{
  font-size:12px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(118,118,118,1);
  line-height:33px;
}
</style>
