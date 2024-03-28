<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div
      class="collapse-btn"
      @click="collapseChage"
    >
      <menu-fold-outlined  v-if="$state.collapse"/>
      <menu-unfold-outlined v-if="!$state.collapse" />
    </div>
    <div class="logo">
      111
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <!-- <img :src="headerImg" style="width: 32px;height:32px;"/> -->
        </div>
        <!-- 用户名下拉菜单 -->
        <a-dropdown
          class="user-name"
          :trigger="['click']"
        >
          <span class="ant-dropdown-link" ref="hideLink" @click.stop="()=>{}">
            <span style="font-size:14px;margin:0 16px;">用户名</span>
           <img style="cursor: pointer;" @click="rotateIcon" :class="{ 'rotate': isActiveIcon }" src="../assets/img/unfold.png" height="16" width="20" alt="img.png"/>
          </span>
          <template #overlay>
            <a-menu
                slot="overlay"
                class="card"
                mode="inline"
                theme="dark"
                :selectable="false"
            >
            <a-menu-item key="1">
               <div class="center" @click.stop="loginOut">
                        退出登录
                </div>
            </a-menu-item>
             <a-menu-item key="2">
               <div class="center" @click.stop="resetPassword">
                        重置密码
                </div>
            </a-menu-item>
        </a-menu>
        </template>
        </a-dropdown>
      </div>
    </div>
    <a-modal 
        v-model:open="resetModal"
        :maskClosable="false"
        centered
        title="重置密码"
        :width="600"
        :body-style="{ paddingTop: '20px' }"
        @ok="submitForm"
        >
         <a-form
          ref="resetPassword"
          :model="form"
          :rules="rules"
          :label-col="{ style: { width: '80px' } }"
          class="ms-content"
        >
          <a-form-item prop="username" label="账号：">
            <a-input
             disabled
             v-model:value="form.username"
              placeholder="请输入账号"
            />
          </a-form-item>
          <a-form-item prop="password" label="原密码：">
            <a-input-password
              v-model:value="form.password"
              autocomplete="off"
              type="password"
              placeholder="请输入原密码"
               @change="errorMsg = ''"
            />
          </a-form-item>
          <a-form-item prop="new_pwd" label="新密码：">
            <a-input-password
              v-model:value="form.new_pwd"
              autocomplete="off"
              type="password"
              placeholder="请输入新密码"
              @keyup.enter.native="submitForm()"
               @change="errorMsg = ''"
            />
          </a-form-item>
           <a-form-item prop="okpassword" label="确认密码：">
            <a-input-password
              v-model:value="form.okpassword"
              type="password"
              autocomplete="off"
              placeholder="请输入确认密码"
              @keyup.enter.native="submitForm()"
               @change="errorMsg = ''"
            />
            <span v-if="errorMsg" style="color:#f5222d;">{{ errorMsg }}</span>
          </a-form-item>
        </a-form>
      </a-modal>
  </div>
</template>
<script>
import { MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
  import axios, { Toast, getStore, setStore, clearAllCookies, setCookie } from '@/utils';
export default {
  components:{
    MenuFoldOutlined,
    MenuUnfoldOutlined
    },
    data() {
      return {
        isActiveIcon: false,
        resetModal: false,
        errorMsg: '',
         form: {
          username: '',
          new_pwd: '',
          okpassword: '',
          password:''
        },
        rules: {
          password: [{ required: true, message: '请输入密码!', trigger: 'blur' }],
          new_pwd: [{ required: true, message: '请输入密码!', trigger: 'blur' }],
          okpassword: [{ required: true, message: '请输入密码!', trigger: 'blur' }],
        },
        
      }
  },
  mounted() {
      this.changeSize()
      window.onresize = () => {
        this.changeSize()
    }
     let that = this
    document.addEventListener('click', function () {
      that.rotateIcon(1)
    })
  },
  beforeDestroy() {
    window.onresize = null
    document.removeEventListener('click', null);
    },
  methods: {
     rotateIcon(num) {
      if(num == 1 && !this.isActiveIcon) return
      this.isActiveIcon = !this.isActiveIcon
    },
    // 重置密码
    resetPassword() {
      this.resetModal = true
      this.$nextTick(() => {
        const form = this.$refs.resetPassword
        form.resetFields() 
        // this.form.username = getStore('userInfo').userId 
      })
     
    },
    // 修改密码
   submitForm() {
        this.errorMsg = ''
      const form = this.$refs.resetPassword
        form.validate((valid) => {
          if (!valid) {
            return
          }
          if (this.form.new_pwd != this.form.okpassword) {
            return this.errorMsg =  '确认密码与新密码不一致！'
          }
        //  this.getCheck()
           
        })
    },
       // 退出登录
  loginOut() {
       axios({
            // url:'loginOut',
            type: 'post',   
       }).then(async (res) => {
         if (!res.success) return Toast.fail('退出失败！')
          Toast.success('退出成功！')
         let a = await clearAllCookies()
         if (a) {
            localStorage.clear()
            this.$router.push('/login')
          }
          
       })
          
    },
      changeSize() {
        if (document.body.clientWidth < 1500) {
            this.$state.collapse = true
        } else {
          this.$state.collapse = false
        }

      },
      // 侧边栏折叠
    collapseChage() {
        console.log("this.$state.collapse::: ", this.$state.collapse)
        this.$state.collapse = !this.$state.collapse
    }
    }
  }
</script>
<style lang="less" scoped>

.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    line-height: 64px;
    font-size: 22px;
    color: #fff;
    background-color: #001529;
}
.rotate {
    transform: rotate(180deg);
}
 .label_div{
          position: absolute;
          right: 290px;
          top: -40px;
          height: 300px;
          padding: 0 10px 10px;
          overflow: auto;
          .son_li{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .search{
             position: sticky;
             top: 0;
             z-index: 999;
             padding-top:10px;
             background: #001529;
             /deep/.ant-input-suffix{
              top:calc(50% + 5px);
             }
          }
          .bottom{
             position: sticky;
             display: block;
             top:290px;
             left:0;
             width: 100%;
             z-index: 999;
             height:10px;
             background: #001529;
             border:0;
          }
        }
.collapse-btn {
    float: left;
    height: 24px;
    padding: 0 16px 0 25px;
    margin-top:1px;
    cursor: pointer;
}
.header .logo {
    float: left;
    width: 250px;
    font-size: 24px;
    font-family: BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';

}
.header-right {
    float: right;
    padding-right: 25px;
}
.header-user-con {
    display: flex;
    align-items: center;
}
.user-avator {
    margin-left: 16px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
} 
</style>
