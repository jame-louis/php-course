---
question: 'switch语句中break的作用是什么？如果省略break会发生什么？'
answer: 'break用于跳出switch语句，防止继续执行后续case。如果省略break，会发生"穿透"（fall-through）现象，即继续执行下一个case的代码，直到遇到break或switch结束。'
explanation: 'switch的穿透特性有时可以被利用，比如多个case执行相同代码时：case 1: case 2: case 3: echo "工作日"; break; 但通常情况下要注意加上break避免逻辑错误。'
module: '基础入门'
tags: ['流程控制', '条件语句', 'concept']
relatedLectures: ['lecture03']
draft: false
---
