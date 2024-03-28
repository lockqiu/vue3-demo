import './assets/main.css'

import { createApp,reactive } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router)
app.use(Antd, { locale: zhCN })
// 创建一个响应式的全局状态对象
const collapse = reactive({
  collapse : false
});
app.config.globalProperties.$state = collapse

app.mount('#app')
