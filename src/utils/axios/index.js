/*
 * @Author: your name
 * @Date: 2022-01-05 18:30:43
 * @LastEditTime: 2022-03-12 14:50:51
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \datacenter\src\utils\axios\index.js
 */
import axios from 'axios'

import {
  requestSuccess,
  requestFail,
  responseSuccess,
  responseFail
} from '@conf'

// 站点统一的配置
const instance = axios.create({
  timeout: 10000,
  contentType: 'application/json',
  complete: function(xhr, status) {
    if (status === 'timeout') {
      xhr.abort()
    }
  }
})
// 注入请求拦截
instance.interceptors.request.use(requestSuccess, requestFail)

// 注入响应拦截
instance.interceptors.response.use(responseSuccess, responseFail)

// 过程组装请求
export default async P => {
  return new Promise((resolve, reject) => {
    instance(P)
      .then(res => {
        resolve(res)
        P.success && P.success(res)
      })
      .catch(err => {
        reject(err)
        P.error && P.error(err)
      })
  })
} //web请求: ajax封装
