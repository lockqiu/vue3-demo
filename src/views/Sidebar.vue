<template>
  <div :class="['sidebar',{minSidebar : $state.collapse}]">
    <a-menu
      class="sidebar-menu"
      mode="inline"
      theme="dark"
      :inline-collapsed="$state.collapse"
      :open-keys.sync="openKeys"
      @click="handleClick"
      :selectedKeys="selectedKeys"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.subs" :key="item.index">
          <img class="img" :src="get_image_url(item,1)"/>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-sub-menu v-if="item.subs" :key="item.index">
              <span slot="title">
                <img class="img" :src="get_image_url(item)"/>
                  {{ item.title }}
              </span>
              <a-menu-item  v-for="subItem in item.subs" :key="subItem.index">
                     {{ subItem.title }}
              </a-menu-item>
          </a-sub-menu>
      </template>
    </a-menu>

  </div>
</template>

<script>
import {  getStore,setStore,setCookie } from '@/utils'
  export default {
    data() {
      return {
        openKeys: [],
        selectedKeys: [],
        // menuList: getStore('menuList') || []
        menuList: [
            {
              img: "home",
              index: "home",
              title: "home"
            },
          ]
      }
  },
    created() {
  },
  mounted() {
      this.getPath()
    },
    watch: {
        $route() {
            let key = this.$route.path.replace('/', '')
            this.selectedKeys = [key]
            let obj = this.menuList.find(ele => ele.subs && ele.subs.some(el=> el.index == key))
            this.openKeys = obj ? [obj.index] : []
      },
      $state: {
        handler() {
          if (this.$state.collapse) {
            this.openKeys = []
            return
          }
          this.getPath()
        }
       }
    },
    methods: {
        handleClick(e) {
            this.openKeys = [e.keyPath[e.keyPath.length - 1]]
            this.$router.push('/'+ e.key )
      },
      // 展开对应导航
      getPath() {
          let key = this.$route.path.replace('/', '')
            this.selectedKeys = [key]
            let obj = this.menuList.find(ele => ele.subs && ele.subs.some(el=> el.index == key))
            this.openKeys = obj ? [obj.index] : []
      },
      get_image_url(item, num) {
      //这里必须要把文件夹地址写在这里；../images/
        let a = num == 1 && item.index == this.selectedKeys[0] ? 'Select' : ''
      return new URL(`../assets/img/${item.img}${a}.svg`, import.meta.url).href
    }
    }
  }
</script>

<style lang="less" scoped>
.sidebar {
     width: 200px;
    z-index: 9;
    display: block;
    position: absolute;
    left: 0;
    top: 64px;
    bottom: 0;
    overflow-y: scroll; 
    background-color: #001529;
    color:#bfcbd9;
    /deep/.ant-menu-dark, .ant-menu-dark .ant-menu-sub{
      background: #001529;
    }
    /deep/.ant-menu.ant-menu-dark .ant-menu-item-selected{
      margin-top: 0;
      height: 40px;
      line-height: 40px;
      margin-bottom: 0;
    }
    .img{
      width: 22px;
      height: 21px;
      margin-top: -4px;
      margin-right: 8px;

    }
}
.minSidebar{
  width:55px;
/deep/.ant-menu-submenu{
  display: flex;
  justify-content: center;
  .ant-menu-submenu-title{
    width: 40px;
    padding:0 10px !important;
  }
}
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar > ul {
    height: 100%;
}
.ant-menu-inline-collapsed{
    width: 54px;
    .ant-menu-item .icon,.ant-menu-submenu .icon{
        margin-right: 20px;
        margin-left: -10px;
    }
}
.ant-menu-item .icon,.ant-menu-submenu .icon{
    font-size: 22px;
    margin-right: 8px;
}
/deep/.ant-menu-sub .ant-menu-item,
/deep/.ant-menu-submenu .ant-menu-submenu-title{
    font-size: 14px;
    margin: 5px !important;
    width: calc(100% - 10px);
}
/deep/.ant-menu-submenu-title{
  border-radius: 8px;
   &:active{
    background: #1677ff !important;
    border-radius: 8px;
  }
}

/deep/.ant-menu-item-selected,/deep/.ant-menu-item:hover{
  background-color: #1677ff !important;
  color: #fff;
  border-radius: 8px;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected{
  background-color: #1677ff !important;
  color: #fff;
  border-radius: 8px;
}
/deep/.ant-menu-sub .ant-menu-item{
 padding-left:58px !important;
 border-radius: 8px;
}
</style>
