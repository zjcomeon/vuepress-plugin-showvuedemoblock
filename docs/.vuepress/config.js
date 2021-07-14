/*
 * @Author: zj.wang
 * @Date: 2021-07-05 10:12:49
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-14 10:52:31
 * @Description: 
 */
const fs = require('fs')
const path = require('path')


const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  base: isProd ? '/vuepress-plugin-showvuedemoblock/' : '/', // 基础路径
  host: 'localhost',
  port: 8082,
  dest: 'docs/.vuepress/dist/vuepress-plugin-showvuedemoblock/', // 输出目录
  configureWebpack: {
    resolve: {
      alias: {
        '@images':  path.resolve(__dirname, './public/images'),
        '@styles': path.resolve(__dirname, './public/styles')
      }
    }
  },
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "stylesheet", href: "/styles/style.css" }],
    //['script', { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' }],
    //['script', { src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js' }],
    //['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    //['script', { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Show Vue Demo Block'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Show Vue Demo Block'
    },
  },
  themeConfig: {
    logo: '/images/logo.png',
    // 国际化
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebar: {
          '/':  require('./sidebar/').genSidebarConfig('介绍')
        }
      }
    },
  },
  plugins: [
    [
      require('../../src'),
      {
        component: 'DemoBlock',
        locales: [
          {
            "lang": "zh-CN",
            "ui": {
              "hide-text": "隐藏代码",
              "show-text": "显示代码",
              "run-text": "在线编辑运行",
              "copy-text": "复制代码",
              "copy-success": "复制成功"
            }
          },
          {
            "lang": "en-US",
            "ui": {
              "hide-text": "Hide",
              "show-text": "Expand",
              "run-text": "run in codepen",
              "copy-text": "Copy",
              "copy-success": "Successful"
            }
          }
        ]
      }
    ]
  ]
}
