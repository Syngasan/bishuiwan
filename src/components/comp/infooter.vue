<template>
  <div class="infooter">
    <div class="infooterName">©Copyright 2018 碧水湾温泉度假村 备案号：粤ICP备10217132号-2</div>
  </div>
</template>

<script>
export default {
  name: 'infooter',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.infooter {
  width: 100%;
  height: 63px;
  background:rgba(223,227,237,1);
  /* position: fixed; */
  bottom: 0;
  /* z-index: 1000; */
  /*bottom: 0;
  left: 0;
  right: 0;*/
}
.infooterName {
  font-size:14px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(20,20,20,1);
  height:17px;
  line-height: 17px;
  padding-top: 26px;
}
</style>
