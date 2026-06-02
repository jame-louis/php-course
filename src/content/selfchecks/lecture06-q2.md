---
question: 值传递和引用传递有什么区别？
answer: 值传递是传递变量的副本，函数内部修改不影响原变量；引用传递（使用&符号）是传递变量的地址，函数内部修改会影响原变量。
explanation: 值传递如 function addTen($num)，修改的是$num的副本；引用传递如 function addTen(&$num)，修改的是原变量本身。引用传递适用于需要在函数内部修改外部变量的场景。
module: 函数与类
tags: ['PHP', '函数', '引用传递']
relatedLectures: ['lecture06']
draft: false
---
