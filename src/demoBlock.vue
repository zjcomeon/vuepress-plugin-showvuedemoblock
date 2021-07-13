<!--
 * @Author: zj.wang
 * @Date: 2021-07-08 16:23:36
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-13 17:38:36
 * @Description: 组件模版
-->
<template>
  <div class="demo-block">
    <!-- 示例 -->
    <div class="demo-content">
      <slot name="demo"></slot>
    </div>
    <div class="demo-meta" ref="meta" >
      <!-- 描述 -->
      <div class="description" ref="description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
      <!-- 源码 -->
      <div class="code-content" ref="code">
        <slot name="source"></slot>
      </div>
    </div>
    <!-- 源码展示控制 -->
    <div class="demo-control">
      <i :class="iconClass" @click="isShow = !isShow"></i>
      <span class="demo-control-show" @click="isShow = !isShow">{{codeTextBtn}}</span>
      <span class="demo-control-run" @click="goCodepen" :style="`opacity:${isShow?1:0}`">{{ runTextBtn }}</span>
      <span class="demo-control-copy" @click="copyCodeText" :style="`opacity:${isShow?1:0}`">{{ copyTextBtn }}</span>
    </div>
  </div>
</template>

<script>
import defaultLang from './i18n/default_lang.json'
import { version } from 'element-ui';
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      copied: false,
      codeTextBtn: '', //'显示代码',
      iconClass: '',
      codepen: {
        html: '',
        script: '',
        style: ''
      }
    }
  },
  computed: {
    langConfig() {
      const lang = this.options.locales || defaultLang
      return lang.filter(config => config.lang === this.$lang)[0]['ui']
    },
    copyTextBtn() {
      return this.langConfig['copy-text']
    },
    runTextBtn() {
      return this.langConfig['run-text']
    },
    codeArea () {
      return this.$refs.meta // this.$el.getElementsByClassName("code-meta")[0]
    },
    codeAreaHeight () {
      console.log(this.$refs.description)
      if (this.$refs.description) {
        return this.$refs.description.clientHeight + this.$refs.code.clientHeight + 20 + 3
      }
      return this.$refs.code.clientHeight
    }
  },
  watch: {
    isShow (val) {
      this.changeStyle()
    }
  },
  created() {
  },
  mounted () {
    this.$nextTick(() => {
      const source = this.$slots.source
      this.getSourceCode(source)
      this.changeStyle()
      console.log(this.langConfig)
    })
    
  },
  methods: {
    getSourceCode (source) {
      if (source && source[0]) {
      let code = '';
      let cur = source[0];
      if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
        cur = cur.children[0];
        if (cur.tag === 'code') {
          // code = cur.children[0].text;
          code = cur.elm.textContent
        }
      }else {
        this.getSourceCode(cur.children)
      }
      if (code) {
        this.codepen.html = this.stripTemplate(code);
        this.codepen.script = this.stripScript(code);
        this.codepen.style = this.stripStyle(code);
      }
    }
    },

    stripScript(content) {
      const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : '';
    },

    stripStyle(content) {
      const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
      return result && result[2] ? result[2].trim() : '';
    },

    // 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
    stripTemplate(content) {
      content = content.trim();
      if (!content) {
        return content;
      }
      return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
    },
    changeStyle () {
      this.iconClass = this.isShow ? "el-icon-caret-top" : "el-icon-caret-bottom"
      this.codeTextBtn = this.isShow ? this.langConfig['hide-text'] : this.langConfig['show-text']//"隐藏代码" : "显示代码"
      this.codeArea.style.height = this.isShow ? `${this.codeAreaHeight}px` : '0px'
    },
    // 去codepen编辑
    goCodepen() {
      // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
      const { script, html, style } = this.codepen;
      console.log( this.codepen)
      
      const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>' +
        '\n<scr' + `ipt src="//unpkg.com/element-ui@${ version }/lib/index.js"></scr` + 'ipt>';
        let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
        let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
        let cssTpl = `@import url("//unpkg.com/element-ui@${ version }/lib/theme-chalk/index.css");\n${(style || '').trim()}\n`;
        jsTpl = jsTpl
          ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
          : 'new Vue().$mount(\'#app\')';
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: htmlTpl
      };
      const form = document.getElementById('fiddle-form') || document.createElement('form');
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      form.method = 'POST';
      form.action = 'https://codepen.io/pen/define/';
      form.target = '_blank';
      form.style.display = 'none';

      const input = document.createElement('input');
      input.setAttribute('name', 'data');
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', JSON.stringify(data));

      form.appendChild(input);
      document.body.appendChild(form);

      form.submit();
    
    },
    // 复制代码  
    copyCodeText () {
      if (this.copied) {
        return;
      }
      const pre = this.$el.querySelectorAll("pre")[0];
      pre.setAttribute("contenteditable", "true");
      pre.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
      pre.removeAttribute("contenteditable");
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success',
        duration:1500
      });
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  .demo-content {
    padding: 20px;
  }
  .demo-source {
    padding: 24px;
    min-height: 200px;
  }
  .demo-meta {
    background-color: #fafafa;
    overflow: hidden;
    transition: height .2s;
    height: 0;
    p,pre {
      margin: 0;
    }
  }
  .demo-meta pre {
    padding: 20px;
  }
  .demo-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    font-size: 14px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    [class^=el-icon-] {
      position: relative;
      transition: .3s;
    }
    .demo-control-show {
      opacity: 0;
      position: absolute;
      transform: translateX(-30px);
      transition: .3s;
      &:hover {
        color: #409eff;
      }
    }
    .demo-control-copy {
      opacity: 1;
      position: absolute;
      right: 10px;
      color: #409eff;
    }
    .demo-control-run {
      position: absolute;
      left: 10px;
      color: #409eff;
    }
    &:hover{
      background: #f9fafc;
      .demo-control-show {
        // transform: translateX(0px);
        color: #409eff;
        animation: moveShowEffect .3s 0s 1 normal forwards;;
      }
      [class^=el-icon-] {
        transform: translateX(-10px);
        color: #409eff;
      }
      .demo-control-copy {
        // animation: moveCopyEffect .1s 0s 1 normal forwards;;
      }
    }
  }
}
@keyframes moveShowEffect {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes moveCopyEffect {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.demo-block .description {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fff;
}
</style>