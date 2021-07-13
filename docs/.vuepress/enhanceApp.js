/*
 * @Author: zj.wang
 * @Date: 2021-07-05 17:05:41
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-13 15:57:16
 * @Description: 
 */

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

const ComponentsInstall = function (Vue, options) {
  // Vue.component('xx', xx)
}

export default ({ Vue, options, router }) => {
  Vue.use(Element)
}