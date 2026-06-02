---
question: 静态变量（static）和普通局部变量有什么区别？
answer: 静态变量在函数执行完后不会被销毁，下次调用时保留上次的值；普通局部变量每次调用都会重新初始化。
explanation: 静态变量使用 static 关键字声明，如 static $count = 0，只在第一次调用时初始化。常用于计数器、缓存等需要保持状态的场景。
module: 函数与类
tags: ['PHP', '函数', '静态变量', '作用域']
relatedLectures: ['lecture06']
draft: false
---
