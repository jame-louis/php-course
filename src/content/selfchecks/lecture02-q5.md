---
question: 'PHP中的前置++和后置++有什么区别？'
answer: '前置++（++$i）先自增再返回值；后置++（$i++）先返回值再自增。例如：$i=5; echo ++$i输出6（i变为6）；$i=5; echo $i++输出5（i随后变为6）。'
explanation: '前置和后置递增/递减运算符的区别在于返回值和自增操作的顺序。在独立语句中效果相同，但在表达式中有明显区别。'
module: '基础入门'
tags: ['运算符', 'concept']
relatedLectures: ['lecture02']
draft: false
---
