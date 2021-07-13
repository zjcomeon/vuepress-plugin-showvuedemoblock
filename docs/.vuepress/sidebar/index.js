/*
 * @Author: zj.wang
 * @Date: 2021-07-08 15:02:34
 * @LastEditors: zj.wang
 * @LastEditTime: 2021-07-13 17:13:07
 * @Description: 
 */

module.exports.genSidebarConfig = function(title,lang) {
  return [
    {
      title,
      collapsable: false,
      children: [
        {path:'started', title: '快速上手'},
        {path:'options', title: '配置'}
      ]
    }
  ]
}

module.exports.getSidebarGuide = function(groupA, groupB) {
  return [
    {
      title: groupA,
      path: `design`
    },
    {
      title: groupB,
      path: `nav`
    },
  ]
}

module.exports.getSidebarComponents = function(groupTitle, lang) {
  return [
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 1,
      children: [
        {
          title: 'base',
          collapsable: false,
          children: [
            {
              title: '按钮',
              path: `${lang}/components/base/button`
            },
            {
              title: 'bb',
              path: `${lang}/components/base/bb`
            },
          ],
        },
        {
          title: 'data',
          collapsable: false,
          children: [
            {
              title: '表格',
              path: `${lang}/components/data/table`
            },
          ],
        },
      ]
    }
  ]
}