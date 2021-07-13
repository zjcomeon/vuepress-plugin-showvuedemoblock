/*
 * @Author: zj.wang
 * @Date: 2021-07-08 16:24:42
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-13 13:19:15
 * @Description: 
 */
const path = require('path')
//
const renderDemoBlock = require('./common/render')
const demoBlockContainers = require('./common/containers')

module.exports = (options = {}, ctx) => {
  return {
    enhanceAppFiles: path.resolve(__dirname, './enhanceAppFile.js'),
    chainMarkdown(config) {
      config.plugin('containers')
        .use(demoBlockContainers(options))
        .end();
    },
    extendMarkdown: md => {
      const id = setInterval(() => {
        console.log('extendMarkdown', md.render)
        const render = md.render
        console.log('render.call', typeof render.call(md, ''))
        if (typeof render.call(md, '') === 'object') {
          md.render = (...args) => {
            //console.log('args------->', ...args)
            let result = render.call(md, ...args);
            //console.log('result------>', result)
            const { template, script, style } = renderDemoBlock(result.html)
            //console.log('template-------->', template)
            result.html = template
            result.dataBlockString = `${script}\n${style}\n${result.dataBlockString}`;
            return result;
          }
          clearInterval(id);
        }
      },10)
    }
  }
}