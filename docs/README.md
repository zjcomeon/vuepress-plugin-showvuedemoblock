# 介绍

`Show Vue Demo Block` 是一个基于 `Vuepress` 的插件和 `Element-UI` 组件进行开发，它可以帮助你在编写文档的时候增加 `Vue` 示例和 `Element-UI` 示例。主要目标是为了降低编写组件文档时增加一些相关示例的难度。

::: warning 使用 Vuepress 编写组件示例有以下尴尬之处：
组件示例和示例代码本质上一样，却需要写两遍；

Vuepress 无法渲染 Markdown 中多个 `export default {}` 代码块；
:::

Show Vue Demo Block 参考了 Element UI 的文档渲染，实现了可在 Markdown 中直接编写示例的语法。
* Element UI ColorPicker 组件的**文档编写示例**，[点此查看](https://github.com/ElemeFE/element/blob/dev/examples/docs/zh-CN/color-picker.md)
* Element UI ColorPicker 组件的**文档示例预览**，[点此查看](https://element.eleme.cn/2.0/#/zh-CN/component/color-picker)。