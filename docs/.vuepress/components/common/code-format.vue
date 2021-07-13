<!--
 * @Author: zj.wang
 * @Date: 2021-07-07 16:40:37
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-08 11:09:50
 * @Description: 
-->
<template>
  <div class="demo-block">
    <div class="demo-source">
      <slot></slot>
    </div>
    <div v-if="isShow" class="demo-meta">
      <slot name="codeText"></slot>
    </div>
    <div class="demo-control" @click="handleToggleShow">
      <i v-if="!isShow" class="el-icon-caret-bottom"></i>
      <i v-else class="el-icon-caret-top"></i>
      <span class="demo-control-buttonText">{{codeTextBtn}}</span>
    </div>
  </div>  
</template>


<script>
export default {
  data () {
    return {
      isShow: false,
      codeTextBtn: '显示代码'
    }
  },
  methods: {
    handleToggleShow () {
      this.isShow = !this.isShow
      this.codeTextBtn = this.isShow ? '隐藏代码' : '显示代码'
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  .demo-source {
    padding: 24px;
    min-height: 200px;
  }
  .demo-meta {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    transition: height .2s;
  }
  .demo-meta pre {
    margin: 0;
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
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    [class^=el-icon-] {
      position: relative;
      transition: .1s;
    }
    .demo-control-buttonText {
      display: none;
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      transition: .3s;
      &:hover {
        color: #409eff;
      }
    }
    &:hover .demo-control-buttonText {
      display: inline;
      transform: translateX(0px);
    }
    &:hover [class^=el-icon-] {
      transform: translateX(-10px);
       color: #409eff;
    }
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