<template>
  <div class="content">
    <div>
        <div class="number">500</div>
        <div class="top_div">这个页面迷路了，建议去首页看看哦~</div>
        <router-link :to="'/'+ path">
          返回首页
        </router-link>
    </div>
  </div>
</template>
<script>
import { getStore } from '@/utils'
export default {
  computed: {
      path() {
        let menuList = getStore('menuList')
        let path = menuList[0].subs ? menuList[0].subs[0].index : menuList[0].index
        return path
      }
    },
}
</script>
<style lang="less" scoped>
.content{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .top_div{
    margin-bottom: 10px;
  }
  .number{
    font-size: 100px;
  }
}
</style>
