<template>
  <div class="Administration">
    <div class="leftBox">
      <ul>
        <li @click="routerGo(item,index)" :class="item.active?'active':''" v-for="(item,index) in list"><img :src=url+item.img>
          <span>{{item.name}}</span>
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
  name: "Administration",
  data() {
    return {
      url: "http://47.107.71.47/bishuiwan",
      list: [
        {
          name: "积分录入",
          img: "/img/bb33.png",
          link: "/WebEntry",
          active: true
        },
        {
          name: "积分审核",
          img: "/img/bb26.png",
          link: "/IntegralAudit",
          active: false
        },
        {
          name: "积分查询",
          img: "/img/bb27.png",
          link: "/integralSelect",
          active: false
        },
        {
          name: "奖扣任务",
          img: "/img/jflr_icon04@2x.png",
          link: "/BuckleTask",
          active: false
        },
        {
          name: "固定积分",
          img: "/img/bb67.png",
          link: "/FixedIntegral",
          active: false
        }
      ]
    };
  },
  methods: {
    routerGo(item, index) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].active = false;
        this.list[0].img = "/img/bb33.png";
        this.list[1].img = "/img/bb26.png";
        this.list[2].img = "/img/bb27.png";
        this.list[3].img = "/img/bb59.png";
        this.list[4].img = "/img/bb67.png";
      }
      console.log(item.img);
      if (index == 0) {
        item.img = "/img/bb56.png";
      } else if (index == 1) {
        item.img = "/img/bb57.png";
      } else if (index == 2) {
        item.img = "/img/bb58.png";
      } else if (index == 3) {
        item.img = "/img/bb34.png";
      } else if (index == 4) {
        item.img = "/img/bb60.png";
      }

      item.active = true;
      this.$router.push(item.link);
    }
  },
  mounted() {
    for (let item of this.list) {
      item.active = false;
      if (this.$route.path == item.link) {
        item.active = true;
      }
    }
    this.list[0].img = "/img/bb56.png";
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.clear {
  clear: both;
}
.Administration {
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
  background-color: rgba(248, 249, 250, 1);
}
</style>
