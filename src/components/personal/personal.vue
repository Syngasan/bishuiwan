<template>
  <div class="personal">
    <div class="leftBox">
      <ul>
        <!-- <li @click="routerGo(item)" :class="item.active?'active':''" v-for="(item,index) in list"><img :src="item.img"><span>{{item.name}}</span></li> -->
        <li v-for="(item,index) in list" @click="routerGo(item,index)" :class="item.active?'active':''">
          <!-- <router-link :to="item.link" :class="[currentLink == item.baseLink && !isCurrentLink && 'linkActive']"> -->
          <img :src=url+item.img>
          <span>{{item.name}}</span>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <router-view />
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      url:'http://47.107.71.47/bishuiwan',
      list: [
        {
          name: "我的积分",
          img: "/img/bb66.png",
          link: "/personal/MyPoints/MyPoints1",
          active: true
        },
        {
          name: "奖扣任务",
          img: "/img/bb49.png",
          link: "/personal/PersonalAwardDeductionTask",
          active: false
        },
        {
          name: "奖扣明细",
          img: "/img/bb50.png",
          link: "/personal/PersonalAwardDeductionDetails",
          active: false
        },
        {
          name: "我的资料",
          img: "/img/bb51.png",
          link: "/personal/MyInformation",
          active: false
        }
      ],
      path: "",
      currentLink: "",
      isCurrentLink: false
    };
  },
  methods: {
    routerGo(item, index) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].active = false;
        this.list[0].img = "/img/bb66.png";
        this.list[1].img = "/img/bb49.png";
        this.list[2].img = "/img/bb50.png";
        this.list[3].img = "/img/bb51.png";
      }
      if (index == 0) {
        item.img = "/img/bb48.png";
      } else if (index == 1) {
        item.img = "/img/bb52.png";
      } else if (index == 2) {
        item.img = "/img/bb53.png";
      } else if (index == 3) {
        item.img = "/img/bb54.png";
      }
      item.active = true;
      this.$router.push(item.link);
    },
    setCurrentLink() {
      this.isCurrentLink = true;
    }
  },
  mounted() {
    for (let item of this.list) {
      item.active = false;
      if (this.$route.path == item.link) {
        item.active = true;
      }
    }
    this.list[0].img = "/img/bb48.png";
    let currentLink = this.$route.path;
    console.log(currentLink, "子层路由");
    let lastPath = currentLink.split("/")[currentLink.split("/").length - 1];
    console.log(lastPath);
    if (lastPath == "MyPoints1" ||
      lastPath == "AccumulativeIntegral" ||
      lastPath == "IntegralTrend"||
      lastPath == 'RankingTrend') {
      this.list[0].active = true;
      // this.list[0].img = ''
      this.list[0].img = "/img/bb48.png";
    } else if (lastPath == 'PersonalAwardDeductionTask') {
      this.list[1].active = true;
      this.list[0].active = false;
      this.list[1].img = '/img/bb52.png'
      this.list[0].img = "/img/bb66.png";
    } else if (lastPath == "PersonalAwardDeductionDetails") {
      this.list[2].active = true;
      this.list[0].active = false;
      this.list[2].img = '/img/bb53.png'
      this.list[0].img = "/img/bb66.png";
    } else if (lastPath == "MyInformation" ) {
      this.list[3].active = true;
      this.list[0].active = false;
      this.list[3].img = '/img/bb54.png'
      this.list[0].img = "/img/bb66.png";
    }
  }
};
</script>

<style scoped>
.linkActive {
  color: #0592ff;
  background-color: #e9edf6;
}
.router-link-active {
  color: #0592ff;
  background-color: #e9edf6;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.clear {
  clear: both;
}
.personal {
  width: 1200px;
  display: inline-block;
  margin: 30px auto 0 auto;
}
.leftBox {
  width: 190px;
  height: 676px;
  display: inline-block;
  float: left;
  text-align: left;
  background-color: #e9edf6;
}
.leftBox ul li {
  padding: 28px 42px 28px 43px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #000;
  line-height: 0px;
  display: tabel-cell;
  vertical-align: middle;
  position: relative;
  background: #e9edf6;
  border-left: 2px solid rgba(245, 247, 252, 1);
  border-bottom: 1px solid #e9edf6;
  border-top: 1px solid #e9edf6;
  cursor: pointer;
}
.leftBox ul li span {
  position: absolute;
  top: 40px;
  left: 80px;
}
.leftBox ul li img {
  /* width: 28px;
  height: 24px; */
}
.leftBox ul .active {
  background: rgba(255, 255, 255, 1) !important;
  border-left: 4px solid #0a8ff6 !important;
  color: rgba(10, 143, 246, 1);
}
.rightBox {
  width: 980px;
  display: inline-block;
  float: right;
  text-align: left;
  background-color: #f2f9ff;
}
</style>