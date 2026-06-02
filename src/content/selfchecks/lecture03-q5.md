---
question: 'break和continue在循环中分别有什么作用？break 2是什么意思？'
answer: 'break用于完全终止循环，跳出循环体；continue用于跳过当前迭代，继续下一次循环。break 2表示跳出两层循环（嵌套循环中使用），同理continue 2表示跳过两层循环的当前迭代。'
explanation: '在嵌套循环中，break默认只跳出当前层，break n可以跳出n层循环。这在处理二维数组查找等场景很有用，找到目标后直接跳出所有循环。'
module: '基础入门'
tags: ['流程控制', '跳转语句', 'concept']
relatedLectures: ['lecture03']
draft: false
---
