---
question: 'PHP中索引数组和关联数组有什么区别？如何创建它们？'
answer: '索引数组使用数字作为键名（从0开始），关联数组使用字符串作为键名。创建方式：索引数组$arr=["a","b","c"]或array("a","b","c")；关联数组$arr=["name"=>"张三","age"=>20]或array("name"=>"张三","age"=>20)。'
explanation: '索引数组适合存储有序列表，如学生名单；关联数组适合存储结构化数据，如用户信息。PHP 5.4+推荐使用短数组语法[]，更简洁。'
module: '基础入门'
tags: ['数组', '数据结构', 'concept']
relatedLectures: ['lecture04']
draft: false
---
