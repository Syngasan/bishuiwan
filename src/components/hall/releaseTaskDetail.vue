<template>
  <div class="task">
    <router-view></router-view>
  </div>
</template>
<script>
import {taskList,getTask} from '@/utils/axios/axios'
export default {
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
