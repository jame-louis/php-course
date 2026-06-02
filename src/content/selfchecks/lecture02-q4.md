---
question: 'PHP中==和===有什么区别？'
answer: '==是相等比较，只比较值是否相等，会进行类型转换；===是完全相等比较，同时比较值和类型，类型不同直接返回false。例如：1=="1"返回true（值相等），而1==="1"返回false（类型不同，整数vs字符串）。'
explanation: '===是严格相等比较，可以避免类型转换带来的意外结果。在需要精确匹配时（如函数返回值判断），应优先使用===。'
module: '基础入门'
tags: ['运算符', 'concept']
relatedLectures: ['lecture02']
draft: false
---
