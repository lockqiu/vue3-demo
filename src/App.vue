<template>
  <a-config-provider :locale="zhCN">
        <Loading v-if="loading" />
        <router-view />
 </a-config-provider>
</template>
<script setup>
  import Loading from '@comp/common/loading.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import store from '@/store'
import { computed } from 'vue'
const loading = computed(() => store.state.loading)

</script>
