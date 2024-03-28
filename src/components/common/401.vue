<template>
  <div class="content">
    <div>
        <div class="number">401</div>
        <div class="top_div">抱歉，您的账户已在其他设备登录或账户权限已过期，请重新登陆</div>
        <a @click="resetLogin">
          重新登陆
        </a>
    </div>
  </div>
</template>
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
<script>
import { clearAllCookies } from '@/utils'
export default{
data() {
return {
}
},
mounted() {
},
  methods: {
    resetLogin() {
         clearAllCookies();
        localStorage.clear(); 
        this.$router.push('/login')
  }
}
}
</script>

