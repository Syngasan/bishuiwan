<template>
  <div class="personal">
    <div class="leftBox">
      <ul>
        <li v-for="(item,index) in list" @click="routerGo(item,index)" :key="index" :class="item.active?'active':''">
          <!-- <router-link :to="item.link" :class="[currentLink == item.baseLink && !isCurrentLink && 'linkActive']" style="color:#000"> -->
            <img :src=url+item.img>
            <span>{{item.name}}</span>
            <!-- <div class="special" v-if="index==1 &&$store.state.taskNumber>0">{{$store.state.taskNumber}}</div> -->
            <div class="special" v-if="index==0 &&$store.state.snatchTaskNumber>0">{{$store.state.snatchTaskNumber}}</div>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
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
          name: "抢任务",
          img: "/img/bb64.png",
          link: "/hall/toTask/toTask1",
          active: true,
          baseLink: "/hall/toTask"
        },
        {
          name: "我的任务",
          img: "/img/bb44.png",
          link: "/hall/myTask/myTask1",
          active: false,
          baseLink: "/hall/myTask"
        },
        {
          name: "发布任务",
          img: "/img/bb45.png",
          link: "/hall/releaseTaskDetail/releaseTaskDetail1",
          active: false,
          baseLink: "/hall/releaseTaskDetail"
        },
        {
          name: "已发布",
          img: "/img/bb46.png",
          link: "/hall/published/published1",
          active: false,
          baseLink: "/hall/published"
        }
      ],
      path: "",
      currentLink: "",
      isCurrentLink: false
    };
  },
  methods: {
    routerGo(item,index) {
      console.log(item);
      
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].active = false;
              this.list[0].img = '/img/bb64.png'
       this.list[1].img = '/img/bb44.png'
        this.list[2].img = '/img/bb45.png'
         this.list[3].img = '/img/bb46.png'
      }

         
      if (index ==0) {
        item.img = "/img/bb43.png";
      } else if (index ==1) {
        item.img = "/img/bb47.png";
      } else if (index ==2) {
        item.img = "/img/bb62.png";
      } else if (index ==3) {
        item.img = "/img/bb63.png";
      }

      item.active = true;
      this.$router.push(item.link);
    },
    setCurrentLink(item) {
      console.log(item.img);
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].active = false;
                      this.list[0].img = '/img/bb64.png'
       this.list[1].img = '/img/bb44.png'
        this.list[2].img = '/img/bb45.png'
         this.list[3].img = '/img/bb46.png'
      }

      item.active = true;
      this.isCurrentLink = true;
      if (item.img == "/img/bb64.png") {
        item.img = "/img/bb43.png";
      } else if (item.img == "/img/bb44.png") {
        item.img = "/img/bb47.png";
      } else if (item.img == "/img/bb45.png") {
        item.img = "/img/bb55.png";
      } else if (item.img == "/img/bb46.png") {
        item.img = "/img/bb63.png";
      }
    }
  },
  mounted() {
    // console.log(this.$route.path);
    // this.path = this.$route.path
    // for (let item of this.list) {
    //   item.active = false
    //   // console.log(this.path,  item);
    //     // console.log( typeof(this.$route.path),  '004fgfgsdfdfs',typeof(item.link));
    //   if (this.path == item.link) {
    //     // console.log('0000000000000000000000000000000000000000000');
    //     item.active = true
    //   }
    // }
  },
  created() {
    let currentLink = this.$route.path;
    console.log(currentLink,'子层路由');
    let lastPath = currentLink.split('/')[currentLink.split('/').length-1]
    console.log(lastPath);
    
    let num = currentLink.indexOf("/");
    for (let i = 0; i < 2; i++) {
      num = currentLink.indexOf("/", num + 1);
    }
    this.currentLink = currentLink.slice(0, num);
    console.log(this.currentLink);
    
    if (lastPath == 'toTask1') {
      this.list[0].active = true
      this.list[0].img  = '/img/bb43.png'
    } else if (lastPath == 'myTask1'||lastPath == 'myTaskDid'||lastPath == 'taskCommit') {
      this.list[1].active = true
      this.list[0].active = false
      this.list[1].img = '/img/bb47.png'
      this.list[0].img = '/img/bb64.png'
    } else if (lastPath == 'releaseTaskDetail1') {
      this.list[2].active = true
      this.list[0].active = false
      this.list[2].img = '/img/bb55.png'
      this.list[0].img = '/img/bb64.png'
    }else if (lastPath == 'published1'||lastPath=='taskDid') {
      this.list[3].active = true
      this.list[0].active = false
      this.list[3].img = '/img/bb63.png'
      this.list[0].img = '/img/bb64.png'
    }
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
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
.special {
  position: absolute;
  top: 22px;
  right: 20px;
  background-color: red;
  /* border: 1px solid #000; */
  border-radius: 50%;
  color: white;
  width: 20px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.router-link-active {
  color: rgba(10, 143, 246, 1);
  /* background-color: #e9edf6; */
  a {
    span {
      color: rgba(10, 143, 246, 1);
    }
  }
}
.linkActive {
  color: rgba(10, 143, 246, 1);
  /* background-color: #e9edf6; */
  a {
    span {
      color: rgba(10, 143, 246, 1);
    }
  }
}
</style>
