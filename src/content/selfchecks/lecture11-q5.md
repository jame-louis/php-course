---
question: 实现购物车功能时，为什么Session比Cookie更适合？
answer: 购物车数据量可能较大（商品信息、数量、价格等），Cookie有4KB限制；购物车数据较敏感，Session存储在服务器更安全；Session支持复杂数据结构如多维数组，操作更方便。
explanation: Cookie适合存储简单标识如用户ID，不适合存储复杂的购物车数据。Session可以存储任意PHP变量（数组、对象等），且数据不暴露在客户端，是购物车的最佳选择。
module: 表单与会话
tags: ['PHP', 'Session', 'Cookie', '购物车']
relatedLectures: ['lecture11']
draft: false
---
