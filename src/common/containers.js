/*
 * @Author: zj.wang
 * @Date: 2021-07-08 17:04:35
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-14 11:08:46
 * @Description: 
 */

// 解析器创建块级自定义容器插件
// 使用这个插件，你可以创建像这样的块容器
/*

::: warning
here be dragons*
:::

 * 
 */


/*
Token 内容
[
  Token {
    type: 'html_block',
    tag: '',
    attrs: null,
    map: [ 0, 7 ],
    nesting: 0,
    level: 0,
    children: null,
    content: '<!--\n' +
      ' * @Author: zj.wang\n' +
      ' * @Date: 2021-07-08 15:37:00\n' +
      ' * @LastEditors: zj.wang\n' +
      ' * @LastEditTime: 2021-07-08 17:43:03\n' +
      ' * @Description: \n' +
      '-->\n',
    markup: '',
    info: '',
    meta: null,
    block: true,
    hidden: false
  },
  Token {
    type: 'container_vuedemo_open',
    tag: 'div',
    attrs: null,
    map: [ 8, 12 ],
    nesting: 1,
    level: 0,
    children: null,
    content: '',
    markup: ':::',
    info: ' vuedemo',
    meta: null,
    block: true,
    hidden: false
  },
  Token {
    type: 'fence',
    tag: 'code',
    attrs: null,
    map: [ 9, 12 ],
    nesting: 0,
    level: 1,
    children: null,
    content: '<button>button</button>\n',
    markup: '```',
    info: '',
    meta: null,
    block: true,
    hidden: false
  },
  Token {
    type: 'container_vuedemo_close',
    tag: 'div',
    attrs: null,
    map: null,
    nesting: -1,
    level: 0,
    children: null,
    content: '',
    markup: ':::',
    info: '',
    meta: null,
    block: true,
    hidden: false
  }
]



*/
const mdContainer = require('markdown-it-container');

module.exports = options => {
  // console.log('options', options)
  // options ： .vuepress 下 config.js 的 plugins 配置 options
  const { component = 'demo-block' } = options;
  // const { component } = options;
  const componentName = component
    // 首字母转小写
    .replace(/^\S/, s => s.toLowerCase())
    // 驼峰字母转 - 加小写
    .replace(/([A-Z])/g, "-$1").toLowerCase();
  // console.log('componentName', componentName)
  return md => {
    md.use(mdContainer, 'vuedemo', {
      // 验证所有 md 文件中使用 ::: 后的名字
      validate(params) {
        // console.log('params', params, params.trim().match(/^vuedemo\s*(.*)$/))
        return params.trim().match(/^vuedemo\s*(.*)$/);
      },
      render(tokens, idx) {
        // m: [ 'vuedemo', '', index: 0, input: 'vuedemo', groups: undefined ]
        const m = tokens[idx].info.trim().match(/^vuedemo\s*(.*)$/);
        // console.log('tokens', tokens, idx, tokens[idx].nesting, m)
        // 标记 ::: 开始
        if (tokens[idx].nesting === 1) {
          // 获取描述
          const description = m && m.length > 1 ? m[1] : '';
          // 获取标记 ::: 的内容
          const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
          // 编码转移 options 内容
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          return `<${componentName} :options="JSON.parse(decodeURI('${encodeOptionsStr}'))">
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">`
        }
        // 拼接组件模版格式
        return `</template></${componentName}>`;
      }
    })
  }
}