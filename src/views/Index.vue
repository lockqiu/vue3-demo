<template>
  <div class="wrapper">
    <v-head />
    <v-sidebar />
    <div
      class="content-box"
      :class="{ 'content-collapse': $state.collapse }"
    >
      <div ref="content" class="content">
        <router-view />
        <div v-if="dataEle" id="components-back-top-demo-custom">
          <a-back-top :target="target"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import vHead from './Header.vue'
  import vSidebar from './Sidebar.vue'
  export default {
    components: {
      vHead,
      vSidebar
    },
    data() {
      return {
        dataEle: null
      }
  },
  created() {
  },
  mounted() {
      this.dataEle = this.$refs.content
  },
  methods: {
     target(){
        return this.dataEle
      }
   }
}
</script>
<style lang="less" scoped>
.ant-back-top {
    right: 40px;
}

</style>
