<!--
 * @Author: zj.wang
 * @Date: 2021-07-13 16:45:54
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-14 10:58:22
 * @Description: 
-->
# 快速上手

## 安装

### 安装 VuePress

请参考 Vuepress 官方文档，[点此查看](https://vuepress.vuejs.org/zh/guide/)

### 安装插件

使用 `yarn` 安装 `vuepress-plugin-showvuedemoblock` 组件：
```bash
yarn add vuepress-plugin-showvuedemoblock -D
```
或者使用 `npm` 安装它：
```bash
npm i vuepress-plugin-showvuedemoblock --save-dev
```
如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 配置插件

打开 .vuepress/config.js 文件，然后在合适的位置引用插件：

```js
module.exports = {
  ...
  plugins: ['showvuedemoblock']
  ...
}
```

如果你对 VuePress 插件配置不是很了解，请点这里：[使用插件](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)

配置完毕后，cd 到 .vuepress 文件夹同级目录，运行 `vuepress dev .` 即可启动文档服务

## 使用

::: warning 由于代码会被解析，所以使用贴图来表示
![使用方式截图](~@images/use.png)
:::

最终效果如下：

::: vuedemo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div class="box">
    <h3>{{ message }}</h3>
    <button>HTML按钮</button>
    <el-button>Element 默认按钮</el-button>
    <el-button type="primary">Element 主要按钮</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Hello Vue'
    }
  }
}
</script>
<style>
.box { 
  border: 1px dashed #bbb;
  padding: 10px;
}
</style>
```
:::
